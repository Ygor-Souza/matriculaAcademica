const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const mainController = require("../controllers/mainController");

router.get('/cadastro',mainController.telaCadastro);

router.post('/alunos/cadastro',mainController.cadastrarAluno);


module.exports = router;