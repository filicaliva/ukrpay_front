import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import * as axios from "axios";

class TableADMIN_ROLES extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTable: true
        }
    }
    addId = (arr) => {
        if(arr == 'empty'){
            arr = [];
        }
        //console.log(arr);
        let newArr = [];
        let resultObj = arr.reduce((res, item, index) => {
            //console.log(res);
            //console.log(item);
            let newObj = {...item};
            newObj.id = index;
            //console.log(newObj);
            newArr.push(newObj);
        }, 0);
        //console.log(newArr);
        return newArr;
    }
    addNewRole = (obj) => {
        console.log(obj);
        delete obj.id
        console.log(obj);
        this.requestADMIN_ROLE_add(this.props.store.userState.token, obj);
    }
    async requestADMIN_ROLE_add  (token, userBody) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( userBody );
        const baseUrl = `/api/Role`;
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
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                // this.props.store.addTableData(true, response.data.users);
                // this.setState({isShowTable: true});
                this.setState({
                    isShowTable: false
                });
                this.requestADMIN_ROLES(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLE_edit  (token, userBody) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( userBody );
        const baseUrl = `/api/Role`;
        await axios.put(
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
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                // this.props.store.addTableData(true, response.data.users);
                // this.setState({isShowTable: true});
                this.setState({
                    isShowTable: false
                });
                this.requestADMIN_ROLES(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLE_delete  (token, role_id) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Role/${role_id}`;
        await axios.delete(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                // this.props.store.addTableData(true, response.data.users);
                // this.setState({isShowTable: true});
                this.setState({
                    isShowTable: false
                });
                this.requestADMIN_ROLES(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
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
                this.setState({
                    isShowTable: true
                });
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    render() {
        //console.log(this.state.Table);
        console.log(this.props);
        console.log(this.props.store.menuState.tableData);
        const onDeleteRow = (rowKeys) => {
            //console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            for(let i = 0; i != rowKeys.length; i++){
                res = this.addId(this.props.store.menuState.tableData).filter((item) => {
                    return item.id == rowKeys[i]
                })
            }
            //localStorage.setItem("rows", JSON.stringify(this.state.columns))
            console.log(res);
            console.log(res[0].role_id);
            this.requestADMIN_ROLE_delete(this.props.store.userState.token, res[0].role_id);
            //console.log(rowKeys);
        }
        const onInsertRow = (row) => {
            let newRowStr = ''
            for (const prop in row) {
                //console.log(row);
                newRowStr += prop + ': ' + row[prop] + ' \n'
                //obj.prop.row[prop]
            }
            //console.log(newRowStr);
            console.log(row);
            this.addNewRole(row);
            //alert('You inserted:\n ' + newRowStr)
        }
        const cellEditFactory = {
            mode: 'dbclick',
            blurToSave: true,
            // nonEditableRows: () => [0, 3],
            beforeSaveCell(oldValue, newValue, row, column, done) {
                // console.log( oldValue );
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( done );
                // console.log( '-----------------' );
                // setTimeout(() => {
                //     if (window.confirm('Do you want to accep this change?')) {
                //         done(); // contine to save the changes
                //     } else {
                //         done(false); // reject the changes
                //     }
                // }, 0);
                // return { async: true };
            },
            afterSaveCell: (oldValue, newValue, row, column) => {
                console.log( oldValue );
                delete oldValue.id
                console.log( oldValue );
                this.requestADMIN_ROLE_edit(this.props.store.userState.token, oldValue);
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( '-----------------' );
            }
        }
        const selectRowProp = {
            mode: 'radio'
        }
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        {
                            this.state.isShowTable
                                ? <BootstrapTable data={this.addId(this.props.store.menuState.tableData)}
                                                  insertRow={true}
                                                  deleteRow={true}
                                                  selectRow={selectRowProp}
                                                  options={options}
                                                  cellEdit={cellEditFactory}
                                >

                                    <TableHeaderColumn isKey dataField='id' width="40" tdStyle={{ "text-align": 'center' }} autoValue >
                                        №
                                    </TableHeaderColumn>
                                    <TableHeaderColumn  dataField='role_id'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                        ID ролі
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='role_name'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Ім'я ролі
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='role_desc' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Опис
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='ad_role' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Ідентифікатор AD ролі
                                    </TableHeaderColumn>


                                </BootstrapTable>
                                : <>

                                </>
                        }
                        {/*{*/}
                        {/*    this.props.store.menuState.showTable*/}
                        {/*        ? <BootstrapTable*/}
                        {/*            keyField="id"*/}
                        {/*            data={this.props.store.menuState.tableData}*/}
                        {/*            columns={this.state.columns}*/}
                        {/*            cellEdit={ cellEditFactory({*/}
                        {/*                mode: 'click',*/}
                        {/*                blurToSave: true,*/}
                        {/*                afterSaveCell: this.handleChange*/}
                        {/*            }) }*/}
                        {/*            selectRow={selectRowProp}*/}
                        {/*            striped*/}
                        {/*            hover*/}
                        {/*            condensed*/}
                        {/*            insertRow*/}
                        {/*            deleteRow*/}
                        {/*            search*/}
                        {/*            insertRow={true}*/}

                        {/*        />*/}
                        {/*        : <></>*/}
                        {/*}*/}

                    </div>
                </div>
            </div>
        )
    }
}
export default TableADMIN_ROLES