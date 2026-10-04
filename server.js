const express = require('express');
const path = require('path')

const app = express();

const PORT = 3001;

// app.get('/', (req, res) => {
//     res.send('Servidor funcionando!');
// });

//Abrindo a tela de Login Index.html
app.use(express.static(path.join(__dirname,'./frontend')));
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'./frontend/index.html'));
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});