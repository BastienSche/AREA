'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				primaryKey: true,
				unique: true,
				type: Sequelize.UUID
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			firstName: {
				allowNull: false,
				type: Sequelize.STRING
			},
			lastName: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING
			},
			role: {
				allowNull: false,
				type: Sequelize.STRING
			},
			discordData: {
				allowNull: true,
				type: Sequelize.JSON
			},
			facebookData: {
                allowNull: true,
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
		await queryInterface.dropTable('Users');
	}
};
