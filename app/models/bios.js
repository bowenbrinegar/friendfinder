module.exports = function (sequelize, DataTypes) {
  var Bios = sequelize.define('Bios', {
    bio: {
      type: DataTypes.TEXT
	},
	college: {
      type: DataTypes.STRING
	},
	work: {
      type: DataTypes.STRING
	},
	age: {
      type: DataTypes.INTEGER
	},
	sex: {
      type: DataTypes.ENUM,
	  values: ['male', 'female', 'neutral']
	},
	lookingFor: {
      type: DataTypes.ENUM,
	  values: ['male', 'female', 'both']
	}
  })

  Bios.associate = models => {
    models.Bios.belongsTo(models.Users, {
      foriegnKey: {
        allowNull: false
	  }
	})
  }

  return Bios
}