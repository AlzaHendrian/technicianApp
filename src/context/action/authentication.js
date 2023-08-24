import { LOGIN, LOGOUT } from "../types"

export const loginAction = (payload) => {
    return {
        type: LOGIN,
        payload,
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT,
    }
}