import { createStore } from 'redux'

import { database } from '../services/firebaseconfig'

const db = database.ref('Canais')

let initialValue = { // Estado inicial do usuário no redux
  User: {
    Nome: '',
    Sobrenome: '',
    Email: '',
    Password: '',
    Uid: '',
    Canais: [],
    ActiveChannel: ''
  }
};


function reducer(state = initialValue.User, action) { // Condições para as actions do redux

  if (action.type === 'CREATE_NOME') {
    return { ...state, Nome: action.nome }
  }
  if (action.type === 'CREATE_EMAIL') {
    return { ...state, Email: action.email }
  }
  if (action.type === 'CREATE_SOBRENOME') {
    return { ...state, Sobrenome: action.sobrenome }
  }
  if (action.type === 'CREATE_PASSWORD') {
    return { ...state, Password: action.password }
  }
  if (action.type === 'RESET_USER') {
    return { ...state, Nome: action.reset, User: action.reset, Password: action.reset, Email: action.reset }
  }
  if (action.type === "USUARIO_LOGIN") {

    return { ...state, Nome: action.usuario.nome, Email: action.usuario.email, Uid: action.usuario.uid, Canais: action.usuario.canal }
  }
  if(action.type === 'ACTIVE_CHANEL'){
      
      const resetArea = document.getElementById('showmensagem')
      resetArea.innerHTML = '' // Limpa a área de mensagens quando trocado o channel

      db.child(action.chanel).child('Mensagem').off('child_added') // Desligar o observer antes ligado

      db.child(action.chanel).child('Mensagem').on('child_added', (dados) => { // Pega as mensagems e exibe na tela

        const mensagems = document.getElementsByClassName('mensagens')
        const {Nome, texto} = dados.val()
        const area = document.getElementById('showmensagem')
        

        if(Nome !== '' && texto !== ''){

            area.innerHTML +=  
            `<div class="mensagens">
              <span class="nome">${Nome}</span>
              <span class="mensagem" >${texto}</span>
            </div>` 
            area.scrollTo(0, 600)
        }

    })

    return {...state, ActiveChannel: action.chanel}
  }
  return state

}

export const store = createStore(reducer)