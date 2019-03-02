import React from 'react'
import * as authenticationActions from '../../actions/Authentication'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './Login.css'


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            name: 'Cat in the Hat',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.authenticationActions.log_in('', '')
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        if (this.props.authentication.authenticated)
            return (<Redirect to={'/dashboard'}/>);
        else
            return (<Grid container spacing={0}
                          direction="column"
                          justify="space-between"
                          alignItems="center">
                <Grid item
                      className={'login-form-container'}
                      xs={8}
                      md={6}>
                    <form className={'login-form-content'} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />

                        <TextField
                            id="standard-uncontrolled"
                            label="Uncontrolled"
                            defaultValue="foo"
                            margin="normal"
                        />
                        <Button variant="contained"
                                color="primary"
                            onClick={this.handleClick}>Log in</Button>
                    </form>
                </Grid>
            </Grid>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);