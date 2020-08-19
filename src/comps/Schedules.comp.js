//
import React, { useState } from 'react'
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

import { all_schedules_by_doctorId_action } from '../actions'


const SchedulesComp = ()=>{

    const dispatch = useDispatch()

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

    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
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
                    
                        schedules.map( (schedule)=>(
                        <div key={schedule.id}>
                            {/* JSON.stringify(schedule) */}
                            <div> schedule id-{schedule.id} - {schedule.on_date} - {schedule.is_morning ? "Morning" : "Evening"} - {schedule.isWeb ? 'On Web' : 'In Person'} - Patient id-{schedule.personId} </div>
                        </div>
                        ) )
                        
                    }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginBottom:20}} />
            
            

            

        </React.Fragment>
    )
}

export default connect()(SchedulesComp)