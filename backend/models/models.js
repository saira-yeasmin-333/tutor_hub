
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

const Teacher = sq.define("teacher", {
  teacher_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  onlineMedia: {
    type: DataTypes.BOOLEAN
  },
  physicalMedia: {
    type: DataTypes.BOOLEAN
  },
  budget: {
    type: DataTypes.INTEGER
  },
  account_id: {
    type: DataTypes.INTEGER,
  }
})

const Student = sq.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

const Review = sq.define("review", {
  review_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.DOUBLE,
  },
  review_text: {
    type: DataTypes.STRING,
  },
  timestamp: {
    type: DataTypes.INTEGER,
  },
})

const Subject = sq.define("subject", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sub_name: {
    type: DataTypes.STRING

  }
})

const Efficiency = sq.define("efficiency", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  teacher_account_id: {
    type: DataTypes.INTEGER,
  },
  subject_id: {
    type: DataTypes.INTEGER,
  }
})

//   Account.hasMany(Post, { as: "posts" });
Post.belongsTo(Account, { foreignKey: "student_id" })

PreferredLocation.belongsTo(Account,{foreignKey:"tutor_id"})

Review.belongsTo(Teacher, { foreignKey: "teacher_id" })

Post.belongsTo(Student, { foreignKey: "student_id" })

Efficiency.belongsTo(Teacher, { foreignKey: "teacher_account_id" })
Efficiency.belongsTo(Subject, { foreignKey: "subject_id" })

Teacher.belongsTo(Account, { foreignKey: "account_id" })
Student.belongsTo(Account, { foreignKey: "account_id" })
const syncAllTables = async () => {
  try {
    await Account.sync()
    console.log("Account table creation successful")
    await Teacher.sync()
    console.log("Teacher table creation successful")
    await Student.sync()
    console.log("Student table creation successful")
    await Post.sync()
    console.log("Post table creation successful")
    await Subject.sync()
    console.log("Subject table creation successful")
    await Efficiency.sync()
    console.log("Efficiency table creation successful")
    await Review.sync()
    console.log("Review table creation successful")
    await PreferredLocation.sync()
    console.log("location table creation successful")
  } catch (err) {
    console.log('Error creating Tables')
    console.log(err)
  }
}

syncAllTables()

module.exports = { Post, Account, Teacher, Student, Subject, Efficiency ,Review,PreferredLocation}