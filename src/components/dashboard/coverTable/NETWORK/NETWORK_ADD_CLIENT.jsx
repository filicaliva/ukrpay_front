import React from "react";
import * as axios from "axios";
import InputMask from "react-input-mask";
import { activeOperation } from "../ADMIN/helpers";

const OptionItemDICT_NET_BRAND = (props) => {
  return (
    <option value={props.optionItem.brand_id}>
      {props.optionItem.brand_name}
    </option>
  );
};
const OptionItemDICT_NET_ENTITY = (props) => {
  return (
    <option value={props.optionItem.entity_id}>
      {props.optionItem.entity_name}
    </option>
  );
};
const OptionItemDICT_NETWORK_MANAGERS = (props) => {
  return (
    <option
      selected={
        props.optionItem.manager_id == props.manager_id ? "selected" : ""
      }
      value={props.optionItem.manager_id}
    >
      {props.optionItem.manager_name}
    </option>
  );
};

const BlockSelectItemIdentCode = (props) => {
  return (
    <option
      className="blockSelectItem"
      value={props.item.ident_code}
      name={props.item.client_name}
      onClick={(e) => props.onClickBlockSelectItem(e)}
    >
      {props.item.ident_code}
    </option>
  );
};
class AutocompleteInputIdentCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

      inputRequest: null,
      inputResult: this.props.ident_code,

      isShowBlockSelect: false,
      isShowInputResult: false,
      isShowInputRequest: true,

      isLoading: false,

      selected: false,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.clickTest);
  }
  componentWillUnmount() {
    window.addEventListener("mousedown", null);
  }

  onChangeAutocompleteInput = (e) => {
    let param = e.target.value;
    this.props.addIdentCode(Number(0), "", false);
    this.setState({
      inputRequest: param,
      selected: false,
    });
    if (param !== "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    if (param !== "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
  };
  onBlurAutocompleteInput = (e) => {
    let param = e.target.value;
    if (param !== "" && param.length >= 3) {
      this.request(this.props.token, param, false);
    }
  };

  onClickAutocompleteInputRes = () => {
    this.setState({
      inputResult: null,
      isShowBlockSelect: true,
      isShowInputResult: false,
      isShowInputRequest: true,
    });
  };

  onBlurBlockSelect = () => {
    this.setState({
      isShowBlockSelect: false,
    });
  };

  onClickBlockSelectItem = (e) => {
    e.stopPropagation()
    if(!e) return;
    let val = e.currentTarget.getAttribute("value");
    let name = e.currentTarget.getAttribute("name");
    const currentVal = this.state.data.filter((i) => i.ident_code.toString().includes(val))[0];    

    if (val !== "") {
      this.props.addIdentCode(Number(val), name, true);
      this.setState({
        inputRequest: currentVal.ident_code,
        inputResult: currentVal.ident_code,
        isShowBlockSelect: false,
        isShowInputResult: true,
        isShowInputRequest: false,

        selected: true,
      });
      if (val !== this.state.inputRequest) {
        this.request(this.props.token, val, false);
      }
      this.setState({
        isShowBlockSelect: false,
      });
    }
  };

  clickTest = (e) => {
    if (
      this.myRef.current !== null &&
      this.myRef.current.className != e.target.parentElement.className
    ) {
      this.setState({
        isShowBlockSelect: false,
      });
    }
  };

  async request(token, param, showBlock) {
    this.setState({
      isLoading: true,
    });
    const baseUrl = `/api/Dictionary/QueryTSP`;
    const body = {
      institution_id: this.props.institution_id,
      branch_id: this.props.branch_id,
      ident_code: param,
    };
    await axios
      .post(baseUrl, body, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.tsp_list.TableRows == null) {
          this.setState({
            data: [{ ident_code: "Незнайдено жодного результату" }],
          });
        } else {
          this.setState({
            data: response.data.tsp_list.TableRows,
          });
        }

        if (showBlock) {
          this.setState({
            isShowBlockSelect: true,
          });
        } else {
          this.setState({
            isShowBlockSelect: false,
          });
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  render() {
    return (
      <div className="autocomplete">
        <InputMask
          mask="999999999999"
          type="text"
          maskChar=""
          alwaysShowMask="false"
          pattern="[0-9]"
          className={`${this.state.selected ? "selected " : ""}${
            this.state.isShowInputRequest ? "" : "dn "
          }form-control`}
          placeholder="Введіть перші три цифри..."
          type="text"
          onBlur={this.onBlurAutocompleteInput}
          onChange={this.onChangeAutocompleteInput}
           onClick={(e)=>
            this.state.isShowBlockSelect
            ? this.setState({ isShowBlockSelect: false })
            : this.onClickAutocompleteInput(e)
          }
          value={this.state.inputRequest}
        />
        <input
          className={`${this.state.selected ? "selected " : ""}${
            this.state.isShowInputResult ? "" : "dn "
          }form-control`}
          placeholder="Результат"
          type="text"
          value={this.state.inputResult}
          onClick={this.onClickAutocompleteInputRes}
        />
        <div
          className={`${this.state.isShowBlockSelect ? "" : "dn "}blockSelect`}
          onBlur={this.onBlurBlockSelect}
          ref={this.myRef}
        >
          {this.state.isShowBlockSelect
            ? this.state.data != null
              ? this.state.data.map((item, index) => {
                  return (
                    <BlockSelectItemIdentCode
                      key={index}
                      item={item}
                      onClickBlockSelectItem={this.onClickBlockSelectItem}
                    />
                  );
                })
              : null
            : null}
        </div>
        {this.state.isLoading ? (
          <div className="coverloader">
            <div className="loader"></div>
          </div>
        ) : null}
      </div>
    );
  }
}

class NETWORK_ADD_CLIENT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContact_emailError: false,
      isDisabledSaveBtn: false,
      DICT_INSTITUTION: null,
      isShowSelectDICT_INSTITUTION: false,
      isDisableButton: false,
      selectRow: null,
      DICT_BRANCH: null,
      isDisableTVBV: true,
      isShowSelectTVBV: false,
      TSPReportSettingsSearchObj: {},
      settings: null,
      tsp_list: null,
      isShowTsp: false,
      currentTsp: null,
      isShowTypeAcquiring: false,
      isShowReport: false,
      DICT_REPORT_FORMAT: null,
      isShowREPORT_FORMAT: false,
      DICT_REPORT_PERIOD_TYPE: null,
      isShowDICT_REPORT_PERIOD_TYPE: false,
      DICT_REPORT_CHANNEL_TYPE: null,
      isShowDICT_REPORT_CHANNEL_TYPE: false,
      isShowTableTSPReportSettingsSTD: false,
      TSPReportSettingsSTD: null,
      DICT_NET_CLIENT_STATUS: null,
      isShowDICT_NET_CLIENT_STATUS: false,
      isShowPopupError: false,
      isShowPopupErrorSave: false,
      currentAcquiring_type_id: null,
      type_acquiring: 1,
      tsp_id: null,
      report_format_id: null,
      report_period_type_id: null,
      channel_type_id: null,
      file_name_mask: null,
      isShowOrder_numberError: false,
      isShowBootstrapTable: true,
      options: [
        {
          client_id: 6595650,
          client_name: "МП Октан1",
          entity_id: 0,
          entity_name: null,
          ident_code: "13351072",
        },
        {
          client_id: 6595651,
          client_name: "МП Октан2",
          entity_id: 1,
          entity_name: null,
          ident_code: "13351073",
        },
      ],
      value: "",
      DICT_NET_BRAND_QueryTSP: [],
      isShowDICT_NET_BRAND_QueryTSP: false,
      isDisableInputDICT_NETWORK_MANAGERS: true,
      DICT_NETWORK_MANAGERS: null,
      isShowSelectDICT_NETWORK_MANAGERS: false,
      isDisableInputDICT_NET_BRAND: true,
      isShowSelectDICT_NET_BRAND: false,
      DICT_NET_BRAND: null,
      isDisableInputDICT_NET_ENTITY: true,
      isShowSelectDICT_NET_ENTITY: false,
      DICT_NET_ENTITY: null,
      isDisableBtnSave: true,
      isDisableIdent_code: true,
      isDisableInput: true,
      ident_code: null,
      client_name: null,
      client_id: null,
      manager_id: null,
      brand_id: null,
      entity_id: null,
      isDICT_NET_BRAND_QueryTSPEmpty: false,
    };
  }
  async requestDICT_NETWORK_MANAGERS(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NETWORK_MANAGERS`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        this.setState({
          DICT_NETWORK_MANAGERS: response.data.Table.TableRows,
          isShowSelectDICT_NETWORK_MANAGERS: true,
          isDisableInputDICT_NETWORK_MANAGERS: false,
        });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestDICT_NET_CLIENT(token, body) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NET_CLIENT`;
    await axios
      .post(baseUrl, body, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestDICT_NET_BRAND_QueryTSP(token, val) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND/QueryTSP`;
    let ident_code = {
      ident_code: val,
    };
    await axios
      .post(baseUrl, ident_code, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.record_count == 0) {
          this.setState({
            isDICT_NET_BRAND_QueryTSPEmpty: true,
            isDisableIdent_code: true,
            isShowDICT_NET_BRAND_QueryTSP: false,
            DICT_NET_BRAND_QueryTSP: [],
          });
        } else {
          this.setState({
            DICT_NET_BRAND_QueryTSP: response.data.tsp_list,
            isDisableIdent_code: false,
            isShowDICT_NET_BRAND_QueryTSP: true,
            isDICT_NET_BRAND_QueryTSPEmpty: false,
          });
        }
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async requestDICT_NET_BRAND(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND`;

    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          isDisableInputDICT_NET_BRAND: false,
          isShowSelectDICT_NET_BRAND: true,
          DICT_NET_BRAND: response.data.Table.TableRows,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async requestDICT_NET_ENTITY(token, brand_id) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NET_ENTITY/?param1=${brand_id}`;

    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          isDisableInputDICT_NET_ENTITY: false,
        });
        if(response.data.Table.TableRows){
          this.setState({
            isShowSelectDICT_NET_ENTITY: true,
            DICT_NET_ENTITY: response.data.Table.TableRows,
          });

        }
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  changeSelect = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    if (name_input === "physical_acquiring_type_id")
      this.setState({ [name_input]: Number(inputValue) });
  };
  closePopupError = () => {
    this.setState({
      isShowPopupError: false,
    });
  };

  closePopupErrorSave = () => {
    this.setState({
      isShowPopupErrorSave: false,
    });
  };

  closePopupOrder_numberError = () => {
    this.setState({
      isShowOrder_numberError: false,
      isShowBootstrapTable: true,
    });
  };

  renderItem = (item, highlighted) => {
    return (
      <div
        id={item.ident_code}
        key={item.ident_code}
        style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
      >
        {item.ident_code}
      </div>
    );
  };
  shouldItemRender = (item, value) =>
    item.ident_code.toLowerCase().indexOf(value.toLowerCase()) > -1;

  autocompleteSelect = (value) => {
    this.setState({ value });
  };

  ident_code = (e) => {
    let val = e.target.value;
    if (val != "") {
      this.requestDICT_NET_BRAND_QueryTSP(
        this.props.store.userState.token,
        val
      );
    } else {
      this.setState({ isDisableInput: true });
    }
  };
  changeSelectDICT_NET_BRAND_QueryTSP = (e) => {
    let inputValue = e.target.value;
    let client_name, client_id;
    this.state.DICT_NET_BRAND_QueryTSP.filter(function (
      currentElement,
      index,
      array
    ) {
      if (currentElement.ident_code == inputValue) {
        client_name = currentElement.client_name;
        client_id = currentElement.client_id;
      }
    });
    this.setState({
      ident_code: inputValue,
      client_name: client_name,
      client_id: client_id,
    });
    this.requestDICT_NETWORK_MANAGERS(this.props.store.userState.token);
  };
  changeInputDICT_NETWORK_MANAGERS = (e) => {
    let inputValue = e.target.value;
    this.setState({ manager_id: inputValue });
    this.requestDICT_NET_BRAND(this.props.store.userState.token);
  };
  changeInputDICT_NET_BRAND = (e) => {
    let inputValue = e.target.value;
    this.setState({ brand_id: inputValue });
    this.requestDICT_NET_ENTITY(this.props.store.userState.token, inputValue);
  };
  changeInputDICT_NET_ENTITY = (e) => {
    let inputValue = e.target.value;
    this.setState({
      entity_id: inputValue,
      isDisableBtnSave: false,
    });
  };
  save = () => {
    let body = {
      ident_code: Number(this.state.ident_code),
      client_id: Number(this.state.client_id),
      manager_id: Number(this.state.manager_id),
      brand_id: Number(this.state.brand_id),
      entity_id: Number(this.state.entity_id),
      client_name: this.state.client_name,
    };
    this.requestDICT_NET_CLIENT(this.props.store.userState.token, body);
  };
  addIdentCode = (val, name, nextInput) => {
    if (nextInput) {
      this.requestDICT_NETWORK_MANAGERS(this.props.store.userState.token);
      this.setState({
        ident_code: val,
        client_name: name,
        isDisableInputDICT_NETWORK_MANAGERS: false,
      });
    } else {
      this.setState({
        ident_code: val,
        client_name: name,
        isDisableInputDICT_NETWORK_MANAGERS: true,
      });
    }
  };

  render() {
    return (
      <div className="coverTable DICT_NET_BRAND">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="addbBlock">
          <div className="coverInputs">
            <label htmlFor="name_netWork">ІНН/ЄДРПОУ</label>
            <AutocompleteInputIdentCode
              token={this.props.store.userState.token}
              institution_id={0}
              branch_id={0}
              addIdentCode={this.addIdentCode}
              ident_code={this.state.ident_code}
              client_name={this.state.client_name}
            />
            <label htmlFor="status">Назва ТСП</label>
            <input
              className="form-control"
              disabled
              value={this.state.client_name}
              type="text"
            />
            <label htmlFor="DICT_NETWORK_MANAGERS">Менеджер ТСП</label>
            <select
              disabled={
                this.state.isDisableInputDICT_NETWORK_MANAGERS ? "disabled" : ""
              }
              id="dropdown-basic-button"
              onChange={this.changeInputDICT_NETWORK_MANAGERS}
              api_name="manager_name"
              className="form-select"
              title="ТВБВ"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_NETWORK_MANAGERS
                ? this.state.DICT_NETWORK_MANAGERS.map((item, index) => {
                    return (
                      <OptionItemDICT_NETWORK_MANAGERS
                        key={index}
                        optionItem={item}
                        manager_id={this.state.manager_id}
                      />
                    );
                  })
                : null}
            </select>
          </div>
          <div className="coverInputs">
            <label htmlFor="brand_region">Мережа</label>
            <select
              disabled={
                this.state.isDisableInputDICT_NET_BRAND ? "disabled" : ""
              }
              onChange={this.changeInputDICT_NET_BRAND}
              api_name="brand_region"
              id="brand_region"
              className="form-select"
              title="Регіональні управління"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_NET_BRAND
                ? this.state.DICT_NET_BRAND.map((item, index) => {
                    return (
                      <OptionItemDICT_NET_BRAND
                        key={index}
                        optionItem={item}
                        institution_id={this.state.brand_region}
                      />
                    );
                  })
                : null}
            </select>
            <label htmlFor="brand_region">2 рівень</label>
            <select
              disabled={
                this.state.isDisableInputDICT_NET_ENTITY ? "disabled" : ""
              }
              onChange={this.changeInputDICT_NET_ENTITY}
              api_name="brand_region"
              id="brand_region"
              className="form-select"
              title="Регіональні управління"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_NET_ENTITY
                ? this.state.DICT_NET_ENTITY.map((item, index) => {
                    return (
                      <OptionItemDICT_NET_ENTITY
                        key={index}
                        optionItem={item}
                      />
                    );
                  })
                : null}
            </select>
            <label htmlFor="status">РУ менеджера</label>
            <input
              disabled
              value={this.state.manager_id}
              api_name="brand_name"
              id="name_netWork"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="coverBtn">
          <button
            className="btn btn-success"
            disabled={this.state.isDisableBtnSave ? "disabled" : ""}
            onClick={this.save}
          >
            Зберегти мережу
          </button>
        </div>

        {this.state.isShowPopupError ? (
          <div className="coverPopupError">
            <div className="innerBlock">
              <div className="title alert alert-primary">
                Немає результату по даному пошуку
              </div>
              <div className="msg">Спробуйте ввести інші дані для пошуку</div>
              <button
                className="btn btn-secondary"
                onClick={this.closePopupError}
              >
                Закрити
              </button>
            </div>
          </div>
        ) : null}
        {this.state.isShowPopupErrorSave ? (
          <div className="coverPopupError">
            <div className="innerBlock">
              <div className="title alert alert-primary">
                Помилка при зберіганні
              </div>
              <div className="msg">:(</div>
              <button
                className="btn btn-secondary"
                onClick={this.closePopupErrorSave}
              >
                Закрити
              </button>
            </div>
          </div>
        ) : null}
        {this.state.isShowOrder_numberError ? (
          <div className="coverOrder_numberError">
            <div className="innerBlock">
              <div className="title alert alert-primary">
                Такий порядковий номер вже вибрано
              </div>
              <div className="msg">Введіть інший порядковий номер поля</div>
              <button
                className="btn btn-secondary"
                onClick={this.closePopupOrder_numberError}
              >
                Закрити
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default NETWORK_ADD_CLIENT;
