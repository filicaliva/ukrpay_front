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
import ReactTableTest from "./test/ReactTableTest";
import ReactBootstrapTable from "./test/ReactBootstrapTable";
import TableADMIN_USERS from "./ADMIN/TableADMIN_USERS";
import TableADMIN_OPERATIONS from "./ADMIN/TableADMIN_OPERATIONS";
import TableADMIN_ROLE_OPERATIONS from "./ADMIN/TableADMIN_ROLE_OPERATIONS";
import REPORT_SETTINGS_TSP from "./REPORT/REPORT_SETTINGS_TSP";
import REPORTS_acquiring from "./REPORT/REPORTS_acquiring";
import REPORTS_ACQUIRING_MONITOR from "./REPORT/REPORTS_ACQUIRING_MONITOR";
import DICT_NET_BRAND from "./NETWORK/NETWORK_CREATE";
import REPORT_OPERATIONS from "./REPORT/REPORT_OPERATIONS";
import NETWORK_CREATE from "./NETWORK/NETWORK_CREATE";
import NETWORK_ADD_CLIENT from "./NETWORK/NETWORK_ADD_CLIENT";

class Default extends React.Component{
    render() {
        console.log('зайшло default');
        console.log('зайшло default');
        return(
            <div className="coverTable">

                <div className="headerTable">
                    <span>Не вибрано жодного звіту!!!</span>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">

                    </div>
                </div>
            </div>
        )
    }
}

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
        //console.log(this.props);

    }
    componentDidUpdate() {
        //console.log('componentDidUpdate');
        // if ( this.props.store.location.pathname.substr(11) == null || this.props.store.location.pathname.substr(11) == "" ){
        //
        // }else{
        //     // this.requestOperation(this.props.store.userState.token, this.props.store.location.pathname.substr(11))
        //     this.typeRequest(this.props.store.location.pathname.substr(11));
        //     this.props.store.operationName(this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11)), this.props.store.location.pathname.substr(11));
        // }
    }
    componentDidMount() {
        //console.log(this.props.store.location.pathname);
        //console.log('componentDidMount COVER TABLE');
        // if ( this.props.store.location.pathname.substr(11) == null || this.props.store.location.pathname.substr(11) == "" ){
        //
        // }else{
        //     // this.requestOperation(this.props.store.userState.token, this.props.store.location.pathname.substr(11))
        //     this.typeRequest(this.props.store.location.pathname.substr(11));
        //     this.props.store.operationName(this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11)), this.props.store.location.pathname.substr(11));
        // }

    }

    // typeRequest = (operation) => {
    //     let operationType = operation.split('_')[0];
    //     console.log( operation.startsWith('DICT') );
    //     switch (operation) {
    //         case 'ADMIN_USERS':
    //             return this.requestADMIN_USERS(this.props.store.userState.token);
    //         case 'ADMIN_ROLES':
    //             return this.requestADMIN_ROLES(this.props.store.userState.token);
    //         case 'ADMIN_OPERATIONS':
    //             return this.requestADMIN_OPERATIONS(this.props.store.userState.token);
    //         case 'ADMIN_ROLE_OPERATIONS':
    //             return this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token);
    //
    //
    //
    //         case "DICT_PAYMENT_SYSTEM":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_REPORT_FORMAT":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_CURRENCY":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_DATE_TYPE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_REPORT_ACTION":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_OPERATION_TYPE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_ACQUIRING_TYPE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_ACQUIRING_SERVICE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_INSTITUTION":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_BRANCH":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_REPORT_PERIOD_TYPE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //         case "DICT_REPORT_CHANNEL_TYPE":
    //             return this.requestDICT(this.props.store.userState.token, operation);
    //
    //         default:
    //             return '';
    //     }
    // }
    async requestDICT  (token, operation) {
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

    //ADMIN
    async requestADMIN_USERS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/User`;
        const userBody = {
            user_code: "",
            user_name: "",
            bank_branch_id: 0,
            only_active: false
        };
        await axios.post(
            baseUrl,
            userBody,
            {
                headers: {
                    "Token" : `${ token }`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.users);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLES  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Role`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.roles);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_OPERATIONS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Operations`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.operations);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    // async requestADMIN_ROLE_OPERATIONS  (token) {
    //     this.props.store.changeLoading(true);
    //     console.log( token );
    //     const baseUrl = `/api/Role`;
    //     await axios.get(
    //         baseUrl,
    //         {
    //             headers: {
    //                 "Token" : `${ token }`
    //             }
    //         }
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             //console.log(response.data.users);
    //             //console.log(response.data.Table);
    //
    //
    //             //this.props.store.showTable(true);
    //
    //             this.props.store.addRoleData(response.data.roles);
    //             this.props.store.addTableData(true, response.data.roles);
    //
    //             this.props.store.changeLoading(false);
    //             //this.props.store.showTable(true);
    //
    //         })
    //         .catch((error) => {
    //             console.log(error.response);
    //             console.log(error.response.data);
    //             //console.log('error_catch');
    //
    //         });
    //
    // }


    activeOperation = (operationArr, operation) => {
        //console.log(operationArr === operation ? 'itemAct' : '');
        //console.log(operationArr);
        //console.log(operation);
        let res;
        operationArr.map(( item , index) => {
            //console.log(item);
            //console.log(item.name);
            //console.log(item.operation == operation);
            if(item.operation == operation){
                res = item.name;
            }
        })
        return res;

        //return operationArr === operation ? 'itemAct' : '';
        //${ activeOperation(this.props.store.userState.OPERATIONS, item.operation) }
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
        console.log( '---------------operation--------------------' );
        console.log( operation );
        console.log( '---------------operation--------------------' );
        //console.log( operation.startsWith('ADMIN') );
        switch (operation) {

            case 'ADMIN_USERS':
                return <TableADMIN_USERS store={this.props.store}/>
                break
            case 'ADMIN_ROLES':
                return <TableADMIN_ROLES store={this.props.store}/>
                break
            case 'ADMIN_OPERATIONS':
                return <TableADMIN_OPERATIONS store={this.props.store}/>
                break
            case 'ADMIN_ROLE_OPERATIONS':
                return <TableADMIN_ROLE_OPERATIONS store={this.props.store}/>
                break
            //REPORT

            case "REPORT_SETTINGS_TSP":
                return <REPORT_SETTINGS_TSP store={this.props.store}/>
                break
            case "REPORTS_ACQUIRING":
                console.log( "REPORTS_ACQUIRING" );
                return <REPORTS_acquiring store={this.props.store}/>
                break
            case "REPORTS_ACQUIRING_MONITOR":
                console.log( "REPORTS_ACQUIRING_MONITOR" );
                return <REPORTS_ACQUIRING_MONITOR store={this.props.store}/>
                break
            case "REPORT_OPERATIONS":
                console.log( "REPORT_OPERATIONS" );
                return <REPORT_OPERATIONS store={this.props.store}/>
                break

            case "DICT_PAYMENT_SYSTEM":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_REPORT_FORMAT":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_CURRENCY":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_DATE_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_REPORT_ACTION":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_OPERATION_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_ACQUIRING_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_ACQUIRING_SERVICE":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_INSTITUTION":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_BRANCH":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_REPORT_PERIOD_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
                break
            case "DICT_REPORT_CHANNEL_TYPE":
                return <TableBootstrapDICT store={this.props.store}/>
                break

            //NETWORK
            case "NETWORK_CREATE":
                return <NETWORK_CREATE store={this.props.store}/>
                break
            case "NETWORK_ADD_CLIENT":
                return <NETWORK_ADD_CLIENT store={this.props.store}/>
                break

            default:
                return <Default/>
        }
    }
    default = () => {
        console.log('зайшло default');
        return(
            <div className="coverTable">

                <div className="headerTable">
                    <span>Не вибрано жодного звіту!!!</span>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">

                    </div>
                </div>
            </div>
        )
    }

    urlValue = (val) => {
        console.log(val);
        switch (val) {
            case 'ADMIN_USERS':
                return "ADMIN_USERS";
            case 'ADMIN_ROLES':
                return 'ADMIN_ROLES';
            case 'ADMIN_OPERATIONS':
                return 'ADMIN_OPERATIONS';
            case 'ADMIN_ROLE_OPERATIONS':
                return 'ADMIN_ROLE_OPERATIONS';



            case "DICT_PAYMENT_SYSTEM":
                return 'DICT_PAYMENT_SYSTEM';
            case "DICT_REPORT_FORMAT":
                return 'DICT_REPORT_FORMAT';

            default:
                return '';
        }
    }
    render() {
        console.log(this.props);
        //console.log(this.urlValue(this.props.store.location.pathname.substr(11)));
        //console.log(this.props.store.menuState.showTable);
        //console.log(this.props.store.menuState.operation);
        //console.log(this.props.store.menuState.tableData);

        return (
            <>

                {/*<div className="coverTable">*/}
                {/*    <div className="headerTable">*/}
                {/*        <span>Невибрано жодного звіту</span>*/}
                {/*        <div className="optionBlock"></div>*/}
                {/*    </div>*/}
                {/*    <div className="innerTable">*/}
                {/*        <div className="Table">*/}
                {/*            /!*<ReactTableTest/>*!/*/}
                {/*            /!*<ReactBootstrapTable/>*!/*/}
                {/*            /!*<TableBootstrapTest store={this.props.store}/>*!/*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}



                {/*<EditTable/>*/}
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

                {/*<h1>{this.urlValue(this.props.store.location.pathname.substr(11))}</h1>*/}

                {/*<h1 className="testUrl">{this.props.params}</h1>*/}

                {/*{*/}
                {/*    this.props.store.menuState.tableData == null*/}
                {/*        ? <div className="coverTable">*/}

                {/*            <div className="headerTable">*/}
                {/*                <span>Не вибрано жодного звіту</span>*/}
                {/*                <div className="optionBlock"></div>*/}
                {/*            </div>*/}
                {/*            <div className="innerTable">*/}
                {/*                <div className="Table">*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*       : this.tableType(this.props.store.menuState.operation)*/}
                {/*        // : this.tableType(this.props.store.location.pathname.substr(11))*/}
                {/*}*/}

                {this.tableType(this.props.params)}
            </>
        )
    }
}

export default CoverTable;