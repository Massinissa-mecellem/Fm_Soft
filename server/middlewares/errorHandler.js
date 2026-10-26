export function errorHandler(error, _request, response, _next) {
  console.error('API error:', error)

  if (error.code === '23503') {
    return response.status(400).json({ error: 'La catégorie indiquée n’existe pas.' })
  }

  if (error.code === '23505') {
    return response.status(409).json({ error: 'Cette valeur existe déjà.' })
  }

  response.status(500).json({ error: 'Une erreur interne est survenue.' })
}
