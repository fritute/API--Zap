const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

const zap = require('./MÓDULO/funcoes.js')

app.get('/v1/whatsapp/UsuarioporTelefone', async function(request, response) {
  const numeroTelefone = request.query.telefone

  if (!numeroTelefone) {
    return response.status(200).json({ status: 200, message: 'Número de telefone não fornecido. Utilize o parâmetro "telefone" para fornecer o número.' })
  } else {
    const usuario = zap.buscarUsuarioPorTelefone(numeroTelefone)
    response.status(200).json(usuario)
  }
})

app.get('/v1/whatsapp/dadospessoais', async function(request, response) {
  const numeroTelefone = request.query.telefone;

  if (!numeroTelefone) {
    return response.status(200).json({ status: 200, message: 'Número de telefone não fornecido. Utilize o parâmetro "telefone" para fornecer o número.' })
  } else {
    const dados = zap.listarDadosPessoais(numeroTelefone);
    response.status(200).json(dados)
  }
})

app.get('/v1/whatsapp/dadosperfil', async function(request, response) {
  const numeroTelefone = request.query.telefone

  if (!numeroTelefone) {
    return response.status(200).json({ status: 200, message: 'Número de telefone não fornecido. Utilize o parâmetro "telefone" para fornecer o número.' })
  } else {
    const dados = zap.listarDadosPerfil(numeroTelefone)
    response.status(200).json(dados)
  }
});

app.get('/v1/whatsapp/dadoscontato', async function(request, response) {
  const numeroTelefone = request.query.telefone

  if (!numeroTelefone) {
    return response.status(200).json({ status: 200, message: 'Número de telefone não fornecido. Utilize o parâmetro "telefone" para fornecer o número.' })
  } else {
    const dados = zap.listarDadosContato(numeroTelefone)
    response.status(200).json(dados)
  }
})

app.get('/v1/whatsapp/conversas', async function(request, response) {
  const numeroTelefone = request.query.telefone;

  if (!numeroTelefone) {
    return response.status(200).json({ status: 200, message: 'Número de telefone não fornecido. Utilize o parâmetro "telefone" para fornecer o número.' });
  } else {
    const dados = zap.listarConversas(numeroTelefone)
    response.status(200).json(dados)
  }
});

app.get('/v1/whatsapp/filtrarconversas', async function(request, response) {
  const numeroTelefone = request.query.telefone
  const nomeContato = request.query.nomeContato

  if (!numeroTelefone || !nomeContato) {
    return response.status(200).json({ status: 200, message: 'Número de telefone e nome do contato devem ser fornecidos. Utilize os parâmetros "telefone" e "nomeContato" para fornecer os dados.' })
  } else {
    const dados = zap.filtrarConversas(numeroTelefone, nomeContato)
    response.status(200).json(dados)
  }
})
app.listen('8080', function(){
  console.log('API aguardando requisições ...')
})