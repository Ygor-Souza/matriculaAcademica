'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matriculas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      alunoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Alunos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      disciplinaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Disciplinas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      status: {
        type: Sequelize.ENUM('MATRICULADO', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'MATRICULADO'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('Matriculas', {
      fields: ['alunoId', 'disciplinaId'],
      type: 'unique',
      name: 'unique_matricula_aluno_disciplina'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matriculas');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Matriculas_status";'
    );
  }
};