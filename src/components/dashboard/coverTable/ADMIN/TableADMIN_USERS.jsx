import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";
import { activeOperation } from "./helpers";

class TableADMIN_USERS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { id: "id", text: "Id" },
        { id: "name", text: "Name" },
        { id: "animal", text: "Animal" },
      ],
      data: [
        { id: 1, name: "George", animal: "Monkey" },
        { id: 2, name: "Jeffrey", animal: "Giraffe" },
        { id: 3, name: "Alice", animal: "Giraffe" },
        { id: 4, name: "Alice", animal: "Tiger" },
      ],
      user_code: "",
      user_name: "",
      only_active: false,
      isShowTable: false,
      isShowDeleteBlock: false,
      dateBlock: null,

      role: null,

      selectRow: null,
      addRow: {},
      isDisableButton: true,
      isShowEditBlock: false,
      isShowAddBlock: false,

      value: {
        user_code: "TEST22",
      },
      initialValues: {
        account: null,
        bank_branch_id: 0,
        branch_name: "Тут буде банк бренч",
        date_registered: "04/08/2021",
        department: null,
        division: null,
        ipphone: null,
        language_code: "UK",
        language_name: "Українська",
        last_logon_date: null,
        middle_name: null,
        mobile: null,
        name: null,
        office: null,
        phone: null,
        region: null,
        role_name: "Розробник",
        status: "Активний",
        status_code: "ACTIVE",
        surname: null,
        tvbv: "no_data",
        user_code: "TEST22",
        user_email: null,
        user_name: "Test",
        user_position: "tester",
        user_role: "DEV",
      },
    };
  }
  async requestADMIN_USERS(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/User`;
    const userBody = {
      user_code: this.state.user_code,
      user_name: this.state.user_name,
      bank_branch_id: 0,
      only_active: this.state.only_active,
    };
    await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.props.store.addTableData(true, response.data.users);
        this.setState({ isShowTable: true });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_USERS_delete(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/User/${this.state.selectRow.user_code}/0/${this.state.dateBlock}`;
    await axios
      .delete(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.closeEditForm();
        this.requestADMIN_USERS(this.props.store.userState.token);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestADMIN_USERS_add(token, userBody) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/User`;
    await axios
      .put(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.closeEditForm();
        this.requestADMIN_USERS(this.props.store.userState.token);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
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
          isShowEditBlock: true,
          role: response.data.roles,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  changeUserCode = (e) => {
    let inputValue = e.target.value;
    this.setState({
      user_code: inputValue,
    });
  };
  changeUserName = (e) => {
    let inputValue = e.target.value;
    this.setState({
      user_name: inputValue,
    });
  };
  changeOnlyActive = (e) => {
    let inputValue = e.target.checked;
    this.setState({
      only_active: inputValue,
    });
  };

  search = () => {
    this.requestADMIN_USERS(this.props.store.userState.token);
  };
  requestDeleteUser = () => {
    this.requestADMIN_USERS_delete(this.props.store.userState.token);
  };
  changeDate = (e) => {
    let inputValue = e.target.value;
    this.setState({
      dateBlock: this.formatDate(new Date(inputValue)),
    });
  };
  formatDate = (date) => {
    return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${date.getDate()}`;
  };

  editHandle = () => {
    this.requestADMIN_ROLES(this.props.store.userState.token);
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

  changeInputSelect = (e) => {
    let keyName = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    let inputDataObj = this.state.selectRow;
    inputDataObj[keyName] = inputValue;
    this.setState({
      selectRow: inputDataObj,
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
    this.requestADMIN_USERS_add(
      this.props.store.userState.token,
      this.state.selectRow
    );
  };
  addUser = () => {
    this.requestADMIN_USERS_add(
      this.props.store.userState.token,
      this.state.addRow
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
    const OptionItem = (props) => {
      return (
        <option
          selected={
            props.optionItem.role_id === this.state.selectRow.user_role
              ? "selected"
              : ""
          }
          value={props.optionItem.role_id}
        >
          {props.optionItem.role_name}
        </option>
      );
    };

    return (
      <div className="coverTable TableADMIN_USERS">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
        </div>
        <div className="filter">
          <div className="coverInput">
            <label htmlFor="user_code">Код користувача</label>
            <input
              onChange={this.changeUserCode}
              defaultValue={this.state.user_code}
              className="customInput"
              id="user_code"
              type="text"
            />

            <label htmlFor="user_name">Імя користувача</label>
            <input
              onChange={this.changeUserName}
              defaultValue={this.state.user_name}
              className="customInput"
              id="user_name"
              type="text"
            />
          </div>
          <div className="coverCheckbox">
            <label htmlFor="status_code">Тільки активні користувачі</label>
            <input
              onChange={this.changeOnlyActive}
              id="status_code"
              type="checkbox"
            />
          </div>
          <button className="search btn btn-primary" onClick={this.search}>
            Пошук
          </button>
        </div>
        {this.state.isShowDeleteBlock ? (
          <div className="coverDeleteBlock">
            <div className="innerBlock">
              <div className="coverInput">
                <label htmlFor="user_code">Код користувача</label>
                <input
                  defaultValue={this.state.selectRow.user_code}
                  className="customInput"
                  id="user_code"
                  type="text"
                  disabled
                />
              </div>
              <div className="coverInput">
                <label htmlFor="user_date">
                  Дата до якої призупинити користувача
                </label>
                <input
                  onChange={this.changeDate}
                  className="customInput"
                  id="user_date"
                  type="date"
                />
              </div>
              <button
                className="btn btn-danger"
                onClick={this.requestDeleteUser}
              >
                Видалити користувача
              </button>
              <button
                className="btn btn-secondary"
                onClick={this.closeEditForm}
              >
                Скасувати
              </button>
            </div>
          </div>
        ) : null}
        {this.state.isShowEditBlock ? (
          <div className="coverEditBlock">
            <div className="innerBlock">
              <input
                onChange={this.changeInput}
                name="user_code"
                type="text"
                placeholder="Код користувача"
                defaultValue={this.state.selectRow.user_code}
                disabled
              />
              <input
                onChange={this.changeInput}
                name="user_name"
                type="text"
                placeholder="Ім'я користувача"
                defaultValue={this.state.selectRow.user_name}
              />
              <input
                onChange={this.changeInput}
                name="user_position"
                type="text"
                placeholder="Посада користувача"
                defaultValue={this.state.selectRow.user_position}
              />
              <input
                onChange={this.changeInput}
                name="mobile"
                type="text"
                placeholder="Телефон"
                defaultValue={this.state.selectRow.mobile}
              />
              <input
                onChange={this.changeInput}
                name="user_email"
                type="text"
                placeholder="Email"
                defaultValue={this.state.selectRow.user_email}
              />
              <input
                onChange={this.changeInput}
                name="division"
                type="text"
                placeholder="Відділ"
                defaultValue={this.state.selectRow.division}
              />
              <select
                onChange={this.changeInputSelect}
                name="user_role"
                id="dropdown-basic-button"
                className="form-select"
                title="Виберіть роль"
              >
                {this.state.role.map((item, index) => {
                  return <OptionItem key={index} optionItem={item} />;
                })}
              </select>

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
                onChange={(e) => this.changeInput(e, false)}
                name="user_code"
                type="text"
                placeholder="Код користувача"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="user_name"
                type="text"
                placeholder="Ім'я користувача"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="user_position"
                type="text"
                placeholder="Посада користувача"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="mobile"
                type="text"
                placeholder="Телефон"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="user_email"
                type="text"
                placeholder="Email"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="division"
                type="text"
                placeholder="Відділ"
              />
              <input
                onChange={(e) => this.changeInput(e, false)}
                name="user_role"
                type="text"
                placeholder="Роль"
              />
              <div className="coverBtn">
                <button onClick={this.addUser} className="btn btn-success">
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
                  data={this.props.store.menuState.tableData}
                  selectRow={selectRowProp}
                >
                  <TableHeaderColumn
                    isKey
                    dataField="user_code"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Код користувача
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="status_code"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Статус користувача
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user_name"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Ім'я користувача
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user_position"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Посада користувача
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="mobile"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Телефон
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user_email"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="division"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Відділ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user_role"
                    filter={{ type: "TextFilter", delay: 1000 }}
                  >
                    Роль
                  </TableHeaderColumn>
                </BootstrapTable>
              </>
            ) : (
              <span>Скористайтеся пошуком</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default TableADMIN_USERS;
