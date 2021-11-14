// import classes from './Header.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { removeModel__, updateModel__ } from "store/proxy";

import classes from "assets/5-components/root/Model__.module.scss"

const Model__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);

    const removeOnClick = (e) => {
        dispatch(removeModel__({ idToken, yearPubId: props.year, modelPubId: props.pubId }))
    }
    // const image = `http://192.168.1.4:3005/models/${props.pubId}`;
    // <div style={{ backgroundImage: `url(${image})` }}></div>

    const updateOnClick = (e) => {
        const parentElement = e.target.parentElement
        const newModelName = parentElement.children[0].value
        const newModelIndex = parentElement.children[1].value
        const modelPubId = parentElement.getAttribute('data-pubid')
        dispatch(updateModel__({ idToken, yearPubId: props.year, modelPubId, newModelName, newModelIndex }))
    }

    return (
        <div className={classes['model']} data-pubid={props.pubId}>
            <input key={Math.random()} defaultValue={props.name} />
            <input key={Math.random()} defaultValue={props.index} />
            <button onClick={removeOnClick} data-pubid={props.pubId}>Remove</button>
            <button onClick={updateOnClick}>Update</button>
        </div>
    );
}

export default Model__;