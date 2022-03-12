import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { connect } from 'react-redux'

import { auth, database } from '../services/firebaseconfig'

import { setUserLogin, SetActiveChannel } from '../store/actions/actions'

import '../styles/homecliente.scss'

function HomeCliente({ user, dispatch }) {

    const db = database.ref('Canais')

    const navigate = useNavigate()

    useEffect(() => { // Mantém o estado de autenticado da pessoa

        auth.onAuthStateChanged(async (usuario) => { //Função para manter o estado de autenticação e pegar os canais do usuário



            if (usuario) {

                await db.get().then((snapshot) => {

                    let canais = []

                    const canaisG = snapshot.val()

                    for (let index in canaisG) {

                        try {

                            for(let i in canaisG[index].Users){ // Dando push na lista de canais do usuário

                                if(canaisG[index].Users[i] === usuario.uid){
                                    
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

    }, [])



    async function createChannel() { // Função para criar o canal


        const name = document.getElementById('channelName').value // Nome do canal

        if (name !== "") { // Condição para verificar se o nome do canal esta vazio

            const exists = db.get().then((data) => { //Promise para fazer a verificação se o canal já existe ou não

                if (data.val()[name] !== undefined) { // Retorna um erro caso o canal já exista
                    return alert('Esse canal já existe') // Inserção visual
                }
                else { // Cria o canal caso ele não existe

                    const privado = document.getElementById('privateChannel')

                    if (privado.checked === true) { // Verifica se o canal é privado ou não caso for seta a senha e o restante dos parametros

                        const pass = document.getElementById('passwordChannel').value

                        if (pass !== "") { // Verifica se a senha está vazia!

                            db.child(`${name}`).set({
                                Name: name,
                                criador: user.Uid,
                                Senha: pass,
                                Private: true,
                                Users: null,
                            })

                            db.child(`${name}`).child(`Users`).push(user.Uid).then(atualizar)

                        } else {
                            return alert("Digite uma senha!") // Inserção visual
                        }

                    } else { // Cria o canal caso ele não for privado

                        db.child(`${name}`).set({
                            Name: name,
                            Senha: "",
                            Private: false,
                            Users: null,
                            criador: user.Uid
                        })

                        db.child(`${name}`).child(`Users`).push(user.Uid).then(atualizar)

                    }

                }
            })

        }

    }

    async function handleDeleteChannel(){ //Função para deleter o canal do usuário

        const pass = document.getElementById('passwordChannel').value
        const name = document.getElementById('channelName').value

        db.child(name).child('criador').get().then((data) => { //Verificando se o usuário foi o criador
            if(data.val() === user.Uid){

                db.child(name).child('Private').get().then((privado) => {

                    if(privado.val() === true){

                        db.child(name).child('Senha').get().then((senha) => {
                            if(senha.val() === pass){
        
                                db.child(name).remove()
                                window.location.reload()
                            }
                        })
                    }else{
                        db.child(name).remove()
                        window.location.reload()
                    }
                })

            }else{
                alert('Você não é o criador deste canal!')
            }
        })

    }

    async function JoinChannel(){

        const name = document.getElementById('joinChannelName').value
        const pass = document.getElementById('passwordJoinChannel').value

        db.child(name).child('Private').get().then((data) => {
            
            if(data.val() === true){

                db.child(name).child('Senha').get().then((senha) => {

                    if(pass === senha.val()){

                        db.child(name).child('Users').push(user.Uid).then(atualizar)
                    }else{
                        alert("Senha errada!") // Inserção visual!
                    }

                })

            }else{
                db.child(name).child('Users').get().then((array) => {
                    
                    const n = array.val().length

                    db.child(name).child('Users').push(user.Uid).then(atualizar)

                })
            }

        })

    }

    async function atualizar(name){
        setTimeout(window.location.reload(), 1000)
    }


    async function handleSendMensagem(){

        const mensagem = document.getElementById('writemensage')

        if(mensagem.value === ""){

        }else{

            db.child(user.ActiveChannel).child('Mensagem').push({ // Envia a mensagem para o banco de dados

                Nome: user.Nome,
                texto: mensagem.value
    
            })

        }

        mensagem.value = ''

    }


    return (
        <div id="homecliente">

            <div id="userProfile">

                <div id="user">
                    {user.Nome}
                    <span className='activechannel'>Ativo no canal {user.ActiveChannel}</span>
                </div>

                <div id="userchannels">
                    {user.Canais.map((value, index) => {
                        return (
                            <div className='channels' key={index} onClick={() => {dispatch(SetActiveChannel(user.Canais[index]))}}>
                                <span>{user.Canais[index]}</span>
                            </div>
                        )
                    })}
                </div>

                <div id="joinChannel">

                    <input id="joinChannelName" className='textInputs' type="text" placeholder='Nome' minLength={3} />

                    <input id="passwordJoinChannel" className='textInputs' type="password" placeholder='Senha' />
                    
                    <button id="joinChannelButton" onClick={JoinChannel}>Entrar no canal</button>

                </div>

                <div id="createchannel">

                    <input id="channelName" className='textInputs' type="text" placeholder='Nome' minLength={3} />

                    <input id="passwordChannel" className='textInputs' type="password" placeholder='Senha' />

                    <span>
                        Privado
                    </span>

                    <input id="privateChannel" type="checkbox" value={true} />

                    <button id="createChannelButton" onClick={createChannel}>Criar canal</button>
                    <button id="deleteChannel" onClick={handleDeleteChannel}>Deletar Canal</button>

                </div>

            </div>

            <div id="chat">

                <div id="showmensagem">

                </div>

                <div id="sendmensagemarea">
                    <textarea id="writemensage" />
                    <button onClick={handleSendMensagem} id="enviarmensagem">Enviar</button>
                </div>

            </div>

        </div>
    )

}

export default connect(state => ({ user: state }))(HomeCliente)