module.exports = (sequelize, Sequelize) => {
    const types = sequelize.define("types", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    /*types.associate = function(models) {
        types.hasMany(models.products, {foreignKey: 'type_id'});

    }*/
  
    return types;
  };