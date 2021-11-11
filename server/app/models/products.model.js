
module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'types',
                key: 'id'
            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return products;
  };