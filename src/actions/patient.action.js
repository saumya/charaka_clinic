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


// ============== Get Patient Profile ==========================================
const call_GetPersonWithId_API = (user_id)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version 
                    + ApiObj.get.get_person_with_id + user_id
    return fetch(url_1)
}
export const getPersonProfileAction = personId=>{
    return function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_GetPersonWithId_API( personId ).then(function(success){
            success.json().then(function(result_data){
                console.log('call_GetPersonWithId_API : SUCCESS : RESULT')
                //console.log( result_data )
                dispatch( updateSearchedPatient(result_data) )
                //dispatch( updatePatientData(result_data) )
                dispatch( changeBusyStatus(false) )
            }).catch(function(error_2){
                console.log('call_GetPersonWithId_API : SUCCESS : ERROR_2')
                console.log(error_2)
                dispatch( changeBusyStatus(false) )
            })
        }, function(error){
            console.log( 'call_GetPersonWithId_API : ERROR' )
            console.log( error )
            dispatch( changeBusyStatus(false) )
        })
    }
}
// ============== Get Patient Profile / ==========================================

const updateSearchedPatient = patient=>({ type: 'UPDATE_SEARCHED_PATIENT', payload: patient })

export const resetPersonProfileAction = ()=>({ type: 'UPDATE_SEARCHED_PATIENT', payload: {} })




