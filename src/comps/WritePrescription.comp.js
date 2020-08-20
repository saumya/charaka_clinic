// Component
// WritePrescription.comp.js
//

import React, {useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createPrescriptionAction } from '../actions'


import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import LinearProgress from '@material-ui/core/LinearProgress'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    DateContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(1),
    },
    DateTextField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const WritePrescriptionComponent = (props)=>{
    
    const dispatch = useDispatch()
    const classes = useStyles()
    const appMessages = useSelector( state=> state.messages )

    const today = new Date()
    const mString = today=>{
        let m = today.getMonth()+1
        if(m<10){
            return ( '0' + m  )
        }
        return m
    }
    const dString = today=>{
        if(today.getDate()<10){
            return ( '0' + today.getDate() )
        }
        return today.getDate()
    }
    const dateString = today.getFullYear()+'-'+ mString(today) +'-'+ dString(today)

    let [observations, setObservations] = useState('')
    let [tests, setTests] = useState('')
    let [medicines, setMedicines] = useState('')
    let [advices, setAdvices] = useState('')
    let [details, setDetails] = useState('')
    let [followupDate, setFollowupDate] = useState(dateString)

    //let [showPatientdetailsUI, setWhetherToShowPatientDetailsUI] = useState(false)

    const onPrescription = ()=>{
        console.log( 'onPrescription' )
        // props.data.id
        //
        //console.log( JSON.stringify(props.data) )
        //console.log( observations, tests, advices, details )

        const PrescriptionData = {
            name: 'Prescription',
            onDate: props.data.on_date,
            observations: observations,
            advice: advices,
            tests: tests,
            details: details,
            
            medicines: medicines,
            followupDate: followupDate,

            doctorId: props.data.doctorId,
            personId: props.data.personId,
            clinicId: props.data.groupId
        }
        //console.log( PrescriptionData )
        dispatch( createPrescriptionAction(PrescriptionData) )
    }
    
    /*
    const onPatientDetailsClick = ()=>{
        setWhetherToShowPatientDetailsUI( !showPatientdetailsUI )
    }
    
    const PatientDetailsUI = (props)=>{
        return(
            <div>
                <h1>Patient Details</h1>
                <h2>Id {props.patientID}</h2>
            </div>
        )
    }
    */
    //
    return(
        <React.Fragment>
                
                <Card variant="outlined">
                    <div style={{ background:"#eee"}}>
                    <CardContent>
                        <div style={{ background:"#ff0"}}>
                            {/* JSON.stringify(props) doctorId, personId, groupId */}
                            { /*
                            <Button size="small" variant="contained" color="secondary" onClick={ onPatientDetailsClick }> Details of Patient </Button>
                            { showPatientdetailsUI ? <PatientDetailsUI patientID={props.data.personId} /> : ""}
                            */ }
                        </div>
                        <div>
                            <form className={classes.margin} noValidate autoComplete="off">
                                {/* <Typography variant="h6"> Schedule Id : { props.data.id } </Typography> */}
                                <Typography variant="h6"> Write Prescription </Typography>
                            </form>
                            <form className={classes.margin} noValidate autoComplete="off">
                                <TextField label="Observations" variant="outlined" fullWidth onChange={ event => setObservations(event.target.value) } />
                            </form>
                            <form className={classes.margin} noValidate autoComplete="off">
                                <TextField label="Tests" variant="outlined" fullWidth onChange={ event => setTests(event.target.value) } />
                            </form>
                            <form className={classes.margin} noValidate autoComplete="off">
                                <TextField label="Medicines" variant="outlined" fullWidth onChange={ event => setMedicines(event.target.value) } />
                            </form>
                            <form className={classes.margin} noValidate autoComplete="off">
                                <TextField label="Advices" variant="outlined" fullWidth onChange={ event => setAdvices(event.target.value) } />
                            </form>
                            <form className={classes.DateContainer} noValidate autoComplete="off">
                                <Typography variant="h6"> FollowUp date {followupDate} </Typography>
                                <TextField className={classes.DateTextField} label="FollowUp Date" defaultValue={followupDate} type="date" onChange={ event => setFollowupDate(event.target.value) } />
                            </form>
                            <form className={classes.margin} noValidate autoComplete="off">
                                <TextField label="Details" variant="outlined" fullWidth onChange={ event => setDetails(event.target.value) } />
                            </form>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="large" variant="contained" color="secondary" onClick={onPrescription}> Prescribe </Button>
                    </CardActions>
                    </div>
                    <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
                </Card>
                
            
        </React.Fragment>
    )
}

export default connect()(WritePrescriptionComponent)