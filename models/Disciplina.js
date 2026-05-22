const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Disciplina = sequelize.define(
  'Disciplina',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cargaHoraria: {
      type: DataTypes.STRING,
      allowNull: false
    },

    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'Disciplinas'
  }
);

Disciplina.associate = function (models) {};

module.exports = Disciplina;
