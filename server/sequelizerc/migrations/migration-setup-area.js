'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Areas', {
			id: {
				primaryKey: true,
				unique: true,
				type: Sequelize.UUID
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			owner: {
				allowNull: false,
				type: Sequelize.UUID
			},
			status: {
				allowNull: false,
				type: Sequelize.STRING
			},
			action: {
				allowNull: false,
				type: Sequelize.JSON
			},
			reaction: {
				allowNull: false,
				type: Sequelize.JSON
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
		await queryInterface.dropTable('Areas');
	}
};
