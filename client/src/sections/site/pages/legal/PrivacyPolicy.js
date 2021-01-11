import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import CornerCreated from '../../components/stateless/CornerCreated';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';




class PrivacyPolicy extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        
        return (

            <AuxWrapper >



                
                <div className="main dark page-home">

                    <div className="container" style={{marginTop: 75, padding: '100px 0'}}>
                        <h2 className="title">JohnMaher.IO Privacy Policy</h2>

                        <p>We do not currently use any cookies on this for our general users. The only time we collect your information is when you fill out a contact form and that information is solely used to contact you back. We may update this policy in the future and will attempt to notify you then however it is your responsibility to check back here and make sure that you are up to date on our current terms of service.</p>

                        <p>For further information on how our site works please see our <Link to="/terms-of-use" className="gradient">terms of use</Link> or <Link to="/contact" className="gradient">contact us here</Link></p>

                        
                    </div>



                </div>

                



                <CornerCreated />

            </AuxWrapper>
        )

    }

}


export default PrivacyPolicy


