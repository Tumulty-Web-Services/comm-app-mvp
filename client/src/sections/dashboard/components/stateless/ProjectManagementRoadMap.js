import React from 'react';
import AuxWrapper from '../../../../globalComponents/AuxWrapper';

const ProjectManagementRoadMap = (props) => {


    return (
        <AuxWrapper>
            {props.phase === 1 ?  
            <div className="card card-table">
            
                <div className="card-header">Phase 1 Road Map</div>
                    <div className="card-body">
                        <div className="road-map">

                            <span className="start">Start</span>
                            <span className="end">Finished</span>

                            {console.log(props.project_phases[0].step_completed)}
                
                            <div>
                                <p  className="finished">Starting off we determine the end goal that you have in mind and figure out the most efficient and effective way to get you there.</p>
                                <p 
                                    className={props.project_phases[0].step_completed >= 2 ? 'finished' : props.project_phases[0].step_completed >= 1 ? 'in-progress' : ''}>
                                    We then create an action plan to be delivered going over different options and solutions that match your objectives.
                                </p>
                                <p 
                                    className={props.project_phases[0].step_completed >= 3 ? 'finished' : props.project_phases[0].step_completed >= 2 ? 'in-progress' : ''}>
                                    Finally we assign the team that will be working on your project, establish a timeline, and finalize the project overview for the coming development sprint.
                                </p>
                                
                                
                        </div>
                    </div>

                </div>
            
            </div>         
            : ''  }

           { props.phase === 2 ?  
            <div className="card card-table">
            
                <div className="card-header">R & D Phase Road Map</div>
                    <div className="card-body">
                        <div className="road-map">

                            <span className="start">Start</span>
                            <span className="end">Finished</span>
                
                            <div>
                                <p 
                                    className={props.project_phases[0].completed === true ? 'finished' : ''}>
                                    This phase start with researching all needed materials to complete development. This can include contacting outside companies, API Research, Software Discover, etc.
                                </p>
                                <p 
                                    className={props.project_phases[1].step_completed >= 2 ? 'finished' : props.project_phases[1].step_completed >= 1 ? 'in-progress' : ''}>
                                    Once research has been completed we move into applying that knowledge to your application. Plans get drawn for the application, databases and state changes are mapped in as to avoid system and merge conflicts in the future. This is similar to an architecht drawing the blueprints for a house.
                                </p>
                                <p 
                                     className={props.project_phases[1].step_completed >= 3 ? 'finished' : props.project_phases[1].step_completed >= 2 ? 'in-progress' : ''}>
                                    Once the blueprints have been drawn the back end and heavy duty code is written to handle system creation or iterations.
                                </p>
                                <p 
                                     className={props.project_phases[1].step_completed >= 4 ? 'finished' : props.project_phases[1].step_completed >= 3 ? 'in-progress' : ''}>
                                    After all the code building blocks are in place we begin to work on the front end of the application and making things come to life. This is where all the built features become visible within an application.
                                </p>
                                <p 
                                     className={props.project_phases[1].step_completed >= 5 ? 'finished' : props.project_phases[1].step_completed >= 4 ? 'in-progress' : ''}>
                                    R & D ends in checking cross browser compatability, internal and external API testing and a stand up call to go over all created features and pages.
                                </p>
                            
                        </div>
                    </div>

                </div>
            
            </div>         
            : ''  }

        { props.phase === 3 ?  
            <div className="card card-table">
            
                <div className="card-header">Implementation Phase Road Map</div>
                    <div className="card-body">
                        <div className="road-map">

                            <span className="start">Start</span>
                            <span className="end">Finished</span>
                
                            <div>
                                <p 
                                    className={props.project_phases[1].completed === true ? 'finished' : ''}>
                                    The implementation phase starts by compling all code written and pushing it live to our hosting server.
                                </p>
                                <p 
                                    className={props.project_phases[2].step_completed >= 2 ? 'finished' : props.project_phases[2].step_completed >= 1 ? 'in-progress' : ''}>
                                    Once the code has been pushed we run tests on the updated/created site to make sure the system is running smoothly and without error.
                                </p>
                                <p 
                                    className={props.project_phases[2].step_completed >= 3 ? 'finished' : props.project_phases[2].step_completed >= 2 ? 'in-progress' : ''}>
                                    Finally we fix any conflicts that may emerge and this phase comes to an end.
                                </p>
                               
                            
                        </div>
                    </div>

                </div>
            
            </div>         
            : ''  }

        { props.phase === 4 ?  
            <div className="card card-table">
            
                <div className="card-header">Maintenance Road Map</div>
                    <div className="card-body">
                        <div className="road-map">

                            <span className="start">Start</span>
                            <span className="end">Finished</span>
                
                            <div>
                                <p 
                                    className={props.project_phases[2].completed === true ? 'finished' : ''}>
                                    During maintenance we monitor you system for all its infastructure needs.
                                </p>
                                <p 
                                    className={props.project_phases[3].step_completed >= 2 ? 'finished' : props.project_phases[3].step_completed >= 1 ? 'in-progress' : ''}>
                                    Updates may be made to things like background images, text, etc as long as they do not require a connection to a database or changing the infastructure of the sites core code.
                                </p>
                                <p 
                                    className={props.project_phases[3].step_completed >= 3 ? 'finished' : props.project_phases[3].step_completed >= 2 ? 'in-progress' : ''}>
                                    This phase is complete when our retainer runs out our we begin work on a new iteration of your application.
                                </p>
                        </div>
                    </div>

                </div>
            
            </div>         
            : ''  }

        </AuxWrapper>
        
    );

}

export default ProjectManagementRoadMap;