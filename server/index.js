import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import categoryRoutes from './routes/categoryRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use('/api/health', healthRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`FM Soft API listening on http://localhost:${port}`)
})
