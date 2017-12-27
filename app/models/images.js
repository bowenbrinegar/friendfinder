module.exports = function(sequelize, DataTypes) {
	var Images = sequelize.define('Images', {
		path: {
			type: DataTypes.TEXT
		}
	});

	Images.associate = models => {
		models.Images.belongsTo(models.Users, {
			foriegnKey: {
				allowNull: false
			}
		})
	}

	return Images
}