import React from 'react';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

const ProjectManagementClientExpectations = (props) => {


    return (

        <AuxWrapper>

            {props.phase === 1 ?  
                <div className="card card-table">
                    <div className="card-header">Client Expectations</div>
                    <div className="card-body">
                        <p>During Phase 1 there are no expectations that are required from your party. This phase is reserved for learning more about your objects and setting up expectations and project work to come.</p>
                    </div>            
                </div>          
                : ''  }

            { props.phase === 2 ?  
                
                <div className="card card-table">
                    <div className="card-header">Client Expectations</div>
                    <div className="card-body">
                        <p>During the R & D phase you're responsible for handing over any and all logos, images, site text, and api keys/logins that may be required to complete your project or update.</p>
                        <p>While these are not required to start this phase if you do not hand them in by their deadlines we reserve the right to put a hold on your project until recieved. Payments are still due on their expected dates.</p>
                    </div>            
                </div>        
                : ''  }

            { props.phase === 3 ?  
                <div className="card card-table">
                    <div className="card-header">Client Expectations</div>
                    <div className="card-body">
                        <p>During the Implementation phase you're responsible for taking a quick look through your app and making sure all functionality work as intended.</p>
                    </div>            
                </div>        
            : ''  }

            { props.phase === 4 ?  
                <div className="card card-table">
                    <div className="card-header">Client Expectations</div>
                    <div className="card-body">
                        <p>During the Maintenance phase we will monitor your site and be on call for any errors that may occur. If we do not have any upcoming updates or revisions planned it is your responsibility to reach out to us and when you feel it is time for a change.</p>
                    </div>            
                </div>                 
            : ''  }

        </AuxWrapper>
        
    );

}

export default ProjectManagementClientExpectations;