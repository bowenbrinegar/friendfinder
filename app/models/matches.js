module.exports = function (sequelize, DataTypes) {
  var Matches = sequelize.define('Matches', {
	matchId: {
	  type: DataTypes.INTEGER,
	  allowNull: false
	}
  });

  Matches.associate = models => {
    models.Matches.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
	  }
	});
  }

  return Matches
}
