const resourcePagination = (page, perPage, total, data) => {
  const totalPages = Math.ceil(total / perPage)
  return {
    page: Number(page),
    perPage: Number(perPage),
    total,
    totalPages,
    data
  }
}

module.exports = resourcePagination
