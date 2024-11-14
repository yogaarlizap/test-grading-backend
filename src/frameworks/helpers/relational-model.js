module.exports = (withRelation, relname, cb) =>
  (withRelation.includes('*') || withRelation.includes(relname)) && cb()
