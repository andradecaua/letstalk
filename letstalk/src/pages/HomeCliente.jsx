import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import {auth, database} from '../services/firebaseconfig'

import { connect } from 'react-redux'


import { setUserLogin, SetActiveChannel } from '../store/actions/actions'

import '../styles/homecliente.scss'


import { channelFactory } from '../factorys/channelFactor'

function HomeCliente({ user, dispatch }) {

    const db = database.ref('Canais')
    const [channelActived, setActivedChannel] = useState(user.ActiveChannel)
    const [mensagens, setMensagens]  = useState()
    const navigate = useNavigate()

   async  function loadMensagem(){

        let mensagensArray = []

        if(channelActived !== ""){
            db.child(channelActived).child('Mensagem').off('child_added') // Desligar o observer antes ligado

            let dados = await db.child(channelActived).child('Mensagem').get()
            dados = dados.val()
            for(let msg in dados){
                const {Nome, texto} = dados[msg]
                if(Nome !== '' && texto !== ''){
                    mensagensArray.push(dados[msg])
                }
            }
            setMensagens(mensagensArray)
        }
        
    }

    useEffect(() => { // Mantém o estado de autenticado da pessoa

        auth.onAuthStateChanged(async (usuario) => { //Função para manter o estado de autenticação e pegar os canais do usuário
            if (usuario) {
                await db.get().then((snapshot) => {
                    let canais = []
                    const canaisG = snapshot.val()
                    for (let index in canaisG) {
                        try {
                            for (let i in canaisG[index].Users) { // Dando push na lista de canais do usuário
                                if (canaisG[index].Users[i] === usuario.uid) {
                                    canais.push(canaisG[index].Name)
                                }
                            }
                        }
                        catch (e) {
                            return canais
                        }
                    }
                    return canais
                }).then((canais) => { // Define os canais do usuário
                    if (canais === undefined) {
                        dispatch(setUserLogin({ nome: usuario.displayName, email: usuario.email, uid: usuario.uid, canal: ['Ainda não possui nenhum canal'] })) //Após logar setamos os dados do usuário dentro do Redux    
                    } else {
                        dispatch(setUserLogin({ nome: usuario.displayName, email: usuario.email, uid: usuario.uid, canal: canais })) //Após logar setamos os dados do usuário dentro do Redux
                    }
                })
            } else {
                navigate('/')
            }
        })
        
       if(channelActived !== ""){
            db.child(channelActived).on('child_added', async () => {
                await loadMensagem()
            })
       }

        setActivedChannel(user.ActiveChannel)
    }, [dispatch, channelActived, user])



    

    return (
        <div id="homecliente">

            <div id="userProfile">

                <div id="user">
                    {user.Nome}
                    <span className='activechannel'>Ativo no canal {channelActived}</span>
                </div>

                <div id="userchannels">
                    {user.Canais.map((value, index) => {
                        return (
                            <div className='channels' key={index} onClick={() => { 
                                dispatch(SetActiveChannel(user.Canais[index])) 
                                }}>
                                <span>{user.Canais[index]}</span>
                            </div>
                        )
                    })}
                </div>

                <div id="joinChannel">

                    <input id="joinChannelName" className='textInputs' type="text" placeholder='Nome' minLength={3} />

                    <input id="passwordJoinChannel" className='textInputs' type="password" placeholder='Senha' />

                    <button id="joinChannelButton" onClick={() => channelFactory.JoinChannel(db, user)}>Entrar no canal</button>

                </div>

                <div id="createchannel">

                    <input id="channelName" className='textInputs' type="text" placeholder='Nome' minLength={3} />

                    <input id="passwordChannel" className='textInputs' type="password" placeholder='Senha' />

                    <span>
                        Privado
                    </span>

                    <input id="privateChannel" type="checkbox" value={true} />

                    <button id="createChannelButton" onClick={() => channelFactory.createChannel(db, user)}>Criar canal</button>
                    <button id="deleteChannel" onClick={() => channelFactory.handleDeleteChannel(db, user)}>Deletar Canal</button>

                </div>

            </div>

            <div id="chat">

                <div id="showmensagem">
                    {mensagens !== undefined?mensagens.map((mensagem, index) => {
                        const {Nome, texto} = mensagem
                            return(
                                <div className="mensagens" key={index}>
                                        <span className="nome">{Nome}</span>
                                        <span className="mensagem" >{texto}</span>
                                </div>
                            )
                    }):""}
                </div>

                <div id="sendmensagemarea">
                    <textarea id="writemensage" onKeyDown={(event => {

                        if (event.key === "Enter") {
                            channelFactory.handleSendMensagem(db, user)
                        }

                    })} />
                    <button onClick={() => channelFactory.handleSendMensagem(db, user)} id="enviarmensagem">Enviar</button>
                </div>

            </div>

        </div>
    )

}

export default connect(state => ({ user: state }))(HomeCliente)