import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { ButtonRegisLogin } from '../componentes/ButtonRegisterLogin'

import { connect } from 'react-redux'
import { setUserLogin } from '../store/actions/actions'

import { auth } from '../services/firebaseconfig'



import "../styles/login.scss"

function LoginPage({ user, dispatch }) { //Página de login do usuário

    const navigate = useNavigate()

    async function handleLogin() { // Função para realizar o login do usuário

        const userlogin = document.getElementsByClassName('logininputs')

        await auth.signInWithEmailAndPassword(userlogin[0].value, userlogin[1].value).then((userdata) => { // Função que aguarda os dados do usuário para login

            try {

                if (userdata) {

                    auth.setPersistence('session')
                    dispatch(setUserLogin({ nome: userdata.user.displayName, email: userdata.user.email, uid: userdata.user.uid, canal: [] })) //Após logar setamos os dados do usuário dentro do Redux
                    navigate('/home')
                }
            } catch(e){

            }
        }).catch((e) => {

            const arealogin = document.getElementById('loginForm')
            arealogin.innerHTML += '<div id="erro" >Sua senha ou email não conferem!</div>'

            setTimeout(() => {
                const erro = document.getElementById('erro')
                erro.remove()
                window.location.reload()
            }, 3000)

        })

    }

    return (
        <div id="login">

            <h2>Bem vindo de volta</h2>

            <div id="loginForm">

                <span className='spaninput inputsconfig'>Usuário</span>
                <input type="text" className='logininputs inputsconfig' placeholder='Email' />

                <span className='spaninput inputsconfig'>Senha</span>
                <input type="password" className='logininputs inputsconfig' />

                <ButtonRegisLogin func={handleLogin} class="buttonLogin" text="Entrar" /* Componente utilizado para se logar*/ />
                <Link to="/cadastrar">Ainda não possui conta?</Link>

            </div>

        </div>
    )
}

export default connect(state => ({ user: state }))(LoginPage)