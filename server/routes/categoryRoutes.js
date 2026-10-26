import { Router } from 'express'
import { getCategories, postCategory } from '../controllers/categoryController.js'
import { validateCategory } from '../middlewares/validation.js'

const router = Router()

router.get('/', getCategories)
router.post('/', validateCategory, postCategory)

export default router
