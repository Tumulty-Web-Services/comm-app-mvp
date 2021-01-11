import React, {Component} from 'react';



import CornerCreated from '../components/stateless/CornerCreated';
import Hero from '../components/stateless/Hero';


import ArticleSidebar from '../components/stateless/ArticleSidebar'
import AuxWrapper from '../../../globalComponents/AuxWrapper';
import RecentPost from '../components/stateless/RecentPost'

class SiteLanding extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        return (

            <AuxWrapper >

              <Hero
                subTitle="About Me"
                title="COMM App"
                text="The backstory from highschool till college."
              />

                <RecentPost />



                <div className="content-about">


                    <div className="blog-entry dark">


                        <div className="container">

                            <div className="row">
                                <div className="col xl9 l8 m12">

                                    <h2 className="title">Highschool And Before</h2>
                                        
                                    <p className="text">I grew up in a small town in northern New Jersey where I spent most of my time
                                        traveling for soccer and playing music. </p>
                                    <p className="text">When i wasn’t on the road I was usually out in the woods either hiking or
                                        fishing and trying not to get eaten by the friendly neighborhood bears. </p>
                                    <p className="text">High school is where my soccer career really began to take off.</p>
                                    <p className="text">I played on multiple club teams and towards the end had many interactions and
                                        dealings with college recruiters from the D3 to D1 colleges.</p>

                                    <hr />

                                    <h2 className="title">College Years</h2>
                                    <p className="text">I started of my college years by finally taking school seriously for the first
                                        time in life. </p>
                                    <p className="text">Between that and soccer I didn’t have time for much else. </p>
                                    <p className="text">I also quickly learned that by commuting to school you save money but you
                                        sacrifice most of your social life.</p>
                                    <p className="text">It wasn’t all bad however because doing this lead into my next adventure in
                                        life, running a hard rock band.
                                    </p>
                                    <p className="text">We played at clubs across New Jersey and met a lot of interesting characters
                                        along the way. </p>
                                    <p className="text">To this day we still play shows when we can and record at least once a year.</p>

                                    <br /><br />

                                    <p className="text">During my senior year of college I began to write code.</p>
                                    <p className="text">I was a marketing major with no background in tech but I had pressing need to
                                        start making money and this seemed like a good way to start.</p>
                                    <p className="text"> Around this time I stopped playing soccer so I took that time to begin learning
                                        how to build websites.</p>
                                    <p className="text"> I started off by making WordPress sites and got good at building software
                                        programs into the WordPress framework.</p>
                                    <p className="text">While WordPress is not ideal for making complex software and algorithms it
                                        served as a beautiful foundation for me to meet my future business partner Nick Scott.
                                    </p>

                                    <hr />

                                    <h2 className="title">Post College</h2>

                                    <p className="text">When i finished college I knew just enough code to create simple programs, build
                                        database structure, and create things like page builders.</p>
                                    <p className="text">I met Nick over a facebook status I wrote looking for a frontend developer and
                                        that would lead to us forming Arsenal OS as co-founders.
                                    </p>
                                    <p className="text">As our company launched we quickly realized the need to get off WordPress and go
                                        into much more scalable coding languages and frameworks.</p>
                                    <p className="text">This is were I went back to the drawing board and learned both Node and React JS
                                        as well as the IT side of things to back up the code we would create.
                                    </p>
                                    <p className="text">A wild ride but this would give me the know how to become a true full stack
                                        developer able to connect and build just about anything through code.

                                    </p>

                                    <hr />

                                    <h2 className="title">Present</h2>
                                    <p className="text">The first software we built was based on WordPress and was acquired in March of
                                        2019 which would, along with other projects we took on, give us the funding to fully flesh
                                        out our Arsenal OS company model as a research and development lab.
                                    </p>
                                    <p className="text">Today I spent my time as both co founder and CTO of the company, writing
                                        articles, and rocking on with the guitar.
                                    </p>



                                </div>

                                <div className="col xl3 l4 m12 article-sidebar">

                                    <ArticleSidebar />

                                    

                            </div>
                        </div>


                    </div>


               
                        </div>

                    </div>

                <CornerCreated />

            </AuxWrapper>
        )

    }

}

export default SiteLanding;