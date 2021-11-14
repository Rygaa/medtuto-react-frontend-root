import axios from "axios"
import { modelsActions } from "./joho__-slice"
import { url } from "_globalVar/_ip"

export const requestCourses__ = ({ idToken }) => {
    return async (dispatch) => {
        const link = decodeURI(window.location.pathname).split('/');
        const modelPubId = link[2];
        console.log('requestCourses');
        const response = await axios.post(url + `/courses`, {
            idToken,
            modelPubId,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log('1:', data);

        dispatch(modelsActions.setCourses(data.courses))
    }
}

export const requestCourses2__ = ({ idToken, modelPubId }) => {
    return async (dispatch) => {

        const response = await axios.post(url + `/courses`, {
            idToken,
            modelPubId,
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        console.log('2:', data);
        dispatch(modelsActions.setCourses(data.courses))
    }
}


export const createNewCourse__ = ({ idToken, model, newCourseName, newCourseDescription, newCourseIndex, newCourseImage }) => {
    return async (dispatch) => {
        // console.log(model);
        // const response = await axios.post(url + `/add-course`, {
        //     modelPubId: model,
        //     newCourseName,
        //     newCourseIndex,
        //     newCourseDescription,
        // })


        const formData = new FormData();
        formData.append("modelPubId", model);
        formData.append("newCourseName", newCourseName);
        formData.append("newCourseIndex", newCourseIndex);
        formData.append("newCourseDescription", newCourseDescription);
        formData.append("files", newCourseImage);
        // formData.append("files", picture2);
        const response = await axios.post(url + `/add-years-model`, formData)
        const data = response.data

        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestCourses2__({ idToken, modelPubId: model }));
    }
}



export const updateCourse__ = ({ idToken, modelPubId, coursePubId, newCourseName, newCourseIndex }) => {
    return async (dispatch) => {
        const response = await axios.post(url + `/update-course`, {
            modelPubId,
            coursePubId,
            newCourseName,
            newCourseIndex
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(modelsActions.setCourses([]))
        dispatch(requestCourses2__({ idToken, modelPubId }));


    }
}


export const removeCourse__ = ({ idToken, modelPubId, coursePubId }) => {
    return async (dispatch) => {
        console.log('removeCourse');
        const response = await axios.post(url + `/remove-course`, {
            modelPubId,
            coursePubId
        })

        const data = response.data
        if (data.error) {
            console.error(data.error)
            return;
        }
        dispatch(requestCourses2__({ idToken, modelPubId }))
    }
}
