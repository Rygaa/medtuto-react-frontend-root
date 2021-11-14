import axios from "axios"
import { membersActions } from "./members-slice"
import { url } from "_globalVar/_ip"
import { ToastContainer, toast } from 'react-toastify';

export const requestAccounts__ = ({ idToken }) => {
    return async (dispatch) => {
        console.log('requestAccounts__');
        const response = await axios.post(url + `/requestAccounts__`, {
            idToken
        })

        const data = response.data
        if (data.error) {
            toast.error(data.error)
            return;
        }
        console.log(data);
        dispatch(membersActions.setAccounts(data.accounts))
    }
}

export const updateMemberStatus__ = ({ idToken, memberUsername, newStatus }) => {
    return async (dispatch) => {
        console.log('requestAccounts__');
        const response = await axios.post(url + `/update-teacher-status`, {
            idToken,
            memberUsername,
            newStatus
        })

        const data = response.data
        if (data.error) {
            toast.error(data.error)
            return;
        }
        toast.success(data.message)
        dispatch(membersActions.setAccounts([]))
        dispatch(requestAccounts__({idToken}))
        console.log(data);
        
    }
}