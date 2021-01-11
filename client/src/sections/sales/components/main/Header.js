import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {

    state = {
        showMobileSidebar: false
    }

    onToggleNav = (value) => {
        this.setState({showMobileSidebar: !this.state.showMobileSidebar})
    }

    render() {

        return (

           <div></div>

        );
    }

}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);
