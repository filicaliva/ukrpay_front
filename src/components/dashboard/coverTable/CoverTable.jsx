import React from 'react';


import * as axios from "axios";
//import {validateCredentials} from './test';
import Table from './Table';
import PopupTable from "../popup/PopupTable";
import TableBootstrapTest from "./TableBootstrapTest";
import TableBootstrapDICT from "./DICT/TableBootstrapDICT";
import TableBootstrapADMIN from "./ADMIN/TableBootstrapADMIN";
import TableADMIN_ROLES from "./ADMIN/TableADMIN_ROLES";
//import {Grid, TableHeaderRow, Table} from "@devexpress/dx-react-grid";
//import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
//import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
// import TableTest from "./TableTest";
// import TableTest2 from "./TableTest2";
// import TestUseState from "./TestUseState";
// import TableNew from "./TableNew";



class CoverTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            showTable: false,
            loading: true,
            columns: [
                { name: 'id', title: 'ID' },
                { name: 'product', title: 'Product' },
                { name: 'owner', title: 'Owner' },
            ],
            rows: [
                { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
                { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
            ]
        }
        console.log(this.props);

    }

    componentDidMount() {

        if ( this.props.store.location.pathname.substr(11) == null || this.props.store.location.pathname.substr(11) == "" ){

        }else{
            this.requestOperation(this.props.store.userState.token, this.props.store.location.pathname.substr(11))
        }

    }

    async requestOperation  (token, operation) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( operation );
        const baseUrl = `/api/Dictionary/${operation}`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);
                console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.Table);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }

    determinationTable = (token, operation) => {
        console.log(operation == null || operation == "");
        if ( operation == null || operation == "" ){
            this.setState({ loading: false });
            // return(
            //     <div>
            //         Таблиця пуста
            //     </div>
            // )
        }else{
            this.requestOperation(token, operation);

            //console.log( this.requestOperation(token, operation) );
        }
    }
    test = (operation) => {
        if ( operation == null || operation == "" ){
             return false;
        }else{
            return true;
        }
    }

    tableType = (operation) => {
        //let operationType = operation.split('_')[0];
        console.log( operation );
        console.log( operation.startsWith('ADMIN') );
        switch (operation) {

            case 'ADMIN_USERS':
                return <TableBootstrapADMIN store={this.props.store}/>
            case 'ADMIN_ROLES':
                return <TableADMIN_ROLES store={this.props.store}/>

            case "DICT_PAYMENT_SYSTEM":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_REPORT_FORMAT":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_CURRENCY":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_DATE_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_REPORT_ACTION":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_OPERATION_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_ACQUIRING_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_ACQUIRING_SERVICE":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_INSTITUTION":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_BRANCH":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_REPORT_PERIOD_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
            case "DICT_REPORT_CHANNEL_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>

            default:
                return '';
        }
    }


    render() {
        console.log(this.props);
        console.log(this.props.store.menuState.showTable);
        console.log(this.props.store.menuState.operation);
        console.log(this.props.store.menuState.tableData);

        return (
            <>

                {/*{*/}
                {/*    this.props.store.menuState.showTable*/}
                {/*        ? <>*/}
                {/*            /!*<Table store={this.props.store}/>*!/*/}
                {/*            <div className="coverTable">*/}
                {/*                <div className="headerTable">*/}
                {/*                    <span>Невибрано жодного звіту</span>*/}
                {/*                    <div className="optionBlock"></div>*/}
                {/*                </div>*/}
                {/*                <div className="innerTable">*/}
                {/*                    <div className="Table">*/}
                {/*                        <TableBootstrapTest store={this.props.store}/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </>*/}
                {/*        : <div className="coverTable">*/}
                {/*            <div className="headerTable">*/}
                {/*                <span>Невибрано жодного звіту</span>*/}
                {/*                <div className="optionBlock"></div>*/}
                {/*            </div>*/}
                {/*            <div className="innerTable">*/}
                {/*                <div className="Table">*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*}*/}



                {
                    this.props.store.menuState.tableData == null
                        ? <div className="coverTable">
                            <div className="headerTable">
                                <span>Невибрано жодного звіту</span>
                                <div className="optionBlock"></div>
                            </div>
                            <div className="innerTable">
                                <div className="Table">

                                </div>
                            </div>
                        </div>
                        : this.tableType(this.props.store.menuState.operation)
                }


            </>
        )
    }
}

export default CoverTable;