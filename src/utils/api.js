//
const apiObj = {
    endpoint : 'http://localhost:3000/api',
    version : '/v1',
    /* =============================== POST ================================== */
    post: {
        loginClinic : '/loginClinic',
        loginDoctor : '/loginDoctor',
        create_prescription : '/createPrescription',
        create_doctor : '/createDoctor',
        assign_doctor_to_clinic : '/assignDoctorToClinic',
        create_patient : '/createPerson',

        create_new_store_item : '/crateItem',
        buy_item : '/createItemBought',
        sell_item : '/createItemSold',
    },
    /* =============================== PUT ================================== */
    put: {
        update_doctor : '/updateDoctor/',
        update_schedule : '/updateSchedule/',
    },
    /* =============================== DELETE ================================== */
    delete: {
        delete_schedule : '/deleteSchedule/',
    },
    /* =============================== GET ================================== */
    get: {
        all_doctors_by_clinic_id : '/getAllDoctorsByGroup/',
        all_patients: '/getAllPeople',
        all_storeItems: '/getAllStoreItems',
        
        all_schedules_by_doctor_id : '/getSchedulesByDoctorId/',
        get_person_with_id : '/getPersonWithId/',
        get_doctor_with_id : '/getDoctorWithId/',
    }
}
export default apiObj