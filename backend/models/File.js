module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return File;
  };
  