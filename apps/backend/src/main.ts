import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import axios from "axios";
import {cors} from 'hono/cors'

const PORT = 8787

const app = new Hono()

app.use(cors())

// add log middleware
app.use(async (c, next) => {
  console.log(`<-- ${c.req.method} ${c.req.url}`)
  await next()
})


app.get('/search', async (c) => {
  const {q} = c.req.query()
  if (!q) {
    return c.json({
      data: null
    })
  }

  const url = `http://api.duckduckgo.com`
  const res = await axios.get(url, {
    params: {
      format: 'json',
      q,
    }
  })

  return c.json({
    data: res.data
  })
})

console.log(`Server running at http://localhost:${PORT}`)
serve({
  fetch: app.fetch,
  port: PORT,
})
