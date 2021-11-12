// import classes from './Header.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { removeFaculty__, updateFaculty__ } from "store/proxy";
import classes from "assets/5-components/root/Faculty__.module.scss"

const Faculty__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);

    const removeOnClick = (e) => {
        console.log(e.target.attributes[0].nodeValue)
        const facultyPubId = e.target.attributes[0].nodeValue
        dispatch(removeFaculty__({ idToken, facultyPubId }))
    }

    const updateOnClick = (e) => {
        const parentElement = e.target.parentElement
        const newFacultyName = parentElement.children[0].value
        const newFacultyIndex = parentElement.children[1].value
        const facultyPubId = parentElement.getAttribute('data-pubid')
        dispatch(updateFaculty__({ idToken, facultyPubId, facultyName: newFacultyName, facultyIndex: newFacultyIndex }))
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

export default Faculty__;