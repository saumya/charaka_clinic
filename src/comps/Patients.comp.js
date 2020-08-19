//
import React, {useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'


import { all_patients_on_clinic_action, 
            patientById_action, 
            createPatient_action } from '../actions'

const PatientsComp = ()=>{
    const dispatch = useDispatch()

    const [patientId, setPatientId] = useState('')
    //
    const [personName, setPName] = useState('')
    const [personEmail, setPEmail] = useState('')
    const [personPhone, setPPhone] = useState('')
    const [personAddress, setPAddress] = useState('')
    const [personPassword, setPPassword] = useState('')

    const appMessages = useSelector( state=>state.messages )
    //const loginData = useSelector( state=>state.loginData )
    const clinicData = useSelector( state=>state.clinicData )

    //const clinicProfile = loginData.loginUser
    //const clinicId = clinicProfile.id

    const getAllPatients = ()=>dispatch( all_patients_on_clinic_action() )
    const onSearchPatient = ()=>{
        console.log('onSearchPatient id=', patientId )
        dispatch( patientById_action(patientId) )
    }
    const onDeletePatient = ()=>{
        console.log('onDeletePatient id=', patientId)
    }
    const onCreatePatient = ()=>{
        const patient = {
            personName : personName,
            personPassword : personPassword,
            personEmail : personEmail,
            personPhone : personPhone,
            personAddress : personAddress
        }
        //console.log( 'onCreatePatient', patient )
        dispatch( createPatient_action(patient) )
    }

    return(
        <React.Fragment>

            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Search Patient By Id </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Id" variant="outlined" fullWidth onChange={ event => setPatientId(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onSearchPatient}> Search </Button>
                    </form>
                    {/* JSON.stringify ( clinicData.doctorWithId ) */}
                    
                    <div>
                        <div> { clinicData.patientWithId.name }</div>
                        <div> { clinicData.patientWithId.phone }</div>
                        <div> { clinicData.patientWithId.email }</div>
                        <div> { clinicData.patientWithId.address }</div>
                    </div>

                    { 
                        clinicData.patientWithId.id ? 
                            <form style={{margin:'1em'}} noValidate autoComplete="off">
                                <Button variant="contained" color="secondary" onClick={onDeletePatient}> Delete </Button>
                            </form>
                        : "Not Available" 
                     }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            
            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Add New Patient </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Name" variant="outlined" fullWidth onChange={ event => setPName(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Password" variant="outlined" fullWidth onChange={ event => setPPassword(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Email" variant="outlined" fullWidth onChange={ event => setPEmail(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Phone" variant="outlined" fullWidth onChange={ event => setPPhone(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Address" variant="outlined" fullWidth onChange={ event => setPAddress(event.target.value)  } />
                    </form>

                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onCreatePatient}> Add Patient </Button>
                    </form>
                    { appMessages.info }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            
            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <Button onClick={ getAllPatients }> Show All Patients </Button>
                    {
                        clinicData.patients.map( (patient)=>(
                        <div key={patient.id}>
                            <div>{patient.id}-{patient.name}-{patient.phone}</div>
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

export default PatientsComp