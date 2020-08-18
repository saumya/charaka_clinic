//
import React from 'react'
import { useSelector } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core'

const ProfileComp = ()=>{
    const loginData = useSelector( state=>state.loginData )
    return(
        <React.Fragment>
            {/* JSON.stringify( loginData ) */}
            <Paper style={{margin: 20, padding: 20}}>
                <Typography variant="h6"> Id - {loginData.loginUser.id} </Typography>
                <Typography variant="h6"> Clinic Name - {loginData.loginUser.group_name} </Typography>
                <Typography variant="h6"> User Name - {loginData.loginUser.user_name} </Typography>
                <Typography variant="h6"> Password - {loginData.loginUser.user_password} </Typography>
                <Typography variant="h6"> Activated On - {loginData.loginUser.activated_on} </Typography>
                <Typography variant="h6"> Activated From - {loginData.loginUser.activated_from} </Typography>
                <Typography variant="h6"> Activated To - {loginData.loginUser.activated_to} </Typography>
            </Paper>
            
        </React.Fragment>
    )   
}

export default ProfileComp