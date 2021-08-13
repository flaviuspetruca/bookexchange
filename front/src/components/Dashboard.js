import React, {useEffect, useState} from 'react';
import {URI} from "../App.js";
import kidsVector from './kidsvector.svg';
import leaders from './leaders.png';
import CountUp from 'react-countup';
import Book from "./Book";
import Aos from 'aos';
import VisibilitySensor from 'react-visibility-sensor';
import 'aos/dist/aos.css';

const Dashboard = () => {

    const [books, setBooks] = useState([]);
    const [seen, setIsSeen] = useState(true);

    const changeVisibility = () => {
        setIsSeen(false);
    }

    useEffect(() => {
        const getBooks = async() =>{
            const req = await fetch(URI + "getbooks");
            const res = await req.json();
            setBooks(res.books);
        }
        Aos.init({duration: 2000});
        getBooks()
    }, []);
    
    return ( 
        <div style={{width: "100%"}}>
                <h1 className="title">BOOKarest</h1>
            <div className="row mt-5">
                <div data-aos="fade-up" data-aos-once="true"  className="col-xl-6">
                    <img src={kidsVector} alt="kids" id="kids"></img>
                </div>
                <div data-aos="fade-left" data-aos-once="true" className="col-xl-6 mt-5">
                <h3 className="px-5 mt-5 description">BOOKarest Donate&Exchange este un eveniment caritabil cu și despre cărți, care se focusează pe începutul educației pentru copii aflați sub tutela asociațiilor umanitare.
                </h3>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className="row text-center">
            <VisibilitySensor partialVisibility offset={{ bottom: 200 }} onChange={changeVisibility} scrollCheck={false}>
                {({ isVisible }) => (
                    <div style={{ height: 500 }}>
                        {isVisible ? 
                        <>
                        <CountUp end={1000} duration={1.5} className="countup"/>
                        <h1 className="mt-0">Cărți donate</h1>
                        </> : 
                        null
                        }
                    </div>
                    )}
                </VisibilitySensor>
            </div>
            
            <div data-aos="fade-up" data-aos-once="true" className="row justify-content-center">
                <img src={leaders} alt="leaders" id="leaders" style={{marginTop: "10rem"}}></img>
            </div>
            <div className="row carousel">
                <div data-aos="fade-down" data-aos-once="true" className="row mt-5 mb-5">
                    <h1 className="text-center text-white mt-5">Cărți valabile pentru exchange</h1>
                    {
                        books !== [] ? 
                            books.map(b => <Book book={b}></Book>)
                        :
                        <></>
                    }
                </div>
            </div>
            <footer>
                <div className="row justify-content-center">
                    <p className="text-center mt-5">@BOOKarest Donate & Exchange 2021</p>
                </div>
            </footer>
        </div> 
    );
}

export default Dashboard;