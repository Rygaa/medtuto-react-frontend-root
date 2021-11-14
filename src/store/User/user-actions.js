import axios from "axios"
import { userActions } from "./user-slice"
import { url } from "_globalVar/_ip"
import { ToastContainer, toast } from 'react-toastify';

export const signUp = ({ username, password, email, history }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/signUp`, {
            username,
            password,
            email
        })

        const data = response.data
        if (data.error) {
            toast.error(data.error)
            return;
        }
        toast.success(data.message)
        dispatch(login({username, password, history}))
    }
}

export const login = ({ username, password, email, history }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/loginRoot`, {
            username,
            password,
        })

        const data = response.data
        if (data.error) {
            toast.error(data.error)
            return;
        }
        toast.success(data.message)

        dispatch(userActions.setUsername(data.username));
        dispatch(userActions.setIsConnected(true));
        dispatch(userActions.setIdToken(data.idToken));
        localStorage.setItem('idToken', data.idToken);
        history.push('/')
    }
}


export const checkIdToken = ({ idToken }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/checkIfRoot`, {
            idToken,
        })

        const data = response.data
        if (data.error) {
            console.log(data.error);
            dispatch(userActions.setIsConnected(false));
            return;
        }
        console.log(data);
        const username = data.username
        dispatch(userActions.setUsername(username));
        dispatch(userActions.setIsConnected(true));
    }
}

