import React from 'react' 

import {Link} from 'react-router-dom'

import "../styles/buttons.scss"

export function Button(props){

    return(
        <div className='buttonLinkDiv'>
            <Link to={props.link} className="linkButtonStyles">

                {props.text}

            </Link>
        </div>
    )

}