const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Matricula = sequelize.define(
  'Matricula',
  {
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    disciplinaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('MATRICULADO', 'CANCELADO'),
      allowNull: false,
      defaultValue: 'MATRICULADO'
    }
  },
  {
    tableName: 'Matriculas'
  }
);

Matricula.associate = function (models) {
  Matricula.belongsTo(models.Aluno, {
    foreignKey: 'alunoId',
    as: 'aluno'
  });

  Matricula.belongsTo(models.Disciplina, {
    foreignKey: 'disciplinaId',
    as: 'disciplina'
  });
};

module.exports = Matricula;