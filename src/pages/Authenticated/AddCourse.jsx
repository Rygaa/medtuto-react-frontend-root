// import classes from './Header.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { removeCourse__, requestModels__, createNewCourse__ } from 'store/proxy'
import { requestFaculties__ } from 'store/proxy'
import { requestCourses2__ } from "store/proxy"
import { requestYears__ } from "store/proxy"
import classes from "assets/6-pages/AddCourse.module.scss"

import Course__ from "components/Course__";

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
        setSelectedFaculty(e.target.value)
        dispatch(requestYears__({ idToken, facultyPubId: e.target.value }))
    }

    const yearsSelectOnChange = (e) => {
        setSelectedYear(e.target.value)
        dispatch(requestModels__({ idToken, yearPubId: e.target.value }))
    }
    const modelsSelectOnChange = (e) => {
        console.log(e);
        setSelectedModel(e.target.value)
        console.log('selected:', selectedModel);
        dispatch(requestCourses2__({ idToken, modelPubId: e.target.value}))
    }

    const newCourseNameOnChange = (e) => {
        setNewCourseName(e.target.value);
    }

    const newCourseIndexOnChange = (e) => {
        setNewCourseIndex(e.target.value);
    }
    const newCourseOnClick = (e) => {
        e.preventDefault();
        dispatch(createNewCourse__({ model: selectedModel, newCourseName, newCourseIndex}));
    }



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
    const modelsList = [
        <option value={'select'} selected disabled>Please</option>
    ]
    
    modelsList.push(models.map((model) => (
        <option value={model.pubId} label={model.name}>{model.name}</option>

    )));


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
        <section className={classes['course-section']}>
            <div className={classes['select-container']}>
                <select placeholder='Choose your faculty' onChange={facultiesSelectOnChange}>{facultiesList}</select>
                <select placeholder='Choose your year' onChange={yearsSelectOnChange}>{yearsList}</select>
                <select placeholder='Choose your model' onChange={modelsSelectOnChange}>{modelsList}</select>
            </div>
            <div className={classes['course-container']}>
                {coursesList}
            </div>
            <form className={classes['form-add-course']}>
                <input placeholder={'Name'} value={newCourseName} onChange={newCourseNameOnChange} />
                <input placeholder={'Index'} value={newCourseIndex} onChange={newCourseIndexOnChange} />
                <button onClick={newCourseOnClick}>ADD</button>
            </form>
        </section>


    );
}

export default AddCourse;