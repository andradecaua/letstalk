import React from 'react'

import { Button } from '../componentes/Button'

import '../styles/home.scss'

export function HomePage(){

    return(

        <div id="home">

            <div id="text">
                <h2 id="titletext">Let's Talk ?</h2>
                <span id="smalltext1">Converse com pessoas de todos os lugares</span>
                <span id="smalltext2">Crie sua conta agora, ou entre para continuar conversando em seus canais</span>
            </div>

            <div id="homebuttons">

                <Button link="/cadastrar" text="Cadastre-se"/>
                <Button link="/login" text="Entrar"/>

            </div>

        </div>

    )
}