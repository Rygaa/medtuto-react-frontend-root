// import classes from './Header.module.scss'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "assets/6-pages/Root__.module.scss"
import AddFaculty from "./AddFaculty";
import AddYear from "./AddYear";
import AddModel from "./AddModel";
import AddCourse from "./AddCourse";



const Root__ = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const [selectedPage, setSelectedPage] = useState('');


    const selectedPagesOnChange = (e) => {
        console.log(e.target.value);
        setSelectedPage(e.target.value)
    }

    const displaySelectedPage = () => {
        switch (selectedPage) {
            case 'Add faculty': 
                return <AddFaculty />
            case 'Add year':
                return <AddYear />
            case 'Add models':
                return <AddModel />
            case 'Add course':
                return <AddCourse />
            default: 
                return <AddFaculty />

        }
    }
    useEffect(() => {

    }, [selectedPage])

    const page = displaySelectedPage();

    return (
        <section className={classes['Root__']}>
            <select onChange={selectedPagesOnChange}>
                <option selected>Add faculty</option>
                <option>Add year</option>
                <option>Add models</option>
                <option>Add course</option>
            </select>
            {page}
        </section>
    );
}

export default Root__;