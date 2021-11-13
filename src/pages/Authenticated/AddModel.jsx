// import classes from './Header.module.scss'

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { requestFaculties__, requestYears__, createNewModel__, requestModels__ } from 'store/proxy'

import Model__ from "components/Model__";
import classes from "assets/6-pages/AddModel.module.scss"
const AddModel = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const faculties = useSelector((state) => state.models.faculties);
    const years = useSelector((state) => state.models.years);
    const models = useSelector((state) => state.models.models);

    const [newModelName, setNewModelName] = useState('');
    const [newModelIndex, setNewModelIndex] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('')
    const [selectedYear, setSelectedYear] = useState('')

    const imgInputRef = useRef();
    const img2InputRef = useRef();



    const facultiesSelectOnChange = (e) => {
        setSelectedFaculty(e.target.value)
        dispatch(requestYears__({ idToken, facultyPubId: e.target.value }))
    }

    const yearsSelectOnChange = (e) => {
        setSelectedYear(e.target.value)
        dispatch(requestModels__({ idToken, yearPubId: e.target.value }))
    }


    const newModelNameOnChange = (e) => {
        setNewModelName(e.target.value);
    }
    const newModelIndexOnChange = (e) => {
        setNewModelIndex(e.target.value);
    }

    const newModelOnClick = (e) => {
        e.preventDefault();
        dispatch(createNewModel__({
            idToken, 
            yearPubId: selectedYear, 
            description: "x", 
            newModelName: newModelName,
            newModelIndex: newModelIndex,
            picture1: imgInputRef.current.files[0],
            // picture2: img2InputRef.current.files[0]
        }));
    }

    useEffect(() => {
        dispatch(requestFaculties__({ idToken }))
    }, [])

    const facultiesList = [
        <option value={'select'} selected disabled>Please</option>
    ]
    
    facultiesList.push(faculties.map((faculty) => (
        <option value={faculty.pubId} label={faculty.name}>{faculty.name}</option>
    )));
    const yearsList = [
        <option value={'select'} selected disabled>Please</option>
    ]
    yearsList.push(years.map((year) => (
        <option value={year.pubId} label={year.name}>{year.name}</option>
    )));

    const modelsList = models.map((model) => (
        <Model__ faculty={selectedFaculty} year={selectedYear} pubId={model.pubId} name={model.name} index={model.index}/>
    ));


    return (
        <section className={classes['model-section']}>
            <div className={classes['select-container']}>
                <select placeholder='Choose your faculty' onChange={facultiesSelectOnChange}>{facultiesList}</select>
                <select placeholder='Choose your year' onChange={yearsSelectOnChange}>{yearsList}</select>
            </div>
            <div className={classes['model-container']}>
                {modelsList}
            </div>
            <form className={classes['form-add-model']}>
                <label for="upload">
                    <div>Upload picture</div>
                    <input type="file" id="upload" type="file" ref={imgInputRef}></input>
                </label>
                <input value={newModelName} onChange={newModelNameOnChange} />
                <input value={newModelIndex} onChange={newModelIndexOnChange} />
                <button onClick={newModelOnClick}>ADD</button>
            </form>
        </section>


    );
}

export default AddModel;