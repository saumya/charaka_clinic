// 
// ScheduleDetailView.comp.js
//

import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import Paper from '@material-ui/core/Paper'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import WritePrescriptionComponent from './WritePrescription.comp'

import { updateSinlgeScheduleForDoctorAction, 
            getPersonProfileAction, 
            resetPersonProfileAction } from '../actions'


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },

    root: {
        flexGrow: 1,
    },
    paper: {
        height: 220,
        width: 300,
        padding: '2em',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const ScheduleDetailViewComponent = (props)=>{
    const classes = useStyles()
    const dispatch = useDispatch() // React-Redux
    const appMessages = useSelector( state=> state.messages )
    const patientDataObj = useSelector( state=> state.clinicData.patientWithId )

    const [isWeb, setIsWeb]= useState(props.detailsObj.isWeb)
    const [webTime, setWebTime]= useState(props.detailsObj.web_at_time)

    const toggleWebChecked = ()=> setIsWeb( !isWeb )
    const onPersonDetailsClick = (personId)=> dispatch( getPersonProfileAction(personId) )
    const onCloseClick = ()=>{
        dispatch( resetPersonProfileAction() )
        props.handleClose()
    }

    const onUpdateSchedule = ()=>{
        //console.log('onUpdateSchedule')
        //console.log( 'old=',detailObj )

        //console.log('isWeb', isWeb)
        //console.log('onUpdateSchedule : webTime',webTime)
        //let webURL = '';
        
        const webURL = 'https://meet.jit.si/' + 'FindHealthToday_'
                                                + props.detailsObj.groupId + '_'
                                                + props.detailsObj.doctorId + '_'
                                                + props.detailsObj.personId + '_'
                                                + webTime
        const newSchedule = {...props.detailsObj, isWeb:isWeb, web_at_time:webTime, webURL}
        //console.log('onUpdateSchedule : schedule =', newSchedule)
        dispatch( updateSinlgeScheduleForDoctorAction(newSchedule) )
        
    }

    return(
        <React.Fragment>
            
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Button color="inherit" onClick={ onCloseClick }>
                        <ArrowBackIosIcon />
                    </Button>
                    <Typography variant="h6" className={classes.title}>
                        Schedule - {props.detailsObj.id}
                    </Typography>
                    {/*
                    <Button color="inherit" onClick={ onCloseClick }>
                        Done
                        <ArrowForwardIosIcon />
                    </Button>
                    */}
                </Toolbar>
            </AppBar>

            <div style={{marginBottom:80}} />
            
            {/* <DialogTitle> Schedule Details - {props.detailsObj.id} </DialogTitle> */}

            <DialogContent>
                {/* <Typography color="textSecondary" gutterBottom> View And Update The Schedule </Typography> */}
                <Grid container className={classes.root} justify="center" spacing={2}>
                    <Grid key={1} item>
                        <LinearProgress color="primary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
                        <Paper className={classes.paper} elevation={1}>
                            
                            <DialogContentText> Schedule Id - { props.detailsObj.id } </DialogContentText>
                            <DialogContentText> On - { props.detailsObj.on_date } </DialogContentText>
                            <DialogContentText> { props.detailsObj.is_morning ? "Morning" : "Evening" }  </DialogContentText>
                            <DialogContentText> { props.detailsObj.isWeb ? "Web Meeting" : "In Person" } { props.detailsObj.isWeb ?  ' - ' + props.detailsObj.web_at_time : "" }  </DialogContentText>
                            <DialogContentText> Patient Id - { props.detailsObj.personId } </DialogContentText>

                        </Paper>
                    </Grid>
                    <Grid key={2} item>
                        <LinearProgress color="primary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
                        <Paper className={classes.paper} elevation={1}>
                            <FormGroup>
                                <FormControlLabel control={<Switch color="primary" onChange={toggleWebChecked} checked={isWeb || false} />} label="Is Web Meeting?" />
                            </FormGroup>
                            <div style={{marginBottom:10}} />
                            <div>
                                { isWeb ?
                                    <React.Fragment>
                                        <form className={classes.margin} noValidate autoComplete="off">
                                            <TextField id="outlined-basic" 
                                                label="Web Meeting At Time" variant="outlined" fullWidth 
                                                onChange={ event=>setWebTime(event.target.value) }
                                                value={webTime || ''} />
                                        </form>
                                        <div style={{marginBottom:10}} />
                                        <Button color="primary" variant="contained" onClick={onUpdateSchedule}> Update </Button>
                                    </React.Fragment>
                                : ""}
                            </div>
                            
                        </Paper>
                        
                    </Grid>
                </Grid> 

                <div style={{marginBottom:20}} />

                <Grid item xs>
                    <Paper style={{ padding:'0em' }} elevation={1}>
                        {/* <Typography variant="h6" gutterBottom> Prescription </Typography> */}
                        <WritePrescriptionComponent data={props.detailsObj} />
                    </Paper>
                </Grid>
            
                        
                <div style={{marginBottom:20}} />

                {/*
                <Divider />
                <Button onClick={ ()=>{onPersonDetailsClick(props.detailsObj.personId)} } color="primary" variant="contained"> Person Details </Button>
                */}
                
                {
                <Grid item xs>
                    <LinearProgress color="primary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
                    <Paper style={{ padding:'2em' }} elevation={1}>
                        <Button onClick={ ()=>{onPersonDetailsClick(props.detailsObj.personId)} } color="primary" variant="contained"> Patient </Button>
                        
                        <Typography variant="h6" gutterBottom> { patientDataObj.id } </Typography>
                        <Typography variant="h6" gutterBottom> { patientDataObj.name } </Typography>
                        <Typography variant="h6" gutterBottom> { patientDataObj.phone } </Typography>
                        <Typography variant="h6" gutterBottom> { patientDataObj.email } </Typography>
                        <Typography variant="h6" gutterBottom> { patientDataObj.address } </Typography>
                        
                    </Paper>
                </Grid>
                }

                <div style={{marginBottom:20}} />
            </DialogContent>
            
            {/*
            <DialogActions>
                <Button onClick={props.handleClose} color="primary"> Ok </Button>
                <Button onClick={props.handleClose} color="primary"> Cancel </Button>
            </DialogActions>
            */}
            
        </React.Fragment>
    )
}

export default connect()(ScheduleDetailViewComponent)