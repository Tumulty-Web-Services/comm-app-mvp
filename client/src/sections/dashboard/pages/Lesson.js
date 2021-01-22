import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import VocalWarmups from '../assets/js/VocalWarmups'
import WOD from '../assets/js/WOD'
import WODExamples from '../assets/js/WODExamples'
import Speech from '../assets/js/Speech'
import Axios from 'axios';

import CubeLoader from '../../../globalComponents/loaders/Cube';

import { uploadVideoFile } from '../../../functions/s3/media-library';

import { refreshCommModules } from '../../../store/reducers/commModulesReducer';


import {  createNotificationStandard } from '../../../functions/misc/notifications';



class Lesson extends Component {

    state = {

        shouldRedirect: false,

        step: 1,

        timer: 160,
        current_time: '',

        video_1: '',
        video_1_name: '',
        video_2: '',
        video_2_name: '',
        video_3: '',
        video_3_name: '',
    }

    setStep = (step) =>{

        let current_time = this.state.current_time;

        
        if(step === 9 ) {
            current_time = this.state.timer;
            this.setState({ current_time}, () => {
                this.runTimer();
            })
        } else {
            if(step === 13 || step === 18 ) {
                current_time = this.state.timer;
                this.setState({ current_time})
            }
        }



        

        this.setState({step})
    }

    runTimer = () => {

        setInterval(() => {
           

            if(Number.isInteger(this.state.current_time)) {
            
                const time = this.state.current_time - 1;
            
                if(time >= 0) {
                    this.setState({current_time: time});
                }
                
                if(this.state.step === 9 || this.state.step === 13 || this.state.step === 18) {
                    if(time === 0) {
                        alert('Times Up! Please Upload Your Video.')
                    }
                    
                }

               
            } 

            

    
        }, 1000)
        
    }

    stopTimer = () => {
        this.setState({current_time: false})
    }

    async componentDidMount() {

        window.scrollTo(0,0)

        //set the sidebar to active
        this.props.SET_SIDEBAR_HIGHLIGHT({
            tab: '/dashboard',
            drop: ''
        })
             
    }

    getModuleId(module_key) {

        switch (module_key) {
            case '1.1':
                return 1
            case '1.2':
                return 2
            case '1.3':
                return 3
            case '2.1':
                return 4
            case '2.2':
                return 5
            case '2.3':
                return 6
            case '3.1':
                return 7
            case '3.2':
                return 8
            case '3.3':
                return 9
            case '4.1':
                return 10
            case '4.2':
                return 11
            case '4.3':
                return 12
                
            default:
                return "Error no module key found.";
        }

    }

    changeVideo = (e, video, video_name) => {
        const file = e.target.files[0];
        const type = file.type;

        //file uploaded was not a video
        if(type !== 'video/quicktime') {

            alert('Please upload a video.');
            return
        }

        const file_name = file.name
        const src = URL.createObjectURL(file)

        this.stopTimer();
        this.setState({[video]: src, [video_name]: file_name});

        if(video === 'video_3') {
            this.setState({finalVideo: file})
        }
    }

    onChangeVideo1 = (e) => { this.changeVideo(e, 'video_1', 'video_1_name') }
    onChangeVideo2 = (e) => { this.changeVideo(e, 'video_2', 'video_2_name') }
    onChangeVideo3 = (e) => { this.changeVideo(e, 'video_3', 'video_3_name') }
    
    onFinish = async () => {

        this.setState({isUploading: true})

        const module = 'module_' + this.getModuleId(this.props.match.params.module_id);
        const updatedModule = Object.assign({}, this.props.commModules)

        // //upload the final video to s3
        const uploadedVideo = await uploadVideoFile(this.state.finalVideo, 'commappvideos');

        updatedModule[module] = {
            key: this.props.match.params.module_id,
            finished: 1,
            video_url: uploadedVideo.object_url,
            finished_on: Math.round((new Date()).getTime() / 1000)
        }


        try {
          await Axios({
            method:'post',
            url:'/api/v1/comm_modules/update/' + this.props.user._id,
            data: {...updatedModule}
          })

          await refreshCommModules(this.props.user._id);
          
          this.setState({shouldRedirect: '/dashboard', isUploading: false})
        
        } catch(e) {
        
          console.log('Error ', e)
          createNotificationStandard('<span class="text-danger">Whoops</span>', 'Something went wrong uploading your video')
        
        }

     

    }

    getTitleAndPart = () => {

        if(this.state.step < 4 ) {
            return {part: 1, title: 'Vocal Warm Ups'}
        } else if (this.state.step < 7) {
            return {part: 2, title: 'Word Of The Day'}
        } else {
            return {part: 3, title: 'Impromptu Speech Questions'}
        }


    }

    render() {

        const module = this.props.match.params.module_id;
        const module_id = this.getModuleId(this.props.match.params.module_id)

        if(this.state.shouldRedirect) {
            return <Redirect to={this.state.shouldRedirect} />
        }

        const titleAndPart = this.getTitleAndPart();
        

        return (

            

            
            <div className="content-rased page-lesson">

                {this.state.isUploading ? <CubeLoader text="Uploading Your Video" /> : ''}

                <div className="page-top">

                    <h2 className="title">Module {module}</h2>
                    <p>Let's get started</p>

                </div>

                <div className="content">
                    <div className="content-wrapper">

                        <div className="row">

                           <div className="col xl4 push-xl4 l6 push-l3  m8 push-m2 s12">
                                <div className="card">
                                    <div className="card-body">
                                        
                                        <span className="card-number">{module}</span>
 
                                       <div className="text-right">
                                           <p className="lesson-part">Part {titleAndPart.part}</p>
                                           <p className="lesson-part-description">{titleAndPart.title}</p>
                                       </div>
                                        
                                    </div>

                                    <div className="card-footer text-center">

                                        {this.state.step === 1 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Ready?</h3>
                                                <button onClick={() => this.setStep(2)} className="btn">Begin</button>
                                            </div>
                                        )}

                                        {this.state.step === 2 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Please repeat the following phrase out loud three times.</h3>
                                                <p><VocalWarmups module={module_id} warmup={1} /></p>
                                                <button onClick={() => this.setStep(3)} className="btn">Done</button>
                                            </div>
                                        )}

                                        {this.state.step === 3 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Please repeat the following phrase out loud three times.</h3>
                                                <p><VocalWarmups module={module_id} warmup={2} /></p>
                                                <button onClick={() => this.setStep(4)} className="btn">Done</button>
                                            </div>
                                        )}

                                        {this.state.step === 4 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Part 2: Word Of The Day</h3>
                                                <p>Ready?</p>
                                                <button onClick={() => this.setStep(5)} className="btn">Reveal WOD</button>
                                            </div>
                                        )}

                                        {this.state.step === 5 && (
                                            <div className="step-container">
                                                <h3 className="instruction">The word of the day is:</h3>
                                                <p><WOD module={module_id} /></p>
                                                <button onClick={() => this.setStep(6)} className="btn" style={{marginRight: 10}}>See Example</button>
                                                <button onClick={() => this.setStep(7)} className="btn btn-success">Next Step</button>
                                            </div>
                                        )}

                                        {this.state.step === 6 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Examples</h3>
                                                <p><WODExamples module={module_id} example={1} /></p>
                                                <p><WODExamples module={module_id} example={2} /></p>
                                                <button onClick={() => this.setStep(7)} className="btn">Next Step</button>
                                            </div>
                                        )}

                                        {this.state.step === 7 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Part 3: Impromptu Speech Questions</h3>
                                                <button onClick={() => this.setStep(8)} className="btn">Begin</button>
                                            </div>
                                        )}

                                        {this.state.step === 8 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Ready?</h3>
                                                <button onClick={() => this.setStep(9)} className="btn">Reveal Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 9 && (
                                            <div className="step-container">
                                                <p className={this.state.current_time === 0 ? 'text-danger' : 'text-warning'}>{this.state.current_time}</p>
                                                <h3 className="instruction">Q: <Speech module={module_id} question={1} /></h3>
                                                
                                                <label htmlFor="video_1"><i className="material-icons">video_call</i><br/>{this.state.video_1_name ? this.state.video_1_name : 'Upload Your Video'}</label>
                                                <input id="video_1" name="video_1" type="file" onChange={this.onChangeVideo1} />

                                                <div>
                                                    {this.state.video_1 ? <button  onClick={() => this.setStep(10)} className="btn btn-success">Continue</button> : ''}
                                                    
                                                </div>
                                            </div>
                                        )}

                                        {this.state.step === 10 && (
                                            <div className="step-container">
                                                <h3 className="instruction">How Do You Feel?</h3>
                                                <button onClick={() => this.setStep(11)} className="btn" style={{marginRight: 10}}>Review Answer</button>
                                                <button onClick={() => this.setStep(12)} className="btn btn-success">Next Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 11 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Your Answer</h3>
                                                <video style={{width: '100%'}} src={this.state.video_1} controls="controls"/>
                                                <button onClick={() => this.setStep(12)} className="btn btn-success">Done</button>
                                            </div>
                                        )}

                                        {this.state.step === 12 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Question 2, Ready?</h3>
                                                <button onClick={() => this.setStep(13)} className="btn">Reveal Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 13 && (
                                            <div className="step-container">
                                                 <p className={this.state.current_time === 0 ? 'text-danger' : 'text-warning'}>{this.state.current_time}</p>
                                                <h3 className="instruction">Q: <Speech module={module_id} question={2} /></h3>
                                                
                                                <label htmlFor="video_2"><i className="material-icons">video_call</i><br/>{this.state.video_2_name ? this.state.video_2_name : 'Upload Your Video'}</label>
                                                <input id="video_2" name="video_2" type="file" onChange={this.onChangeVideo2} />

                                                <div>
                                                    {this.state.video_2 ? <button  onClick={() => this.setStep(14)} className="btn btn-success">Continue</button> : ''}
                                                    
                                                </div>
                                            </div>
                                        )}

                                        {this.state.step === 14 && (
                                            <div className="step-container">
                                                <h3 className="instruction">How Do You Feel?</h3>
                                                <button onClick={() => this.setStep(15)} className="btn" style={{marginRight: 10}}>Review Answer</button>
                                                <button onClick={() => this.setStep(16)} className="btn btn-success">Next Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 15 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Your Answer</h3>
                                                <video style={{width: '100%'}} src={this.state.video_2} controls="controls"/>
                                                <button onClick={() => this.setStep(16)} className="btn btn-success">Done</button>
                                            </div>
                                        )}


                                        {this.state.step === 16 && (
                                            <div className="step-container">
                                                <h3 className="instruction">How Do You Feel?</h3>
                                                <button onClick={() => this.setStep(17)} className="btn" style={{marginRight: 10}}>Review Answer</button>
                                                <button onClick={() => this.setStep(18)} className="btn btn-success">Next Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 17 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Your Answer</h3>
                                                <video style={{width: '100%'}} src={this.state.video_3} controls="controls"/>
                                                <button onClick={() => this.setStep(18)} className="btn btn-success">Done</button>
                                            </div>
                                        )}

                                        {this.state.step === 18 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Final Question! Ready?</h3>
                                                <button onClick={() => this.setStep(19)} className="btn">Reveal Question</button>
                                            </div>
                                        )}

                                        {this.state.step === 19 && (
                                            <div className="step-container">
                                                 <p className={this.state.current_time === 0 ? 'text-danger' : 'text-warning'}>{this.state.current_time}</p>
                                                <h3 className="instruction">Q: <Speech module={module_id} question={3} /></h3>
                                                
                                                <label htmlFor="video_3"><i className="material-icons">video_call</i><br/>{this.state.video_3_name ? this.state.video_3_name : 'Upload Your Video'}</label>
                                                <input id="video_3" name="video_3" type="file" onChange={this.onChangeVideo3} />

                                                <div>
                                                    {this.state.video_3 ? <button  onClick={() => this.setStep(20)} className="btn btn-success">Continue</button> : ''}
                                                    
                                                </div>
                                            </div>
                                        )}

                                        {this.state.step === 20 && (
                                            <div className="step-container">
                                                <h3 className="instruction">Nice :)</h3>
                                                <p>All done for today! Please make sure you hit “Finish Lesson!” below to log your progress.</p>
                                                <button onClick={() => this.onFinish()} className="btn btn-success">Finish Lesson</button>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                           </div>

                        </div>

                    </div>

                </div>

            </div>

           
        )
    }

};


const mapStateToProps = state => {
    return {

      stripeDefaultSource: state.user.defaultSource,
      commModules: state.commModules.modules

    };
};

const mapDispatchToProps = dispatch => {
    return {

        //action to dispatch which part of the sidebar is highlighted
        SET_SIDEBAR_HIGHLIGHT: (settings) =>  dispatch({type: actionTypes.SET_SIDEBAR_HIGHLIGHT, payload: settings }),

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Lesson);  
  


