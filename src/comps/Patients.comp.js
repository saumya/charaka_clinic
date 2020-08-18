//
import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'

import { all_patients_on_clinic_action } from '../actions'

const PatientsComp = ()=>{
    const dispatch = useDispatch()

    //const loginData = useSelector( state=>state.loginData )
    const clinicData = useSelector( state=>state.clinicData )

    //const clinicProfile = loginData.loginUser
    //const clinicId = clinicProfile.id

    const getAllPatients = ()=>dispatch( all_patients_on_clinic_action() )

    return(
        <React.Fragment>
            <Button onClick={ getAllPatients }> Show All Patients </Button>
            {
                clinicData.patients.map( (patient)=>(
                <div key={patient.id}>
                    <div>{patient.id}-{patient.name}-{patient.phone}</div>
                </div>
                ) )
            }
        </React.Fragment>
    )
}

export default PatientsComp