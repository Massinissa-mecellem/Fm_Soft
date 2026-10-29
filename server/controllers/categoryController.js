import { createCategory, listCategories } from '../models/categoryModel.js'

export async function getCategories(_request, response, next) {
  try {
    response.json(await listCategories())
  } catch (error) {
    next(error)
  }
}

export async function postCategory(request, response, next) {
  try {
    response.status(201).json(await createCategory(request.body))
  } catch (error) {
    next(error)
  }
}
