import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import theme from './theme'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Dashboard from "./components/Dashboard/Dashboard";
import {bindActionCreators} from "redux";
import * as authenticationActions from "./actions/Authentication";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import MenuAppBar from "./components/AppBar/AppBar";
import './App.css'
import Profile from "./components/Dashboard/Profile/Profile";
import Bills from "./components/Dashboard/Bills/Bills";

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount(){
        this.props.authenticationActions.validate_token();
    }

    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <MenuAppBar/>
                    <Route path='/' exact render={() => (<Redirect to={'/login'}/>)}/>
                    <Route path='/login' component={Login}/>
                    <PrivateRoute authed={this.props.authentication.authenticated} path='/dashboard'
                                  component={Dashboard}/>
                    <PrivateRoute authed={this.props.authentication.authenticated} path='/profile'
                                   component={Profile}/>
                    <PrivateRoute authed={this.props.authentication.authenticated} path='/bills'
                                  component={Bills}/>
                    <img src={window.location.origin +'/Logo_IT_University_of_Copenhagen.jpg'}  className={'image-responsive itu-logo'}/>
                </MuiThemeProvider>
            </Router>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch)
    }
};


function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(App);