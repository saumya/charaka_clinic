//
import React, { useState } from 'react'

import { connect, useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../actions'

import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}))

const LoginComp = ()=>{
    const classes = useStyles()
    const dispatch = useDispatch()

    const appMessages = useSelector( state=> state.messages )
    const loginData = useSelector( state=>state.loginData )

    const [isFirstTime, setIsFirstTime] = useState(true)
    const [username, setUsername] = useState('')
    const [clinicId, setClinicId] = useState('')
    const [password, setPassword] = useState('')

    const onLoginButtonClick = ()=>{
        setIsFirstTime(false)

        dispatch( loginAction({
                cid: clinicId,
                cAdminUserName: username,
                cAdminUserPw: password
            }) 
        )
    }

    return(
        <React.Fragment>
            
            <Container fixed maxWidth="sm">
                <Paper elevation={24}>
                    
                    <div style={{margin:"2em"}}>
                        <span> &nbsp; </span>
                        <form className={classes.margin} noValidate autoComplete="off">
                            <Typography variant="h6"> Login | Clinic </Typography>
                        </form>
                        <form className={classes.margin} noValidate autoComplete="off">
                            <TextField label="Clinic Id" variant="outlined" fullWidth onChange={ event => setClinicId(event.target.value)  } />
                        </form>
                        <form className={classes.margin} noValidate autoComplete="off">
                            <TextField label="Admin Name" variant="outlined" fullWidth onChange={ event => setUsername(event.target.value)  } />
                        </form>
                        <form className={classes.margin} noValidate autoComplete="off">
                            <TextField label="Password" variant="outlined" type="password" fullWidth onChange={ event => setPassword(event.target.value)  }/>
                        </form>
                        <form className={classes.margin} noValidate autoComplete="off">
                            <Button variant="outlined" color="primary" onClick={onLoginButtonClick}> Login </Button>
                        </form>

                        <form className={classes.margin} noValidate autoComplete="off">
                            
                            {
                                ( isFirstTime ? "" : 
                                    ( loginData.isLoggedIn 
                                        ? ( loginData.isActive 
                                            ? "Active" 
                                            : <div> <Typography variant="h6" color='primary'> Login Success. </Typography><Typography variant="h6" color='error'> Activation ended on {loginData.loginUser.activated_to}. </Typography> </div>
                                            )
                                        :  ( appMessages.isAppBusy 
                                            ? <Typography variant="h6" color='primary'> Validating ... </Typography> 
                                            : <Typography variant="h6" color='error'> Login Fail </Typography>
                                            )  
                                    ) 
                                )
                                
                            }
                        </form>
                        
                    </div>

                    <span> &nbsp; </span>
                    {/*
                        ( loginData.isLoggedIn 
                        ? (loginData.isActive 
                            ? "Active" 
                            : <Typography variant="h6"> Login Success. Active till - {loginData.loginUser.activated_to} </Typography> )
                        : <Typography variant="h6"> Login Fail </Typography> ) 
                    */}
                    {/*
                        loginData.isActive ? "Active" : <div> Activated Till : {loginData.loginUser.activated_to } </div>
                    */}
                    

                    {/* JSON.stringify(loginData) */}
                    <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
                </Paper>
            </Container>
            
        </React.Fragment>
    )
}

export default connect()(LoginComp)