import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import * as axios from "axios";

class TableBootstrapDICT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    dataField: "id",
                    text: "Product ID"
                },
                {
                    dataField: "name",
                    text: "Product Name"
                },
                {
                    dataField: "price",
                    text: "Product Price"
                }
            ],
            data: [
                { id: 1, name: "Item 1", price: 100 },
                { id: 2, name: "Item 2", price: 102 }
            ],
            Table:{
                TableHeaders:{
                    payment_system_id:"ID",
                    payment_system_name:"Платіжна система",
                    payment_system_desc:"Код Банку",
                    external_ref:"Зовнішнє посилання"
                },
                TableRows:[
                    {payment_system_id:1,payment_system_name:"MasterCard",payment_system_desc:"13013",external_ref:null},
                    {payment_system_id:2,payment_system_name:"Visa",payment_system_desc:"9108",external_ref:null},
                    {payment_system_id:3,payment_system_name:"PROSTIR",payment_system_desc:"НБУ",external_ref:null},
                    {payment_system_id:22,payment_system_name:"ChinaExpress ",payment_system_desc:"108",external_ref:null}]
            },
            ErrorStatus:{
                ErrorCode:0,
                ErrorMessage:"Успішно"
            }
        }
    }
    componentDidMount () {
        this.requestDICT(this.props.store.userState.token, this.params)
    }
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
    columnsData = (data) => {
        console.log(data);
        let res=[];
        Object.keys(data).map(a => res.push({dataField:a , text:data[a]}));
        console.log(res);
        return res;
    }
    handleChange = (oldValue, newValue, row, column) => {
        console.log(oldValue);
        console.log(newValue);
        console.log(row);
        console.log(column);
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
        console.log(this.params);
        console.log(this.state.Table);
        console.log(this.props);
        console.log(this.props.store.menuState.tableData);
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        <BootstrapTable
                            keyField="id"
                            data={this.props.store.menuState.tableData.TableRows}
                            columns={this.columnsData(this.props.store.menuState.tableData.TableHeaders)}
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: this.handleChange}) }
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default TableBootstrapDICT