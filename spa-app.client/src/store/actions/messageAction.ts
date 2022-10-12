import { AppDispatch } from "../index"
import axios from "../../axios"

export const fetchMessages = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const responce = await axios.get('MessageOut/all')
            console.log(responce)
        } catch (e) {

        }
    }
}