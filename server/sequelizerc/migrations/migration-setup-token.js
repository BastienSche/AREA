'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('RefreshTokens', {
			id: {
				primaryKey: true,
				unique: true,
				type: Sequelize.UUID
			},
			token: {
				allowNull: false,
				type: Sequelize.STRING
			},
			owner: {
				allowNull: false,
				type: Sequelize.UUID
			},
			expiryDate: {
				allowNull: false,
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('RefreshTokens');
	}
};
