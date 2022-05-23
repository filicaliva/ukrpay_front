import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";

const cellEditProp = {
    mode: 'click'
};

class ReactBootstrapTable extends React.Component {
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
        const onDeleteRow = (rowKeys) => {
            console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            for(let i = 0; i != rowKeys.length; i++){
                res = this.state.columns.filter((item) => {
                    return item.id == rowKeys[i]
                })
            }
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
            <BootstrapTable data={this.state.data}
                            insertRow={true}
                            deleteRow={true}
                            selectRow={selectRowProp}
                            options={options}
                            cellEdit={cellEditFactory}
            >

                {/*{this.testRendColums}*/}

                <TableHeaderColumn isKey dataField='id' autoValue editable={false} >
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField='animal' filter={ { type: 'TextFilter', delay: 1000 } }>
                    animal
                </TableHeaderColumn>

            </BootstrapTable>
        );
    }
}

export default ReactBootstrapTable