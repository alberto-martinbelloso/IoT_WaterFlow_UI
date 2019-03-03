import React from 'react';
import './Alarms.css';
import {bindActionCreators} from "redux";
import * as alarmsActions from "../../../actions/Alarms";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

class Alarms extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.alarmsActions.getAlarms()
    }

    render() {
        return (
            <div className={'alarms-container'}>
                <Typography variant="h5" style={{paddingBottom: '10px'}} gutterBottom>
                    Alarms History
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Device Id</TableCell>
                                <TableCell align="right" style={{textAlign: 'center'}}>Notification</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.alarms.alarms.length > 0 && (this.props.alarms.alarms.map((row, id) => (
                                <TableRow key={id} className={'alarm-row'}>
                                    <TableCell component="th" scope="row">
                                        {row.device_id}
                                    </TableCell>
                                    <TableCell align="right">{row.message}</TableCell>
                                    <TableCell align="right">{row.timestamp}</TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        alarms: state.alarms,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        alarmsActions: bindActionCreators(alarmsActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alarms);