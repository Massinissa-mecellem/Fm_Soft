import { Router } from 'express'
import { getProducts, postProduct } from '../controllers/productController.js'
import { validateProduct } from '../middlewares/validation.js'

const router = Router()

router.get('/', getProducts)
router.post('/', validateProduct, postProduct)

export default router
