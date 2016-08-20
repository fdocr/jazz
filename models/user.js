module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(42),
      notNull: true,
      notEmpty: true,
      len: [3, 42]
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      isEmail: true,
      len: [3, 42]
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Role);
      }
    }
  });

  return User;
};
