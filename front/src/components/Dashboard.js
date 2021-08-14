import React, {useEffect, useState} from 'react';
import {URI} from "../App.js";
import kidsVector from './kidsvector.svg';
import leaders from './leaders.png';
import CountUp from 'react-countup';
import Book from "./Book";
import Aos from 'aos';
import VisibilitySensor from 'react-visibility-sensor';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {

    const [books, setBooks] = useState([]);
    const [hasBeenSeen, setHasBeenSeen] = useState(false);
    const [index, setIndex] = useState(() => { let nr = Math.floor(window.innerWidth/288 - 1);
        if(nr <= 0) return 1;
        else return nr;
    });
    const [start, setStart] = useState(0);

    const changeHandler = (isVisible) => {
        if(isVisible)
        setHasBeenSeen(true);
    }

    window.addEventListener('resize', () => setIndex(() => { let nr = Math.floor(window.innerWidth/288 - 1);
        setStart(0);
        if(nr <= 0) return 1;
        else return nr;
    }));
    

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
            <div className="row mt-5 justify-content-center">
                <div data-aos="fade-up" data-aos-once="true"  className="col-lg-6">
                    <img src={kidsVector} alt="kids" id="kids"></img>
                </div>
                <div data-aos="fade-left" data-aos-once="true" className="col-lg-6 description">
                <h3 className="px-5 mt-5 mr-5" style={{fontWeight: 300}}>BOOKarest Donate&Exchange este un eveniment caritabil cu și despre cărți, care se focusează pe începutul educației pentru copii aflați sub tutela asociațiilor umanitare.
                </h3>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className="row text-center">
            <VisibilitySensor partialVisibility offset={{bottom: 200}} onChange={changeHandler} delayedCall>
                    <div className="countup-inner">
                        <CountUp end={hasBeenSeen? 1000 : 0} duration={1.5} className="countup"/>
                        <h1 className="mt-0">Cărți donate</h1>
                    </div>
                </VisibilitySensor>
            </div>
            
            <div data-aos="fade-up" data-aos-once="true" className="row justify-content-center">
                <img src={leaders} alt="leaders" id="leaders"></img>
            </div>
            <div className="row carousel">
                <div data-aos="fade-down" data-aos-once="true" className="row mt-5 mb-5 justify-content-center">
                    <h1 className="text-center text-white mt-5">Cărți valabile pentru exchange</h1>
                    {
                        start > 0 ?
                        <button className="chevron" onClick={() => {setStart(start-index); console.log(start)}}>
                            <FontAwesomeIcon icon={faChevronUp}  size="2x"/>
                        </button>
                        :null

                    }
                    {
                        books !== [] ? 
                            books.map((b, i) => {if(i >= start && i < start + index) return (<Book book={b}></Book>); else return null;})
                        :
                        <></>
                    }
                    {
                        start + index < books.length ?
                        <button className="chevron" onClick={() => {setStart(start+index); console.log(start+index)}}>
                            <FontAwesomeIcon icon={faChevronDown}  size="2x"/>
                        </button>
                        :
                        null
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