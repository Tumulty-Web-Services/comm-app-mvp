/*
Documentation

Corresponds to /page/1

*/

import React, {Component} from 'react';


import {connect} from 'react-redux';




// import johnCutOut from '../../../../assets/img/johnCutOut.png';

// import AuxWrapper from '../../../../globalComponents/AuxWrapper';


// import BlogCard1 from '../../components/stateless/BlogCard1';

// import ImgThree from '../../components/stateless/ImgThree';


// import heroku from '../../../../assets/img/heroku.png';  
// import cssTricks from '../../../../assets/img/css-tricks.png';

// import TopResources from '../../components/stateless/TopResources';

// import ArticleSidebar from '../../components/stateless/ArticleSidebar'




class IsDeveloper extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        
        return (

            <div></div>

            // <div className="no-header sales-page" >



            //     <div className="hero-main sales" style={{    backgroundImage: 'url("https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559828542439")' }}>
            //         <div className="filter">

            //            <div className="filter-dark">
            //             <div className="container ">
            //                     <div className="row">
                                
            //                         <div className="col l10 s12 column" >


            //                             {/* <h3 className="sub-title">Coding For Business</h3>
            //                             <h2 className="title">What separates developers <span className="text-underline">who make money</span> from the ones who don't?</h2>
                                        

            //                             <p >Coding has become a dispensable skill... well a good chunk of it anyway. So why are some developers paid incredible salaries and have non stop work in their business while others fail to make even $750 for a simple website? It's their ability to:</p> 
                                            
            //                             <h3 className="sub-title gradient">effectively create what a person wants in a way that they understand.</h3> */}

            //                             <h2 className="title">Today Is the Day You Stop Guessing & Start Knowing.</h2>
            //                             <p className="sub-title-color">Stop relying on emotion. Start relying on the truth.</p>

            //                             <p className="text">
            //                                 The Sang Lucci playbook teaches traders how to recognize<br /> 
            //                                 the truth about the markets, themselves and their sources of <br />
            //                                 information so they can finally find their edge.
            //                             </p>

            //                             <Link className="btn" to="/">Get the playbook</Link>
                                        
            //                         </div>

            //                         <div className="col l3 s12 column"></div>
                                
                                
            //                     </div>
            //                 </div>                       
            //             </div>
                    
            //         </div>
            //     </div>

            //     {/* <div className="contaner top-resource-container z-depth-5" >
            //         <h2 className="title" >Top Resources</h2>
            //         <p className="sub-title">* I currently do not get any commisions for products or services recommended on
            //                     this site. Everything on here is something I have used and believe in 100%.</p>
            //                 <br />
            //         <TopResources />
            //     </div> */}

                

                
            //     <div className="main dark page-home">

            //             {/* <div className="section">
            //                 <div className="container" style={{marginTop: 75}}>
            //                     <div className="row ">
                                
            //                         <div className="col l5">
                                    
            //                         <ImgThree 
            //                                 className=""
            //                                 img="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559786561979"
            //                                 link=""
            //                                 alt="heroku"
            //                                 openNewTab={true}
            //                                 tilt="left"
            //                             />

            //                         </div>
            //                         <div className="col l6 push-l1">
                                        
            //                             <h2 className="title">Does this look familiar?</h2>

            //                             <p>Countless hours spent in front of your computer trying to create something that will get you paid. </p>
            //                             <p>Maybe it lands you a new client and maybe it will be the breakthrough software that got you into coding in the first place.</p>
            //                             <h3 className="gradient text-uppercase font-weight-bold title">The problem is it <strong className="text-italic">won't</strong>.<br/> And this time <strong className="text-italic">will not</strong> be different.</h3>

            //                         </div>

            //                     </div>
            //                 </div>
            //             </div> */}

            //             <div  className="section  section-padding-140 ">
            //                 <div className="container relative">
            //                     <div className="row ">
            //                         <div className="col l12 ">
            //                             <h2 className="title-alt text-center">
            //                             You Risked It All to Become.<br />
            //                             A Full Time Trader...
            //                             </h2>

            //                             <hr className="small" style={{position: 'relative', left: -70}} />

            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

            //             <div  className="section bg-dark img-right-lower ">
            //                 <div className="container relative">
            //                     <div className="row ">
            //                         <div className="col l12 ">
                                        
            //                             <div className="text-content">
            //                                <h3 className="title-alt-small">You took the courses, attended the seminars and did everything they told you to do...</h3>

            //                                <p className="sub-title-color" style={{marginTop: 40, marginBottom: 20}}>Maybe you even made some money.</p>

            //                                <p className="text-small">
            //                                     But then you felt the sting of a position go against you.<br />
            //                                     Half of your account is gone. <br />
            //                                     So you get angry and frustrated. At the market and yourself. <br />
            //                                </p>

            //                                 <p className="text-small">
            //                                     Then you place a bigger order just to win it back.<br />
            //                                     Revenge trading, big mistake...<br />
            //                                     Next thing you know… <br />
            //                                     Another blown up account. Back to square one.

            //                                 </p>

            //                             </div>

            //                             <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559826965661" />

            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

            //             <div  className="section section-padding-200">
            //                 <div className="container relative">
            //                     <div className="row ">
            //                         <div className="col l12 ">
                                        
            //                             <div className="quote">
            //                                 <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559833920779" alt="" />
            //                             </div>

            //                             <h2 style={{fontSize: 35}} className="title-alt-small text-center">
            //                             Something’s throwing you off your game.<br />
            //                             You can’t articulate it but you can feel it.<br />
            //                             Forces are working against you, but you can’t identify them…<br />
            //                             </h2>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

            //             <div  className="bg-dark half-img-left ">
            //                 <div className="row " >

            //                     <div className="col l6 s12 img-left" > </div>

            //                     <div className="col l6 s12 content-right">
                                    
            //                         <div className="text-content section-padding-50">
            //                             <h2 className="title-alt-2">Welcome to The Matrix</h2>
            //                             <hr className="small" style={{position: 'relative', left: -110, top: -10, width: 75}} />
            //                             <h2 className="title-alt-small">A deceptive system designed to drain your account and turn your emotions against you.</h2>

            //                             <p className="text-small">I was stuck in The Matrix too.</p><br/><br/>

            //                             <p className="text-small">It all started after college. I was working as a financial analyst.</p>
            //                             <p className="text-small">But the thought of blinking, only to wake up 40 years later with a wasted life…</p>
            //                             <p className="text-small">That terrified me. So I quit.</p><br/><br/>

            //                             <p className-="title" style={{fontSize: 22, lineHeight: '24px', letterSpacing: '.32px'}}>For so long, I felt like I was trading without an edge.</p><br/><br/>
            //                             <p className="text-small">I was guessing - always guessing. </p>
            //                             <p className="text-small">Never fully understanding the cause and effect of why markets move the way they do. </p>
            //                         </div>
                                    
            //                     </div>
            //                 </div>
            //             </div>

            //             <div  className="section two-img-offset section-padding-200">
            //                 <div className="container">
            //                     <div className="row " >

            //                         <div className="col l6 s12" > 

            //                             <div className="text-content">
            //                                 <h2 className="title-alt-small" style={{fontSize: 35}}>
            //                                     The more I followed mainstream media,<br/> 
            //                                     the more I lost.
            //                                 </h2>
            //                                 <p>
            //                                     So I did what every trader does without a system...<br/>
            //                                     let my emotions take over.
            //                                 </p>
            //                                 <p>
            //                                     I started over-trading, revenge trading...<br />
            //                                     Holding shit for too long.
            //                                 </p>

            //                                 <p className="sub-title-color">Ultimately, blowing up my account more times than I care to admit.</p>
                                           
            //                             </div>
            //                         </div>

            //                         <div className="col l6 s12">
                                        
            //                             <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559833127124" alt="" />
            //                             <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559833118939" alt="" />
                                        
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

            //             <div  className=" bg-picture text-center" style={{backgroundImage: 'url("https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559834261612")'}}>
            //                 <div className="filter section">
            //                     <div className="container">
            //                         <div className="row " >

            //                             <div className="col l12"  > 

            //                                 <div className="quote">
            //                                     <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1559833920779" alt="" />
            //                                 </div>

            //                                 <h2 className="title-alt-small">
            //                                     The fear of failure kicked in...<br />
            //                                     Crippling debt and agonizing guilt followed.
            //                                     </h2>
            //                                     <h2 className="title-alt-small">
            //                                     I had a daughter that needed me. A family that depended on me. <br />
            //                                     How could I let them down?
            //                                 </h2>

            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>

                        

                    

            //     </div>

                



            //     <CornerCreated />

            // </div>
        )

    }

}

const mapStateToProps = state => {
    return {

        published_articles: state.articles.published_articles,
        article_category_names: state.articles.article_category_names,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IsDeveloper);


