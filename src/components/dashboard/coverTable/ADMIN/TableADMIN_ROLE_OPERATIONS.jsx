import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";

class TableADMIN_ROLE_OPERATIONS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: null,
      isShowSelectRoles: false,
      operations: null,
      isShowTable: false,
      isSelected: null,
      isDisableButton: true,
      selectRow: null,
    };
  }
  componentDidMount() {
    this.requestADMIN_ROLES(this.props.store.userState.token);
  }
  async requestADMIN_ROLES(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Role`;
    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
        },
      })
      .then((response) => {
        this.setState({
          roles: response.data.roles,
          isShowSelectRoles: true,
        });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_ROLE_OPERATIONS(token, roleID) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/RoleOperations/${roleID}`;
    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
        },
      })
      .then((response) => {
        this.setState({
          operations: response.data.operations,
          isShowTable: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_ROLE_OPERATIONS_edit(token, obj) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/RoleOperations`;

    await axios
      .put(baseUrl, obj, {
        headers: {
          Token: `${token}`,
        },
      })
      .then((response) => {
        this.requestADMIN_ROLE_OPERATIONS(
          this.props.store.userState.token,
          this.state.isSelected
        );
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  selectRoleID = (e) => {
    let roleID = e.target.value;
    this.setState({
      isSelected: roleID,
    });
    this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token, roleID);
  };

  activeOperation = (operationArr, operation) => {
    let res;
    operationArr.map((item, index) => {
      if (item.operation === operation) {
        res = item.name;
      }
    });
    return res;
  };

  editColumn(e, row) {
    let nameRole = e.currentTarget.getAttribute("name");
    let inputValue = e.target.checked;
    row[nameRole] = inputValue;
    let obj = {
      role_id: `${this.state.isSelected}`,
      operations: [row],
    };

    this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);
  }

  checkbox(row, cell, name) {
    return (
      <input
        onChange={(e) => this.editColumn(e, row)}
        checked={cell}
        name={name}
        type="checkbox"
      />
    );
  }

  render() {
    const OptionItem = (props) => {
      return (
        <option
          selected={
            this.state.isSelected == props.optionItem.role_id ? "selected" : ""
          }
          value={props.optionItem.role_id}
        >
          {props.optionItem.role_name}
        </option>
      );
    };

    const editEnableColumn = (cell, row) => this.checkbox(row, cell, "enabled");
    const editCancelColumn = (cell, row) => this.checkbox(row, cell, "cancel");
    const editCreateColumn = (cell, row) => this.checkbox(row, cell, "create");
    const editDeleteColumn = (cell, row) => this.checkbox(row, cell, "delete");
    const editModifyColumn = (cell, row) => this.checkbox(row, cell, "modify");

    return (
      <div className="coverTable ADMIN_ROLE_OPERATIONS">
        <div className="headerTable">
          <div className="titleTable">
            {this.activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock">
            <span htmlFor="dropdown-basic-button">Виберіть роль</span>
            <select
              onChange={this.selectRoleID}
              apiName="institution_id"
              id="dropdown-basic-button"
              className="form-select"
              title="Виберіть роль"
            >
              <option>-</option>
              {this.state.isShowSelectRoles
                ? this.state.roles.map((item, index) => {
                    return <OptionItem key={index} optionItem={item} />;
                  })
                : null}
            </select>
          </div>
        </div>
        <div className="innerTable">
          <div className="Table">
            {this.state.isShowTable ? (
              <>
                <BootstrapTable data={this.state.operations}>
                  <TableHeaderColumn
                    isKey
                    dataField="operation_desc"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    ID операції
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="parent_operation_id"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Відноситься до
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="cancel"
                    dataFormat={editCancelColumn}
                  >
                    Скасування
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="enabled"
                    dataFormat={editCreateColumn}
                  >
                    Створення
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={editDeleteColumn}
                  >
                    Видалення
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="modify"
                    dataFormat={editModifyColumn}
                  >
                    Редагування
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="enabled"
                    dataFormat={editEnableColumn}
                  >
                    Активно
                  </TableHeaderColumn>
                </BootstrapTable>
              </>
            ) : (
              <span>Виберіть роль</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TableADMIN_ROLE_OPERATIONS;