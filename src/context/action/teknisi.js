import { ADD_TEKNISI } from "../types"

export const addTeknisiAction = (payload) => {
    return {
        type: ADD_TEKNISI,
        payload,
    }
}