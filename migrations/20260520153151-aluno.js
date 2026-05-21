'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      'Alunos',
      {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },

        matricula: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },

        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },

        statusMatricula: {
          type: Sequelize.ENUM(
            'ATIVO',
            'TRANCADO'
          ),
          allowNull: false,
          defaultValue: 'ATIVO'
        },

        status_pre_requisito: {
          type: Sequelize.ENUM(
            'nenhum',
            'aprovado',
            'pendente'
          ),
          allowNull: false,
          defaultValue: 'nenhum'
        },

        semestreAtual: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },

        formando: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }

      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable(
      'Alunos'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Alunos_statusMatricula";'
    );

  }

};