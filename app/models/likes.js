
module.exports = function (sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
	likeId: {
	  type: DataTypes.INTEGER
	},
	status: {
	  type: DataTypes.ENUM,
      values: ['like', 'dislike']
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
