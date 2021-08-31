import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";

const cellEditProp = {
    mode: 'click'
};

class TableADMIN_OPERATIONS extends React.Component {
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
            ]

        }
        //console.log(this.data.sort());
    }

    render() {
        console.log(this.props.store.menuState.tableData);
        const onDeleteRow = (rowKeys) => {
            console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            // for(let i = 0; i != rowKeys.length; i++){
            //     res = this.state.columns.filter((item) => {
            //         return item.id == rowKeys[i]
            //     })
            // }
            localStorage.setItem("rows", JSON.stringify(this.state.columns))
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
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        <BootstrapTable data={this.props.store.menuState.tableData}
                                        //insertRow={true}
                                        //deleteRow={true}
                                        //selectRow={selectRowProp}
                                        //options={options}
                                        //cellEdit={cellEditFactory}
                        >

                            {/*{this.testRendColums}*/}

                            <TableHeaderColumn isKey dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>
                                Ім'я операції
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='operation' filter={ { type: 'TextFilter', delay: 1000 } }>
                                Операція
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='parent_operation' filter={ { type: 'TextFilter', delay: 1000 } }>
                                Відноситься до
                            </TableHeaderColumn>

                        </BootstrapTable>
                    </div>
                </div>
            </div>

        );
    }
}

export default TableADMIN_OPERATIONS