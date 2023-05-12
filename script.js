listarTarefas()

async function listarTarefas() {
    let response = await fetch("https://devexplorer-backend-production.up.railway.app/tarefas")
    let tarefas = await response.json()
    let listaDeTarefasEl = document.querySelector("#listaDeTarefas")
    listaDeTarefasEl.innerHTML = ""
    tarefas.forEach(function(tarefa) {
        let concluida = tarefa.concluida == true ? "checked" : ""
        listaDeTarefasEl.innerHTML = listaDeTarefasEl.innerHTML +
        `<form id="${tarefa.id}">
            <input name="concluida" onclick="atualizarTarefa(event)" type="checkbox" ${concluida}>
            <input class="tituloLista" name="titulo" onblur="atualizarTarefa(event)" type="text" value="${tarefa.titulo}">
            <button class="botao botaoLista" onclick="removerTarefa(event)">x</button>
        <form>`
    })
}

async function removerTarefa(event) {
    event.preventDefault()

    let botaoExcluirEl = event.target
    let tarefaDaListaEl = botaoExcluirEl.parentElement
    let idTarefa = tarefaDaListaEl.id
    await fetch(`https://devexplorer-backend-production.up.railway.app/tarefas/${idTarefa}`, { 
        method: 'DELETE'}
    )
    tarefaDaListaEl.remove()                
}

async function adicionarTarefa(event) {
    event.preventDefault()

    let novaTarefa = event.target.parentElement.novaTarefa.value                
    await fetch("https://devexplorer-backend-production.up.railway.app/tarefas", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: novaTarefa,
            concluida: false
        })
    })
    listarTarefas()
}

async function atualizarTarefa(event) {
    let formTarefa = event.target.parentElement
    let concluidaAtualizada = formTarefa.concluida.checked
    let tarefaAtualizada = formTarefa.titulo.value
    let idTarefa = formTarefa.id
    fetch(`https://devexplorer-backend-production.up.railway.app/tarefas/${idTarefa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: tarefaAtualizada,
            concluida: concluidaAtualizada
        })
    })
}