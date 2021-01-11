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

            // <nav>

            //     {this.state.showMobileSidebar ? (
            //         <AuxWrapper>
            //             <div className="mobile-sidebar">

            //                 <div className="header">
            //                     <div className="row">
            //                         <h2>COMM App</h2>
            //                         <i onClick={this.onToggleNav} className="material-icons menu-close">menu</i>
            //                     </div>
            //                 </div>

            //                 <ul>
            //                     <li><Link onClick={this.onToggleNav} to="/knowledge-base"><i className="material-icons">comment</i> Knowledge Base</Link></li>
            //                     <li><Link onClick={this.onToggleNav} to="/services"><i className="material-icons">build</i> Services</Link></li>
            //                     <li><Link onClick={this.onToggleNav} to="/arsenal"><i className="material-icons">code</i> Arsenal OS</Link></li>
            //                     <li><Link onClick={this.onToggleNav} to="/resources"><i className="material-icons">help</i> Resources</Link></li>
            //                     <li><Link onClick={this.onToggleNav} to="/about"><i className="material-icons">person</i>About</Link></li>
            //                     <li><Link onClick={this.onToggleNav} to="/contact"><i className="material-icons">email</i> Contact</Link></li>
            //                 </ul>

            //                 <div className="contact">
            //                     <Link onClick={this.onToggleNav} to="/contact" className="btn btn-success">Contact</Link>
            //                 </div>
            //                 </div>

            //             <div className="sidebar-blackout" onClick={this.onToggleNav}></div>
            //         </AuxWrapper>

            //     ) : ''}

                

            //     <div className="filter"></div>
               
            //     <div className="container">
            //         <div className="row">
            //             <div className="col s12">
            //                 <div className="nav-wrapper">
            //                     <Link to="/" className="brand-logo ">COMM App</Link>

            //                     <ul id="nav-mobile" className="right hide-on-large-only">
            //                         {/* <li className="active"><Link to="/knowledge-base"> */}
            //                         <li style={{display: this.state.showMobileSidebar ? 'none': 'block'}}><i onClick={() => this.onToggleNav()} className="material-icons menu">menu</i></li>
                                   
            //                     </ul>

            //                     <ul id="nav-mobile" className="right hide-on-med-and-down">
            //                         {/* <li className="active"><Link to="/knowledge-base"> */}
            //                         <li ><Link to="/knowledge-base">
            //                         {/* <i className="material-icons">accessibility</i> */}
            //                         Knowledge Base</Link></li>
            //                         <li><Link to="/services">Services</Link></li>
            //                         <li><Link to="/arsenal">Arsenal OS</Link></li>
            //                         <li><Link to="/resources">Resources</Link></li>
            //                         <li><Link to="/about">About</Link></li>
            //                         <li><Link to="/contact">Contact</Link></li>
            //                     </ul>
                                
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </nav>

        );
    }

}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);
