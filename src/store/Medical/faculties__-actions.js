import axios from "axios"
import { modelsActions } from "./joho__-slice"
import { url } from "../../_globalVar/_ip"

export const requestFaculties__ = ({ idToken }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/faculties`, {
            idToken,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setFaculties(data.faculties))
    }
}



export const createNewFaculty__ = ({ idToken, facultyName, facultyIndex }) => {
    return async (dispatch) => {
        console.log('createNewFaculty:', facultyName);
        const response = await axios.post(url + `/add-faculty`, {
            facultyName,
            facultyIndex
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestFaculties__({ idToken }));
    }
}

export const updateFaculty__ = ({ idToken, facultyPubId, facultyName, facultyIndex }) => {
    return async (dispatch) => {
        console.log('updated:', facultyName);
        const response = await axios.post(url + `/update-faculty`, {
            facultyPubId,
            facultyName,
            facultyIndex
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setFaculties([]))

        dispatch(requestFaculties__({ idToken }));
    }
}


export const removeFaculty__ = ({ idToken, facultyPubId }) => {
    return async (dispatch) => {
        console.log('removeFaculty');

        const response = await axios.post(url + `/remove-faculty`, {
            facultyPubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestFaculties__({ idToken }));
    }
}

