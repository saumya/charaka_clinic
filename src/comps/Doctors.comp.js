//
import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'

import { all_doctors_on_clinic_action } from '../actions'


const DoctorsComp = ()=>{
    const dispatch = useDispatch()

    const loginData = useSelector( state=>state.loginData )
    const clinicData = useSelector( state=>state.clinicData )

    const clinicProfile = loginData.loginUser
    const clinicId = clinicProfile.id

    const getAllDoctors = ()=>dispatch( all_doctors_on_clinic_action(clinicId) )

    return(
        <React.Fragment>
            <Button onClick={ getAllDoctors }> Show All Doctors </Button>
            {
                clinicData.doctors.map( (doctor)=>(
                <div key={doctor.id}>
                    <div>{doctor.id}-{doctor.name}-{doctor.phone}-{doctor.specialization}</div>
                </div>
                ) )
            }
        </React.Fragment>
    )
}

export default connect()(DoctorsComp)