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
    address: {
      type:DataTypes.STRING
    },
    platform:{
      type:DataTypes.STRING
    }
    
  });


  const PostSubject = sq.define("PostSubject", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  });

  const TeacherHasApplied = sq.define("TeacherHasApplied", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
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

const Grade = sq.define("grade", {
  grade_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  student_id: {
    type: DataTypes.INTEGER,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
  },
  mark_received: {
    type: DataTypes.DOUBLE,
  },
  total_marks: {
    type: DataTypes.DOUBLE,
  },
  subject_id: {
    type: DataTypes.INTEGER,
  },
  timestamp: {
    type: DataTypes.INTEGER,
  },
  timestamp_of_exam: {
    type: DataTypes.INTEGER,
  },
  submit_for_review: {
    type: DataTypes.STRING,
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

const Notification = sq.define("notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  from: {
    type: DataTypes.INTEGER
  },
  to: {
    type: DataTypes.INTEGER
  },
  message:{
    type:DataTypes.STRING
  },
  is_read:{
    type:DataTypes.BOOLEAN
  },
  timestamp:{
    type:DataTypes.INTEGER
  }
})

const Efficiency = sq.define("efficiency", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
})

const Request=sq.define('request',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  timestamp:{
    type: DataTypes.INTEGER
  },
  from: {
    type: DataTypes.INTEGER
  },
  to: {
    type: DataTypes.INTEGER
  },
  status:{
    type:DataTypes.STRING
  }
})

const Planner=sq.define('planner',{
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  plan:{
    type:DataTypes.JSON
  }
})

//   Account.hasMany(Post, { as: "posts" });
Post.belongsTo(Account, { foreignKey: "student_id" })
Post.belongsToMany(Subject, { through: 'PostSubject' });
Subject.belongsToMany(Post, { through: 'PostSubject' });


//online 1805041
Post.belongsToMany(Teacher, { through: 'TeacherHasApplied' });
Teacher.belongsToMany(Post, { through: 'TeacherHasApplied' });

Teacher.belongsTo(Account, { foreignKey: 'account_id' });
Account.hasOne(Teacher, { foreignKey: 'account_id' });

Teacher.belongsToMany(Subject,{through:"efficiency"})
Subject.belongsToMany(Teacher, { through: 'efficiency' });

PreferredLocation.belongsTo(Teacher,{foreignKey:"tutor_id"})
Teacher.hasMany(PreferredLocation,{foreignKey:"tutor_id"})

Review.belongsTo(Teacher, { foreignKey: "teacher_id" })
Review.belongsTo(Account, { foreignKey: "student_id" })

Grade.belongsTo(Account, { foreignKey: "student_id" })
Grade.belongsTo(Account, { foreignKey: "teacher_id" })
Grade.belongsTo(Subject, { foreignKey: "subject_id" })

Teacher.belongsTo(Account, { foreignKey: "account_id" })
Student.belongsTo(Account, { foreignKey: "account_id" })

Notification.belongsTo(Account,{foreignKey:"from"})
Notification.belongsTo(Account,{foreignKey:"to"})

Request.belongsTo(Account,{foreignKey:"from"})
Request.belongsTo(Account,{foreignKey:"to"})

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
    await PostSubject.sync()
    console.log("post subject table creation successful")
    await TeacherHasApplied.sync()
    console.log("teacher has applied table creation successful")
    await Efficiency.sync()
    console.log("Efficiency table creation successful")
    await Review.sync()
    console.log("Review table creation successful")
    await Grade.sync()
    console.log("Grade table creation successful")
    await PreferredLocation.sync()
    console.log("location table creation successful")
    await Notification.sync()
    console.log("notification table creation successful")
    await Request.sync()
    console.log("request table creation successful")
    await Planner.sync()
    console.log("planner table creation successful")
  } catch (err) {
    console.log('Error creating Tables')
    console.log(err)
  }
}

syncAllTables()


module.exports = { Post, Account, Teacher, Student, Subject, Grade,
  Efficiency ,Review,PreferredLocation,Notification,Request,TeacherHasApplied,Planner}

