import React from 'react';
import helpImage from '../../assets/help_img.PNG';

export default () => {

    return (
        <section>
            <h1>Find Falcone</h1>
            <p>
                Our problem is set in the planet of Lengaburu…in the distant
                distant galaxy of Tara B. After the recent war with neighbouring
                planet Falicornia, King Shan has exiled the Queen of Falicornia
                for 15 years.
                Queen Al Falcone is now in hiding. But if King Shan can find
                her before the years are up, she will be exiled for another 15
                years….
            </p>
            <p>
                King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing,
                Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these
                planets.
            </p>
            <p> Here are some vehicle info you can use</p>
            <br />
            <img width="750px" src={helpImage}></img>
        </section>
    )
}