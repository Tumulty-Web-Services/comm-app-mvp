import React from 'react'

import codeCollege from '../../../../assets/img/code-college.png';
import heroku from '../../../../assets/img/heroku.png';  
import cssTricks from '../../../../assets/img/css-tricks.png';
import vsCode from '../../../../assets/img/vs-code.png';

import ImgThree from './ImgThree';

const TopResources = (props) => {


    return (

        <div className="row">
            <div className="col l6 m12">
                <div className="row">

                    <div className="col m6 s12">
                       
                        <ImgThree 
                            img={cssTricks}
                            link="https://css-tricks.com"
                            alt="CSS Tricks Website"
                            openNewTab={true}
                            tilt="left"
                        />

                        <h3 className="title gradient"><a href="https://css-tricks.com" target="_blank" rel="noopener noreferrer" >CSS Tricks</a></h3>
                        <p className="text">The best online resource I have found for learning in-depth css.</p>
                    </div>

                    <div className="col m6 s12">

                        <ImgThree 
                            img={heroku}
                            link="https://heroku.com"
                            alt="Heroku Website"
                            openNewTab={true}
                            tilt="left"
                        />

                        <h3 className="title gradient"><a href="https://heroku.com" target="_blank" rel="noopener noreferrer" >Heroku</a></h3>
                        <p className="text">The easiest way to launch a Node JS Application and implement CICD.</p>
                    </div>

                </div>


            </div>
            <div className="col l6 m12">
                <div className="row">

                    <div className="col m6 s12">

                        <ImgThree 
                            img={codeCollege}
                            link="https://codecollege.ca"
                            alt="Code College Website"
                            openNewTab={true}
                            tilt="left"
                        />

                        <h3 className="title gradient"><a href="https://codecollege.ca" target="_blank" rel="noopener noreferrer" >Code College</a></h3>
                        <p className="text">Fantastic courses to begin your life as a front end web developer.</p>
                    </div>

                    <div className="col m6 s12">

                        <ImgThree 
                            img={vsCode}
                            link="https://code.visualstudio.com/"
                            alt="VS Code Website"
                            openNewTab={true}
                            tilt="left"
                        />

                        <h3 className="title gradient"><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" >VS Code</a></h3>
                        <p className="text">The best code editor I have ever used updated monthly and... its free!!!</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );

}

export default TopResources;