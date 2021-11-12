// import classes from './Header.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { requestFaculties__, createNewYear__, requestYears__ } from '../../store/proxy'


import classes from "../../assets/6-pages/root/AddYear.module.scss"
import Year__ from "../../components/Year__";


const AddYear = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const faculties = useSelector((state) => state.models.faculties);
    const years = useSelector((state) => state.models.years);

    const [selectedFaculty, setSelectedFaculty] = useState('')
    const [newYearName, setNewYearName] = useState('');
    const [newYearIndex, setNewYearIndex] = useState('');


    const facultiesSelectOnChange = (e) => {
        setSelectedFaculty(e.pubId)
        dispatch(requestYears__({ idToken, facultyPubId: e.pubId }))
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

    const facultiesList = faculties.map((faculty) => (
        { key: Math.random(), value: faculty.name, label: faculty.name, pubId: faculty.pubId }
    ));


    const yearsList = years.map((year) => (
        <Year__ faculty={selectedFaculty} pubId={year.pubId} name={year.name} index={year.index} />
    ));

    return (
        <div style={{ backgroundColor: "gray", gridColumn: "3 / 4 ", border: "5px solid green" }}>
            <Select options={facultiesList} placeholder='Choose your faculty' onChange={facultiesSelectOnChange}></Select>
            <div style={{height: "200px", overflowY: "scroll" }}>
                {yearsList}
            </div>
            <form className={classes['form-add-year']}>
                <input placeholder={'name'} value={newYearName} onChange={newYearNameOnChange} />
                <input placeholder={'index'} value={newYearIndex} onChange={newYearIndexOnChange} />
                <button onClick={newYearOnClick}>ADD</button>
            </form>
        </div>


    );
}

export default AddYear;