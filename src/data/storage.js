// localStorage only stores strings, so everything gets JSON.stringify'd going
// in and JSON.parse'd coming back out. Wrapped in try/catch because reading
// storage can fail (private browsing, corrupted data, etc.) - if that
// happens, we just fall back to a fresh default instead of crashing.
export function loadJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch (error) {
    console.error(`Could not load "${key}" from storage`, error)
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Could not save "${key}" to storage`, error)
  }
}
