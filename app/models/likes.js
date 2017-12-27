
module.exports = function (sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
	likeId: {
	  type: DataTypes.INTEGER,
	  allowNull: false
	}
  });

  Likes.associate = models => {
    models.Likes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
	  }
    });
  }

  return Likes
}
