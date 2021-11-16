module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", product.createRecords);
    router.get("/", product.findAll);
    router.post("/search", product.searchProducts);

  
    app.use('/api/product', router);
  };
  