const { sq } = require("../repository/database");
const { DataTypes } = require("sequelize");

const Account = sq.define("account", {
    account_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
  });

  const Post = sq.define("post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    timestamp: {
        type: DataTypes.INTEGER
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
    budget: {
        type: DataTypes.DOUBLE
    },
    class: {
        type: DataTypes.INTEGER
     },
    
  });

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
    tutor_id: {
        type: DataTypes.INTEGER
    },
    
  });

//   Account.hasMany(Post, { as: "posts" });
  Post.belongsTo(Account,{foreignKey:"student_id"})
  PreferredLocation.belongsTo(Account,{foreignKey:"tutor_id"})

  const syncAllTables=async ()=>{
    try{
        await Account.sync()
        console.log("Account table creation successful")
        await Post.sync()
        console.log("Post table creation successful")
        await PreferredLocation.sync()
        console.log("location table creation successful")
    }catch(err){
        console.log('Error creating Tables')
        console.log(err)
    }
  }

  syncAllTables()

  module.exports={Post,Account,PreferredLocation}


  



  

  