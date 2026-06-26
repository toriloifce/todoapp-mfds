const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

// Caminho do arquivo de dados dentro do contêiner (conforme o slide do professor)
const ARQUIVO = '/dados/tarefas.json';

// Garante que a pasta e o arquivo JSON existam no volume do Docker
if (!fs.existsSync('/dados')) {
    fs.mkdirSync('/dados', { recursive: true });
}
if (!fs.existsSync(ARQUIVO)) {
    fs.writeFileSync(ARQUIVO, '[]');
}

app.use(express.json());
// Serve os arquivos da sua pasta 'src' de forma estática
app.use(express.static(path.join(__dirname, 'src')));

// Rota da API: Listar tarefas
app.get('/api/tarefas', (req, res) => {
    const conteudo = fs.readFileSync(ARQUIVO, 'utf-8');
    res.json(JSON.parse(conteudo));
});

// Rota da API: Adicionar tarefa
app.post('/api/tarefas', (req, res) => {
    const { titulo } = req.body;
    const conteudo = fs.readFileSync(ARQUIVO, 'utf-8');
    const tarefas = JSON.parse(conteudo);
    
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        concluida: false
    };
    
    tarefas.push(novaTarefa);
    fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
    res.status(201).json(novaTarefa);
});

// Rota da API: Alternar status (Concluída / Pendente)
app.put('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const conteudo = fs.readFileSync(ARQUIVO, 'utf-8');
    let tarefas = JSON.parse(conteudo);
    
    tarefas = tarefas.map(t => {
        if (t.id === id) t.concluida = !t.concluida;
        return t;
    });
    
    fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
    res.json({ success: true });
});

// Rota da API: Deletar tarefa
app.delete('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const conteudo = fs.readFileSync(ARQUIVO, 'utf-8');
    let tarefas = JSON.parse(conteudo);
    
    tarefas = tarefas.filter(t => t.id !== id);
    fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}. Dados salvos em ${ARQUIVO}`);
});