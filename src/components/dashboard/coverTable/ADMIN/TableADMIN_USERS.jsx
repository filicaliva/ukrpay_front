import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";

const cellEditProp = {
    mode: 'click'
};

class TableADMIN_USERS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { id: 'id', text: 'Id' },
                { id: 'name', text: 'Name' },
                { id: 'animal', text: 'Animal' },
            ],
            data:[
                { id: 1, name: 'George', animal: 'Monkey' },
                { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
                { id: 3, name: 'Alice', animal: 'Giraffe' },
                { id: 4, name: 'Alice', animal: 'Tiger' }
            ],
            user_code: "",
            user_name: "",
            only_active: false,
            isShowTable: false,
            isShowDeleteBlock: false,
            dateBlock: null

        }
        //console.log(this.data.sort());
    }
    async requestADMIN_USERS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/User`;
        const userBody = {
            user_code: this.state.user_code,
            user_name: this.state.user_name,
            bank_branch_id: 0,
            only_active: this.state.only_active

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
                this.setState({isShowTable: true});

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_USERS_delete  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/User/${this.state.user_code}/0/${this.state.dateBlock}`;
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
                    user_code: null,
                    isShowDeleteBlock: false
                });
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_USERS_add  (token, userBody) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( userBody );
        const baseUrl = `/api/User`;
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
                this.requestADMIN_USERS(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    changeUserCode = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            user_code: inputValue
        });
    }
    changeUserName = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            user_name: inputValue
        });
    }
    changeOnlyActive = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.checked;
        console.log(inputValue);
        this.setState({
            only_active: inputValue
        });
    }
    search = () => {
        this.requestADMIN_USERS(this.props.store.userState.token);
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
    deleteUser = (obj) => {
        console.log(obj);
        this.setState({
            user_code: obj[0].user_code,
            isShowDeleteBlock: true
        });
    }
    closePopup = () => {
        console.log();
        this.setState({
            user_code: null,
            isShowDeleteBlock: false
        });
    }

    requestDeleteUser = () => {
        this.requestADMIN_USERS_delete(this.props.store.userState.token);
    }
    changeDate = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            dateBlock: this.formatDate(new Date(inputValue))
        });
    }
    formatDate = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        return year + month + day;
    }
    addNewUser = (obj) => {
        console.log(obj);
        delete obj.id
        console.log(obj);
        this.requestADMIN_USERS_add(this.props.store.userState.token, obj);
    }
    render() {
        console.log(this.props.store.menuState.tableData);
        console.log(this.addId(this.props.store.menuState.tableData));
        console.log(this.state);
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
            //console.log(res);
            this.deleteUser(res);
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
            this.addNewUser(row);
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
                this.requestADMIN_USERS_add(this.props.store.userState.token, oldValue);
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
                    <div className="optionBlock">

                    </div>
                </div>
                <div className="filter">
                    <div className="coverInput">
                        <label htmlFor="user_code">Код користувача</label>
                        <input onChange={this.changeUserCode} defaultValue={this.state.user_code} className="customInput" id="user_code" type="text"/>
                    
                        <label htmlFor="user_name">Імя користувача</label>
                        <input onChange={this.changeUserName} defaultValue={this.state.user_name} className="customInput" id="user_name" type="text"/>
                    </div>
                    <div className="coverCheckbox">
                        <label htmlFor="status_code">Тільки активні користувачі</label>
                        <input onChange={this.changeOnlyActive} id="status_code" type="checkbox"/>
                    </div>
                    <button className="search" onClick={this.search}>Пошук</button>
                </div>
                {
                    this.state.isShowDeleteBlock
                        ? <div className="coverDeleteBlock">
                            <div className="deleteBlock">
                                <div className="coverInput">
                                    <label htmlFor="user_code">Код користувача</label>
                                    <input  defaultValue={this.state.user_code} className="customInput" id="user_code" type="text" disabled/>
                                </div>
                                <div className="coverInput">
                                    <label htmlFor="user_date">Дата до якої призупинити користувача</label>
                                    <input onChange={this.changeDate} className="customInput" id="user_date" type="date"/>
                                </div>
                                <button className="search" onClick={this.requestDeleteUser}>Видалити користувача</button>
                                <button className="search" onClick={this.closePopup}>Скасувати</button>
                            </div>
                        </div>
                        : <></>
                }

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

                                    {/*{this.testRendColums}*/}


                                    <TableHeaderColumn isKey dataField='id' width="40" tdStyle={{ "text-align": 'center' }} autoValue >
                                        №
                                    </TableHeaderColumn>
                                    <TableHeaderColumn  dataField='user_code'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Код користувача
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='status_code'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Статус користувача
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_name' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Ім'я користувача
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_position' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Посада користувача
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='mobile' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Телефон
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_email' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Email
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='division' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Відділ
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='user_role' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Роль
                                    </TableHeaderColumn>

                                </BootstrapTable>
                                : <>
                                    <span>Скористайтеся пошуком</span>
                                </>
                        }

                        {/*{*/}
                        {/*    this.props.store.menuState.isLoading*/}
                        {/*        ? <div className="coverloader">*/}
                        {/*            <div className="loader"></div>*/}
                        {/*        </div>*/}
                        {/*        : <></>*/}
                        {/*}*/}
                    </div>
                </div>
            </div>

        );
    }
}

export default TableADMIN_USERS