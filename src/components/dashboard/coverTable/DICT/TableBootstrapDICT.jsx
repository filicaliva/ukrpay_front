import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import * as axios from "axios";

class TableBootstrapDICT extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.requestDICT(this.props.store.userState.token, this.params);
  }
  async requestDICT(token, operation) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/${operation}`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        this.props.store.addTableData(true, response.data.Table);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  columnsData = (data) => {
    let res = [];
    Object.keys(data).map((a) => res.push({ dataField: a, text: data[a] }));
    return res;
  };
  activeOperation = (operationArr, operation) => {
    let res;
    for (let i = 0; i < operationArr.length; i++) {
      const item = operationArr[i];
      if (item.operation === operation) {
        res = item.name;
      }
    }
    return res;
  };

  render() {
    return (
      <div className="coverTable">
        <div className="headerTable">
          <div className="titleTable">
            {this.activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="innerTable">
          <div className="Table">
            <BootstrapTable
              keyField="id"
              data={this.props.store.menuState.tableData.TableRows}
              columns={this.columnsData(
                this.props.store.menuState.tableData.TableHeaders
              )}
              cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default TableBootstrapDICT;
