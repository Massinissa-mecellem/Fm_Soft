import { createProduct, listProducts } from '../models/productModel.js'

export async function getProducts(_request, response, next) {
  try {
    response.json(await listProducts())
  } catch (error) {
    next(error)
  }
}

export async function postProduct(request, response, next) {
  try {
    response.status(201).json(await createProduct(request.product))
  } catch (error) {
    next(error)
  }
}
