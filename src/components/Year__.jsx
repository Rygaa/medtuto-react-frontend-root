// import classes from './Header.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { removeYear__, updateYear__ } from "../store/proxy";
import classes from "../assets/6-pages/root/AddFaculty.module.scss"

const Year__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);

    const removeOnClick = (e) => {
        const yearPubId = e.target.attributes[0].nodeValue
        dispatch(removeYear__({ idToken, facultyPubId: props.faculty, yearPubId }))
    }

    const updateOnClick = (e) => {
        const parentElement = e.target.parentElement
        const newYearName = parentElement.children[0].value
        const newYearIndex = parentElement.children[1].value
        const yearPubId = parentElement.getAttribute('data-pubid')
        dispatch(updateYear__({ idToken, facultyPubId: props.faculty, yearPubId, newYearName, newYearIndex }))
    }

    return (
        <div className={classes['faculty']} data-pubid={props.pubId}>
            <input key={Math.random()} defaultValue={props.name} />
            <input key={Math.random()} defaultValue={props.index} />
            <button onClick={removeOnClick} data-pubid={props.pubId}>Remove</button>
            <button onClick={updateOnClick}>Update</button>
        </div>
    );
}

export default Year__;