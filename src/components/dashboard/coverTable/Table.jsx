// import React from 'react';
// import * as axios from "axios";
// //import * as events from "events";
// //import {Grid, TableHeaderRow, Table} from "@devexpress/dx-react-grid";
// //import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// // import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';




// class Table extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             token: null,
//             loading: true,
//             table: null,
//             rowTrAct: null,
//             row_id: null,
//             loadTableFun: true,
//             // columns: [
//             //     { name: 'id', title: 'ID' },
//             //     { name: 'product', title: 'Product' },
//             //     { name: 'owner', title: 'Owner' },
//             // ],
//             // rows: [
//             //     { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
//             //     { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
//             // ]
//         }
//         console.log(this.props);

//         //console.log(this.data.sort());
//     }

//     componentDidMount() {
//         //this.test_request();
//         console.log(this.props);
//         // if(this.props.store.location.pathname.substr(11) != '' && this.props.store.menuState.operation){
//         //     this.requestOperation(this.props.store.userState.token, this.props.store.location.pathname.substr(11));
//         // }
//         // this.renderingTable(this.state.data);
//         //this.rr()
//         console.log('----------------------componentDidMount');
//         //this.requestOperation(this.props.store.userState.token, this.props.store.menuState.operation)
//         //this.props.store.addTableData(true );
//     }
//     checkURL = () => {
//         //this.determinationTable(this.props.store.userState.token, this.props.store.location.pathname.substr(11))
//     }

//     searchValueURL = (pathname) => {
//         console.log(pathname);
//     }

//     async requestOperation  (token, operation) {
//         this.setState({ loading: true });
//         console.log( token );
//         console.log( operation );
//         const baseUrl = `/api/Dictionary/${operation}`;
//         await axios.get(
//             baseUrl,
//             {
//                 headers: {"Token" : `${ token }`}
//             }
//         )
//             .then((response) => {
//                 console.log(response.data);
//                 console.log(response.data.Table);
//                 //this.setState({ data: response.data });
//                 //console.log(response.data.sort());

//                 // this.props.au_addToken(response.data.token); //записуєм token в store
//                 this.setState({
//                     table: response.data.Table,
//                     loading: false
//                 });
//             })
//             .catch((error) => {
//                 console.log(error.response);
//                 console.log(error.response.data);
//                 //console.log('error_catch');

//             });

//     }
//     determinationTable = (token, operation) => {
//         console.log(operation == null || operation == "");
//         if ( operation == null || operation == "" ){
//             //this.setState({ loading: false });
//             return(
//                 <div>
//                     Таблиця пуста
//                 </div>
//             )
//         }else{
//             this.requestOperation(token, operation);

//             //console.log( this.requestOperation(token, operation) );
//         }

//     }

//     trActive = (e) => {
//         let row_id = e.currentTarget.getAttribute("row_id");
//         let rowNumber = e.currentTarget.getAttribute("row");
//         console.log(rowNumber);
//         this.setState({
//             rowTrAct: Number(rowNumber),
//             row_id: row_id
//         });
//         //this.setState({ loading: false });

//     }

//     renderingTable = (data) => {
//         console.log(data);
//         console.log(typeof data.TableHeaders);
//         console.log(Object.values( data.TableHeaders ));
//         // data = data.table;
//         // console.log(data);
//             let td = (data) => {
//                 //console.log(data);
//                 // return Object.values( data ).map( ( item , index) => {
//                 //     console.log(item);
//                 //     return <td>{item}</td>;
//                 // })

//                 // for (var key in data) {
//                 //     console.log(data);
//                 //     return <td nameTd={key}>{data[key]}</td>;
//                 // }


//                 // return Object.keys(data).forEach(function(key) {
//                 //     console.log(key, ':', this[key]);
//                 //     return <td nameTd={key}>{data[key]}</td>;
//                 // }, data);

//                 return Object.entries( data ).map( ( item , index) => {
//                     //console.log(item);
//                     return <td name_td={item[0]}>{item[1]}</td>;
//                 })

//             }
//             let id = (arr, indexArr) => {
//                 //console.log(arr);
//                 //console.log(indexArr);
//                 //console.log(arr[indexArr]);

//                 for (var key in arr[indexArr]) {
//                     //console.log(arr[indexArr][key]);
//                     return arr[indexArr][key]
//                 }
//             }
//             return(
//                 <table>
//                     <thead>
//                         <tr>
//                             {
//                                 Object.values( data.TableHeaders ).map(( item , index) => {
//                                      //console.log(item);
//                                      return <th>{item}</th>;

//                                 })
//                             }
//                         </tr>
//                     </thead>
//                     <tbody>
//                             { data.TableRows.map( ( item , index) => {
//                                 //console.log('зайшло');

//                                 //console.log(index);
//                                 //console.log(item[0]);
//                                 //console.log(item);
//                                 //id(data.TableRows, index);
//                                 //console.log(this.state.rowTrAct);
//                                 //console.log(typeof this.state.rowTrAct);
//                                 //console.log(this.state.rowTrAct === index ? 'active' : '' );

//                                 return (
//                                     <tr row={index} row_id={id(data.TableRows, index)}  className={` ${ this.state.rowTrAct === index ? 'active' : '' }`} onClick={this.trActive}>{td(item)}</tr>
//                                 )
//                               })
//                             }
//                     </tbody>
//                 </table>
//             )

//     }
//     addRow = () => {
//         // відправляєм запит з даними для видалення
//         // this.setState({ loading: true });
//         //this.props.store.addTableData(false, 'empty');

//         //this.props.store.addTableData(true, 'empty');

//         this.props.store.showPopupTable(true, 'add' );
//     }
//     deleteRow = () => {
//         // відправляєм запит з даними для видалення
//         // this.setState({ loading: true });
//         //this.props.store.addTableData(false, 'empty');
//         //this.props.store.addTableData(true, 'empty');

//         this.props.store.showPopupTable(true, 'delete' );
//     }



//     render() {
//         console.log(this.state);
//         console.log(this.props);
//         console.log(this.props.store);

//         //console.log(this.props.store.menuState.operation);
//         //this.requestOperation(this.props.store.userState.token, this.props.store.menuState.operation)
//         return (
//             <div className="coverTable">
//                 <div className="headerTable">
//                     <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
//                     <div className="optionBlock">
//                         <div className="addRow btnRow" onClick={this.addRow}>
//                             <svg version="1.1"  x="0px" y="0px" width="35px" height="35px" viewBox="0 0 35 35"  >
//                                 <g>
//                                     <path d="M30,0H5C2.239,0,0,2.239,0,5v25c0,2.761,2.239,5,5,5h25c2.762,0,5-2.239,5-5V5C35,2.239,32.762,0,30,0z M7.25,6.25h10.039
//                                         c0.829,0,1.5,0.671,1.5,1.5s-0.671,1.5-1.5,1.5H7.25c-0.829,0-1.5-0.671-1.5-1.5S6.421,6.25,7.25,6.25z M7.25,12.75h10
//                                         c0.829,0,1.5,0.671,1.5,1.5s-0.671,1.5-1.5,1.5h-10c-0.829,0-1.5-0.671-1.5-1.5S6.421,12.75,7.25,12.75z M27.75,28.75H7.25
//                                         c-0.829,0-1.5-0.671-1.5-1.5s0.671-1.5,1.5-1.5h20.5c0.829,0,1.5,0.671,1.5,1.5S28.578,28.75,27.75,28.75z M27.75,22.25H7.25
//                                         c-0.829,0-1.5-0.671-1.5-1.5s0.671-1.5,1.5-1.5h20.5c0.829,0,1.5,0.671,1.5,1.5S28.578,22.25,27.75,22.25z M28.777,12.378h-1.879
//                                         v1.879c0,0.755-0.612,1.368-1.367,1.368c-0.756,0-1.367-0.612-1.367-1.368v-1.879h-1.88c-0.755,0-1.368-0.612-1.368-1.368
//                                         c0-0.756,0.611-1.368,1.368-1.368h1.88v-1.88c0-0.755,0.611-1.367,1.367-1.367c0.755,0,1.367,0.611,1.367,1.367v1.88h1.879
//                                         c0.757,0,1.369,0.612,1.369,1.368C30.146,11.766,29.534,12.378,28.777,12.378z"/>
//                                 </g>
//                             </svg>
//                         </div>
//                         <div className="editRow btnRow">
//                             <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                                  viewBox="0 0 512.013 512.013">
//                                 <g>
//                                     <path d="M506.178,125.864L386.13,5.823C382.403,2.096,377.342,0,372.063,0c-0.007,0-0.007,0-0.013,0
//                                         c-5.279,0.007-10.339,2.109-14.067,5.843L39.641,324.848c-2.673,2.686-4.523,6.068-5.345,9.769L0.472,487.826
//                                         c-1.459,6.632,0.557,13.556,5.365,18.358c3.767,3.774,8.847,5.83,14.067,5.83c1.433,0,2.865-0.153,4.291-0.478l153.202-33.83
//                                         c3.694-0.816,7.083-2.679,9.762-5.352l319.005-318.335c3.74-3.727,5.843-8.794,5.843-14.073S509.912,129.598,506.178,125.864z
//                                          M163.158,440.114L46.054,465.973l25.859-117.11l300.17-300.8l91.875,91.881L163.158,440.114z"/>
//                                 </g>
//                                                             <g>

//                                         <rect x="341.228" y="66.051" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.9546 299.5582)" width="39.786" height="169.761"/>
//                                 </g>
//                                                             <g>

//                                         <rect x="93.513" y="314.186" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -248.6361 196.937)" width="39.786" height="168.826"/>
//                                 </g>
//                             </svg>
//                         </div>
//                         <div className="deleteRow btnRow"  onClick={this.deleteRow}>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 64 64"
//                                  className="cflow-delete-item-icon">
//                                 <path
//                                     d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"></path>
//                                 <path
//                                     d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"></path>
//                                 <path
//                                     d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="innerTable">
//                     {/*{*/}
//                     {/*    this.state.loadTableFun*/}
//                     {/*        ? this.renderingTable(this.props.store.menuState.tableData)*/}
//                     {/*        : this.renderingTable(this.props.store.menuState.tableData)*/}
//                     {/*}*/}
//                     {this.renderingTable(this.props.store.menuState.tableData)}

//                     {/*<Grid*/}
//                     {/*    rows={rows}*/}
//                     {/*    columns={columns}*/}
//                     {/*    getRowId={getRowId}*/}
//                     {/*>*/}
//                     {/*    <EditingState*/}
//                     {/*        onCommitChanges={commitChanges}*/}
//                     {/*    />*/}
//                     {/*    <Table />*/}
//                     {/*    <TableHeaderRow />*/}
//                     {/*    <TableEditRow />*/}
//                     {/*    <TableEditColumn*/}
//                     {/*        showAddCommand*/}
//                     {/*        showEditCommand*/}
//                     {/*        showDeleteCommand*/}
//                     {/*    />*/}
//                     {/*</Grid>*/}




//                 </div>
//                 {
//                     this.props.store.menuState.isLoading
//                         ? <div className="coverloader">
//                             <div className="loader"></div>
//                         </div>
//                         : <></>
//                 }
//             </div>
//         )
//     }
// }

// export default Table;