//Actions para setar os dados do usuário

export function createNome(nome){
    return {
        type: "CREATE_NOME",
        nome
    }
}

export function createEmail(email){
    return {
        type: "CREATE_EMAIL",
        email
    }
}

export function createSobrenome(sobrenome){
    return {
        type: "CREATE_SOBRENOME",
        sobrenome
    }
}


export function createPassword(password){
    return {
        type: "CREATE_PASSWORD",
        password
    }
}


export function resetUser(reset){
    return {
        type: "RESET_USER",
        reset
    }
}

export function setUserLogin(usuario){
    return{
        type: "USUARIO_LOGIN",
        usuario
    }
}

