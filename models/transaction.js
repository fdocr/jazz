module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    title: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    },
    cost: {
      type: DataTypes.INTEGER,
      notNull: true,
      isInt: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.User);
        Transaction.belongsTo(models.Category);
      }
    }
  });

  return Transaction;
};
