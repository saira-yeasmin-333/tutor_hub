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
        type: DataTypes.STRING
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
    location: {
        type: DataTypes.STRING
    },
    budget: {
        type: DataTypes.DOUBLE
    },
    class: {
        type: DataTypes.INTEGER
     }
  });

//   Account.hasMany(Post, { as: "posts" });
  Post.belongsTo(Account,{foreignKey:"student_id"})

  const syncAllTables=async ()=>{
    try{
        await Account.sync()
        console.log("Account table creation successful")
        await Post.sync()
        console.log("Post table creation successful")
    }catch(err){
        console.log('Error creating Tables')
        console.log(err)
    }
  }

  syncAllTables()

  module.exports={Post,Account}


  



  

  