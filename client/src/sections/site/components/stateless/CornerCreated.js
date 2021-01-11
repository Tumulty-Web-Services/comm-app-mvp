import React from 'react';
import { Link} from 'react-router-dom';

const CornerCreated = (props) => {


    return (

        <div className="corner">

            <div className="corner-background"></div>
            
            <div className="container">
                <div className="row">
                    <div className="col l8 ">
                        <div className="row">
                            <div className="col s6" style={{width: 75}}>
                                <img className="img-author"
                                    src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p160x160/18699768_1284207708344626_8003713518879003763_n.jpg?_nc_cat=103&amp;_nc_ht=scontent-lga3-1.xx&amp;oh=470e2c88c8ac2b808a259644afd678ed&amp;oe=5D07410D"
                                    alt="" />
                            </div>
                            <div className="col s6" style={{width: 'calc(100% - 75px)'}}>
                                <span className="sub-title"><span className="font-weight-bold gradient">Created By:</span> John
                                    Maher</span>
                                <p>This website was created to bridge the gap between developers and non-technical founders. Developers will find great resources for coding, hosting, systems development, and effectively working with other non developers. </p>
                                <p>Non Technical business owners will find resources to help them run their business in a technical world amongst developers who speak a completely different language.</p>

                                <Link to="/contact" className="btn btn-success">Send Me A Message </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col l6">
                    </div>
                </div>
            </div>

        </div>
        
    );

}

export default CornerCreated;