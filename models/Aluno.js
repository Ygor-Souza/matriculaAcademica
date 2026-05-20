const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

  const Aluno = sequelize.define(
    'Aluno',
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

      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      statusMatricula: {
        type: DataTypes.ENUM(
          'ATIVO',
          'TRANCADO'
        ),
        allowNull: false,
        defaultValue: 'ATIVO'
      },

      semestreAtual: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },

      formando: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }

    },
    {
      tableName: 'Alunos'
    }
  );

  //Associações
  Aluno.associate = function(models){

  };

module.exports = Aluno;