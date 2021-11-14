// import classes from './Header.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { removeCourse__, updateModel__ } from "store/proxy";
import classes from "assets/5-components/root/Course__.module.scss"

const Course__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);

    const removeOnClick = (e) => {
        dispatch(removeCourse__({ idToken, modelPubId: props.model, coursePubId: props.pubId }))
    }

    const updateOnClick = (e) => {
        const parentElement = e.target.parentElement
        const newCourseName = parentElement.children[0].value
        const newCourseIndex = parentElement.children[1].value
        const coursePubId = parentElement.getAttribute('data-pubid')
        dispatch(updateModel__({ idToken, modelPubId: props.model, coursePubId, newCourseName, newCourseIndex }))
    }

    return (
        <div className={classes['course']} data-pubid={props.pubId}>
            <input key={Math.random()} defaultValue={props.name} />
            <input key={Math.random()} defaultValue={props.index} />
            <button onClick={removeOnClick} data-pubid={props.pubId}>Remove</button>
            <button onClick={updateOnClick}>Update</button>
        </div>
    );
}

export default Course__;