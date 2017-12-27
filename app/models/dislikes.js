module.exports = function (sequelize, DataTypes) {
  var Dislikes = sequelize.define('Dislikes', {
	dislikeId: {
	  type: DataTypes.INTEGER,
	  allowNull: false
	}
  });

  Dislikes.associate = models => {
    models.Dislikes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
	  }
	});
  }

  return Dislikes
}

