import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";
import {Dropdown, DropdownButton} from "react-bootstrap";

const cellEditProp = {
    mode: 'click'
};

class TableADMIN_ROLE_OPERATIONS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTable: false,
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
            ]

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

                this.props.store.addRoleData(response.data.operations);
                //this.props.store.addTableData(true, null);
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
    selectRoleID = (e) => {
        console.log(e.target.value);
        let roleID = e.target.value;
        console.log(roleID);
        this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token, roleID)
    }
    render() {
        console.log(this.props.store.menuState.tableData);
        console.log(this.props.store.menuState.roleData);
        const onDeleteRow = (rowKeys) => {
            console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            // for(let i = 0; i != rowKeys.length; i++){
            //     res = this.state.columns.filter((item) => {
            //         return item.id == rowKeys[i]
            //     })
            // }
            // localStorage.setItem("rows", JSON.stringify(this.state.columns))
            console.log(res);
            console.log(rowKeys);
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
            //alert('You inserted:\n ' + newRowStr)
        }
        const cellEditFactory = {
            mode: 'click',
            blurToSave: true,
            nonEditableRows: () => [0, 3],
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
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( '-----------------' );
            }
        }
        const selectRowProp = {
            mode: 'checkbox'
        }
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }

        const OptionItem = (props) => {
            console.log( props )
            return(
                <option   value={props.optionItem.role_id} >{props.optionItem.role_name}</option>
                // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
            )
        }

        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock">
                        <span htmlFor="dropdown-basic-button">Виберіть роль</span>
                        <select onChange={this.selectRoleID}  id="dropdown-basic-button" class="form-select" title="Виберіть роль">
                            <option selected>-</option>
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
                <div className="innerTable">
                    <div className="Table">
                        {
                            this.state.isShowTable
                                ? <BootstrapTable data={this.props.store.menuState.roleData}
                                                  insertRow={true}
                                                  deleteRow={true}
                                                  selectRow={selectRowProp}
                                                  options={options}
                                                  cellEdit={cellEditFactory}
                                >

                                    {/*{this.testRendColums}*/}

                                    <TableHeaderColumn isKey dataField='operation_id' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        ID операції
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='operation_desc' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Операція
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='parent_operation_id' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Відноситься до
                                    </TableHeaderColumn>

                                </BootstrapTable>
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