import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';

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
    render() {
        console.log(this.state.Table);
        console.log(this.props);
        console.log(this.props.store.menuState.tableData);
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
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