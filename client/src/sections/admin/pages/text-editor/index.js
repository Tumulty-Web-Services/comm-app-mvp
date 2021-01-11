import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6

import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';

import MediaLibrary from '../media-library';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            editorRange: '',
            showMediaLibrary: false
        }

        this.handleChange = this
            .handleChange
            .bind(this)
    }

    handleChange(value) {
        this.setState({text: value})
        this
            .props
            .setEditorValue(value)
    }

    toolbarOptions = {
        container: [

            [{'header': [1,2,3,4,5,6,false]}],
            [{'font': []}],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons

            [{align: ''}],
            [{align: 'center'}],
            [{align: 'right'}],

            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, {'list': 'bullet'}],
            // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction [{
            // 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

            [{'color': []}, {'background': [] }], // dropdown with defaults from theme

            // [{ 'align': [] }],

            ['link', 'image', 'video' ],

            // ['clean']                          d               // remove formatting
            // button

        ],

        handlers: {

            image: this.imageHandler.bind(this)

        }

    };

    modules = {

        toolbar: this.toolbarOptions

    }

    formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
    ]

    imageHandler() {

        this.toggleMediaLibrary(true)

        //store where the image should be inserted
        this.setState({editorRange: this.quillRef.getEditor().getSelection()})

    }

    onSelectObject(url) {

        this.toggleMediaLibrary(false)
    

        var value = url;

        if (value) {
            this.quillRef.getEditor().insertEmbed(this.state.editorRange.index, 'image', value, "user");
        }

        this.props.toggleMediaLibrary(false)

    }

    toggleMediaLibrary = (value) => {
        this.setState({showMediaLibrary: value})
    }

    componentDidMount = () => {

        //when we mount check to see if we are sent a vaule
        if (!this.state.initialValue && this.props.initialValue) {

            this.setState({text: this.props.initialValue, initialValue: this.props.initialValue})

        }

    }

    // when we receive props if we dont have an state.initialValue check to see if
    // we are sent one
    componentWillReceiveProps = (nextProps) => {

        if (!this.state.initialValue && nextProps.initialValue) {

            this.setState({text: nextProps.initialValue, initialValue: nextProps.initialValue})

        }

    }

    render() {

        return (

            <AuxWrapper>

                {this.state.showMediaLibrary ? <MediaLibrary toggleMediaLibrary={(value) => this.toggleMediaLibrary(value)} onSelectObject={(value) => this.onSelectObject(value)}/> : ''}

                <div className="text-editor-wrapper">

                    {this.props.activeImgUrl}

                    <div className={this.state.fullScreen ? "text-wrapper z-depth-3 fullscreen" : "text-wrapper z-depth-3"}>
                        <ReactQuill
                            ref={(el) => this.quillRef = el}
                            id="quillEditor"
                            theme="snow"
                            modules={this.modules}
                            bounds="#quillEditor"
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </AuxWrapper>

        );
    }
}

const mapStateToProps = state => {
    return {showMediaLibrary: state.mediaLibrary.showMediaLibrary, activeImgUrl: state.mediaLibrary.activeImgUrl};
};

const mapDispatchToProps = dispatch => {
    return {

        toggleMediaLibrary: (value) => dispatch({ type: actionTypes.SHOW_MEDIA_LIBRARY, payload: { show: value } })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);

//link saving needs color