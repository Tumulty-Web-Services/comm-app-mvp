import React from 'react';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

const ProjectManagementDeliverablesText = (props) => {


    return (

        <AuxWrapper>
            {props.phase === 1 ?  
                <div className="card card-table">
                    <div className="card-header">Our Deliverables</div>
                    <div className="card-body">
                        <p>Our job during this phase it to work with you to find the best path forward to a solution that solves your biggest needs.</p>
                        <p>We will do everything we can to plan accordingly and take both your lifestyle and business goals into account.</p>
                    </div>            
                </div>          
                : ''  }

            { props.phase === 2 ?  
                
                <div className="card card-table">
                    <div className="card-header">Our Deliverables</div>
                    <div className="card-body">
                        <p>In the course of the R & D our deliverables will vary based on the project and can be viewed HERE.</p><p> Generally this included contacting outside sources, writing code, connecting software, etc. </p>
                    </div>            
                </div>        
                : ''  }

            { props.phase === 3 ?  
                <div className="card card-table">
                    <div className="card-header">Our Deliverables</div>
                    <div className="card-body">
                        <p>This phase requires us to launch your updates / project and follow up to make sure everything runs smoothly and correctly in a production environment.</p>
                        <p>You are still responsible to check over the updates and make sure everything is running as planned</p>
                    </div>            
                </div>        
            : ''  }

            { props.phase === 4 ?  
                <div className="card card-table">
                    <div className="card-header">Our Deliverables</div>
                    <div className="card-body">
                        <p>Our job during this phase is to monitor your app, responde to questions you may have and fix any standard development issues that may arise.</p>
                    </div>            
                </div>                 
            : ''  }

        </AuxWrapper>
        
    );

}

export default ProjectManagementDeliverablesText;