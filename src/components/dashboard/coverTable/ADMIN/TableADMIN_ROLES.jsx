import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import * as axios from "axios";
import {activeOperation} from './helpers'

class TableADMIN_ROLES extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addRow: {},
      roles: null,
      isShowTable: true,
      selectRow: null,
      isDisableButton: true,
      isShowEditBlock: false,
      isShowAddBlock: false,
      isShowDeleteBlock: false,
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
          isShowTable: true,
        });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_ROLE_add(token, userBody) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Role`;
    await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.closeEditForm();
        this.requestADMIN_ROLES(this.props.store.userState.token);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_ROLE_edit(token, userBody) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Role`;
    await axios
      .put(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.closeEditForm();
        this.requestADMIN_ROLES(this.props.store.userState.token);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_ROLE_delete(token, role_id) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Role/${role_id}`;
    await axios
      .delete(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.setState({
          isDisableButton: true,
        });
        this.closeEditForm();
        this.requestADMIN_ROLES(this.props.store.userState.token);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  editHandle = () => {
    this.setState({
      isShowEditBlock: true,
    });
  };
  addHandle = () => {
    this.setState({
      isShowAddBlock: true,
    });
  };
  deleteHandle = () => {
    this.setState({
      isShowDeleteBlock: true,
    });
  };
  closeEditForm = () => {
    this.setState({
      selectRow: {},
      isShowEditBlock: false,
      isShowAddBlock: false,
      isShowDeleteBlock: false,
    });
  };
  changeInput = (e, isEdit = true) => {
    let keyName = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    let inputRow = isEdit ? "selectRow" : "addRow";
    let inputDataObj = this.state[inputRow];
    inputDataObj[keyName] = inputValue;
    this.setState({
      [inputRow]: inputDataObj,
    });
  };
  saveUser = () => {
    this.requestADMIN_ROLE_edit(
      this.props.store.userState.token,
      this.state.selectRow
    );
  };
  addRole = () => {
    this.requestADMIN_ROLE_add(
      this.props.store.userState.token,
      this.state.addRow
    );
  };
  deleteRole = () => {
    this.requestADMIN_ROLE_delete(
      this.props.store.userState.token,
      this.state.selectRow.role_id
    );
  };
  render() {
    const selectRowProp = {
      mode: "radio",
      onSelect: (row) => {
        this.setState({
          selectRow: row,
          isDisableButton: false,
        });
      },
    };
    return (
      <div className="coverTable TableADMIN_ROLES">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        {this.state.isShowDeleteBlock ? (
          <div className="coverDeleteBlock">
            <div className="innerBlock">
              <div>
                Ви впевнені, видалити цю роль:
                <span>{this.state.selectRow.role_id}</span>?
              </div>
              <br />
              <div className="coverBtn">
                <button className="btn btn-danger" onClick={this.deleteRole}>
                  Видалити
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={this.closeEditForm}
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.isShowEditBlock ? (
          <div className="coverEditBlock">
            <div className="innerBlock">
              <input
                onChange={this.changeInput}
                name="role_id"
                type="text"
                placeholder="ID ролі"
                defaultValue={this.state.selectRow.role_id}
                disabled
              />
              <input
                onChange={this.changeInput}
                name="role_name"
                type="text"
                placeholder="Ім'я ролі"
                defaultValue={this.state.selectRow.role_name}
              />
              <input
                onChange={this.changeInput}
                name="role_desc"
                type="text"
                placeholder="Опис"
                defaultValue={this.state.selectRow.role_desc}
              />
              <input
                onChange={this.changeInput}
                name="ad_role"
                type="text"
                placeholder="Ідентифікатор AD ролі"
                defaultValue={this.state.selectRow.ad_role}
              />
              <div className="coverBtn">
                <button onClick={this.saveUser} className="btn btn-success">
                  Зберегти
                </button>
                <button
                  onClick={this.closeEditForm}
                  className="btn btn-secondary"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.isShowAddBlock ? (
          <div className="coverAddBlock">
            <div className="innerBlock">
              <input
                onChange={(e)=>this.changeInput(e, false)}
                name="role_id"
                type="text"
                placeholder="ID ролі"
              />
              <input
                onChange={(e)=>this.changeInput(e, false)}
                name="role_name"
                type="text"
                placeholder="Ім'я ролі"
              />
              <input
                onChange={(e)=>this.changeInput(e, false)}
                name="role_desc"
                type="text"
                placeholder="Опис"
              />
              <input
                onChange={(e)=>this.changeInput(e, false)}
                name="ad_role"
                type="text"
                placeholder="Ідентифікатор AD ролі"
              />
              <div className="coverBtn">
                <button onClick={this.addRole} className="btn btn-success">
                  Зберегти
                </button>
                <button
                  onClick={this.closeEditForm}
                  className="btn btn-secondary"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="innerTable">
          <div className="Table">
            {this.state.isShowTable ? (
              <>
                <div className="controlBlock">
                  <button
                    onClick={this.editHandle}
                    disabled={this.state.isDisableButton ? "disabled" : ""}
                    className="btn btn-secondary"
                  >
                    Редагування
                  </button>
                  <button onClick={this.addHandle} className="btn btn-info">
                    Додавання
                  </button>
                  <button
                    onClick={this.deleteHandle}
                    disabled={this.state.isDisableButton ? "disabled" : ""}
                    className="btn btn-warning"
                  >
                    Видалення
                  </button>
                </div>
                <BootstrapTable
                  data={this.state.roles}
                  selectRow={selectRowProp}
                >
                  <TableHeaderColumn
                    isKey
                    dataField="role_id"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    ID ролі
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="role_name"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Ім'я ролі
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="ad_role"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Ідентифікатор AD ролі
                  </TableHeaderColumn>
                </BootstrapTable>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default TableADMIN_ROLES;