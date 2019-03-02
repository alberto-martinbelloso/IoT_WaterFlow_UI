import React from 'react'
import LineChart from "../Charts/LineChart/LineChart";
import Grid from "@material-ui/core/Grid/Grid";
import './Dashboard.css'
import MonthBarChart from "../Charts/MonthBarChart/MonthBarChart";
import Bills from "./Bills/Bills";
import {bindActionCreators} from "redux";
import * as devicesActions from "../../actions/Devices";
import connect from "react-redux/es/connect/connect";

class Dashboard extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        Date.prototype.monthDays = function () {
            let d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        }
    }

    componentDidMount(){
        this.props.devicesActions.fetch_alldevices(this.props.token)
    }

    render() {
        return (
            <Grid container
                  className={'dashboard-container'}
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item
                      xs={6}>
                    <MonthBarChart/>
                </Grid>
                <Grid item
                      xs={6}>
                    <LineChart/>
                </Grid>
                <Grid item
                      xs={12}>
                    <Bills/>
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        devicesActions: bindActionCreators(devicesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);