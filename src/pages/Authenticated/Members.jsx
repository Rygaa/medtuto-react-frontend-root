// import classes from './Header.module.scss'

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { requestFaculties__, requestYears__, createNewModel__, requestModels__ } from 'store/proxy'

import Model__ from "components/Model__";
import classes from "assets/6-pages/Members.module.scss"
import { requestAccounts__ } from "store/Member/members-actions";
import Member__ from "components/Member__";
const Members = (props) => {
    const dispatch = useDispatch();
    const idToken = useSelector((state) => state.user.idToken);
    const members = useSelector((state) => state.members.accounts)
    const [searchMember, setSearchMember] = useState('');

    useEffect(() => {
        console.log(members);
    }, [members])

    const searchMemberOnChange = (e) => {
        setSearchMember(e.target.value)
    }

    const membersList = members.map((member) => {
        if (searchMember == '') {
            return <Member__ username={member.username} isTeacher={member.isTeacher} />
        } else {
            if (member.username.includes(searchMember)) {
                return <Member__ username={member.username} isTeacher={member.isTeacher} />
            }
        }
    })



    useEffect(() => {
        dispatch(requestAccounts__({ idToken }))
    }, [])

    return (
        <section className={classes['members-section']}>
            <input placeholder={'username'} value={searchMember} onChange={searchMemberOnChange} />
            <div className={classes['members-container']}>{membersList}</div>
            
        </section>


    );
}

export default Members;