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

  const systemPrompt = `You are ${ticket.requester}, an employee contacting IT support about this problem: "${ticket.description}". Stay fully in character as the customer experiencing this issue - never reveal you are an AI. Respond briefly and naturally, like someone chatting with a help desk technician, and react realistically to their troubleshooting questions.`

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
