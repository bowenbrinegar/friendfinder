module.exports = function(sequelize, DataTypes) {
	var Images = sequelize.define('Images', {
		img: {
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