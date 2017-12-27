module.exports = function (sequelize, DataTypes) {
  var Interests = sequelize.define('Interests', {
    interest: {
	  	type: DataTypes.STRING
    }
  });

  Interests.associate = models => {
    models.Interests.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
	  }
    })
  }

  return Interests
};
