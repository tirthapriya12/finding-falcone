import React  from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function DefaultPageLayout(props) {

    return (
        <React.Fragment>
            <Header headerbuttons={props.headerbuttons}/>
            {props.children}
            <Footer />
        </React.Fragment>
    )
}