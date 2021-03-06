import React, {useEffect, useState} from 'react';
import {URI} from "../App.js";
import kidsVector from './kidsvector.svg';
import leaders from './leaders.png';
import tea from './tea.png';
import concordia from './concordia.png';
import CountUp from 'react-countup';
import Book from "./Book";
import Aos from 'aos';
import 'aos/dist/aos.css';
import VisibilitySensor from 'react-visibility-sensor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const Dashboard = () => {

    const [nrBooks, setNrBooks] = useState(0);
    const [books, setBooks] = useState([]);
    const [hasBeenSeen, setHasBeenSeen] = useState(false);
    const [index, setIndex] = useState(() => { let nr = Math.floor(window.innerWidth/288 - 1);
        if(nr <= 0) return 1;
        else return nr;
    });

    const history = useHistory();
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
        const getDonatedBooks = async() =>{
            const req = await fetch(URI + "getdonatedbooks/true");
            const res = await req.json();
            console.log(req.status);
            setNrBooks(res.length);
        }
        getDonatedBooks();
        Aos.init({duration: 2000});
        getBooks()
    }, []);
    
    return ( 
        <div style={{width: "100%"}}>
                <h1 className="title">BOOKarest</h1>
            <div className="row mt-5 justify-content-center" style={{marginTop: "30px"}} >
                <div data-aos="fade-up" data-aos-once="true"  className="col-lg-6">
                    <img src={kidsVector} alt="kids" id="kids"></img>
                </div>
                <div data-aos="fade-left" data-aos-once="true" className="col-lg-6 description">
                <h3 className="px-5 mt-5 mr-5" style={{fontWeight: 300}}>BOOKarest Donate&Exchange este un eveniment caritabil cu ??i despre c??r??i, care se focuseaz?? pe ??nceputul educa??iei pentru copiii afla??i sub tutela asocia??iilor umanitare.
                </h3>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className="row text-center">
            <VisibilitySensor partialVisibility offset={{bottom: 100}} onChange={changeHandler} delayedCall>
                    <div className="countup-inner">
                        <CountUp end={hasBeenSeen? nrBooks : 0} duration={1.5} className="countup"/>
                        <h1 className="mt-0">C??r??i donate</h1>
                    </div>
                </VisibilitySensor>
            </div>
            
            <div data-aos="fade-up" data-aos-once="true" className="row justify-content-center">
                <img src={leaders} alt="leaders" id="leaders"></img>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className="event mt-5">
                <h1 className="allbooks">Despre eveniment</h1>
                <p className="eveniment">Dac?? nu cumva ave??i treab?? sau dac?? nu ??ti??i ce s?? face??i ??n weekendul <b>4-5 septembrie</b>, ??ntre orele <b>11.00 ??i 18.00</b>, v?? invit??m la o cafea al??turi de noi ??i c????iva oameni dragi din comunitatea <b>T5</b>, la ei ???acas?????, foarte aproape de centrul Bucure??tiului, pe <b>Strada Olimpului, nr. 13B</b>. Fericirea st?? ascuns?? ??n gesturile mici, iar ??n aceast?? perioad?? desf????ur??m un eveniment caritabil pentru a ajuta c????iva copii care se afl?? sub tutela <b>Asocia??iei Concordia</b>.
                Cum s?? v?? preg??ti??i pentru acest weekend? Va trebui s?? r??scoli??i pu??in prin biblioteca sau chiar printr-un magazin ??n c??utarea unor c??r??i. Pentru noi, o carte primit?? va reprezenta o dona??ie, iar dou?? c??r??i vor putea constitui parte din exchange, put??nd alege o carte din cele puse la dispozi??ie</p>
                <p className="eveniment">
                Nu exist?? ???cartea potrivit????? pentru exchange, dar sper??m s?? cre??m o bibliotec?? pentru cei mici, focus??nd-ne foarte mult pe acest tip de c??r??i, astfel, c??r??ile pentru copii vor fi imediat extrase din bibliotec?? ??i vor fi puse deoparte pentru a ajunge direct la <b>Asocia??ia Concordia</b>.
                </p>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className="row justify-content-center mx-0">
                <div className="col-lg-6 px-0 con">
                    <img src={concordia} alt="concordia" id="concordia"></img>
                </div>
                <div className="col-lg-6 mx-0 px-0">
                    <img src={tea} alt="tea" id="tea"></img>
                </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.5443751365933!2d26.096611515393278!3d44.4219944791025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff1196c79c0b%3A0xb2f9ae4f69c21c8a!2sT5%20Social!5e0!3m2!1sen!2sro!4v1629370846639!5m2!1sen!2sro" width="100%" height="400" style={{border:"3px solid black"}} allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div className="row carousel">
                <div data-aos="fade-down" data-aos-once="true" className="row mt-5 mb-5 justify-content-center">
                    <h1 className="text-center text-white mt-5">C??r??i valabile pentru exchange</h1>
                    <div className="row justify-content-center">
                        <button className="btn" id="allbookbutton" 
                                onClick={() => history.push('/allbooks')}>Vezi toate c??r??ile
                        </button>
                    </div>
                    {
                        start > 0 ?
                        <button className="chevron-up" onClick={() => {setStart(start-index)}}>
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
                        <button className="chevron-down" onClick={() => {setStart(start+index)}}>
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
