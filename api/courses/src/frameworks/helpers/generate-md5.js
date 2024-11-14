const crypto = require("crypto");
const generateMd5 = (params) => {
  return crypto.createHash("md5").update(params).digest("hex");
};

module.exports = generateMd5;
