import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  activeOperation,
  selectRoleID,
  requestADMIN_ROLES,
  OptionItem,
  editEnableColumn,
  editCancelColumn,
  editCreateColumn,
  editDeleteColumn,
  editModifyColumn,
} from "./helpers";

class TableADMIN_USER_OPERATIONS extends React.Component {
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
  componentDidMount() { requestADMIN_ROLES(this); }

  render() {
    return (
      <div className="coverTable ADMIN_USER_OPERATIONS">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock">
            <span htmlFor="dropdown-basic-button">Виберіть юзера</span>
            <select
              onChange={(e) => selectRoleID(e, this)}
              apiName="institution_id"
              id="dropdown-basic-button"
              className="form-select"
              title="Виберіть роль"
            >
              <option>-</option>
              {this.state.isShowSelectRoles
                ? this.state.roles.map((item, index) => {
                    return (
                      <OptionItem
                        key={index}
                        optionItem={item}
                        state={this.state}
                      />
                    );
                  })
                : null}
            </select>
          </div>
        </div>
        <div className="innerTable">
          <div className="Table">
            {this.state.isShowTable ? (
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
                  dataFormat={(cell, row) => editCancelColumn(cell, row, this)}
                >
                  Скасування
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="enabled"
                  dataFormat={(cell, row) => editCreateColumn(cell, row, this)}
                >
                  Створення
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={(cell, row) => editDeleteColumn(cell, row, this)}
                >
                  Видалення
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="modify"
                  dataFormat={(cell, row) => editModifyColumn(cell, row, this)}
                >
                  Редагування
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="enabled"
                  dataFormat={(cell, row) => editEnableColumn(cell, row, this)}
                >
                  Активно
                </TableHeaderColumn>
              </BootstrapTable>
            ) : (
              <span>Виберіть роль</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default TableADMIN_USER_OPERATIONS;
