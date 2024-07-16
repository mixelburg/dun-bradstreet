import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const PORT = 8787

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

console.log(`Server running at http://localhost:${PORT}`)
serve({
  fetch: app.fetch,
  port: PORT,
})
