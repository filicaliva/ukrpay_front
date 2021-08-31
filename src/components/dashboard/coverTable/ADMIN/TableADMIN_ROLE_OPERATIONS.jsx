import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
//import BootstrapTable from 'react-bootstrap-table-next';
//import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import React from "react";
import * as axios from "axios";
import {Dropdown, DropdownButton} from "react-bootstrap";



class TableADMIN_ROLE_OPERATIONS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTable: false,
            isSelected: null,
            isDisableButton: true,
            selectRow: null
        }
        //console.log(this.data.sort());
    }
    async requestADMIN_ROLE_OPERATIONS  (token, roleID) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/RoleOperations/${roleID}`;
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

                //this.props.store.addRoleData(response.data.operations);
                this.props.store.addTableData(true, response.data.operations);
                this.setState({ isShowTable: true });

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLE_OPERATIONS_edit  (token, obj) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( obj );
        const baseUrl = `/api/RoleOperations`;

        await axios.put(
            baseUrl,
            obj,
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

                //this.props.store.addRoleData(response.data.operations);
                // this.props.store.addTableData(true, response.data.operations);
                // this.setState({ isShowTable: true });
                this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token, this.state.isSelected);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    selectRoleID = (e) => {
        console.log(e);
        let roleID = e.target.value;
        console.log(roleID);
        this.setState({
            isSelected: roleID
        });
        this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token, roleID)
    }
    saveRole = () => {
        console.log(this.state.selectRow);
        this.requestADMIN_USERS_add(this.props.store.userState.token, this.state.selectRow);
    }
    editHandle = () => {
        this.setState({
            isShowEditBlock: true
        });
    }
    closeEditForm = () => {
        console.log('close');
        this.setState({
            selectRow: {},
            isShowEditBlock: false,
            isShowAddBlock: false,
            isShowDeleteBlock: false
        });
    }
    onDailyEmailChange = (cell, row) => {
        console.log(cell);
        console.log(row);
    }
    test4 = (e) => {
       // let apiName = e.currentTarget.getAttribute("in_val");
        //console.log(apiName);
        // let inputValue = e.target.value;
        // console.log(inputValue);
        console.log(e);
        console.log(e.target.checked);
        // console.log(event.target);
        // console.log(event.target.checked);
        // console.log("asd");
        // console.log(typeof cell);
        // console.log(cell);
        // console.log(row);
        // console.log( oldValue );
        // console.log( newValue );
    }
    render() {
        console.log(this.state);
        console.log(this.props.store.menuState.tableData);
        console.log(this.props.store.menuState.roleData);

        const selectRowProp = {
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex) => {
                // this.setState({
                //     selectRow: row,
                //     isDisableButton: false
                // });
                console.log(row);
                console.log(isSelect);
                console.log(rowIndex);
            }
        }


        const OptionItem = (props) => {
            //console.log( props )
            return(
                <option selected={this.state.isSelected == props.optionItem.role_id ? 'selected' : ''}  value={props.optionItem.role_id} >{props.optionItem.role_name}</option>
                // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
            )
        }
        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };
        const checkBoxFormat = (cell,row) => {
            return (
                <div>
                    <input  onChange={() => this.onDailyEmailChange(cell, row)} type="checkbox" ref="criticalData" defaultChecked={cell} />
                </div>
            );
        }
        const boolFormatter = (cell, row) => {
            return (
                <div>
                    <input
                        type="checkbox"
                        ref="dailyEmail"
                        onChange={() => this.onDailyEmailChange(this)}
                        checked={cell}
                    />
                </div>
            );
        }
        const onStatusUpdate = (cell, row) => {
            return (
                <div>
                    <input
                        type="checkbox"
                        ref="dailyEmail"
                        onChange={() => this.onDailyEmailChange(this)}
                        checked={cell}
                    />
                </div>
            );
        }
        const statusFormatter = (cell, row) => {
            console.log(cell);
           // console.log(row);
            // let checkBoxValue = false;
            //
            // if (cell==='RESOLVED')
            //     checkBoxValue = true;
            //
            // return (
            //     <input type="checkbox" active={checkBoxValue} />
            // )
        }

        // const onInsertRow = (row) => {
        //     let newRowStr = ''
        //     for (const prop in row) {
        //         //console.log(row);
        //         newRowStr += prop + ': ' + row[prop] + ' \n'
        //         //obj.prop.row[prop]
        //     }
        //     //console.log(newRowStr);
        //     console.log(row);
        //     ///this.addNewUser(row);
        //     //alert('You inserted:\n ' + newRowStr)
        // }
        // const options = {
        //     afterInsertRow: onInsertRow
        // }
        // const columns = [{
        //     dataField: 'operation_desc',
        //     text: 'Todo ID'
        // }, {
        //     dataField: 'parent_operation_id',
        //     text: 'Todo Name'
        // }, {
        //     dataField: 'enabled',
        //     text: 'Done',
        //     editor: {
        //         type: Type.CHECKBOX,
        //         value: 'Y:N'
        //     }
        // }];
        const test3 = (cell,row,oldValue,newValue,e) => {
            let apiName = e.currentTarget.getAttribute("in_val");
            console.log(apiName);
            let inputValue = e.target.checked;
            console.log(inputValue);
            console.log(e);
            console.log("asd");
            console.log(typeof cell);
            console.log(cell);
            console.log(row);
            console.log( oldValue );
            console.log( newValue );
        }
        const test2 = (e,cell,row,oldValue,newValue) => {
            // let apiName = e.currentTarget.getAttribute("in_val");
            // console.log(apiName);
            console.log(e);
            let inputValue = e.target.checked;
            console.log(inputValue);

            console.log("asd");
            console.log(typeof cell);
            console.log(cell);
            console.log(row);
            console.log( oldValue );
            console.log( newValue );
        }
        const test = (cell,row,oldValue,newValue) => {
            console.log("asd");
            console.log(cell);
            console.log(row);
            console.log( oldValue );
            console.log( newValue );
        }

        const editEnabledColumn = (cell,row) => {

            const test5 = (e) => {
                console.log(e);
                let nameRole = e.currentTarget.getAttribute("name");
                console.log(nameRole);
                let inputValue = e.target.checked;
                console.log(inputValue);
                console.log(row);
                row.[nameRole] = inputValue;
                console.log(row);

                let obj = {
                    "role_id": `${this.state.isSelected}`,
                    "operations": [
                        row
                    ]
                }

                this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="enabled" type="checkbox" />

                </>
            )
        }
        const editCancelColumn = (cell,row) => {

            const test5 = (e) => {
                console.log(e);
                let nameRole = e.currentTarget.getAttribute("name");
                console.log(nameRole);
                let inputValue = e.target.checked;
                console.log(inputValue);
                console.log(row);
                row.[nameRole] = inputValue;
                console.log(row);

                let obj = {
                    "role_id": `${this.state.isSelected}`,
                    "operations": [
                        row
                    ]
                }

                this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="cancel" type="checkbox" />

                </>
            )
        }
        const editCreateColumn = (cell,row) => {

            const test5 = (e) => {
                console.log(e);
                let nameRole = e.currentTarget.getAttribute("name");
                console.log(nameRole);
                let inputValue = e.target.checked;
                console.log(inputValue);
                console.log(row);
                row.[nameRole] = inputValue;
                console.log(row);

                let obj = {
                    "role_id": `${this.state.isSelected}`,
                    "operations": [
                        row
                    ]
                }

                this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="create" type="checkbox" />

                </>
            )
        }
        const editDeleteColumn = (cell,row) => {

            const test5 = (e) => {
                console.log(e);
                let nameRole = e.currentTarget.getAttribute("name");
                console.log(nameRole);
                let inputValue = e.target.checked;
                console.log(inputValue);
                console.log(row);
                row.[nameRole] = inputValue;
                console.log(row);

                let obj = {
                    "role_id": `${this.state.isSelected}`,
                    "operations": [
                        row
                    ]
                }

                this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="delete" type="checkbox" />

                </>
            )
        }
        const editModifyColumn = (cell,row) => {

            const test5 = (e) => {
                console.log(e);
                let nameRole = e.currentTarget.getAttribute("name");
                console.log(nameRole);
                let inputValue = e.target.checked;
                console.log(inputValue);
                console.log(row);
                row.[nameRole] = inputValue;
                console.log(row);

                let obj = {
                    "role_id": `${this.state.isSelected}`,
                    "operations": [
                        row
                    ]
                }

                this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="modify" type="checkbox" />

                </>
            )
        }

        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock">
                        {/*<input onChange={ () => {test3()} } checked={true} in_val={true} value={true} type="checkbox"/>*/}
                        {/*<input type="checkbox" onChange={ this.test4 } checked={true}  />*/}
                        {/*<input type="checkbox" onChange={ this.test4 } checked={false}  />*/}
                        {/*<input type="radio" onChange={ this.test4 } checked={false}  />*/}
                        <span htmlFor="dropdown-basic-button">Виберіть роль</span>
                        <select onChange={this.selectRoleID}  id="dropdown-basic-button" class="form-select" title="Виберіть роль">
                            <option >-</option>
                            { this.props.store.menuState.roleData.map( ( item , index) => {
                                return < OptionItem key={index} optionItem={item} />
                            }) }
                            {/*<Dropdown.Item onClick={this.logOut} as="button">Вийти</Dropdown.Item>*/}
                        </select>
                        {/*<DropdownButton  id="dropdown-basic-button" title="Виберіть роль">*/}
                        {/*    { this.props.store.menuState.roleData.map( ( item , index) => {*/}
                        {/*        return < OptionItem key={index} optionItem={item} />*/}
                        {/*    }) }*/}
                        {/*    /!*<Dropdown.Item onClick={this.logOut} as="button">Вийти</Dropdown.Item>*!/*/}
                        {/*</DropdownButton>*/}
                    </div>
                </div>
                {/*<strong>{this.state.isSelected}</strong>*/}
                <div className="innerTable">
                    <div className="Table">
                        {
                            this.state.isShowTable
                                ? <>
                                    {/*<BootstrapTable*/}
                                    {/*    keyField="id"*/}
                                    {/*    data={ this.props.store.menuState.tableData }*/}
                                    {/*    columns={ columns }*/}
                                    {/*    cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }*/}
                                    {/*/>*/}
                                    {/*<div className="controlBlock">*/}
                                    {/*    <button*/}
                                    {/*        onClick={this.editHandle}*/}
                                    {/*        disabled={this.state.isDisableButton ? 'disabled' : ''}*/}
                                    {/*        className="btn btn-secondary"*/}
                                    {/*    >Редагування</button>*/}
                                    {/*</div>*/}
                                    <BootstrapTable data={this.props.store.menuState.tableData}
                                                    //selectRow={selectRowProp}
                                                    // cellEdit={cellEditProp}
                                    >

                                        {/*{this.testRendColums}*/}

                                        <TableHeaderColumn isKey dataField='operation_desc' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            ID операції
                                        </TableHeaderColumn>
                                        {/*<TableHeaderColumn dataField='operation_desc' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                                        {/*    Операція*/}
                                        {/*</TableHeaderColumn>*/}
                                        <TableHeaderColumn dataField='parent_operation_id' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Відноситься до
                                        </TableHeaderColumn>
                                        {/*<TableHeaderColumn dataField='enabled' dataFormat={imgFormatter} editable={{type:'checkbox', options: {values: 'false:true'}}} >*/}
                                        {/*    enabled*/}
                                        {/*</TableHeaderColumn>*/}
                                        <TableHeaderColumn dataField='cancel' dataFormat={editCancelColumn}  >
                                            Скасування
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='enabled' dataFormat={editCreateColumn}  >
                                            Створення
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='delete' dataFormat={editDeleteColumn}  >
                                            Видалення
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='modify' dataFormat={editModifyColumn}  >
                                            Редагування
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='enabled' dataFormat={editEnabledColumn}  >
                                            Активно
                                        </TableHeaderColumn>

                                    </BootstrapTable>

                                    {/*<BootstrapTable data={this.props.store.menuState.tableData} remote={true} cellEdit={cellEditProp} insertRow={true} deleteRow={true} selectRow={selectRowProp} options={options}>*/}
                                    {/*    <TableHeaderColumn dataField="operation_desc" hidden={true} isKey={true}>ID</TableHeaderColumn>*/}
                                    {/*    <TableHeaderColumn dataField="operation_desc">Title</TableHeaderColumn>*/}
                                    {/*    <TableHeaderColumn dataField="parent_operation_id">Budget</TableHeaderColumn>*/}
                                    {/*    <TableHeaderColumn dataField="enabled" className="checkbox-cell"  dataFormat={(cell, row) => statusFormatter(cell, row)} dataAlign="center" editable={{type: "checkbox", options: {values: "true:false" } }}>Daily Email</TableHeaderColumn>*/}
                                    {/*</BootstrapTable>*/}


                                </>

                                : <>
                                    <span>Виберіть роль</span>
                                </>
                        }


                    </div>
                </div>
            </div>

        );
    }
}

export default TableADMIN_ROLE_OPERATIONS