module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
	  notEmpty: true
    },
    email: {
	  type: DataTypes.STRING,
	  validate: {
        isEmail: true
	  }
    },
    password: {
	  type: DataTypes.STRING,
	  allowNull: false
    },
    status: {
	  type: DataTypes.ENUM('active', 'inactive'),
	  defaultValue: 'active'
    }
  })

  Users.associate = models => {
    models.Users.hasMany(models.Likes, {
      onDelete: 'CASCADE'
    })

    models.Users.hasMany(models.Matches, {
      onDelete: 'CASCADE'
    })

    models.Users.hasMany(models.Interests, {
      onDelete: 'CASCADE'
    })

    models.Users.hasMany(models.Images, {
      onDelete: 'CASCADE'
    })

    models.Users.hasOne(models.Bios, {
      onDelete: 'CASCADE'
    })
  }

  return Users
}
