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
    formatDateFile = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        let hou = date.getHours();
        let min = date.getMinutes();
        return `Report.${day}.${month}.${year}.${hou}-${min}.xlsx`
    }

    async requestReports_GetReport  (token, reportId) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Reports/GetReport?reportId=${reportId}`;

        await  axios.get(baseUrl, {
            responseType: 'blob',
            headers: {
                "Token" : `${ token }`,
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        })
            .then((response) => {
                console.log(response);
                console.log(response.data);
                let nameArr = response.headers['content-disposition'].split(";");
                //console.log(nameArr);
                //console.log(nameArr[0]);
                console.log(nameArr[0]);


                //fileDownload( response.data, this.formatDateFile(new Date()));
                fileDownload( response.data, nameArr[1].slice(22,nameArr[1].length-3));

                this.props.store.changeLoading(false);

            })

            .catch((error) => {
                console.log(error);
                console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });
    }


    activeOperation = (operationArr, operation) => {
        let res;
        operationArr.map(( item , index) => {
            if(item.operation == operation){
                console.log(item.name);
                res = item.name;
            }
        })
        return res;
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
            const statusBtn = (report_id) => {
                //console.log(report_id);
                // return this.state.ReportsMonitor.map(( item , index) => {
                //     console.log(item.report_id);
                //     if(item.report_id == report_id){
                //         console.log(item.status);
                //         if(item.status == 'Не сформовано')
                //         return true
                //     }
                // });
                    for(let i=0; i < this.state.ReportsMonitor.length; i++){
                        if(this.state.ReportsMonitor[i].report_id == report_id) {
                            //console.log('-----status-----');
                            //console.log(i);
                            //console.log(this.state.ReportsMonitor[i].status);
                            if(this.state.ReportsMonitor[i].status_code == 'C'){
                                return true
                            }

                        }
                    }
            }
            //console.log(statusBtn(cell));
            return (
                <>
                    <button onClick={ btnDownload } disabled={statusBtn(cell) ? '' : 'disabled'} className="btn btn-primary" type="button">Скачати</button>
                </>
            )
        }
        return (
            <div className="coverTable REPORTS_ACQUIRING_MONITOR">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock">

                    </div>
                </div>
                {
                    this.state.isShowReportsMonitor
                        ? <>
                            <div className="innerTable">
                                <div className="Table">
                                    <BootstrapTable  data={this.state.ReportsMonitor}
                                        // selectRow={selectRowProp}
                                    >

                                        {/*{this.testRendColums}*/}

                                        <TableHeaderColumn isKey dataField='report_name'   
                                            width="400" 
                                            tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} 
                                            filter={ { type: 'TextFilter', delay: 1000 } }>
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
                                        <TableHeaderColumn dataField='report_id'  width="100"  dataFormat={hendleDownload} >

                                        </TableHeaderColumn>

                                    </BootstrapTable>
                                </div>
                            </div>
                        </>
                        : null
                }



            </div>

        );
    }
}

export default REPORTS_ACQUIRING_MONITOR