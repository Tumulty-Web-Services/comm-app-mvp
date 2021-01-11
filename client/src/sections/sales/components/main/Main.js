import React, { Component } from 'react';

//withRouter used to enable page linking on this component
import { withRouter} from 'react-router-dom';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';
import { connect } from 'react-redux';


class SiteMain extends Component {


    render() {

        return (
          
            <AuxWrapper>

               

                  <div className="main">
                    {this.props.children}
                </div>

                 
            </AuxWrapper>
        )
    }

}


const mapStateToProps = state => {
    return {

        user: state.user.user,
       
    };
};

//withRouter used to enable page linking on this component
export default withRouter(connect( mapStateToProps, )(SiteMain))

