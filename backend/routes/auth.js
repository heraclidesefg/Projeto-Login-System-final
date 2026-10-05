const express = require("express");
const router = express.Router();

const fs = require("fs-extra");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const DB = path.join(__dirname, "../database/users.json");

// ========================================
// ROTA DE REGISTRO
// ========================================

router.post("/register", async (req, res) => {
    try {

        const { nome, email, senha } = req.body;

        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        // Lê os usuários cadastrados
        const users = await fs.readJson(DB).catch(() => []);

        // Verifica se o email já existe
        const existe = users.find(
            (u) => u.email === email
        );

        if (existe) {
            return res.status(400).json({
                message: "Email já cadastrado."
            });
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria o novo usuário
        users.push({
            id: Date.now(),
            nome,
            email,
            senha: senhaHash
        });

        // Salva no arquivo JSON
        await fs.writeJson(DB, users, {
            spaces: 2
        });

        return res.json({
            message: "Usuário criado com sucesso."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro no servidor ao registrar."
        });
    }
});


// ========================================
// ROTA DE LOGIN
// ========================================

router.post("/login", async (req, res) => {
    try {

        const { email, senha } = req.body;

        // ----------------------------------------
        // 1. Validação dos campos
        // ----------------------------------------

        if (!email && !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Preencha o campo email."
            });
        }

        if (!senha) {
            return res.status(400).json({
                message: "Preencha sua senha."
            });
        }


        // ----------------------------------------
        // 2. Lê os usuários
        // ----------------------------------------

        const users = await fs.readJson(DB).catch(() => []);


        // ----------------------------------------
        // 3. Procura o usuário
        // ----------------------------------------

        const usuario = users.find(
            (u) => u.email === email
        );

        if (!usuario) {
            return res.status(401).json({
                message: "Email não cadastrado."
            });
        }


        // ----------------------------------------
        // 4. Compara a senha
        // ----------------------------------------

        const ok = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!ok) {
            return res.status(401).json({
                message: "Senha inválida."
            });
        }


        // ----------------------------------------
        // 5. Gera o JWT
        // ----------------------------------------

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome
            },
            "segredo123",
            {
                expiresIn: "8h"
            }
        );


        // ----------------------------------------
        // 6. Retorna os dados para o frontend
        // ----------------------------------------

        return res.json({

            message: "Login realizado com sucesso.",

            token: token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro no servidor ao realizar login."
        });
    }
});


module.exports = router;