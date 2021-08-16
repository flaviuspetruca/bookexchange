import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Modal from 'react-modal';
import {URI} from "../App.js";

const Book = ({book, setUpdate, update, setAddedBook}) => {
    const thumbnail = book.thumbnail;
    const authors = book.authors;
    const title = book.title;
    
    const token = localStorage.getItem('token');

    const [isAdmin, setIsAdmin] = useState(false);

    const deleteBook = async () =>{
        if(!isAdmin)
            return;
        console.log(book._id);
        const req = await fetch(URI + `deleteBook/${book._id}`, {
            method: "DELETE",
            headers: {
                "x-auth-token": token,
                'Content-Type': 'application/json'
            }
        });
        if(req.status === 200)
            setUpdate(!update);
    }

    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        if(!isAdmin)
            return;
        setIsOpen(true);
    }
    
    function closeModal(){
        if(!isAdmin)
            return;
        setIsOpen(false);
    }

    const customStyles = {
        content : {
            color                 : 'white',
            border                : 'none',
            width                 : '400px',
            top                   : '50%',
            maxHeight             : '90vh',
            overflowY             : 'auto',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transition            : 'all 0.2s ease-in-out',
            transform             : 'translate(-50%, -50%)',
            overflow              : 'hidden',
            borderRadius          : '15px',
            backgroundColor       : '#2b2b2b',
        },
        overlay: {
            backgroundColor         : 'rgba(170, 170, 170, 0.4)',
            zIndex                  : '2000'
        },
    
        };

    useEffect(() => {
	const isAdminFunc = async () =>{
        const req = await fetch(URI + 'isAdmin', {
            method: "GET",
            headers: {
                        "x-auth-token": token
            }
        });
        if(req.status === 200)
            setIsAdmin(true);
        else
       	    setIsAdmin(false);
       	}
	isAdminFunc();
	}, []);
    return (
        <>                                 
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <h5 className="text-center text-danger">Are you sure you want to delete this book?</h5>
            <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {deleteBook(); closeModal()}}>Delete</button>
            <button onClick={closeModal} className="btn btn-warning cancelLogout">Cancel</button>
        </Modal>
        <div className="col-lg-2 book-card" id={book._id}>
            <Card data-aos="fade-down" data-aos-once="true" style={{height: "450px"}}>
                <Card.Img variant="top" src={thumbnail} style={{height: '300px'}} />
                <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
                {
                    <Card.Subtitle className="text-center">{authors.map((a,i) => { 
                                                                        if(i < authors.length - 1) 
                                                                            return (a + ',')
                                                                        else
                                                                            return a
                                                                        }
                                                )}
                    </Card.Subtitle>
                }
                {isAdmin ?
                <button className="btn btn-danger" onClick={() => openModal()}>
                                                Delete
                </button>
                :
                null
                }
                </Card.Body>
            </Card>
        </div>
        </>
     );
}
 
export default Book;
