var fs        = require('fs'),
    path      = require('path'),
    // Promise   = require('bluebird'),
    Sequelize = require('sequelize'),
    config    = require(path.join(__dirname, '..', 'config')),
    opts      = {},
    db        = {};

if(config.env === 'production') opts.logging = false;
sequelize = new Sequelize(config.db, opts);

//Loads all models into db
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

//Executes associations
Object.keys(db).forEach(function(modelName) {
  if("associate" in db[modelName]) db[modelName].associate(db);
});

function setupRoles() {
  return Promise.all([
    db.Role.findOrCreate({ where: { name: 'ADMIN' } }),
    db.Role.findOrCreate({ where: { name: 'USER' } })
  ]);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.setupRoles = setupRoles;

module.exports = db;
