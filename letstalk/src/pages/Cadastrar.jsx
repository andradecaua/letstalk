import React from 'react'

import { ButtonRegisLogin } from '../componentes/ButtonRegisterLogin'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { auth } from '../services/firebaseconfig'

import * as createUser from '../store/actions/actions'

import '../styles/cadastrar.scss'


function CadastrarPage({ user, dispatch }) { //Página para cadastrar a pessoa

    async function handleCreateUser() { // Função para registrar o usuário

        const usuario = await auth.createUserWithEmailAndPassword(user.Email, user.Password).then((userdata) => { // Função do firebase para criar o usuário utilizando email e senha
            try { // Pegando caso der erro na criação do usuário
                if (userdata) {
                    userdata.user.updateProfile({ // Atualizando o perfil do usuário com o nome 
                        displayName: `${user.Nome} ${user.Sobrenome}`
                    }).then(() => { // Deslogando o usuário e resetando o usuário no redux

                        auth.signOut()

                        dispatch(createUser.resetUser(''))
                    })
                }
            } catch (e) {
            }
        }).catch((e) => {
            if(user.Password === ""){
                showError('Por favor digite uma senha!')
            }
            else{
                showError("Email já utilizado, por favor utilize outro!")
            }
        })
    }
    function showError(text){

        const area = document.getElementById('createAccountForm')
        area.innerHTML += `<div id="erro">${text}</div>`

        setTimeout(() => {
            const erro = document.getElementById('erro')
            erro.remove()
            window.location.reload()
        }, 1000)

    }
    return (

        <div id="cadastrarpage">
            <div id="text">
                <h2>Crie sua conta</h2>
                <span>E comece agora a conversar com várias pessoas</span>
            </div>

            <div id='createAccountForm'>
                <span className='registerLabels'>Nome</span>
                <input type="text" id="nome.input" className="registerInputs" placeholder='Ex: João Nobre' onChange={() => {

                    const nome = document.getElementById('nome.input').value
                    dispatch(createUser.createNome(nome))

                }} />

                <span className='registerLabels' >Sobrenome</span>
                <input id='user.sobrenome' type="text" className="registerInputs" placeholder='Ex: Souza' onChange={() => {

                    const sobrenome = document.getElementById('user.sobrenome').value
                    dispatch(createUser.createSobrenome(sobrenome))

                }} />

                <span className='registerLabels'>Email</span>
                <input id="email.input" type="email" className="registerInputs" placeholder='Ex: jaozinho123@gmail.com' onChange={() => {

                    const email = document.getElementById('email.input').value
                    dispatch(createUser.createEmail(email))

                }} />

                <span className='registerLabels'>Senha</span>
                <input id="password1" type="password" className="registerInputs" />
                <span className='registerLabels'>Confirme sua senha</span>
                <input id="password2" type="password" className="registerInputs" onChange={() => {

                    const pass1 = document.getElementById('password1').value
                    const pass2 = document.getElementById('password2').value

                    if (pass1 !== pass2 || pass2 === "") {
                        return
                    } else {
                        dispatch(createUser.createPassword(pass1))
                    }

                }} />

                <Link to="/login">Já possui uma conta?</Link>
                <ButtonRegisLogin func={handleCreateUser} class="criarContaButton" text="Criar conta" /* Componente utilizado para criar a conta */ />
            </div>

        </div>
    )
}

export default connect(state => ({ user: state }))(CadastrarPage)