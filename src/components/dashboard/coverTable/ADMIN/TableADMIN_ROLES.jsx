import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import * as axios from "axios";

class TableADMIN_ROLES extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: null,
            isShowTable: true,

            selectRow: null,

            isDisableButton: true,

            addRow: {},

            isShowEditBlock: false,
            isShowAddBlock: false,
            isShowDeleteBlock: false,
        }
    }
    componentDidMount() {
        this.requestADMIN_ROLES(this.props.store.userState.token);
        // this.rr(this.props.store.userState.token);
        // console.log( 'componentDidMount' );
    }
    async requestADMIN_ROLES  (token) {
        console.log('=========================requestADMIN_ROLES==================');
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

                //this.props.store.addTableData(true, response.data.roles);
                this.setState({
                    roles: response.data.roles,
                    isShowTable: true
                });

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                //console.log(error.response.data);
                //console.log('error_catch');

            });

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
                this.closeEditForm();
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
                // this.setState({
                //     isShowTable: false
                // });
                this.closeEditForm();
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
                    isDisableButton: true
                });
                this.closeEditForm();
                this.requestADMIN_ROLES(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    // async requestADMIN_ROLES  (token) {
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
    //             this.props.store.addTableData(true, response.data.roles);
    //             this.setState({
    //                 isShowTable: true
    //             });
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

    editHandle = () => {
        this.setState({
            isShowEditBlock: true
        });
    }
    addHandle = () => {
        this.setState({
            isShowAddBlock: true
        });
    }
    deleteHandle = () => {
        this.setState({
            isShowDeleteBlock: true
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

    changeInput = (e) => {
        let keyName = e.currentTarget.getAttribute("name");
        console.log(keyName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.selectRow;
        inputDataObj.[keyName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            selectRow: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.selectRow);
    }
    changeInputAdd = (e) => {
        let keyName = e.currentTarget.getAttribute("name");
        console.log(keyName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.addRow;
        inputDataObj.[keyName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            addRow: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.addRow);
    }
    saveUser = () => {
        console.log(this.state.selectRow);

        this.requestADMIN_ROLE_edit(this.props.store.userState.token, this.state.selectRow);
    }
    addRole = () => {

        console.log(this.state.addRow);
        this.requestADMIN_ROLE_add(this.props.store.userState.token, this.state.addRow);
    }
    deleteRole = () => {
        console.log(this.state.addRow);
        this.requestADMIN_ROLE_delete(this.props.store.userState.token, this.state.selectRow.role_id);
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
        console.log(this.state);
        console.log('=====roles=====');
        console.log(this.state.roles);
        console.log(this.props);
        console.log(this.props.store.menuState.tableData);
        const selectRowProp = {
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex) => {
                this.setState({
                    selectRow: row,
                    isDisableButton: false
                });
            }
        }
        return (
            <div className="coverTable TableADMIN_ROLES">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock"></div>
                </div>
                {
                    this.state.isShowDeleteBlock
                        ? <div className="coverDeleteBlock">
                            <div className="innerBlock">
                                <div>Ви впевнені, видалити цю роль: <span>{this.state.selectRow.role_id}</span>?</div>
                                <br/>
                                <div className="coverBtn">
                                    <button className="btn btn-danger" onClick={this.deleteRole}>Видалити</button>
                                    <button className="btn btn-secondary" onClick={this.closeEditForm}>Скасувати</button>
                                </div>

                            </div>
                        </div>
                        : <></>
                }
                {
                    this.state.isShowEditBlock
                        ? <div className="coverEditBlock">
                            <div className="innerBlock">
                                <input onChange={this.changeInput} name="role_id" type="text" placeholder="ID ролі" defaultValue={this.state.selectRow.role_id} disabled/>

                                <input onChange={this.changeInput} name="role_name" type="text" placeholder="Ім'я ролі"
                                       defaultValue={this.state.selectRow.role_name}/>
                                <input onChange={this.changeInput} name="role_desc" type="text"  placeholder="Опис"
                                       defaultValue={this.state.selectRow.role_desc}/>
                                <input onChange={this.changeInput} name="ad_role" type="text"  placeholder="Ідентифікатор AD ролі" defaultValue={this.state.selectRow.ad_role}/>

                                <div className="coverBtn">
                                    <button onClick={this.saveUser} className="btn btn-success" >Зберегти</button>
                                    <button onClick={this.closeEditForm} className="btn btn-secondary">Закрити</button>
                                </div>



                             </div>
                        </div>
                        : <></>
                }
                {
                    this.state.isShowAddBlock
                        ? <div className="coverAddBlock">
                            <div className="innerBlock">
                                <input onChange={this.changeInputAdd} name="role_id" type="text" placeholder="ID ролі" />

                                <input onChange={this.changeInputAdd} name="role_name" type="text" placeholder="Ім'я ролі"/>
                                <input onChange={this.changeInputAdd} name="role_desc" type="text"  placeholder="Опис"/>
                                <input onChange={this.changeInputAdd} name="ad_role" type="text"  placeholder="Ідентифікатор AD ролі"/>

                                <div className="coverBtn">
                                    <button onClick={this.addRole} className="btn btn-success" >Зберегти</button>
                                    <button onClick={this.closeEditForm} className="btn btn-secondary">Закрити</button>
                                </div>
                            </div>
                        </div>
                        : <></>
                }
                <div className="innerTable">
                    <div className="Table">
                        {
                            this.state.isShowTable
                                ? <>
                                    <div className="controlBlock">
                                        <button
                                            onClick={this.editHandle}
                                            disabled={this.state.isDisableButton ? 'disabled' : ''}
                                            className="btn btn-secondary"
                                        >Редагування</button>
                                        <button onClick={this.addHandle} className="btn btn-info">Додавання</button>
                                        <button onClick={this.deleteHandle} disabled={this.state.isDisableButton ? 'disabled' : ''} className="btn btn-warning">Видалення</button>
                                    </div>
                                    <BootstrapTable data={this.state.roles}
                                                    selectRow={selectRowProp}
                                    >

                                        <TableHeaderColumn isKey dataField='role_id'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            ID ролі
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='role_name'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Ім'я ролі
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='ad_role' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Ідентифікатор AD ролі
                                        </TableHeaderColumn>


                                    </BootstrapTable>
                                </>
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