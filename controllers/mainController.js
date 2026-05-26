const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");
const Disciplina = require("../models/Disciplina");
const Matricula = require("../models/Matricula");

async function telaCadastro(req, res) {
  const sucesso = req.query.sucesso === '1';
  const matriculaGerada = req.query.matricula || null;

  return res.render('cadastroAluno', {
    sucesso,
    erro: null,
    matriculaGerada
  });
}

async function telaCadastroMatricula(req, res) {
  const sucesso = req.query.sucesso === '1';
  const erro = req.query.erro || null;

  const alunos = await Aluno.findAll({
    order: [['nome', 'ASC']]
  });

  const disciplinas = await Disciplina.findAll({
    order: [['semestre', 'ASC'], ['nome', 'ASC']]
  });

  return res.render('cadastroMatricula', {
    sucesso,
    erro,
    alunos,
    disciplinas,
    matriculaCadastrada: null
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

async function telaPreRequisito(req, res){

  try {

    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).send("Aluno não encontrado");
    }

    return res.render(
      'preRequisito',
      {
        aluno
      }
    );

  } catch(error){

    console.log(error);

    return res.status(500).send(
      "Erro ao carregar tela de pré-requisito"
    );

  }

}

async function telaCadastroDisciplina(req, res) {
  try {
    const sucesso = req.query.sucesso === '1';
    const erro = req.query.erro || null;

    return res.render('cadastroDisciplina', {
      sucesso,
      erro
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao carregar tela de cadastro de disciplina');
  }
}

async function cadastrarDisciplina(req, res) {
  try {
    const { nome, cargaHoraria, semestre } = req.body;

    const Disciplina = require('../models/Disciplina');

    await Disciplina.create({
      nome,
      cargaHoraria,
      semestre: Number(semestre)
    });

    return res.redirect('/disciplinas?sucesso=1');
  } catch (error) {
    console.error(error);
    return res.render('cadastroDisciplina', {
      sucesso: false,
      erro: 'Erro ao cadastrar disciplina'
    });
  }
}

async function telaListaDisciplinas(req, res) {
  try {
    const Disciplina = require('../models/Disciplina');

    const disciplinas = await Disciplina.findAll({ order: [['id', 'ASC']] });

    const sucesso = req.query.sucesso === '1';
    const erro = req.query.erro || null;

    return res.render('listaDisciplinas', {
      disciplinas,
      sucesso,
      erro
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao listar disciplinas');
  }
}

async function solicitarPrerequisito(req, res) {
    try {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);

        if (!aluno) {
            return res.status(404).send("Aluno não encontrado.");
        }

        if (!aluno.formando) {
            return res.status(403).send(
                "Somente alunos formandos podem solicitar quebra de pré-requisito."
            );
        }

        await Aluno.update(
            {
                status_pre_requisito: "pendente"
            },
            {
                where: { id }
            }
        );

        return res.redirect(`/pre-requisito/${id}`);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Erro ao solicitar.");
    }
}

async function salvarMatricula(req, res) {
  try {
    const { alunoId, disciplinaId } = req.body;

    const aluno = await Aluno.findByPk(alunoId);

    if (!aluno) {
      return res.redirect('/cadastro-matricula?erro=Aluno não encontrado');
    }

    if (aluno.statusMatricula !== 'ATIVO') {
      return res.redirect('/cadastro-matricula?erro=Aluno não está ativo');
    }

    const disciplina = await Disciplina.findByPk(disciplinaId);

    if (!disciplina) {
      return res.redirect('/cadastro-matricula?erro=Disciplina não encontrada');
    }

    const semestrePermitido = aluno.semestreAtual + 1;

    if (disciplina.semestre !== semestrePermitido) {
      return res.redirect(
        `/cadastro-matricula?erro=Aluno está no ${aluno.semestreAtual}º semestre e só pode se matricular em disciplinas do ${semestrePermitido}º semestre`
      );
    }

    const matriculaExistente = await Matricula.findOne({
      where: {
        alunoId,
        disciplinaId
      }
    });

    if (matriculaExistente) {
      return res.redirect('/cadastro-matricula?erro=Aluno já está matriculado nessa disciplina');
    }

    await Matricula.create({
      alunoId,
      disciplinaId
    });

    return res.redirect('/cadastro-matricula?sucesso=1');

  } catch (error) {
    console.error(error);

    return res.redirect('/cadastro-matricula?erro=Erro ao salvar matrícula');
  }
}

async function listaAlunosPreRequisito(req, res) {
  const alunos = await Aluno.findAll({
    order: [['nome', 'ASC']]
  });

  return res.render('listaAlunosPreRequisito', {
    alunos
  });
}



module.exports = {
  telaCadastro,
  cadastrarAluno,
  telaPreRequisito,
  telaCadastroDisciplina,
  cadastrarDisciplina,
  telaListaDisciplinas,
  solicitarPrerequisito,
  telaCadastroMatricula,
  salvarMatricula,
  listaAlunosPreRequisito
  
};