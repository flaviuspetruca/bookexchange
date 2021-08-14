import React, {useEffect, useState} from 'react';
import Book from './Book';
import {URI} from "../App.js";
import Modal from 'react-modal';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Admin = () => {

    const [books, setBooks] = useState([]);
    const [update, setUpdate] = useState();

    const [modalIsOpen1,setIsOpen1] = useState(false);
    const [modalIsOpen2,setIsOpen2] = useState(false);
    const [addedBook, setAddedBook] = useState('');
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const token = localStorage.getItem('token');

    const deleteBook = async (book) =>{
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

    const addbook = async() => {
        setSelectedFile();
        setIsFilePicked(false);
        const formdata = new FormData();
        formdata.append("authors", authors);
        formdata.append("title", title)
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

        function openModal1(book) {
            setIsOpen1(true);
        }
        
        function closeModal1(){
            setIsOpen1(false);
            setAddedBook('');
        }
        function openModal2() {
            setIsOpen2(true);
        }
        
        function closeModal2(){
            setIsOpen2(false);
            setAddedBook('');
            setSelectedFile();
        }

        const handleSubmit = (event) => {
            event.preventDefault();
        }

        const changeHandler = (event) => {
            if(event && event.target.files[0] !== undefined){
                setSelectedFile(event.target.files[0]);
                console.log("GETRE");
            }
            else{
                setIsFilePicked(false);
                return;
            }
            setIsFilePicked(true);
            setAddedBook('');
        };

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
                <h1 className="text-center">Available books</h1>
                {
                    books.map(b => <div key={b._id}>
                                    <Book book={b}/>
                                        <div className="row justify-content-center">
                                            <button className="btn btn-danger" onClick={() => openModal1(b)}>
                                                Delete
                                            </button>
                                            <Modal 
                                                isOpen={modalIsOpen1}
                                                onRequestClose={closeModal1}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                                ariaHideApp={false}
                                            >
                                                <h5 className="text-center text-danger">Are you sure you want to delete this book?</h5>
                                                <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {deleteBook(b); closeModal1()}}>Delete</button>
                                                <button onClick={closeModal1} className="btn btn-warning cancelLogout">Cancel</button>
                                            </Modal>
                                        </div>
                                    </div>
                            )
                }
            </div>
        </div>
        </>
     );
}
 
export default Admin;