const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

async function telaCadastro(req, res){

  return res.render(
    'cadastroAluno',
    {
      sucesso:false,
      erro:null,
      matriculaGerada:null
    }
  );

}
async function cadastrarAluno(req, res){

  try{

    const {
      nome,
      email,
      anoIngresso,
      semestreIngresso,
      semestreAtual,
      formando
    } = req.body;

    // Validar semestre de ingresso
    if(
      semestreIngresso != 1 &&
      semestreIngresso != 2
    ){

      return res.render(
        'cadastroAluno',
        {
          sucesso:false,
          erro:'Semestre de ingresso inválido'
        }
      );

    }

    // Buscar último aluno cadastrado
    const ultimoAluno = await Aluno.findOne({
      order:[
        ['id', 'DESC']
      ]
    });

    // Gerar próximo número
    let proximoNumero = 1;

    if(ultimoAluno){

      proximoNumero =
        ultimoAluno.id + 1;

    }

    // Formatar ID
    const idFormatado =
      String(proximoNumero)
      .padStart(4, '0');

    // Gerar matrícula
    const matricula =
      `ADS${anoIngresso}${semestreIngresso}${idFormatado}`;

    // Definir status automaticamente
    let statusMatricula = 'ATIVO';

    if(Number(anoIngresso) < 2020){

      statusMatricula = 'TRANCADO';

    }

    // Criar aluno
    await Aluno.create({

      nome,
      matricula,
      email,
      statusMatricula,

      anoIngresso,
      semestreIngresso,
      semestreAtual,

      formando:
        formando === 'true'

    });

    return res.render(
      'cadastroAluno',
      {
        sucesso:true,
        matriculaGerada:matricula
      }
    );

  }catch(error){

    console.log(error);

    return res.render(
      'cadastroAluno',
      {
        sucesso:false,
        erro:'Erro ao cadastrar aluno'
      }
    );

  }

}
module.exports = {
  telaCadastro,
  cadastrarAluno
};