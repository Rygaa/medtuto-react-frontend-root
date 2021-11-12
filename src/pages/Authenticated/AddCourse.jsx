// import classes from './Header.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { removeCourse__, requestModels__, createNewCourse__ } from '../../store/proxy'
import { requestFaculties__ } from '../../store/proxy'
import { requestCourses2__ } from "../../store/proxy"
import {requestYears__ } from "../../store/proxy"


import Course__ from "../../components/Course__";

const AddCourse = (props) => {
    const idToken = useSelector((state) => state.user.idToken);
    const dispatch = useDispatch();
    const faculties = useSelector((state) => state.models.faculties);
    const years = useSelector((state) => state.models.years);
    const models = useSelector((state) => state.models.models);
    const courses = useSelector((state) => state.models.courses);

    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseIndex, setNewCourseIndex] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    useEffect(() => {
        dispatch(requestFaculties__({ idToken }))
    }, [])

    const facultiesSelectOnChange = (e) => {
        setSelectedFaculty(e.pubId)
        dispatch(requestYears__({ idToken, facultyPubId: e.pubId }))
    }

    const yearsSelectOnChange = (e) => {
        setSelectedYear(e.pubId)
        dispatch(requestModels__({ idToken, yearPubId: e.pubId }))
    }
    const modelsSelectOnChange = (e) => {
        console.log(e);
        setSelectedModel(e.pubId)
        console.log('selected:', selectedModel);
        dispatch(requestCourses2__({ idToken, modelPubId: e.pubId}))
    }

    const newCourseNameOnChange = (e) => {
        setNewCourseName(e.target.value);
    }

    const newCourseIndexOnChange = (e) => {
        setNewCourseIndex(e.target.value);
    }
    const newCourseOnClick = (e) => {
        dispatch(createNewCourse__({ model: selectedModel, newCourseName, newCourseIndex}));
    }



    const facultiesList = faculties.map((faculty) => (
        { key: Math.random(), value: faculty.name, label: faculty.name, pubId: faculty.pubId }
    ));
    const yearsList = years.map((year) => (
        { key: Math.random(), value: year.name, label: year.name, pubId: year.pubId }
    ));
    const modelsList = models.map((model) => (
        { key: Math.random(), value: model.name, label: model.name, pubId: model.pubId }
    ));

    const removeOnClick = (e) => {
        console.log(e.target.attributes[0].nodeValue)
        const coursePubId = e.target.attributes[0].nodeValue
        dispatch(removeCourse__({ idToken, modelPubId: selectedModel, coursePubId }))
    }
    const coursesList = courses.map((course) => (
        <Course__ 
            faculty={selectedFaculty} 
            year={selectedYear} 
            model={selectedModel} 
            pubId={course.pubId}
            name={course.name}
            index={course.index}
        />
    ));

    return (
        <div style={{ backgroundColor: "gray", gridColumn: "3 / 4", gridRow: "2 / 3", border:"5px solid black" }}>
            <Select options={facultiesList} placeholder='Choose your faculty' onChange={facultiesSelectOnChange}></Select>
            <Select options={yearsList} placeholder='Choose your year' onChange={yearsSelectOnChange}></Select>
            <Select options={modelsList} placeholder='Choose your model' onChange={modelsSelectOnChange}></Select>
            <div style={{ height: "200px", overflowY: "scroll" }}>
                {coursesList}
            </div>
            <input value={newCourseName} onChange={newCourseNameOnChange} />
            <input value={newCourseIndex} onChange={newCourseIndexOnChange} />
            <button onClick={newCourseOnClick}>ADD</button>
        </div>


    );
}

export default AddCourse;