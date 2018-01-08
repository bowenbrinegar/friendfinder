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
	  defaultValue: 'inactive'
    }
  })

  Users.associate = models => {
    models.Users.hasMany(models.Likes, {
      foriegnKey: {
        allowNull: false
      }
    })

    models.Users.hasMany(models.Matches, {
      foriegnKey: {
        allowNull: false
      }
    })

    models.Users.hasMany(models.Interests, {
      foriegnKey: {
        allowNull: false
      }
    })

    models.Users.hasMany(models.Images, {
      foriegnKey: {
        allowNull: false
      }
    })

    models.Users.hasOne(models.Bios, {
      onDelete: 'CASCADE'
    })
  }

  return Users
}
