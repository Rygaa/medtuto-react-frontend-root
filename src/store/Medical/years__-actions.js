import axios from "axios"
import { modelsActions } from "./joho__-slice"
import { url } from "../../_globalVar/_ip"



export const requestYears__ = ({ idToken, facultyPubId }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/years`, {
            idToken,
            facultyPubId,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setYears(data.years))
    }
}

export const createNewYear__ = ({ idToken, facultyPubId, yearName, yearIndex }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/add-year`, {
            yearName,
            yearIndex,
            facultyPubId,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log('facultyPubId:', facultyPubId);
        dispatch(requestYears__({ idToken, facultyPubId }));
    }
}

export const removeYear__ = ({ idToken, yearPubId, facultyPubId }) => {
    return async (dispatch) => {
        console.log('removeYear');
        const response = await axios.post(url + `/remove-year`, {
            facultyPubId,
            yearPubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestYears__({ idToken, facultyPubId }))
    }
}

export const updateYear__ = ({ idToken, facultyPubId, yearPubId, newYearName, newYearIndex }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/update-year`, {
            yearPubId,
            newYearName,
            newYearIndex
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setYears([]))
        dispatch(requestYears__({ idToken, facultyPubId }));
    }
}