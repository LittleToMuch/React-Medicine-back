import * as Permission from '../actionType'

export function doctorAction() {
    return {
        type: Permission.DOCTOR
    }
}

export function adminAction() {
    return {
        type: Permission.ADMIN
    }
}