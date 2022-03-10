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

export function createUser(user){
    return {
        type: "CREATE_USER",
        user
    }
}


export function createPassword(password){
    return {
        type: "CREATE_PASSWORD",
        password
    }
}


