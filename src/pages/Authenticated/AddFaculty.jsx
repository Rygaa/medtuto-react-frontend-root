// import classes from './Header.module.scss'

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestFaculties__, createNewFaculty__ } from 'store/proxy'


import classes from "assets/6-pages/AddFaculty.module.scss"
import Faculty__ from "components/Faculty__";

const AddFaculty = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const faculties = useSelector((state) => state.models.faculties);
    const facultiesRef = useRef();

    const [newFaculty, setNewFaculty] = useState();
    const [newFacultyIndex, setNewFacultyIndex] = useState();
    const newFacultyOnChange = (e) => {
        setNewFaculty(e.target.value);
    }
    const newFacultyIndexOnChange = (e) => {
        setNewFacultyIndex(e.target.value);
    }
    const newFacultyOnClick = (e) => {
        dispatch(createNewFaculty__({idToken, facultyName: newFaculty, facultyIndex: newFacultyIndex}));
    }

    useEffect(() => {
        dispatch(requestFaculties__({ idToken }))
    }, [])


    const facultiesList = faculties.map((faculty) => (
        <Faculty__ name={faculty.name} index={faculty.index} pubId={faculty.pubId} />
    ));

    return (
        <section className={classes['faculty-section']}>
            <div ref={facultiesRef} className={classes['faculties-container']}>{facultiesList}</div>
            <form className={classes['form-add-faculty']}>
                <input placeholder={'name'} value={newFaculty} onChange={newFacultyOnChange} />
                <input placeholder={'index'} value={newFacultyIndex} onChange={newFacultyIndexOnChange} />
                <button onClick={newFacultyOnClick}>ADD</button>
            </form>
        </section>
    );
}

export default AddFaculty;