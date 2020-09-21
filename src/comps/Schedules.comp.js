//
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'

import List from '@material-ui/core/List'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import ListSchedulesRow2Component from './ListSchedulesRow2.comp'
import ScheduleDetailView from './ScheduleDetailView.comp'

import { all_doctors_on_clinic_action, 
            all_schedules_by_doctorId_action } from '../actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const SchedulesComp = ()=>{

    const dispatch = useDispatch()

    const loginData = useSelector( state=>state.loginData )
    const clinicProfile = loginData.loginUser
    const clinicId = clinicProfile.id

    // This is used inside useEffect hook for limiting the call to just once
    const isFirstTime = true

    const appMessages = useSelector( state=>state.messages )
    const clinicData = useSelector( state=>state.clinicData )
    const doctors = clinicData.doctors
    const schedules = clinicData.schedules

    const [docId, setDocId] = useState(-1)

    const onSelectDoctor = event=>{ setDocId( event.target.value ) }
    const getSchedulesForDoctor = ()=>{
        //console.log('getSchedulesForDoctor')
        if(docId == -1 ){
            console.log( 'Nothing selected' )
        }else{
            dispatch( all_schedules_by_doctorId_action(docId) )
        }
    }

    const [open, setOpen] = useState(false)
    const [detailsObj, setDetailsObj] = useState({})
    const handleClose = ()=>setOpen(false)
    const onDetails = (detailsObj)=>{
        setDetailsObj( detailsObj )
        setOpen(true)
    }

    useEffect( ()=>{
        dispatch( all_doctors_on_clinic_action(clinicId) )
    }, [ isFirstTime ] )

    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
            
            <Dialog fullScreen open={open} TransitionComponent={Transition}>
                <ScheduleDetailView handleClose={handleClose} detailsObj={detailsObj} />
            </Dialog>

            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Schedules of a Doctor </Typography>
                    </form>

                    {
                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <select name="doctors" onChange={ onSelectDoctor }>
                            <option key='-1' value={docId}> Select A Doctor </option>
                            {
                                doctors.map( (doctor)=>(
                                    <option key={doctor.id} value={doctor.id}>{doctor.id}-{doctor.name}</option>
                                    )
                                )
                            }
                        </select>
                        </form>
                    }
                    {/* Material UI component */}
                    {/*
                        <FormControl style={{ width: 300 }}>
                            <InputLabel id="id-doc"> Select Doctor </InputLabel>
                            <Select labelId="id-doc" value={ docId } onChange={ onSelectDoctor }>
                                {
                                    doctors.map( (doctor)=>(
                                        <MenuItem key={doctor.id} value={doctor.id}> {doctor.id}-{doctor.name} </MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        </FormControl>
                    */}
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button onClick={ getSchedulesForDoctor }> Schedules </Button>
                    </form>
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    {
                        /*
                        schedules.map( (schedule)=>(
                            <div key={schedule.id}>
                                <div> schedule id-{schedule.id} - {schedule.on_date} - {schedule.is_morning ? "Morning" : "Evening"} - {schedule.isWeb ? 'On Web' : 'In Person'} - Patient id-{schedule.personId} </div>
                            </div>   
                        ))
                        */
                    }
                    <List component="nav">
                    {
                        schedules.map( singleRowData=><ListSchedulesRow2Component key={singleRowData.id} rowData={singleRowData} onDetailsClick={onDetails} /> )
                    }
                    </List>
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginBottom:20}} />
            
            

            

        </React.Fragment>
    )
}

export default connect()(SchedulesComp)