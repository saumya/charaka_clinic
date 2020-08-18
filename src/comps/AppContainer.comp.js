//
import React from 'react'
import { useSelector } from 'react-redux'

import LoginComp from './Login.comp'
import HomeContainer from './HomeContainer.comp'


const AppContainerComp = ()=>{
    
    const loginData = useSelector( state=>state.loginData )

    return(
        <React.Fragment>
            {
                loginData.isActive 
                ? <HomeContainer /> 
                : <LoginComp />
            }
        </React.Fragment>
    )
}

export default AppContainerComp