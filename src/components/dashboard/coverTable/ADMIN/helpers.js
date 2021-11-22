import * as axios from "axios";

function activeOperation(operationArr, operation) {
  let res;
  operationArr.map((item) => {
    if (item.operation === operation) {
      res = item.name;
    }
  });
  return res;
}

function editColumn(e, row, _this) {
  let nameRole = e.currentTarget.getAttribute("name");
  let inputValue = e.target.checked;
  row[nameRole] = inputValue;
  let obj = {
    role_id: `${_this.state.isSelected}`,
    operations: [row],
  };

  requestADMIN_ROLE_OPERATIONS_edit(_this.props.store.userState.token, obj, _this);
}

async function requestADMIN_ROLE_OPERATIONS_edit(token, obj, _this) {
  _this.props.store.changeLoading(true);
  const baseUrl = `/api/UserOperations`;

  await axios
    .put(baseUrl, obj, {
      headers: {
        Token: `${token}`,
      },
    })
    .then(() => {
      _this.requestADMIN_ROLE_OPERATIONS(
        _this.props.store.userState.token,
        _this.state.isSelected
      );
      _this.props.store.changeLoading(false);
    })
    .catch((error) => {
      throw new Error(error)
    });
}

async function requestADMIN_ROLE_OPERATIONS(_this) {
  const token = _this.props.store.userState.token;
  const roleID = _this.state.isSelected;

  _this.props.store.changeLoading(true);
  const baseUrl = `/api/UserOperations/${roleID}`;
  await axios
    .get(baseUrl, {
      headers: {
        Token: `${token}`,
      },
    })
    .then((response) => {
      _this.setState({
        operations: response.data.operations,
        isShowTable: true,
      });
      _this.props.store.changeLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectRoleID(e, _this) {
  let roleID = e.target.value;
  if (!roleID) return;
  _this.setState({
    isSelected: roleID,
  });
  requestADMIN_ROLE_OPERATIONS(_this);
}

function checkbox(row, cell, name, _this) {
  return (
    <input
      onChange={(e) => editColumn(e, row, _this)}
      checked={cell}
      name={name}
      type="checkbox"
    />
  );
}

const editEnableColumn = (cell, row, _this) => checkbox(row, cell, "enabled",_this);
const editCancelColumn = (cell, row, _this) => checkbox(row, cell, "cancel", _this);
const editCreateColumn = (cell, row, _this) => checkbox(row, cell, "create", _this);
const editDeleteColumn = (cell, row, _this) => checkbox(row, cell, "delete", _this);
const editModifyColumn = (cell, row, _this) => checkbox(row, cell, "modify", _this);

const OptionItem = (props) => {
  return (
    <option
      selected={
        props.state.isSelected === props.optionItem.user_code ? "selected" : ""
      }
      value={props.optionItem.user_code}
    >
      {props.optionItem.user_name}
    </option>
  );
};

async function requestADMIN_ROLES(_this) {
  const token = _this.props.store.userState.token;
  _this.props.store.changeLoading(true);
  const body = {
    user_code: "",
    user_name: "",
    bank_branch_id: 0,
    only_active: true,
  };
  const baseUrl = `/api/User`;
  await axios
    .post(baseUrl, body, {
      headers: {
        Token: `${token}`,
      },
    })
    .then((response) => {
      _this.setState({
        roles: response.data.users,
        isShowSelectRoles: true,
      });
      _this.props.store.changeLoading(false);
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export {
  requestADMIN_ROLES,
  activeOperation,
  selectRoleID,
  requestADMIN_ROLE_OPERATIONS,
  OptionItem,
  editEnableColumn, 
  editCancelColumn, 
  editCreateColumn, 
  editDeleteColumn, 
  editModifyColumn
};
