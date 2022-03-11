import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { connect } from 'react-redux'

import { auth, database } from '../services/firebaseconfig'

import { setUserLogin } from '../store/actions/actions'

import '../styles/homecliente.scss'

function HomeCliente({ user, dispatch }) {

    const db = database.ref('Canais')

    const canais = []


    const navigate = useNavigate()

    useEffect(async () => { // Mantém o estado de autenticado da pessoa

      auth.onAuthStateChanged((usuario) => {

            if (usuario) {
                
                db.get().then((snapshot) => {

                    const dados = snapshot.val()

                    for(let i in dados){
                        dados[i].Users.map((value, index) => {

                        if(dados[i].Users[index] === user.Uid){
                            canais.push(dados[i])
                        }

                       })
                    }
                    
                }).then(() => {

                    dispatch(setUserLogin({ nome: usuario.displayName, email: usuario.email, uid: usuario.uid, canal: canais })) //Após logar setamos os dados do usuário dentro do Redux
                    console.log(user.Canais)
                })
                
            }else{
                navigate('/')
            }
        })
    }, [])



    async function createChannel(){ // Função para criar o canal

      
        const name = document.getElementById('channelName').value // Nome do canal

        if(name !== ""){ // Condição para verificar se o nome do canal esta vazio

            const exists = db.get().then((data) => { //Promise para fazer a verificação se o canal já existe ou não

                if(data.val()[name] !== undefined){ // Retorna um erro caso o canal já exista
                    return console.log('Esse canal já existe')
                }
                else{ // Cria o canal caso ele não existe
                    
                    const privado = document.getElementById('privateChannel')

                    if(privado.checked === true){ // Verifica se o canal é privado ou não caso for seta a senha e o restante dos parametros

                        const pass = document.getElementById('passwordChannel').value

                        if(pass !== ""){ // Verifica se a senha está vazia!

                            db.child(`${name}`).set({
                                Senha: pass,
                                Private: true, 
                                Users: [user.Uid],
                            })
                        }else{
                            return console.log("Digite uma senha!")
                        }

                    }else{ // Cria o canal caso ele não for privado
                        
                        db.child(`${name}`).set({
                            Senha: "",
                            Private: false, 
                            Users: [user.Uid],
                        })

                    }

                }
            })

        }

    }


    return (
        <div id="homecliente">
            
            <div id="userProfile">

                <div id="user">
                    {user.Nome}
                </div>

                <div id="userchannels">

                </div>

                <div id="createchannel">

                    <input id="channelName" className='textInputs' type="text" placeholder='Nome' minLength={3}/>

                    <input id="passwordChannel" className='textInputs' type="password" placeholder='Senha' minLength={4}/>

                    <span>
                        Privado
                    </span>

                    <input  id="privateChannel" type="checkbox" value={true} />

                    <button id="createChannelButton" onClick={createChannel}>Criar canal</button>

                </div>

            </div>

            <div id="chat">

                <div id="channelarea">

                </div>

                <div id="sendmensagemarea">
                    <textarea id="writemensage" />
                    <button id="enviarmensagem"></button>
                </div>

            </div>

        </div>
    )

}

export default connect(state => ({ user: state }))(HomeCliente)