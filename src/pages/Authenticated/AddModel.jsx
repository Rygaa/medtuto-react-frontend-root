// import classes from './Header.module.scss'

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { requestFaculties__, requestYears__, createNewModel__, requestModels__ } from '../../store/proxy'

import Model__ from "../../components/Model__";

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
        setSelectedFaculty(e.pubId)
        dispatch(requestYears__({ idToken, facultyPubId: e.pubId }))
    }

    const yearsSelectOnChange = (e) => {
        setSelectedYear(e.pubId)
        dispatch(requestModels__({ idToken, yearPubId: e.pubId }))
    }


    const newModelNameOnChange = (e) => {
        setNewModelName(e.target.value);
    }
    const newModelIndexOnChange = (e) => {
        setNewModelIndex(e.target.value);
    }

    const newModelOnClick = (e) => {
        dispatch(createNewModel__({
            idToken, 
            yearPubId: selectedYear, 
            description: "x", 
            newModelName: newModelName,
            newModelIndex: newModelIndex,
            picture1: imgInputRef.current.files[0],
            picture2: img2InputRef.current.files[0]
        }));
    }

    useEffect(() => {
        dispatch(requestFaculties__({ idToken }))
    }, [])

    const facultiesList = faculties.map((faculty) => (
        { key: Math.random(), value: faculty.name, label: faculty.name, pubId: faculty.pubId }
    ));
    const yearsList = years.map((year) => (
        { key: Math.random(), value: year.name, label: year.name, pubId: year.pubId }
    ));

    const modelsList = models.map((model) => (
        <Model__ faculty={selectedFaculty} year={selectedYear} pubId={model.pubId} name={model.name} index={model.index}/>
    ));


    return (
        <div style={{ backgroundColor: "gray", gridColumn: "1 / 2", gridRow: "2 / 3", border: "5px solid gray"  }}>
            <Select options={facultiesList} placeholder='Choose your faculty' onChange={facultiesSelectOnChange}></Select>
            <Select options={yearsList} placeholder='Choose your year' onChange={yearsSelectOnChange}></Select>
            <div style={{ height: "200px", overflowY: "scroll" }}>
            {modelsList}
            </div>
            <input type="file" type="file" ref={imgInputRef}></input>
            <input type="file" type="file" ref={img2InputRef}></input>

            <input value={newModelName} onChange={newModelNameOnChange} />
            <input value={newModelIndex} onChange={newModelIndexOnChange} />
            <button onClick={newModelOnClick}>ADD</button>
        </div>


    );
}

export default AddModel;