import React from 'react'
import cssTricks from '../../../../assets/img/css-tricks.png';
import heroku from '../../../../assets/img/heroku.png';

const ArticleSidebar = (props) => {


    return (
        <div>
            <div className="article z-depth-3 surrounder">

                <span className="featured z-depth-3">Featured</span>

                <div className="background"></div>

                <div className="img-holder">
                    <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558372275588" className="img-bg-1 z-depth-2" alt="featured pic"/>
                    <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558372275588" className="img-bg-2 z-depth-2" alt="featured pic"/>
                    <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558372275588" className="img-main z-depth-5" alt="featured pic"/>
                </div>

                <h4 className="name title">Building A Betting Business This Month</h4>
                <h6 className="published">On 11/22/19</h6>

                </div>

                <div className="article z-depth-3 surrounder">

                    <span className="featured z-depth-3">Top Pick</span>

                    <div className="background"></div>

                    <div className="img-holder">
                        <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558488678090" className="img-bg-1 z-depth-2" alt="top Pick"/>
                        <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558488678090" className="img-bg-2 z-depth-2" alt="top Pick"/>
                        <img src="https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/1558488678090" className="img-main z-depth-5" alt="top Pick"/>
                    </div>
                    <h4 className="name title">Building A Betting Business This Month</h4>
                    <h6 className="published">On 11/22/19</h6>
                </div>

                <hr style={{marginBottom: '4rem'}} />

                <div className="article z-depth-3 surrounder">

                    <span className="featured z-depth-3">Designer's Choice</span>

                    <div className="background"></div>

                    <div className="img-holder">
                        <img src={cssTricks} className="img-bg-1 z-depth-2" alt="css tricks" />
                        <img src={cssTricks} className="img-bg-2 z-depth-2" alt="css tricks"/>
                        <img src={cssTricks} className="img-main z-depth-5" alt="css tricks"/>
                    </div>
                    <h4 className="name title">CSS Tricks</h4>
                    <p>Anyone looking to get better as a front end designer needs to check out this resource. By far the best online place for enhancing your CSS skills.</p>

                    <div className="text-right">
                        <a className="btn btn-success" href="https://css-tricks.com" target="_blank" rel="noopener noreferrer" >Visit Site</a>
                    </div>

                </div>

                <div className="article z-depth-3 surrounder">

                    <span className="featured z-depth-3">Deployment</span>

                    <div className="background"></div>

                    <div className="img-holder">
                        <img src={heroku} className="img-bg-1 z-depth-2" alt="heroku"/>
                        <img src={heroku} className="img-bg-2 z-depth-2" alt="heroku"/>
                        <img src={heroku} className="img-main z-depth-5" alt="heroku"/>
                    </div>
                    <h4 className="name title">Heroku</h4>
                    <p>Anyone looking to get better as a front end designer needs to check out this resource. By far the best online place for enhancing your CSS skills.</p>

                    <div className="text-right">
                        <a className="btn btn-success" href="https://css-tricks.com" target="_blank" rel="noopener noreferrer" >Visit Site</a>
                    </div>

                </div>

                
        </div>
    );

}

export default ArticleSidebar;