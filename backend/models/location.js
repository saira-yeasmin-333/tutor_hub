const { sq } = require("../repository/database");
const { DataTypes } = require("sequelize");
const {Account}=require('./models')

const PreferredLocation = sq.define("preferred_location", {
    latitude: {
        type: DataTypes.DOUBLE,
    },
    longitude: {
        type: DataTypes.DOUBLE,
    },
    address: {
        type: DataTypes.STRING,
    },
    radius: {
        type: DataTypes.INTEGER
    },
    
  });
  PreferredLocation.belongsTo(Account,{foreignKey:"tutor_id"})

  PreferredLocation.sync().catch(err=>{
    console.log('error inreting ')
    console.log(err)
  })

  module.exports={PreferredLocation}

  