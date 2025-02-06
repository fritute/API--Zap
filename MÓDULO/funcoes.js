const { contatos } = require("./contatos")

/******************************************************************
 * Objetivo: o projeto do Whatsapp que
    a equipe de Front-End já disponibilizou e está funcionando com dados provisórios.
 * Data:30/01/2025
 * Autor : Gustavo Zumba
 * versão 1.0
 ******************************************************************/

function buscarUsuarioPorTelefone(numeroTelefone) {
  return contatos["whats-users"].find(user => user.number === numeroTelefone)
}

function listarDadosPessoais(numeroTelefone) {
  const usuario = buscarUsuarioPorTelefone(numeroTelefone)
  if (!usuario) {
    return "Usuário não encontrado."
  }

  return {
    id: usuario.id,
    account: usuario.account,
    "created-since": usuario["created-since"]
  }

}

function listarDadosPerfil(numeroTelefone) {
  const usuario = buscarUsuarioPorTelefone(numeroTelefone)
  if (!usuario) {
    return "Usuário não encontrado."
  }

  return {
    nickname: usuario.nickname,
    "profile-image": usuario["profile-image"],
    background: usuario.background
  };
}

function listarDadosContato(numeroTelefone) {
  const usuario = buscarUsuarioPorTelefone(numeroTelefone)
  if (!usuario) {
    return "Usuário não encontrado."
  }

  return usuario.contacts.map(contato => ({
    name: contato.name,
    description: contato.description,
    image: contato.image
  }));
}

function filtrarConversas(numeroTelefoneUsuario, nomeContato, numeroTelefoneContato) {
  const usuario = buscarUsuarioPorTelefone(numeroTelefoneUsuario)
  if (!usuario) {
    return "Usuário não encontrado."
  }

  let contato;
  if (numeroTelefoneContato) {
    contato = usuario.contacts.find(contato => contato.number === numeroTelefoneContato)
  } else {
    contato = usuario.contacts.find(contato => contato.name === nomeContato)
  }

  if (!contato) {
    return "Contato não encontrado."
  }

  return {
    [contato.name]: contato.messages
  };
}

function filtrarConversasPorPalavraChave(numeroTelefone, palavraChave) {
  const usuario = buscarUsuarioPorTelefone(numeroTelefone)
  if (!usuario) {
    return "Usuário não encontrado."
  }

  const conversasFiltradas = {}
  usuario.contacts.forEach(contato => {
    const mensagensFiltradas = contato.messages.filter(mensagem =>
      mensagem.content.toLowerCase().includes(palavraChave.toLowerCase())
    )
    if (mensagensFiltradas.length > 0) {
      conversasFiltradas[contato.name] = mensagensFiltradas
    }
  })

  return conversasFiltradas
}

// Exemplos de uso
console.log(listarDadosPessoais("11987876567"))
console.log(listarDadosPerfil("11987876567"))
console.log(listarDadosContato("11987876567"))
console.log(filtrarConversas("11987876567", "Ana Maria"))
console.log(filtrarConversas("11987876567", null, "11912345678"))
console.log(filtrarConversasPorPalavraChave("11987876567", "Leonid"))