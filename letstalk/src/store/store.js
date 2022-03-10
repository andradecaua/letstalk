import {createStore} from 'redux'

let initialValue =  {
    Nome: '',
    User: '',
    Email: '',
    Password: '',
};


function reducer(state = initialValue, action){
  if(action.type === 'CREATE_NOME'){
    return{...state, Nome: action.nome}
  }
  if(action.type === 'CREATE_EMAIL'){
    return {...state, Email: action.email}
  }
  if(action.type === 'CREATE_USER'){
    return {...state, User: action.user}
  }
  if(action.type === 'CREATE_PASSWORD'){
    return {...state, Password: action.password}
  }
  return state

}

export const store = createStore(reducer)