//
import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { all_doctors_on_clinic_action, 
            doctorById_action, 
            createDoctor_action } from '../actions'


const DoctorsComp = ()=>{
    const dispatch = useDispatch()

    const loginData = useSelector( state=>state.loginData )
    const clinicData = useSelector( state=>state.clinicData )
    const appMessages = useSelector( state=>state.messages )

    const clinicProfile = loginData.loginUser
    const clinicId = clinicProfile.id

    const [dName, setDocName] = useState('')
    const [dSp, setDocSp] = useState('')
    const [dPass, setDocPassword] = useState('')
    const [dEmail, setDocEmail] = useState('')
    const [dPhone, setDocPhone] = useState('')
    const [dAddress, setDocAddress]= useState('')

    const [docId, setDocId] = useState('')

    const getAllDoctors = ()=>dispatch( all_doctors_on_clinic_action(clinicId) )
    const onCreateDoctor = ()=>{
        const doc = {
            doctorName : dName,
            doctorPassword : dPass,
            doctorEmail : dEmail,
            doctorPhone : dPhone,
            doctorSpecialization : dSp,
            doctorAddress : dAddress
        }
        //console.log( 'onCreateDoctor', doc )
        dispatch( createDoctor_action(doc) )
    }
    const onSearchDoctor = ()=>dispatch( doctorById_action(docId) )
    const onDeleteDoctor = ()=> console.log('TODO: DELETE Doc id='+docId)

    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Search Doctor By Id </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Id" variant="outlined" fullWidth onChange={ event => setDocId(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onSearchDoctor}> Search </Button>
                    </form>
                    {/* JSON.stringify ( clinicData.doctorWithId ) */}
                    
                    <div>
                        <div> { clinicData.doctorWithId.name }</div>
                        <div> { clinicData.doctorWithId.specialization }</div>
                        <div> { clinicData.doctorWithId.phone }</div>
                        <div> { clinicData.doctorWithId.email }</div>
                        <div> { clinicData.doctorWithId.address }</div>
                    </div>

                    { 
                        clinicData.doctorWithId.id ? 
                            <form style={{margin:'1em'}} noValidate autoComplete="off">
                                <Button variant="contained" color="secondary" onClick={onDeleteDoctor}> Delete </Button>
                            </form>
                        : "Not Available" 
                     }
                    
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginTop:'1em'}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Add New Doctor </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Name" variant="outlined" fullWidth onChange={ event => setDocName(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Specialisation" variant="outlined" fullWidth onChange={ event => setDocSp(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Password" variant="outlined" fullWidth onChange={ event => setDocPassword(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Email" variant="outlined" fullWidth onChange={ event => setDocEmail(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Phone" variant="outlined" fullWidth onChange={ event => setDocPhone(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Address" variant="outlined" fullWidth onChange={ event => setDocAddress(event.target.value)  } />
                    </form>

                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onCreateDoctor}> Add Doctor </Button>
                    </form>
                    { appMessages.info }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginTop:'1em'}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <Button onClick={ getAllDoctors }> Show All Doctors </Button>
                    {
                        clinicData.doctors.map( (doctor)=>(
                        <div key={doctor.id}>
                            <div>{doctor.id}-{doctor.name}-{doctor.phone}-{doctor.specialization}</div>
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

export default connect()(DoctorsComp)