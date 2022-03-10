import React from 'react'

export function ButtonRegisLogin(props){ // Componente botão utilizado na página de registro e de login
    return(
        <button className={props.class} onClick={props.func}>{props.text}</button>
    )
}