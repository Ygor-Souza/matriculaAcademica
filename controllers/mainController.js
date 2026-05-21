const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

async function telaCadastro(req, res) {
  const sucesso = req.query.sucesso === '1';
  const matriculaGerada = req.query.matricula || null;

  return res.render('cadastroAluno', {
    sucesso,
    erro: null,
    matriculaGerada
  });
}
async function cadastrarAluno(req, res) {
  try {
    const {
      nome,
      email,
      anoIngresso,
      semestreIngresso,
      semestreAtual,
      formando
    } = req.body;

    const semestre = Number(semestreIngresso);
    const ano = Number(anoIngresso);

    if (semestre !== 1 && semestre !== 2) {
      return res.render('cadastroAluno', {
        sucesso: false,
        erro: 'Semestre de ingresso inválido',
        matriculaGerada: null
      });
    }

    const alunoExistente = await require('../models/Aluno').findOne({
      where: { email }
    });

    if (alunoExistente) {
      return res.render('cadastroAluno', {
        sucesso: false,
        erro: 'Já existe aluno com este e-mail',
        matriculaGerada: null
      });
    }

    const Aluno = require('../models/Aluno');

    const ultimoAluno = await Aluno.findOne({
      order: [['id', 'DESC']]
    });

    const proximoNumero = ultimoAluno ? ultimoAluno.id + 1 : 1;
    const idFormatado = String(proximoNumero).padStart(4, '0');

    const matricula = `ADS${ano}${semestre}${idFormatado}`;

    await Aluno.create({
      nome,
      email,
      matricula,
      anoIngresso: ano,
      semestreIngresso: semestre,
      semestreAtual,
      formando: formando === 'true',
      statusMatricula: ano < 2020 ? 'TRANCADO' : 'ATIVO'
    });

    return res.redirect(`/cadastro?sucesso=1&matricula=${matricula}`);

  } catch (error) {
    console.log(error);

    return res.render('cadastroAluno', {
      sucesso: false,
      erro: 'Erro ao cadastrar aluno',
      matriculaGerada: null
    });
  }
}

module.exports = {
  telaCadastro,
  cadastrarAluno
};