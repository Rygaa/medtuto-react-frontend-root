// import classes from './Header.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { requestFaculties__, createNewYear__, requestYears__ } from 'store/proxy'


import classes from "assets/6-pages/AddYear.module.scss"
import Year__ from "components/Year__";


const AddYear = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const faculties = useSelector((state) => state.models.faculties);
    const years = useSelector((state) => state.models.years);

    const [selectedFaculty, setSelectedFaculty] = useState('')
    const [newYearName, setNewYearName] = useState('');
    const [newYearIndex, setNewYearIndex] = useState('');


    const facultiesSelectOnChange = (e) => {
        setSelectedFaculty(e.target.value)
        dispatch(requestYears__({ idToken, facultyPubId: e.target.value }))
    }
    const newYearNameOnChange = (e) => {
        setNewYearName(e.target.value);
    }
    const newYearIndexOnChange = (e) => {
        setNewYearIndex(e.target.value);
    }
    const newYearOnClick = (e) => {
        e.preventDefault();
        dispatch(createNewYear__({ idToken, yearName: newYearName, yearIndex: newYearIndex, facultyPubId: selectedFaculty }));
    }

    useEffect(() => {
        dispatch(requestFaculties__({ idToken }))
    }, [])

    const facultiesList = []
    facultiesList.push(
        <option value={'select'} selected disabled>Please</option>
    )
    facultiesList.push(faculties.map((faculty) => (
        <option value={faculty.pubId} label={faculty.name}>{faculty.name}</option>
    )));


    const yearsList = years.map((year) => (
        <Year__ faculty={selectedFaculty} pubId={year.pubId} name={year.name} index={year.index} />
    ));

    return (
        <section className={classes['year-section']}>
            <div className={classes['select-container']}>
                <select placeholder='Choose your faculty' onChange={facultiesSelectOnChange}>{facultiesList}</select>
            </div>
            
            <div className={classes['years-container']}>{yearsList}</div>
            <form className={classes['form-add-year']}>
                <input placeholder={'name'} value={newYearName} onChange={newYearNameOnChange} />
                <input placeholder={'index'} value={newYearIndex} onChange={newYearIndexOnChange} />
                <button onClick={newYearOnClick}>ADD</button>
            </form>
        </section>


    );
}

export default AddYear;