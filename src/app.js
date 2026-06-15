// Simulação do banco de dados usando o localStorage do navegador
const ARQUIVO_SIMULADO = "tarefas_db";

// Inicializa o banco simulado se não existir, igual ao seu fs.existsSync
if (!localStorage.getItem(ARQUIVO_SIMULADO)) {
    const tarefasIniciais = [
        { id: 1, titulo: "Estudar Docker para o Checkpoint 1", concluida: false },
        { id: 2, titulo: "Configurar as branches do Git", concluida: false }
    ];
    localStorage.setItem(ARQUIVO_SIMULADO, JSON.stringify(tarefasIniciais));
    console.log("🚀 ToDo App Iniciado com sucesso no navegador!");
}

// Elementos do DOM
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Função para listar/renderizar as tarefas (equivalente ao seu listarTarefas)
function listarTarefas() {
    const conteudo = localStorage.getItem(ARQUIVO_SIMULADO);
    const tarefas = JSON.parse(conteudo);
    
    // Limpa a lista antes de renderizar
    taskList.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.className = `task-item ${tarefa.concluida ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${tarefa.titulo}</span>
            <div class="task-actions">
                <button class="btn-check" onclick="alternarTarefa(${tarefa.id})">✔️</button>
                <button class="btn-delete" onclick="deletarTarefa(${tarefa.id})">❌</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });

    console.log("\n📋 --- LISTA ATUALIZADA NO FRONTEND ---");
    console.log(tarefas);
}

// Função para adicionar tarefa (equivalente ao seu adicionarTarefa)
function adicionarTarefa() {
    const titulo = taskInput.value.trim();
    
    if (titulo === "") {
        alert("Por favor, digite uma tarefa válida!");
        return;
    }

    const conteudo = localStorage.getItem(ARQUIVO_SIMULADO);
    const tarefas = JSON.parse(conteudo);

    tarefas.push({
        id: Date.now(),
        titulo: titulo,
        concluida: false
    });

    localStorage.setItem(ARQUIVO_SIMULADO, JSON.stringify(tarefas));
    console.log(`✅ Tarefa adicionada: "${titulo}"`);
    
    taskInput.value = ""; // Limpa o input
    listarTarefas(); // Atualiza a tela
}

// Função para alternar o status de concluída
function alternarTarefa(id) {
    const tarefas = JSON.parse(localStorage.getItem(ARQUIVO_SIMULADO));
    const tarefasAtualizadas = tarefas.map(t => {
        if (t.id === id) t.concluida = !t.concluida;
        return t;
    });
    localStorage.setItem(ARQUIVO_SIMULADO, JSON.stringify(tarefasAtualizadas));
    listarTarefas();
}

// Função para deletar uma tarefa
function deletarTarefa(id) {
    const tarefas = JSON.parse(localStorage.getItem(ARQUIVO_SIMULADO));
    const tarefasFiltradas = tarefas.filter(t => t.id !== id);
    localStorage.setItem(ARQUIVO_SIMULADO, JSON.stringify(tarefasFiltradas));
    listarTarefas();
}

// Event Listeners (Cliques e Teclado)
addBtn.addEventListener("click", adicionarTarefa);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa();
});

// Execução inicial ao carregar a página
listarTarefas();

// Mantém o console simulando o intervalo do seu container
setInterval(() => {
    console.log("⏱️ Front-end ativo e monitorando alterações...");
}, 60000);



