import React from 'react'

import {Link} from 'react-router-dom'

import {ButtonRegisLogin} from '../componentes/ButtonRegisterLogin'

import "../styles/login.scss"

export function LoginPage(){ //Página de login do usuário
    return(
        <div id="login">
            
            <h2>Bem vindo de volta</h2>

            <div id="loginForm">

                <span className='spaninput inputsconfig'>Usuário</span>
                <input type="text" className='logininputs inputsconfig' placeholder='Email'/>

                <span className='spaninput inputsconfig'>Senha</span>
                <input type="password" className='logininputs inputsconfig'/>

                <ButtonRegisLogin class="buttonLogin" text="Entrar" /* Componente utilizado para se logar*/ />
                <Link to="/cadastrar">Ainda não possui conta?</Link>
            </div>
            
        </div>
    )
}