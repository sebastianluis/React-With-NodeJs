module.exports = app => {
    const productTypes = require("../controllers/product_types.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", productTypes.findAll);

    app.use('/api/types', router);
  };
  