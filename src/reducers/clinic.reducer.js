//
const initialState = {
    doctors : [],
    patients: [],
    schedules: []
}

const ClinicReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'UPDATE_DOCTORS_LIST':
            return ({ ...state, doctors: action.payload })
        case 'UPDATE_PATIENTS_LIST':
            return ({ ...state, patients: action.payload })
        case 'UPDATE_SCHEDULES_LIST':
            return ({ ...state, schedules: action.payload })
        default :
            return state
    }
}

export default ClinicReducer
