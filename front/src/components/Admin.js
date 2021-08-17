import React, {useEffect, useState} from 'react';
import Book from './Book';
import {URI} from "../App.js";
import Modal from 'react-modal';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Form } from 'react-bootstrap';

const Admin = () => {

    const [books, setBooks] = useState([]);
    const [donatedBooks, setDonatedBooks] = useState([]);
    const [page, setPage] = useState('books');
    const [update, setUpdate] = useState();
    const [bookType, setBookType] = useState(false);

    const [modalIsOpen2,setIsOpen2] = useState(false);
    const [addedBook, setAddedBook] = useState('');
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const token = localStorage.getItem('token');

    const addbook = async() => {
        if(bookType === false){
            setAddedBook(false);
            return;
        }
        setSelectedFile();
        setIsFilePicked(false);
        setBookType();
        const formdata = new FormData();
        formdata.append("authors", authors);
        formdata.append("title", title);
        formdata.append("type", bookType);
        if(!selectedFile)
            return;
        if(selectedFile)
        formdata.append("thumbnail", selectedFile, selectedFile.name);
        const req = await fetch(URI +'addbook',{
            method: 'POST',
            headers:{
                "x-auth-token": JSON.parse(token)
            },
            body: formdata
        })
        if(req.status === 201){
            setAddedBook(true);
            setUpdate(!update);
            setTimeout(() => {
                closeModal2();
            }, 1000);
        }else{
            setAddedBook(false);
        }
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
        function openModal2() {
            setIsOpen2(true);
        }
        
        function closeModal2(){
            setIsOpen2(false);
            setAddedBook('');
            setIsFilePicked(false)
            setSelectedFile();
        }

        const handleSubmit = (event) => {
            event.preventDefault();
        }

        const changeHandler = (event) => {
            if(event && event.target.files[0] !== undefined){
                setSelectedFile(event.target.files[0]);
            }
            else{
                setIsFilePicked(false);
                return;
            }
            setIsFilePicked(true);
            setAddedBook('');
        };

    const handlePageChange = () => {
        setPage('donatedBooks');
        const getDonatedBooks = async() =>{
            const req = await fetch(URI + "getdonatedbooks/false",{
                method: "GET",
                headers: {
                    'x-auth-token': JSON.parse(token)
                }
            });
            const res = await req.json();
            setDonatedBooks(res.books);
        }
        if(donatedBooks === [])
            getDonatedBooks();
    }

    useEffect(() => {
        const getBooks = async() =>{
            const req = await fetch(URI + "getbooks");
            const res = await req.json();
            setBooks(res.books);
        }
        Aos.init({duration: 0});
        getBooks();
    }, [update]);

    return ( 
        <>
        <Modal 
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Add book</h2>
              <div className="form-group">
                <label className="create-label">Title</label>
                <input 
                    id="title"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setTitle(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Authors</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setAuthors(e.target.value);
                                  }
                              }
                />
              </div>
            <Form>
            <div key={'inline-radio'} className="mb-3 mt-5">
                <Form.Check
                    inline
                    label="Exchanged Book"
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    onChange={() => setBookType('exchange')}
                />
                <Form.Check
                    inline
                    label="Donated Book"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    onChange={() => setBookType('donate')}
                />
            </div>
            </Form>
            <div className="row justify-content-center mb-4">
            <input type="file" id="upload" hidden onChange={changeHandler}/>
            {
                isFilePicked ?
                <>
                <button className="btn btn-danger h-25" onClick={() => {
                    setIsFilePicked(false); setSelectedFile()}
                }>
                    x
                </button>
                <label id="uploadSelected" htmlFor="upload">{selectedFile.name}</label>
                </>
                :
                <label id="upload" htmlFor="upload">Choose File</label>
            }
            </div>
            {
                addedBook === false?
                <h5 className="text-center text-danger">Make sure all field are completed</h5>
                :
                addedBook === true?
                <h5 className="text-center text-success">Added book!</h5>
                :
                <></>
            }
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-light mr-5 reviewCreate" onClick={addbook}>Add book</button>
              <button onClick={closeModal2} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
           </form>
        </Modal>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <button className="btn btn-light" onClick={openModal2}>Add book</button>
                {
                    page === 'books'?
                    <>  
                        <button className="btn btn-dark" onClick={handlePageChange}>DonatedBooks</button>
                        <h1 className="text-center">Available books</h1>
                        {
                            books.map(b => <Book    
                                                    isAdmin={true}
                                                    book={b} 
                                                    update={update} 
                                                    setUpdate={setUpdate} 
                                                    key={b._id}/>)
                        }
                    </>
                    :
                    page === 'donatedBooks'?
                    <>
                    <button className="btn btn-dark" onClick={() => setPage('books')}>Exchaned books</button>
                    <h1 className="text-center">Donated books</h1>
                    {
                        donatedBooks.map(b => <Book    
                                                isAdmin={true}
                                                book={b} 
                                                update={update} 
                                                setUpdate={setUpdate} 
                                                key={b._id}/>)
                    }
                    </>
                    :null
                }
            </div>
        </div>
        </>
     );
}
 
export default Admin;