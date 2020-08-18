//
//import ApiObj from '../utils/api'

export * from './login.actions'
export * from './clinic.action'

// messages Action
export const changeBusyStatus = status =>({ type: 'NEW_STATUS', payload: status })