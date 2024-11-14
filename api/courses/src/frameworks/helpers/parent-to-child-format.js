const _ = require('lodash')

// module.exports = async (repository, ids) => {
//   var finalData = []

//   const innerRecursive = async (searchData = [], data = []) => {
//     console.log('final data', finalData)

//     finalData.push(data.filter(d=>d.parentId === null))

//     // remove null values
//     searchData = searchData.filter((item) => item !== null)

//     // remove duplicate values
//     searchData = [...new Set(searchData)]

//     const lox = []

//     const dataQry = await repository.findAll({ id: searchData })

//     dataQry.forEach((x) => {
//       let tempX = x
//       if (data[x.id]) tempX.child = data[x.id]

//       if (x.parentId === null) return finalData.push(tempX)

//       lox.push(tempX)
//     })

//     const qryParentIds = _.map()

//     if (qryParentIds.length > 0)
//       await innerRecursive(qryParentIds, _.groupBy(lox, 'parentId'))
//   }

//   const data = await repository.findAll({ query: {id: ids} })

//   const test = _.groupBy(data.filter(d=> d.parentId !== null), 'parentId')

//   finalData.push(data.filter(d=>d.parentId === null))

//   console.log(_.keys(test), test)

//   return finalData
// }

const abc = async (repository, dataa, key) => {
  const arr = []
  const tempArr = []

  const parentNullData = key ? dataa?.filter((d) => _.get(d, key) === null) : []
  const perentNotNullData = key
    ? dataa.filter((d) => _.get(d, key) !== null)
    : []

  arr.push(...parentNullData)

  if (Array.isArray(perentNotNullData) && perentNotNullData?.length) {
    const sureKey = key ? _.last(key?.split('.')) : null

    const groupByParentKey = key ? _.groupBy(perentNotNullData, key) : null

    for (const key in groupByParentKey) {
      const parentData = key ? await repository.findOne({ id: key }) : null

      const rawParentData = parentData?.get({ plain: true })

      rawParentData.subjects = key ? groupByParentKey[key] : null

      tempArr.push(rawParentData)
    }

    arr.push(...(await abc(repository, tempArr, sureKey)))
  }

  return arr
}

module.exports = abc
