const Sequelize = require('sequelize');
const saveData = require('../save-data.js');

const sequelize = new Sequelize('beautydata', 'postgres',  {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authentication()
  .then(function(err){ console.log("Connection is successful for sequelize");
  })
  .catch(function(err){ console.log("Unable to connect - sequelize", err); });

const Company = sequelize.define('company', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyname: Sequelize.STRING,
  mainurl: Sequelize.STRING
});

const Product = sequelize.define('product', {
  productname: Sequelize.STRING
});

const Color = sequelize.define('color', {
  colorname: Sequelize.STRING
});


Company.hasMany(Product, { as: 'products'} );
Product.hasOne( Company, {as: 'company', foreignKey: 'companyid'} );

Product.hasMany(Color, { as: 'colors'} );
Color.hasOne( Product);

module.exports = function(data) {
  sequelize.sync({ logging: console.log, force: true }).then(() => {
    Company.bulkCreate(saveData.postgresql(data))
    .then(() => console.log('finished'));
  });

};