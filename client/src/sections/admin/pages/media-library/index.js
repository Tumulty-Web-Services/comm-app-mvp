import React, { Component } from 'react';
import Axios from 'axios';

import {uploadImg, getS3ImageUrl, uploadImgFile} from '../../../../functions/s3/media-library';
import moment from 'moment';

import { connect } from 'react-redux';

import {createNotificationStandard} from '../../../../functions/misc/notifications';
import CubeLoader from '../../../../globalComponents/loaders/Cube';

import Dropzone from 'react-dropzone'


//set toggle of media library slider
//set url, image, and modified of library slider

// create delete of image

// create ability to import imarges into draft js from url from librar


class MediaLibrary extends Component {


    state = {
        images: '',
        previewImageFile: '',
        previewImageName: '',
        showSlider: false,

        activeImgKey: '',
        activeImgLastModified: '',
        activeImgWidth: '',
        activeImgHeight: '',

        imageIsLoading: false,
    };

    toggleSlider = (value) => {
        this.setState({showSlider: value})
    }

    onActiveImageLoaded = () => {

            var myImg = document.querySelector("#active-image");
            var realWidth = myImg.naturalWidth;
            var realHeight = myImg.naturalHeight;

            this.setState({
                activeImgWidth: realWidth,
                activeImgHeight: realHeight,
            })
        
    }

    setActiveImage = (img) => {

        this.setState({
            activeImgKey: img.key,
            activeImgLastModified: img.last_modified,
        })
        this.toggleSlider(true);
    }

    onImageSelect = (url) => {

        this.props.onSelectObject(url);
    }

    onDeleteImage = async (key) => {


        try {
          const res = await Axios({
            method:'post',
            url:'/api/aws/bucket/delete?key=' + key,
          })


          let newImages = this.state.images.slice(0);


          newImages = newImages.filter((img) => {
            return img.key !== res.data.key.toString()
          })


          this.setState({images: newImages});

          this.toggleSlider(false)

        
        } catch(e) {
        
          console.log('Error ', e)
        
        }

    }

    onImgUpload = async () => { 

        this.setState({imageIsLoading: true});

        //this needs error handling
        const image = await uploadImg('#mediaLibraryUploader', 'jmaher1245-media-library', '', 2000)

        const newImages = this.state.images.slice(0);

        newImages.unshift({key: image.objectKey, last_modified:  Math.round((new Date()).getTime() / 1000)});


        this.setState({images: newImages})
      
        this.onCancelUpload();

        this.setState({imageIsLoading: false});

    }

    onDropUpload = async (acceptedFiles) => { 

        console.log(acceptedFiles[0])

        this.setState({imageIsLoading: true});

        // //this needs error handling
       acceptedFiles.forEach(async (acceptedFile, index) => {
        const image = await uploadImgFile(acceptedFile, 'jmaher1245-media-library', '', 2000)

        const newImages = this.state.images.slice(0);

        newImages.unshift({key: image.objectKey, last_modified:  Math.round((new Date()).getTime() / 1000)});
        this.setState({images: newImages})

        console.log(acceptedFiles.length, index)

        if(acceptedFiles.length === index + 1) {
            this.onCancelUpload();

        this.setState({imageIsLoading: false});
        }

       })


       
      
        

    }

    onCancelUpload = () => {

        document.getElementById('mediaLibraryUploader').value = ''

        this.setState({
            previewImageFile: '',
            previewImageName: ''
        })
    }

    handleChange(event) {

        const file = event.target.files[0];
        // Allowed types
        var mime_types = [ 'image/jpeg', 'image/png' ];
        
        // Validate MIME type
        // if(mime_types.indexOf(file.type) == -1) {
        if(mime_types.indexOf(file.type) === -1) {
            createNotificationStandard('<span class="text-danger">Upload Error</span>', 'Please make sure you are uploading and image and not another type of media (jpeg, jpg, png', 5000)
            return;
        }
    
        this.setState({
            previewImageFile: URL.createObjectURL(file),
            previewImageName: file.name
        })
      }

    componentDidMount = async () => { 

        

        try {
            const res = await Axios({
              method:'get',
              url:'/api/aws/bucket/list',
             
            })

    
            this.setState({images: res.data.reverse()})
          
          } catch(e) {
          
            console.log('Error ', e)
          
          }


    }

    

    render() {



        return (

            <div className="aos__media-library" >

                {this.state.imageIsLoading ? <CubeLoader text="Uploading Image" /> : ''}

                <div className="blackout" onClick={() => this.props.toggleMediaLibrary(false)}></div>

                <div className="library-container">
                <div className={this.state.showSlider ? "wrapper z-depth-5 stop-scrolling" : "wrapper z-depth-5"}>

                

                <div className="row">
                
                    <div className="col l9 s12">
                    <h2 className="title media-library-title">My Image Library ({this.state.images ? this.state.images.length : 0})</h2>
                    
                    </div>

                  
                
                    <div className="col l3 s12 text-right">
                    <button onClick={() => this.props.toggleMediaLibrary(false)} className="btn btn-danger" style={{marginRight: 15}}>Close</button>
                        <input onChange={(e) => this.handleChange(e)} type="file" name="mediaLibraryUploader" id="mediaLibraryUploader" className="inputfile"  multiple />

                        {/* for is needed for the onclick event */}
                        <label className="z-depth-3" htmlFor="mediaLibraryUploader">{this.state.previewImageName ? this.state.previewImageName : 'Upload Image'}</label>

                        {/* <input className="upload" style={{display: 'block'}} type="file" onChange={(e) => this.handleChange(e)} id="profilePicUploader"/>
                        <button className="btn btn-success" style={{display: 'block', width: '100%'}} onClick={() => this.onImgUpload()}>Upload</button> */}
                    </div>
                
                </div>

                

               

               
                    {this.state.previewImageFile ? 
                     <div className="preview-image">
                        <img className="z-depth-3 d-block" src={this.state.previewImageFile} alt="media library object" /> 
                        
                        <button className="btn btn-danger" onClick={() => this.onCancelUpload()}>Cancel Upload</button>
                        <button className="btn btn-success" onClick={(e) => this.onImgUpload(e)}>Upload this image</button>
                    </div>
                    : ''}
                    
                    <Dropzone onDrop={acceptedFiles => { this.onDropUpload(acceptedFiles) }} >
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()} onClick={event => event.stopPropagation()}>
                                    <input id="dragable-upload" {...getInputProps()} />
                                    <div className="row" style={{margin: '20px 0'}}>
                                        {this.state.images ? this.state.images.map((img, index) => {
                                            return (
                                                // <div className="image-holder" style={{backgroundImage: 'url("https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/" + '")'}}></div>
                                                <div key={index} className="col xl2 l3 m4 s6">
                                                    <div  onClick={() => this.setActiveImage(img)} className="image-holder z-depth-4" style={{backgroundImage: 'url("'+getS3ImageUrl(img.key)+'")'}}></div>
                                                </div>
                                            )

                                        }): ''}
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>

                    

                    {this.state.showSlider ? (
                        <div className="right-slider z-depth-5">
                            
                            <div className="slider-blackout" onClick={() => this.toggleSlider(false)}></div>
                                <div className="slider-wrapper-container">
                                    <div className="right-slider-wrapper " >

                                        <button className="btn btn-danger close" onClick={() => this.toggleSlider(false)} >Close</button>

                                        <h2 className="title font-weight-bold">Image ID: {this.state.activeImgKey}  </h2>

                                        {this.state.activeImgHeight ? 
                                            <p><span className="font-weight-bold">Dimensions:</span> {this.state.activeImgWidth} x {this.state.activeImgHeight} </p>
                                            : ''
                                        }

                                        <p><span className="font-weight-bold">Uploaded On:</span> {moment(this.state.activeImgLastModified).format('MM/DD/YYYY h:mm A')}</p>
                                        <p>https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/{this.state.activeImgKey}</p>

                                        <div style={{marginBottom: 20}}>

                                            <button className="btn btn-danger" onClick={() => this.onDeleteImage(this.state.activeImgKey)} >Delete This Image</button>

                                        </div>

                                        <img id="active-image" onLoad={this.onActiveImageLoaded} className="z-depth-3" src={'https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/' + this.state.activeImgKey} alt={"image: " + this.state.activeImgKey} />

                                        <hr/>
                                        <div className="text-right">
                                           
                                            <a className="btn btn-info" href={'https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/' + this.state.activeImgKey}>Download</a>
                                            <button className="btn btn-success" onClick={() => this.onImageSelect('https://s3.us-east-2.amazonaws.com/jmaher1245-media-library/' + this.state.activeImgKey)} >Select</button>
                                        </div>
                                </div>
                            </div>

                        </div>
                    ) : ''}

                </div>
                </div>
            </div>

        )

    }

}

// mediaLibrary
  const mapStateToProps = state => {
    return {

    //   showMediaLibrary: state.mediaLibrary.showMediaLibrary,

    };
};


const mapDispatchToProps = dispatch => {
    return {


        // toggleMediaLibrary: (value) =>  dispatch({type: actionTypes.SHOW_MEDIA_LIBRARY, payload: {show: value} }),
    };
};

  
  export default connect( mapStateToProps, mapDispatchToProps )(MediaLibrary);  
  
