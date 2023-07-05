import { auth, database } from '../services/firebaseconfig'


export const channelFactory = {
    createChannel,
    JoinChannel,
    handleSendMensagem,
    handleDeleteChannel,
}

async function createChannel(db, user) { // Função para criar o canal

    
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

async function handleDeleteChannel(db, user) { //Função para deleter o canal do usuário

    const pass = document.getElementById('passwordChannel').value
    const name = document.getElementById('channelName').value

    db.child(name).child('criador').get().then((data) => { //Verificando se o usuário foi o criador
        if (data.val() === user.Uid) {

            db.child(name).child('Private').get().then((privado) => {

                if (privado.val() === true) {

                    db.child(name).child('Senha').get().then((senha) => {
                        if (senha.val() === pass) {

                            db.child(name).remove()
                            window.location.reload()
                        }
                    })
                } else {
                    db.child(name).remove()
                    window.location.reload()
                }
            })

        } else {
            alert('Você não é o criador deste canal!')
        }
    })

}

async function JoinChannel(db, user) {

    const name = document.getElementById('joinChannelName').value
    const pass = document.getElementById('passwordJoinChannel').value

    db.child(name).child('Private').get().then((data) => {

        if (data.val() === true) {

            db.child(name).child('Senha').get().then((senha) => {

                if (pass === senha.val()) {

                    db.child(name).child('Users').push(user.Uid).then(atualizar)
                } else {
                    alert("Senha errada!") // Inserção visual!
                }

            })

        } else {
            db.child(name).child('Users').get().then((array) => {

                const n = array.val().length

                db.child(name).child('Users').push(user.Uid).then(atualizar)

            })
        }

    })

}

async function atualizar(name) {
    setTimeout(window.location.reload(), 1000)
}


async function handleSendMensagem(db, user) {

    if (user.ActiveChannel === '') {

        alert('Favor selecionar um canal!')

    } else {

        const mensagem = document.getElementById('writemensage')

        if (mensagem.value === "") {

        } else {

            db.child(user.ActiveChannel).child('Mensagem').push({ // Envia a mensagem para o banco de dados

                Nome: user.Nome,
                texto: mensagem.value

            })

        }

        mensagem.value = ''
    }

}
