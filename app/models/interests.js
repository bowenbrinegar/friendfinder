module.exports = function (sequelize, DataTypes) {
  var Interests = sequelize.define('Interests', {
    interest: {
	  	type: DataTypes.STRING
    }
  });

  Interests.associate = models => {
    models.Interests.belongsTo(models.Users, {
      onDelete: 'CASCADE'
    })
  }

  return Interests
};
