//
// clinic.action.js
//
import ApiObj from '../utils/api'
import { changeBusyStatus } from '.'


// ============== All Doctors ==========================================
const callAllDoctorsOnClinicAPI = (clinicId)=>{
    console.log('callAllDoctorsOnClinicAPI')
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.get.all_doctors_by_clinic_id + clinicId
    console.log(url_1)
    const fetch_data = {
        method: 'GET', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' })
    }
    return fetch(url_1, fetch_data)
}
export const all_doctors_on_clinic_action = (clinicId)=>(
    function(dispatch){
        callAllDoctorsOnClinicAPI(clinicId).then( success=>{
            console.log('callAllDoctorsOnClinicAPI : SUCCESS')
            
            success.json().then( result=>{
                //console.log(result)
                dispatch( updateDoctorsList(result) )
            }, error_2=>{
                console.log('callAllDoctorsOnClinicAPI : ERROR 2 :')    
                console.log( error_2 )
            } )

        }, error_1=>{
            console.log('callAllDoctorsOnClinicAPI : ERROR 1 :')
            console.log(error_1)
        })
    }
)
// ============== All Doctors / ==========================================

// ============== All Patients ==========================================
//const callAllPatientsOnClinicAPI = (clinicId)=>{}  <- TODO: This API
const callAllPatientsAPI = ()=>{
    console.log('callAllPatientsAPI')
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.get.all_patients
    console.log(url_1)
    const fetch_data = {
        method: 'GET', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' })
    }
    return fetch(url_1, fetch_data)
}
export const all_patients_on_clinic_action = clinicId=>(
    dispatch=>{
        callAllPatientsAPI().then( success=>{
            
            success.json().then( result=>{
                console.log(result)
                dispatch( updatePatientsList(result) )
            }, error_2=>{
                console.log('callAllPatientsAPI : ERROR 2 :')
                console.log( error_2 )
            })

        }, error_1=>{
            console.log('callAllPatientsAPI : ERROR 1 :')
            console.log( error_1 )
        })
    }
)
// ============== All Patients / ==========================================

// ============== All Schedules ==========================================
const callAllSchedulesByDocIdAPI = (docId)=>{
    console.log('callAllSchedulesByDocIdAPI')
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.get.all_schedules_by_doctor_id + docId
    console.log(url_1)
    const fetch_data = {
        method: 'GET', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' })
    }
    return fetch(url_1, fetch_data)
}
export const all_schedules_by_doctorId_action = docId=>(
    dispatch=>{
        callAllSchedulesByDocIdAPI(docId).then( success=>{
            
            success.json().then( result=>{
                console.log(result)
                dispatch( updateScheduleList(result) )
            }, error_2=>{
                console.log('callAllSchedulesByDocIdAPI : ERROR 2 :')
                console.log( error_2 )
            })

        }, error_1=>{
            console.log('callAllSchedulesByDocIdAPI : ERROR 1 :')
            console.log( error_1 )
        })
    }
)
// ============== All Schedules / ==========================================

//
const updateDoctorsList = doctors=>({ type: 'UPDATE_DOCTORS_LIST', payload: doctors })
const updatePatientsList = patients=>({ type: 'UPDATE_PATIENTS_LIST', payload: patients })
const updateScheduleList = schedules=>({ type: 'UPDATE_SCHEDULES_LIST', payload: schedules })