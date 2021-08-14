import React from 'react';
import Card from 'react-bootstrap/Card'

const Book = ({book}) => {
    const thumbnail = book.thumbnail;
    const authors = book.authors;
    const title = book.title;

    return ( 
        <div className="col-lg-2 book-card">
            <Card data-aos="fade-down" data-aos-once="true">
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
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default Book;