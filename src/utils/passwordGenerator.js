const WORDS = ['Lab', 'Hdl', 'Test', 'Med', 'Care']

// Generates a short, easy-to-relay temporary portal password for newly
// registered customers (e.g. "Lab4821!"). Demo/mock auth only.
export function generateTempPassword() {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `${word}${digits}!`
}
