'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      concluido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      companyId: { // Adicione a coluna companyId como uma chave estrangeira
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // Nome da tabela de empresas
          key: 'id', // Coluna na tabela de empresas que é a chave primária
        },
        onUpdate: 'CASCADE', // Ação a ser tomada quando a empresa associada é atualizada
        onDelete: 'CASCADE', // Ação a ser tomada quando a empresa associada é excluída
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Eventos');
  },
};
