'use strict';
const { Model } = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {

		static associate(models) {
			// define association here
		}
	};

	User.init({
		password: DataTypes.STRING,
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		role: DataTypes.STRING,
		discordData: DataTypes.JSON,
		facebookData: DataTypes.JSON
	}, {
		sequelize,
		modelName: 'User',
	});
	
	User.prototype.comparePassword = async function(passw, cb) {
		bcrypt.compare(passw, this.password, function (err, isMatch) {
			if (err)
				return cb(err); 
			cb(false, isMatch);
		});
	}

	User.beforeSave((user, options) => {
		if (user.changed('password'))
			user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});

	return User;
};