// actions
// schedule_actions.js

import ApiObj from '../utils/api'
//import {changeStatusAsBusy} from '.'
import {changeBusyStatus} from './message.action'

/*
const call_GetSchedulesForDoctorIdAPI = (user_id)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version 
                    + ApiObj.get.all_schedules_by_doctor_id + user_id
    return fetch(url_1)
}
  
export const getSchedulesForDoctorAction = userId=>{
    return function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_GetSchedulesForDoctorIdAPI(userId).then(function(success){
            console.log( 'call_GetSchedulesForDoctorIdAPI : SUCCESS' )
            //console.log( success )
            success.json().then(function(result_data){
                console.log('call_GetSchedulesForDoctorIdAPI : SUCCESS : RESULT')
                console.log( result_data )
                dispatch( updateSchedulesForDoctorAction(result_data) )
                dispatch( changeBusyStatus(false) )
            }).catch(function(error_2){
                console.log('call_GetSchedulesForDoctorIdAPI : SUCCESS : ERROR_2')
                console.log(error_2)
                dispatch( changeBusyStatus(false) )
            })
        },function(error){
            console.log( 'call_GetSchedulesForDoctorIdAPI : ERROR' )
            console.log( error )
            dispatch( changeBusyStatus(false) )
        })
    } 
}

const updateSchedulesForDoctorAction = (schedules)=>({
    type: 'UPDATE_SCHEDULES_FOR_DOCTOR',
    payload: schedules
})
*/

// === updateSinlgeScheduleForDoctorAction ===
export const updateSinlgeScheduleForDoctorAction = schedule=>{
    return function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_UpdateSingleScheduleAPI(schedule).then(function(success){
            console.log( 'call_UpdateSinnlgeScheduleAPI : SUCCESS' )
            console.log('success', success)
            dispatch( changeBusyStatus(false) )
        },function(error_1){
            console.log( 'call_UpdateSinnlgeScheduleAPI : ERROR' )
            console.log( error_1 )
            dispatch( changeBusyStatus(false) )
        })
    }
}
const call_UpdateSingleScheduleAPI = (schedule)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.put.update_schedule
    const fetch_data = {
        method: 'PUT', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(schedule)
    }
    return fetch(url_1,fetch_data)
}
// === updateSinlgeScheduleForDoctorAction / ===

// === create Prescription ===
export const createPrescriptionAction = prescription=>{
    return function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_CreatePrescriptionAPI(prescription).then(function(success){
            console.log('createPrescriptionAction : SUCCESS :')
            dispatch( changeBusyStatus(false) )
            success.json().then(function(result){
                console.log('createPrescriptionAction : SUCCESS : RESULT :')
                console.log(result)
            }).catch(function(error_2){
                console.log('createPrescriptionAction : SUCCESS : ERROR :')
            })
        },function(error){
            console.log('createPrescriptionAction : ERROR :', error)
            dispatch( changeBusyStatus(false) )
        })

    }
}

const call_CreatePrescriptionAPI = (prescription)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.create_prescription
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(prescription)
    }
    return fetch(url_1,fetch_data)
}
// === create Prescription / ===


// === Delete A Schedule ===
export const deleteScheduleAction = scheduleId=>{
    return function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_deleteScheduleAPI(scheduleId).then(function(success){
            console.log( 'call_deleteScheduleAPI : SUCCESS' )
            console.log('success', success)
            dispatch( changeBusyStatus(false) )
        },function(error_1){
            console.log( 'call_deleteScheduleAPI : ERROR' )
            console.log( error_1 )
            dispatch( changeBusyStatus(false) )
        })
    }
}
const call_deleteScheduleAPI = (scheduleId)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.delete.delete_schedule
    const fetch_data = {
        method: 'DELETE', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({scheduleId : scheduleId})
    }
    return fetch(url_1,fetch_data)
}
// === Delete A Schedule / ===