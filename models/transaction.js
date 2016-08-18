module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    title: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.User);
        Transaction.hasOne(models.Category);
      }
    }
  });

  return Transaction;
};
