import {createStore} from 'redux'

import {auth} from '../services/firebaseconfig'

let initialValue =  { // Estado inicial do usuário no redux
   User: {
      Nome: '',
      Sobrenome: '',
      Email: '',
      Password: '',
      Uid: '',
      Canais: [],
   }
};


function reducer(state = initialValue.User, action){ // Condições para as actions do redux

  if(action.type === 'CREATE_NOME'){
    return{...state, Nome: action.nome}
  }
  if(action.type === 'CREATE_EMAIL'){
    return {...state, Email: action.email}
  }
  if(action.type === 'CREATE_SOBRENOME'){
    return {...state, Sobrenome: action.sobrenome}
  }
  if(action.type === 'CREATE_PASSWORD'){
    return {...state, Password: action.password}
  }
  if(action.type === 'RESET_USER'){
    return {...state, Nome: action.reset, User: action.reset, Password: action.reset, Email: action.reset}
  }
  if(action.type === "USUARIO_LOGIN"){

    return {...state, Nome: action.usuario.nome, Email: action.usuario.email, Uid: action.usuario.uid, Canais: action.usuario.canal}
  }
  return state

}

export const store = createStore(reducer)