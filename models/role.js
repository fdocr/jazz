module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      notEmpty: true
    }
  });

  return Role;
};
