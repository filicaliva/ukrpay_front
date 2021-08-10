import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
//import 'react-bootstrap-table/css/Table.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


function onInsertRow(row) {
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


// function onDeleteRow(rowKeys) {
//     alert('You deleted: ' + rowKeys)
//     for(let i = 0; i != rowKeys.length; i++){
//         this.state.rows = this.state.rows.filter((item) => {return item.id !==
//             rowKeys[i]})
//     }
//     localStorage.setItem("items", JSON.stringify(this.state.rows))
//     console.log(rowKeys);
// }

class TableBootstrapTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                { id: 0, name: 'DevExtreme', value: 'DevExpress' },
                { id: 1, name: 'DevExtreme Reactive', value: 'DevExpress' },
                { id: 2, name: 'Sasha', value: 'Cool' }
            ],
            selectRowProp:{ mode: 'checkbox'},
            options: {
                afterInsertRow: onInsertRow,
                afterDeleteRow: this.onDeleteRow
            },
            cellEditFactory: {
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
            },
            cellEditProp: {
                mode: 'click', // 'dbclick' for trigger by double-click
                nonEditableRows: function() {
                    return [3];
                }
            },
            table: {
                TableHeaders:{
                    external_ref_column_header: "Зовнішнє посилання",
                    payment_system_desc_column_header: "Код Банку",
                    payment_system_id_column_header: "ID",
                    payment_system_name_column_header: "Платіжна система"
                },
                TableRows:[
                    {
                        external_ref: null,
                        payment_system_desc: "13013",
                        payment_system_id: 1,
                        payment_system_name: "MasterCard"
                    }
                ]
            },
            showTable: false,
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


    onDeleteRow = (rowKeys) => {
        console.log(rowKeys);
        //alert('You deleted: ' + rowKeys)
        let res;
        for(let i = 0; i != rowKeys.length; i++){
            res = this.state.rows.filter((item) => {
                return item.id == rowKeys[i]
            })
        }
        localStorage.setItem("rows", JSON.stringify(this.state.rows))
        console.log(res);
        console.log(rowKeys);
    }


    table_header = (rr) => {
        console.log(rr);
        //console.log(rr.TableHeaders);
        console.log(typeof rr.TableHeaders);
        console.log(Object.values( rr.TableHeaders ));
        console.log(rr.TableRows);
        console.log(Object.values( rr.TableRows ));
        //let rr2 = rr.TableRows;
        //console.log(Object.values( rr2 ));
        console.log(this.state.table.TableRows);

        // return(
        //     <BootstrapTable data={this.state.table.TableRows}
        //                     insertRow={true}
        //                     deleteRow={true}
        //                     selectRow={this.selectRowProp}
        //                     options={this.state.options}
        //                     cellEdit={this.cellEditFactory}
        //     >
        //         {
        //             Object.values( rr.TableHeaders ).map(( item , index) => {
        //                 console.log(item);
        //                 return <TableHeaderColumn dataField={item} >{item}</TableHeaderColumn>;
        //             })
        //         }
        //     </BootstrapTable>
        // )

        return(
            <div>
                <div>
                    <div>
                        {
                            Object.values( rr.TableHeaders ).map(( item , index) => {
                                console.log(item);
                                return <div >{item}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
        )

    }
    testRendColums = () => {

        // for (let i = 3; i < 3; i++) {
        //
        // }
        return(
            <TableHeaderColumn isKey dataField='id' autoValue editable={false} >
                ID
            </TableHeaderColumn>
        )
    }
    objToArr = (obj) => {
        var res=[];
        Object.keys(obj).map(a => res.push({name:a , value:obj[a]}))
        console.log(res)
        return res;
    }
    // tableHeaderColumns = this.state.columns.map((column) => (
    //     <TableHeaderColumn
    //         dataField={column.this.state.data}
    //     >
    //         {column.description}
    //     </TableHeaderColumn>
    // ))
    tableHeaderColumns = ()=> {
         this.state.columns.map((column) => (

                <TableHeaderColumn
                    isKey={true}
                    dataField={column.this.state.data}
                >
                    {column.description}
                </TableHeaderColumn>

        ))
    }
    render() {
        const cellEditProp = {
            mode: 'click', // 'dbclick' for trigger by double-click
            nonEditableRows: function() {
                return [3];
            }
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
        const onDeleteRow = (rowKeys) => {
            console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            for(let i = 0; i != rowKeys.length; i++){
                res = this.state.rows.filter((item) => {
                    return item.id == rowKeys[i]
                })
            }
            localStorage.setItem("rows", JSON.stringify(this.state.rows))
            console.log(res);
            console.log(rowKeys);
        }
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        // To delete rows you be able to select rows
        const selectRowProp = {
            mode: 'checkbox'
        }
        // const tableHeader = (table) => {
        //     console.log(table);
        //     return(
        //         <BootstrapTable data={table.TableRows}
        //                         insertRow={true}
        //                         deleteRow={true}
        //                         selectRow={selectRowProp}
        //                         options={options}
        //                         cellEdit={cellEditFactory}
        //         >
        //             {
        //                 Object.values( table.TableHeaders ).map(( item , index) => {
        //                     console.log(item);
        //                     return <TableHeaderColumn dataField={item} >{item}</TableHeaderColumn>;
        //                 })
        //             }
        //         </BootstrapTable>
        //     )
        //
        // }

        //console.log(this.table_header(this.props.store.menuState.tableData.TableHeaders));

        // console.log(this.testRendColums);
        // console.log(this.props);
        // console.log(this.props.store.menuState.tableData);
        // console.log(this.props.store.menuState.tableData.TableRows);
        // console.log(typeof this.props.store.menuState.tableData.TableRows);
        // console.log(typeof this.props.store.menuState.tableData.TableHeaders);
        // console.log(this.props.store.menuState.tableData.TableHeaders);
        // console.log(Object.entries(this.props.store.menuState.tableData.TableHeaders));
        // console.log(this.state.columns);
        // console.log(this.state.data);

        return (
            <div className="coverTable">
                {/*<BootstrapTable hover data={this.state.data}>*/}
                {/*    {this.tableHeaderColumns}*/}
                {/*</BootstrapTable>*/}
                <BootstrapTable
                    keyField="id"
                    data={this.state.data}
                    columns={this.state.columns}
                    classes="someClass2"
                />
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        {/*{this.table_header(this.props.store.menuState.tableData)}*/}

                        {/*<BootstrapTable data={this.props.store.menuState.tableData.TableRows}*/}
                        {/*                insertRow={true}*/}
                        {/*                deleteRow={true}*/}
                        {/*                selectRow={selectRowProp}*/}
                        {/*                options={options}*/}
                        {/*                cellEdit={cellEditFactory}*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        Object.values( rr.TableHeaders ).map(( item , index) => {*/}
                        {/*            console.log(item);*/}
                        {/*            return <TableHeaderColumn dataField={item} >{item}</TableHeaderColumn>;*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</BootstrapTable>*/}

                        {
                            this.state.showTable
                                ? <BootstrapTable data={this.props.store.menuState.tableData.TableRows}
                                                  insertRow={true}
                                                  deleteRow={true}
                                                  selectRow={selectRowProp}
                                                  options={options}
                                                  cellEdit={cellEditFactory}
                                >

                                    {this.testRendColums}

                                    {/*<TableHeaderColumn isKey dataField='id' autoValue editable={false} >*/}
                                    {/*    ID*/}
                                    {/*</TableHeaderColumn>*/}
                                    {/*<TableHeaderColumn dataField='name' >*/}
                                    {/*    Name*/}
                                    {/*</TableHeaderColumn>*/}
                                    {/*<TableHeaderColumn dataField='value' >*/}
                                    {/*    Value*/}
                                    {/*</TableHeaderColumn>*/}


                                </BootstrapTable>
                                : <></>
                        }

                        {/*<BootstrapTable data={ this.props.store.menuState.tableData.TableRows } keyField={true}>*/}
                        {/*    {*/}

                        {/*        Object.entries(this.props.store.menuState.tableData.TableHeaders).map( column => {*/}
                        {/*            console.log(column);*/}
                        {/*            return (*/}
                        {/*                <TableHeaderColumn dataField={ column[0] }>{ column[1] }</TableHeaderColumn>*/}
                        {/*            );*/}
                        {/*        })*/}

                        {/*        // Object.entries(this.state.columns).map( ( item , index) => {*/}
                        {/*        //     console.log(item);*/}
                        {/*        //     console.log(index);*/}
                        {/*        //     console.log(item.index);*/}
                        {/*        //     console.log(item[index]);*/}
                        {/*        //     return (*/}
                        {/*        //         <TableHeaderColumn dataField={ item[index] }>{ item[index] }</TableHeaderColumn>*/}
                        {/*        //     );*/}
                        {/*        // })*/}
                        {/*    }*/}
                        {/*</BootstrapTable>*/}


                    </div>
                </div>
            </div>

        )
    }
}

export default TableBootstrapTest