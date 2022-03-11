import React from 'react'

import { ButtonLink } from '../componentes/ButtonLink'

import '../styles/home.scss'


export function HomePage(){ // Página inicial do app


    return(

        <div id="home">

            <div id="text">
                <h2 id="titletext">Let's Talk ?</h2>
                <span id="smalltext1">Converse com pessoas de todos os lugares</span>
                <span id="smalltext2">Crie sua conta agora, ou entre para continuar conversando em seus canais</span>
            </div>

            <div id="homebuttons" /* Botões para redirecionar a pessoa para a página de login ou registro */ >

                <ButtonLink link="/cadastrar" text="Cadastre-se"/>
                <ButtonLink link="/login" text="Entrar"/>

            </div>

        </div>

    )
}