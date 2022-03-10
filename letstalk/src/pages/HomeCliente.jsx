import React, {useEffect} from 'react'

import {connect} from 'react-redux'

import {auth} from '../services/firebaseconfig'

function HomeCliente({user}){

    return(
        <div>
            Home Cliente
        </div>
    )
    
}

export default connect(state => ({user: state})) (HomeCliente)