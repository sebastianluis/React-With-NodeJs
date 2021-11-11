const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createRecords = (req, res) => {
  for(let i=1; i < 4001; i++) {

    const product = {
        typeId: Math.floor((Math.random() * 4) + 1),
        name: 'Material '+ i,
        description: 'Material '+ i + ' description',
        status: 'Active'
      };
    
      // Save Tutorial in the database
      Product.create(product)
        .then(data => {
         
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });

  } 
  res.send("Done");
    
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: products } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, products, totalPages, currentPage };
  };

  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    var typeIdCond =  {typeId: [1,2,3,4] };
    var statusCond = {status: ['Active', 'Inactive'] };
    var titleCond = title ? { name: { [Op.like]: `%${title}%` } } : null;
    
    var condition = {...typeIdCond, ...statusCond, ...titleCond};
  
    const { limit, offset } = getPagination(page, size);
  
    // Product.findAndCountAll(
    //     { where: condition, 
    //         limit, offset,
    //         include: [
    //             {
    //               model: db.types 
    //             }
    //           ]
    //         })
    //   .then(data => {
    //     const response = getPagingData(data, page, limit);
    //     res.send(response);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving tutorials."
    //     });
    //   });

    Product.findAll(
        { where: condition, 
            include: [
                {
                  model: db.types 
                }
              ]
            })
      .then(data => {
        const response = data;
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.searchProducts = (req, res) => {
    const { page, size, title } = req.query;
    console.log(req.body);
    if(req.body && req.body.data) {
        var typeIdCond = req.body.data.filter.typeIds ?  { typeId: req.body.data.filter.typeIds }: null;
        var statusCond = req.body.data.filter.status ? {status: req.body.data.filter.status }: null;
        var titleCond = req.body.data.filter.searchTitle ? { name: { [Op.like]: `%${req.body.data.filter.searchTitle}%` } } : null;
    }
   
    var condition = {...typeIdCond, ...statusCond, ...titleCond};
    const { limit, offset } = getPagination(page, size);
  
    Product.findAll(
        { where: condition, 
            include: [
                {
                  model: db.types 
                }
              ]
            })
      .then(data => {
        const response = data;
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
