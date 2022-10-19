const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Area extends Model {

		static associate(models) {
			// define association here
		}
	};

	Area.init({
		title: DataTypes.STRING,
		status: DataTypes.STRING,
		owner: DataTypes.UUID,
		action: DataTypes.JSON,
		reaction: DataTypes.JSON
	}, {
		sequelize,
		modelName: 'Area',
	});

	return Area;
};