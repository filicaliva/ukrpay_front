import React from "react";
import * as axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {activeOperation} from './helpers'
class TableADMIN_OPERATIONS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
    };
  }
  componentDidMount() {
    this.requestADMIN_OPERATIONS(this.props.store.userState.token);
  }
  async requestADMIN_OPERATIONS(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Operations`;
    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
        },
      })
      .then((response) => {
        this.setState({
          tableData: response.data.operations,
        });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error)
      });
  }

  render() {
    return (
      <div className="coverTable">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="innerTable">
          <div className="Table">
            <BootstrapTable data={this.state.tableData}>
              <TableHeaderColumn
                isKey
                dataField="name"
                filter={{ type: "TextFilter", delay: 1000 }}
              >
                Ім'я операції
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="operation"
                filter={{ type: "TextFilter", delay: 1000 }}
              >
                Операція
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="parent_operation"
                filter={{ type: "TextFilter", delay: 1000 }}
              >
                Відноситься до
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>
    );
  }
}
export default TableADMIN_OPERATIONS;