import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';

class TableADMIN_ROLES extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    dataField: "role_id",
                    text: "Product ID"
                },
                {
                    dataField: "role_name",
                    text: "Назва ролі"
                },
                {
                    dataField: "role_desc",
                    text: "Опис ролі"
                },
                {
                    dataField: "ad_role",
                    text: "Роль AD ad_role"
                }
            ]
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
    handleNonEditableRows = (oldValue, newValue, row, column) => {
        console.log(oldValue);
        console.log(newValue);
        console.log(row);
        console.log(column);
    }
    render() {
        //console.log(this.state.Table);
        console.log(this.props);
        console.log(this.props.store.menuState.tableData);
        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };
        return (
            <div className="coverTable">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="innerTable">
                    <div className="Table">
                        {
                            this.props.store.menuState.showTable
                                ? <BootstrapTable
                                    keyField="id"
                                    data={this.props.store.menuState.tableData}
                                    columns={this.state.columns}
                                    cellEdit={ cellEditFactory({
                                        mode: 'click',
                                        blurToSave: true,
                                        afterSaveCell: this.handleChange
                                    }) }
                                    selectRow={selectRowProp}
                                    striped
                                    hover
                                    condensed
                                    insertRow
                                    deleteRow
                                    search
                                    insertRow={true}

                                />
                                : <></>
                        }

                    </div>
                </div>
            </div>
        )
    }
}
export default TableADMIN_ROLES