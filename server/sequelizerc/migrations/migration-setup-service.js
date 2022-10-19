'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Services', {
			id: {
				primaryKey: true,
				unique: true,
				type: Sequelize.UUID
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			actions: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.JSON)
			},
			reactions: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.JSON)
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
		await queryInterface.dropTable('Services');
	}
};
