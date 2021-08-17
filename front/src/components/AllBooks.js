import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {URI} from "../App.js";
import Book from './Book.js';

const AllBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async() =>{
            const req = await fetch(URI + "getbooks");
            const res = await req.json();
            setBooks(res.books);
        }
        Aos.init({duration: 1000});
        getBooks()
    }, [])

    return (
        <> 
        <h1 className="allbooks">Toate cărtile valabile pentru exchange</h1>
            <div className="row carousel">
                <div data-aos="fade-down" data-aos-once="true" className="row mb-5 justify-content-center">
                    {books.map(b => <Book book={b}></Book>)}
                </div>
            </div>
        </>
    );
}
 
export default AllBooks;