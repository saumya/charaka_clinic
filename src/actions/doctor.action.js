//
import ApiObj from '../utils/api'

import { changeBusyStatus, updateInfoMessage } from './message.action'


// ============== Create Doctor ============================================
const call_CreateDoctorAPI = (newDoctor)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.create_doctor
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newDoctor)
    }
    return fetch(url_1,fetch_data)
}

export const createDoctor_action = docObj=>(
    dispatch=>{
        dispatch( changeBusyStatus(true) )
        call_CreateDoctorAPI(docObj).then( success=>{
            
            success.json().then( result=>{
                //console.log( result )
                // Next : Assign this Doctor to the Clinic
                dispatch( assignDoctorToClinic_action({ docId : result.id, clinicId : 1 }) )
            }, error_2=>{
                console.log('call_CreateDoctorAPI : ERROR 2 :')
                console.log( error_2 )
            })

        }, error_1=>{
            console.log('call_CreateDoctorAPI : ERROR 1 :')
            console.log( error_1 )
        })

    }
)
// ============== Create Doctor / ==========================================

// ============== Assign Doctor to Clinic ==================================
const call_AssignDocToClinicAPI = assignmentObj=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.assign_doctor_to_clinic
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            doctorId : assignmentObj.docId,
            clinincId : assignmentObj.clinicId
        })
    }
    return fetch(url_1,fetch_data)
}

export const assignDoctorToClinic_action = assignmentObj=>(

    dispatch=>{
        //console.log('assignDoctorToClinic_action', assignmentObj)
        call_AssignDocToClinicAPI( assignmentObj ).then( success=>{
            //console.log( success )
            dispatch( changeBusyStatus(false) )

            success.json().then( result=>{
                //console.log( result )
                dispatch( updateInfoMessage( 'New Doctor has been added with id=' + result.doctorId ) )
            }, error_2=>{
                console.log('call_AssignDocToClinicAPI : ERROR 2 :')
                console.log( error_2 )
            })

        }, error_1=>{
            console.log('call_AssignDocToClinicAPI : ERROR 1 :')
            console.log( error_1 )
        })

    }

)
// ============== Assign Doctor to Clinic / ================================