const { Model } = require('sequelize');
const randtoken = require('rand-token');
const uuid = require('uuid').v4;

module.exports = (sequelize, DataTypes) => {
	class RefreshToken extends Model {
		static associate(models) {
			// define association here
		}
	};

	RefreshToken.init({
		token: DataTypes.STRING,
		expiryDate: DataTypes.STRING,
		owner: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'RefreshToken',
	});
	
	RefreshToken.createToken = async function(owner) {
		let expiredAt = new Date();

		expiredAt.setSeconds(expiredAt.getSeconds() + 1000 * 60 * 60 * 24 * 7); // 1 week
		
		let token = randtoken.uid(255);
		let refreshToken = await this.create({
			id: uuid(),
			token: token,
			owner: owner,
		  	expiryDate: expiredAt.toISOString()
		});
		return refreshToken.token;
	}

	RefreshToken.verifyExpiration = async function(token) {
		return (Date.parse(token.expiryDate) < new Date().getTime())
	};

	return RefreshToken;
};