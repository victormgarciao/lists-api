import express from 'express'
import listsRouter from './routes/lists'

const app = express()
app.use(express.json()) // middleware which transforms req.body to json

const PORT = 4000

app.get('/ping', (_, res) => {
  console.log('someone pinged here!!')
  res.send('pong')
})

app.use('/api/lists', listsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
