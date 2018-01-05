module.exports = function(sequelize, DataTypes) {
  var Facebooks = sequelize.define('Facebooks', {
    id: {
      type: DataTypes.INTEGER
    },
    displayName: {
      type: DataTypes.STRING
    },
    photoUrl: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING
    }
  })

  Facebooks.associate = models => {
    models.Facebooks.belongsTo(models.Users, {
      foriegnKey: {
        allowNull: false
      }
    })
  }

  return Facebooks
}