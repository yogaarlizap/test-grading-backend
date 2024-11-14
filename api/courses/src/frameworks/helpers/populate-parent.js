const _ = require('lodash')

const populateParent = async (parentIds, repository) => {
  // remove null values
  arr = parentIds.filter((item) => item !== null)

  // remove duplicate values
  arr = [...new Set(arr)]

  const data = await repository.findAll({query: {id: arr}})
  
  const parentIds2 = _.map(data, 'parentId')
  
  if (Array.isArray(parentIds2) && parentIds2.length === 0) {
    return data
  } else {
    const parents = await populateParent(parentIds2, repository)

    return data.map((d) => ({
      ...d.get(),
      parent: parents.find((df) => df.id === d.parentId)
    }))
  }
}

module.exports = populateParent
