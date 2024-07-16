import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import axios from "axios";

const PORT = 8787

const app = new Hono()
app.get('/search', async (c) => {
  const { q } = c.req.query()
  const url = `http://api.duckduckgo.com/?q=${q}&format=json`
  const res = await axios.get(url)
  return c.json(res.data)
})

console.log(`Server running at http://localhost:${PORT}`)
serve({
  fetch: app.fetch,
  port: PORT,
})
