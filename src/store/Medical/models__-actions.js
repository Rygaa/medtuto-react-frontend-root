import axios from "axios"
import { modelsActions } from "./joho__-slice"
import { url } from "../../_globalVar/_ip"



export const addLink = ({ idToken, username, coursePubId, links, videos, files }) => {
    return async (dispatch) => {
        console.log('addLink');
        const response = await axios.post(url + `/add-link`, {
            username,
            coursePubId,
            links,
            files,
            videos
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }

    }
}

export const teachForCourse = ({ idToken, username, coursePubId }) => {
    return async (dispatch) => {
        console.log('teachForCourse');
        const response = await axios.post(url + `/add-teacher-to-course`, {
            username,
            coursePubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        
    }
}

export const removeModel__ = ({ idToken, yearPubId, modelPubId }) => {
    return async (dispatch) => {
        console.log('removeModel');
        const response = await axios.post(url + `/remove-model`, {
            modelPubId,
            yearPubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestModels__({ idToken, yearPubId }))
    }
}





export const updateModel__ = ({ idToken, yearPubId, modelPubId, newModelName, newModelIndex }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/update-model`, {
            yearPubId,
            modelPubId,
            newModelName,
            newModelIndex
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setModels([]))
        dispatch(requestModels__({ idToken, yearPubId }));

    }
}





export const createNewModel__ = ({ idToken, yearPubId, newModelName, newModelIndex, description, picture1, picture2 }) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append("yearPubId", yearPubId);
        formData.append("newModelName", newModelName);
        formData.append("newModelIndex", newModelIndex);
        formData.append("description", description);
        formData.append("files", picture1);
        formData.append("files", picture2);
        const response = await axios.post(url + `/add-years-model`, formData)

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log(data);
        dispatch(requestModels__({ idToken, yearPubId }));
    }
}





export const requestModels__ = ({ idToken, yearPubId }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/models`, {
            idToken,
            yearPubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log('models:', data);
        dispatch(modelsActions.setModels(data.models))
    }
}



export const requestTeachers = ({ idToken }) => {
    return async (dispatch) => {
        const link = decodeURI(window.location.pathname).split('/');
        const course = link[2];

        const response = await axios.post(url + `/teachers`, {
            idToken,
            course,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setTeachers(data.teachers))
    }
}


export const requestLearning = ({ idToken }) => {
    return async (dispatch) => {
        console.log('requestLearning');

        const link = decodeURI(window.location.pathname).split('/');
        const course = link[2];
        const teacher = link[3];
        console.log(link);

        const response = await axios.post(url + `/learning`, {
            idToken,
            course,
            teacher
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log(data);
        dispatch(modelsActions.setVideos(data.videos))
        dispatch(modelsActions.setLinks(data.links))
        dispatch(modelsActions.setFiles(data.files))
    }
}


