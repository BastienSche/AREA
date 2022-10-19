const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Service extends Model {

		static associate(models) {
			// define association here
		}
	};

	Service.init({
		name: DataTypes.STRING,
		actions: DataTypes.ARRAY(DataTypes.JSON),
		reactions: DataTypes.ARRAY(DataTypes.JSON)
	}, {
		sequelize,
		modelName: 'Service',
	});

	return Service;
};