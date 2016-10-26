'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/beautydata');

sequelize
  .authenticate()
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
  productname: Sequelize.STRING,
  visible: Sequelize.STRING
});

const Color = sequelize.define('color', {
  colorname: Sequelize.STRING
});

//this adds attribute companyId to Product
Company.hasMany(Product);

Company.belongsTo(Product, {as: 'ProductNum', constraints: false });
//this adds attribute productId to Color
Product.hasMany(Color);

sequelize.sync({ force: true }).then(() => {  });


module.exports = { sequelize, Company, Product, Color };

