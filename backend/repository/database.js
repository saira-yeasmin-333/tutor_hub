const Sequelize = require('sequelize');
const sequelize=  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  dialectOptions: {
  ssl: {
     require:true,
     rejectUnauthorized: false,
  }
  },
  operatorsAliases: false,
  logging:false
});

class Repository{
  constructor() {}
}

module.exports = { sq: sequelize,Repository };