import React, {useState} from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { ButtonRegisLogin } from '../componentes/ButtonRegisterLogin'

import { connect } from 'react-redux'
import { setUserLogin } from '../store/actions/actions'

import { auth } from '../services/firebaseconfig'



import "../styles/login.scss"
import { useReducer } from 'react'

function LoginPage({ user, dispatch }) { //Página de login do usuário

    const navigate = useNavigate()
    const [state, dispatchLocalReducer] = useReducer(reducer, {email: "", senha: ""})
    const [erroLogin, setErroLogin] = useState("")

    function reducer(state, action){
        switch(action.type){
            case "senha":
                return {
                    ...state,
                    senha: action.payload 
                }
            case "email": 
                return {
                    ...state,
                    email: action.payload 
                }
            default: return state 
        }
    }

    async function handleLogin() { // Função para realizar o login do usuário
        try{
            const resultadoLogin = await auth.signInWithEmailAndPassword(state.email, state.senha)      
            if(resultadoLogin.user.email === state.email){
                const usuario = resultadoLogin.user 
                await auth.setPersistence('session')
                dispatch(setUserLogin({ nome: usuario.displayName, email: usuario.email, uid: usuario.uid, canal: [] })) //Após logar setamos os dados do usuário dentro do Redux
                navigate('/home')
                console.log('hello')
            }else{
                throw {code: "Ouve um erro ao fazer o login", resultadoLogin}
            }
        }catch(e){
            return e
        }
    }

    return (
        <div id="login">

            <h2>Bem vindo de volta</h2>

            <div id="loginForm">

                <span className='spaninput inputsconfig'>Usuário</span>
                <input type="text" className='logininputs inputsconfig' placeholder='Email' onChange={(event) => {dispatchLocalReducer({type: "email", payload: event.currentTarget.value})}} />

                <span className='spaninput inputsconfig'  >Senha</span>
                <input type="password" className='logininputs inputsconfig' onChange={(event) => {dispatchLocalReducer({type: "senha", payload: event.currentTarget.value})}} />

                <ButtonRegisLogin func={async () => {
                        const resultLogin = await handleLogin()
                        setErroLogin(resultLogin.code)
                }} class="buttonLogin" text="Entrar" /* Componente utilizado para se logar*/ />
                <Link to="/cadastrar">Ainda não possui conta?</Link>
                <span>{erroLogin}</span>
            </div>

        </div>
    )
}

export default connect(state => ({ user: state }))(LoginPage)