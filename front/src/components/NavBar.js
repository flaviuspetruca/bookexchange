import React, {useState} from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import Modal from 'react-modal';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


const NavBar = (props) => {

    const token = props.token;
    const logOut = props.logOut;
    const isAdmin = props.isAdmin;
    
      const customStyles = {
        content : {
          color                 : 'white',
          border                : 'none',
          width                 : '400px',
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          overflow              : 'hidden',
          borderRadius          : '15px',
          backgroundColor       : '#2b2b2b',
        },
        overlay: {
          backgroundColor         : 'rgba(92, 92, 92, 0.8)',
      },
    
      };
      const [modalIsOpen,setIsOpen] = useState(false);
      
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
      }

    if(!token)
    return ( 
        <Navbar expand="lg" className="navbar">
            <Container>
                <Navbar.Brand className="navbrand" href="/">
                    <img alt="logo" src={logo} className="logo"></img>
                </Navbar.Brand>

                <Nav className="mr-100 ml-5">
                    <Nav.Link href="https://www.facebook.com/BOOKarest.event/"><FontAwesomeIcon icon={faFacebook}  size="2x" className="smIcons"/></Nav.Link>
                    <Nav.Link href="https://www.instagram.com/bookarest.event/"><FontAwesomeIcon icon={faInstagram}  size="2x" className="smIcons"/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
    else
        return(
            <>
            <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            >
            <h5 className="text-center text-danger">Are you sure you want to log out?</h5>
            <div className="row justify-content-center">
                <button className="btn btn-danger redBtn mt-0 mr-2" onClick={()=> {logOut(); closeModal()}}>Logout</button>
                <button onClick={closeModal} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
            </Modal>

            <Navbar expand="lg" className="navbar">
            <Container>
            <Navbar.Brand className="navbrand" href="/">
                <img alt="logo" src={logo} className="logo"></img>
            </Navbar.Brand>
            <Nav className="mr-100 ml-5">
                    {
                        isAdmin ? <Nav.Link className="btn btn-dark navLink" href="/admin">Admin</Nav.Link> 
                        : <></>
                    }
                    <Nav.Link className="btn btn-light navLink" onClick={openModal}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </>
        );
}

export default NavBar;