//
// patient.action.js
//

import ApiObj from '../utils/api'
import { changeBusyStatus, updateInfoMessage } from './message.action'



// ============== Create Patient ============================================
const call_CreatePatientAPI = (patientObj)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.create_patient
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(patientObj)
    }
    return fetch(url_1,fetch_data)
}

export const createPatient_action = patientObj=>(
    dispatch=>{
        dispatch( changeBusyStatus(true) )
        dispatch( updateInfoMessage('Processing ...') )
        call_CreatePatientAPI(patientObj).then( success=>{
            dispatch( changeBusyStatus(false) )
            success.json().then( result=>{
                console.log( result )
                dispatch( updateInfoMessage( 'New Patient has been added. The Id=' + result.id ) )
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
// ============== Create Patient / ==========================================

const updateSearchedPatient = patient=>({ type: 'UPDATE_SEARCHED_PATIENT', payload: patient })






