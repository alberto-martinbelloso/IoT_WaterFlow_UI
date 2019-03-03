import React from 'react';
import './Bills.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import {bindActionCreators} from "redux";
import * as billsActions from "../../../actions/Bills";
import connect from "react-redux/es/connect/connect";


class Bills extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.billsActions.fetch_bills(this.props.token)
    }


    render() {
        return (
            <div className={'bills-container'}>
                <Typography variant="h5" style={{paddingBottom: '10px'}} gutterBottom>
                    Billing History
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Import (DKK)</TableCell>
                                <TableCell align="center">Consumption</TableCell>
                                <TableCell align="center">Price (per liter)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.bills.bills.map((row, id) => (
                                <TableRow key={id} className={'bills-row'}>
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell align="center">{new Date(row.date).toDateString()}</TableCell>
                                    <TableCell align="center">{row.import}</TableCell>
                                    <TableCell align="center">{row.waterflow}</TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        bills: state.bills,
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        billsActions: bindActionCreators(billsActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bills);