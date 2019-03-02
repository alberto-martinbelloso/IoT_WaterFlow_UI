import React from 'react'
import LineChart from "../Charts/LineChart/LineChart";
import Grid from "@material-ui/core/Grid/Grid";
import './Dashboard.css'
import MonthBarChart from "../Charts/MonthBarChart/MonthBarChart";
import Bills from "./Bills/Bills";

class Dashboard extends React.Component {
    constructor() {
        super()
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

export default Dashboard