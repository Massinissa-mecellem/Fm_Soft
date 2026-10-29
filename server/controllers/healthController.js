import { getDatabaseHealth } from '../models/healthModel.js'

export async function getHealth(_request, response, next) {
  try {
    const health = await getDatabaseHealth()
    response.json({ status: 'ok', database: 'connected', ...health })
  } catch (error) {
    next(error)
  }
}
