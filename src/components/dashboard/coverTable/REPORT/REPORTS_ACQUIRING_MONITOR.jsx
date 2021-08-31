import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";
import fileDownload from 'js-file-download';
import { FileSaver, saveAs } from 'file-saver';

class REPORTS_ACQUIRING_MONITOR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ReportsMonitor: null,
            isShowReportsMonitor: false
        }
        //console.log(this.data.sort());
    }
    componentDidMount() {
        this.requestReportsMonitor(this.props.store.userState.token);

    }


    async requestReportsMonitor (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Reports/ReportsMonitor?reportGroup=REPORT_GROUP_ACQUIRING`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);

                this.setState({
                    ReportsMonitor: response.data.reports,
                    isShowReportsMonitor: true
                });

                this.props.store.changeLoading(false);


            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }

    async requestReports_GetReport  (token, reportId) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Reports/GetReport?reportId=${reportId}`;

        await  axios.get(baseUrl, {
            responseType: 'blob',
            headers: {
                "Token" : `${ token }`,
            }
        })
            .then((response) => {
                console.log(response);
                console.log(response.data);
                fileDownload( response.data, 'report.xls');

                this.props.store.changeLoading(false);

            })

            .catch((error) => {
                console.log(error);
                console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });
    }




    render() {
        console.log(this.props.store);
        console.log(this.state);

        const hendleDownload = (cell,row, newValue) => {

            const btnDownload = (e) => {
                console.log(cell);
                console.log(row);
                this.requestReports_GetReport(this.props.store.userState.token, cell);


            }
            return (
                <>
                    <button onClick={ btnDownload } className="btn btn-primary" type="button">Скачати</button>
                </>
            )
        }
        return (
            <div className="coverTable REPORTS_ACQUIRING_MONITOR">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock">

                    </div>
                </div>
                {
                    this.state.isShowReportsMonitor
                        ? <>
                            <div className="innerTable">
                                <div className="Table">
                                    <BootstrapTable data={this.state.ReportsMonitor}
                                        // selectRow={selectRowProp}
                                    >

                                        {/*{this.testRendColums}*/}

                                        <TableHeaderColumn isKey dataField='report_name' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Назва звіту
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='date_submitted'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Дата запиту
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='date_updated' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Дата оновлення
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='status'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Статус
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='user'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Користувач
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='report_id' dataFormat={hendleDownload} >

                                        </TableHeaderColumn>

                                    </BootstrapTable>
                                </div>
                            </div>
                        </>
                        : <>
                        </>
                }



            </div>

        );
    }
}

export default REPORTS_ACQUIRING_MONITOR