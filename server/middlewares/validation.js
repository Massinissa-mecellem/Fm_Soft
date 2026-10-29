export function validateCategory(request, response, next) {
  const { nom } = request.body

  if (!nom || !String(nom).trim()) {
    return response.status(400).json({ error: 'Le nom de la catégorie est obligatoire.' })
  }

  request.body.nom = String(nom).trim()
  next()
}

export function validateProduct(request, response, next) {
  const { nom, name, type, quantite, prix, id_categorie, categorie_id } = request.body
  const productName = nom || name
  const categoryIdInput = id_categorie || categorie_id

  if (!productName || !type || quantite === undefined || prix === undefined || !categoryIdInput) {
    return response.status(400).json({
      error: 'Les champs nom, type, quantite, prix et id_categorie sont obligatoires.'
    })
  }

  const quantity = Number(quantite)
  const price = Number(prix)
  const categoryId = Number(categoryIdInput)

  if (!Number.isInteger(quantity) || quantity < 0) {
    return response.status(400).json({ error: 'La quantité doit être un entier positif ou nul.' })
  }

  if (!Number.isFinite(price) || price < 0) {
    return response.status(400).json({ error: 'Le prix doit être un nombre positif ou nul.' })
  }

  if (!Number.isInteger(categoryId) || categoryId < 1) {
    return response.status(400).json({ error: 'id_categorie doit être un identifiant valide.' })
  }

  request.product = {
    name: String(productName).trim(),
    type: String(type).trim(),
    quantity,
    price,
    categoryId,
    description: request.body.description,
    image: request.body.image
  }
  next()
}
