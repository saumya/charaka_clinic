//
import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import InfoComp from './Info.comp'

const ProfileComp = ()=>{
    const loginData = useSelector( state=>state.loginData )
    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
            {/* JSON.stringify( loginData ) */}
            <Container maxWidth="md">
                <Paper style={{padding: 20}}>
                    <div style={{fontSize:'3em', color:'#666'}}> Clinic Profile </div>
                    <InfoComp label='Id' value={loginData.loginUser.id} />
                    <InfoComp label='Clinic Name' value={loginData.loginUser.group_name} />
                    <InfoComp label='User Name' value={loginData.loginUser.user_name} />
                    <InfoComp label='Password' value={loginData.loginUser.user_password} />
                    <InfoComp label='Activated On' value={loginData.loginUser.activated_on} />
                    <InfoComp label='Activated From' value={loginData.loginUser.activated_from} />
                    <InfoComp label='Activated To' value={loginData.loginUser.activated_to} />
                </Paper>
            </Container>
            
        </React.Fragment>
    )   
}

export default ProfileComp