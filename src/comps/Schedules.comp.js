//
import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'

import { all_schedules_by_doctorId_action } from '../actions'


const SchedulesComp = ()=>{

    const dispatch = useDispatch()

    const clinicData = useSelector( state=>state.clinicData )
    const doctors = clinicData.doctors
    const schedules = clinicData.schedules

    const [docId, setDocId] = useState(-1)

    const onSelectDoctor = event=>{
        setDocId( event.target.value )
    }
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
            
            {
                <select name="doctors" onChange={ onSelectDoctor }>
                    <option key='-1' value="-1"> Select A Doctor </option>
                    {
                        doctors.map( (doctor)=>(
                            <option key={doctor.id} value={doctor.id}>{doctor.id}-{doctor.name}</option>
                            )
                        )
                    }
                </select>
            }
            <Button onClick={ getSchedulesForDoctor }> Schedules </Button>

            {
                
                schedules.map( (schedule)=>(
                <div key={schedule.id}>
                    {/* JSON.stringify(schedule) */}
                    <div> schedule id-{schedule.id} - {schedule.on_date} - {schedule.is_morning ? "Morning" : "Evening"} - {schedule.isWeb ? 'On Web' : 'In Person'} - Patient id-{schedule.personId} </div>
                </div>
                ) )
                
            }

        </React.Fragment>
    )
}

export default connect()(SchedulesComp)