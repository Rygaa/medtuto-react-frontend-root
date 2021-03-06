// import classes from './Header.module.scss'
import { NavLink } from "react-router-dom"
import classes from 'assets/4-layout/RightNav.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const RightNav = (props) => {
    const isConnected = useSelector((state) => state.user.isConnected)
    const [NavDropdown, setNavDropDown] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (props.dropdown)
            setNavDropDown(true);
        if (props.dropdown && props.open)
            setDropdownOpen(true);

    }, [])

    return (isConnected == false ? 
        <nav className={props.dropdown ? classes['right-nav-dropdown'] : classes['right-nav']}>
            <NavLink to={'/login'} className={!dropdownOpen ? classes['nav-link'] : classes['nav-link-dropdown']}>Login</NavLink>
        </nav> : 
        null
        );

}

export default RightNav;







    // return (!isConnected ?
    //     <nav ref={myRef} className={classes['right-nav']}>
    //         <NavLink to={'/login'} className={classes['nav-link']}>Login</NavLink>
    //         <NavLink to={'/sign-up'} className={classes['nav-link']}>Sign up</NavLink>
    //         <Button className={classes['buttonn']}>Hello</Button>
    //     </nav> :
    //     <nav ref={myRef} className={classes['right-nav']}>
    //         <NavLink to={'/about-us'} className={classes['nav-link']}>About us</NavLink>
    //         <NavLink to={'/my-account'} className={classes['nav-link']}>My Account</NavLink>
    //     </nav>
    // );
    // <nav ref={myRef} className={classNames(classes['right-nav'],
    //     isHidden(myRef) ? classes['right-nav-drop'] : classes['right-nav-inline']
    // )}>



        // return (
    //     <Navbar bg="light" expand="lg">
    //         <Container>
    //             <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //             <Navbar.Collapse id="basic-navbar-nav">
    //                 <Nav className="me-auto">
    //                     <Nav.Link href="#home">Home</Nav.Link>
    //                     <Nav.Link href="#link">Link</Nav.Link>
    //                     <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //                         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //                         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                         <NavDropdown.Divider />
    //                         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    //                     </NavDropdown>
    //                 </Nav>
    //             </Navbar.Collapse>
    //         </Container>
    //     </Navbar>
    // )