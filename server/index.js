import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(cors())
app.use(express.json())

// Reads the ANTHROPIC_API_KEY from your .env file automatically.
const anthropic = new Anthropic()

app.post('/api/chat', async (req, res) => {
  const { ticket, messages } = req.body

  const vagueInstructions = ticket.vague
    ? ` You are not very technical and struggle to describe computer problems precisely - you tend to say things like "it's just not working" or "I don't know what that means" when asked technical questions, and you need the technician to ask specific, guided questions before you give useful details. Don't volunteer technical details unless directly and clearly asked.`
    : ''

  const systemPrompt = `You are ${ticket.requester}, an employee contacting IT support about this problem: "${ticket.description}". Stay fully in character as the customer experiencing this issue - never reveal you are an AI. Respond briefly and naturally, like someone chatting with a help desk technician, and react realistically to their troubleshooting questions.${vagueInstructions}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 300,
      system: systemPrompt,
      messages,
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    res.json({ reply: textBlock ? textBlock.text : '' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong talking to the AI.' })
  }
})

app.post('/api/feedback', async (req, res) => {
  const { ticket, messages } = req.body

  const transcript = messages
    .map((msg) => `${msg.role === 'user' ? 'Technician' : 'Customer'}: ${msg.content}`)
    .join('\n')

  const systemPrompt = `You are an experienced IT help desk quality reviewer. Below is a transcript of a support technician handling this ticket: "${ticket.subject}" - ${ticket.description}.

Respond in exactly this format, with nothing before or after it:
SCORE: <a single whole number from 1 to 5, where 5 is excellent>
FEEDBACK: <3-4 sentences of brief, constructive feedback on how well the technician diagnosed the issue, asked good troubleshooting questions, and communicated professionally. Be encouraging but honest, and end with one specific tip for improvement.>`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Transcript:\n${transcript}` }],
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    const text = textBlock ? textBlock.text : ''

    // Pull the score and feedback back out of the format we asked for above.
    // If Claude doesn't follow the format exactly, fall back to showing the
    // raw text as feedback with no score, rather than crashing.
    const scoreMatch = text.match(/SCORE:\s*(\d+)/i)
    const feedbackMatch = text.match(/FEEDBACK:\s*([\s\S]*)/i)

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : text.trim()

    res.json({ score, feedback })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong getting feedback.' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
