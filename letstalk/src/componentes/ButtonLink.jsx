import React from 'react' 

import {Link} from 'react-router-dom'

import "../styles/buttons.scss"

export function ButtonLink(props){ //Botão para redirecionamento de página 

    return(
        <div className='buttonLinkDiv'>
            <Link to={props.link} className="linkButtonStyles" /* Componente do react-router-dom para redirecionar */ > 

                {props.text}

            </Link>
        </div>
    )

}