const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const mainController = require("../controllers/mainController");

router.get('/cadastro',mainController.telaCadastro);

router.get('/cadastro-disciplina', mainController.telaCadastroDisciplina);
router.post('/disciplinas/cadastro', mainController.cadastrarDisciplina);
router.get('/disciplinas', mainController.telaListaDisciplinas);

router.post('/alunos/cadastro',mainController.cadastrarAluno);

router.get('/pre-requisito/:id',mainController.telaPreRequisito);

router.post("/pre-requisito/solicitar/:id", mainController.solicitarPrerequisito);

router.post("/pre-requisito/aprovar/:id", mainController.aprovarPrerequisito);


module.exports = router;