import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";
import InputMask from "react-input-mask";
import { Typeahead } from "react-bootstrap-typeahead";

const OptionItemDICT_INSTITUTION = (props) => {
  return (
    <option value={props.optionItem.institution_id}>
      {props.optionItem.institution_name}
    </option>
  );
};
const OptionItemDICT_BRANCH = (props) => {
  return (
    <option value={props.optionItem.branch_id}>
      {props.optionItem.branch_name}
    </option>
  );
};
const OptionItem = (props) => {
  return (
    <option
      selected={
        props.optionItem.report_format_id == props.report_format_id
          ? "selected"
          : ""
      }
      value={props.optionItem.report_format_id}
    >
      {props.optionItem.report_format_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_REPORT_PERIOD_TYPE = (props) => {
  console.log("props.report_period_type_id: ", props.report_period_type_id);
  return (
    <>
    <label for={props.optionItem.report_period_type_id}>
      <input
        type="checkbox"
        id={props.optionItem.report_period_type_id}
        checked={
          props.report_period_type_id !== null &&
          props.report_period_type_id !== undefined
            ? props.report_period_type_id.includes(
                props.optionItem.report_period_type_id
              )
            : false
        }
        value={props.optionItem.report_period_type_id}
        style={{ margin: "10px 0" }}
      />
      {props.optionItem.report_period_type_name}
    </label>
    <br />
    </>
  );
};
const OptionItemDICT_REPORT_CHANNEL_TYPE = (props) => {
  //console.log( props )
  return (
    <option
      selected={
        props.optionItem.report_channel_type_id == props.channel_type_id
          ? "selected"
          : ""
      }
      value={props.optionItem.report_channel_type_id}
    >
      {props.optionItem.report_channel_type_name}
    </option>
  );
};
const BlockSelectItemTspName = (props) => {
  //console.log( props )
  return (
    <div
      className="blockSelectItem"
      value={props.item.client_id}
      name={props.item.client_name}
      onClick={(e) => props.onClickBlockSelectItem(e)}
    >
      {props.item.client_name}
    </div>
  );
};
class AutocompleteInputTspName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

      inputRequest: null,
      inputResult: this.props.tsp_name,

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
    console.log(param);
    this.props.addTspName(Number(0));
    this.setState({
      inputRequest: param,
      selected: false,
    });
    if (param != "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    if (param != "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
    // this.setState({
    //     isShowBlockSelect: true
    // });
  };
  onBlurAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    // if(param != '' && param.length >= 3){
    //     this.request(this.props.token, param, false);
    // }
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
    //console.log('----onClickBlockSelectItem-----');
    let val = e.currentTarget.getAttribute("value");
    let name = e.currentTarget.getAttribute("name");
    //console.log(val);
    //console.log('----onClickBlockSelectItem-----');
    if (val != "") {
      //console.log(this.state.InputDICT_MCC);
      //console.log(this.state.mcc_code);
      if (val != this.state.inputRequest) {
        this.request(this.props.token, val, false);

        // let inputDataObj = this.props.AcquiringReportsCriteria;
        // inputDataObj.tsp_name = val;
        console.log(val);
        //console.log(typeof val);
        this.props.addTspName(Number(val));
        this.setState({
          inputResult: name,
          inputRequest: name,
          isShowBlockSelect: false,
          isShowInputResult: true,
          isShowInputRequest: false,

          selected: true,
        });
      }
      this.setState({
        isShowBlockSelect: false,
      });
    }
  };

  clickTest = (e) => {
    if (this.myRef.current != null) {
      if (this.myRef.current.className != e.target.parentElement.className) {
        this.setState({
          isShowBlockSelect: false,
        });
      }
    }
  };

  async request(token, param, showBlock) {
    this.setState({
      isLoading: true,
    });
    console.log(token);
    const baseUrl = `/api/Dictionary/QueryTSP`;
    console.log(baseUrl);
    const body = {
      institution_id: this.props.institution_id,
      branch_id: this.props.branch_id,
      client_name: param,
    };
    console.log(body);
    await axios
      .post(baseUrl, body, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        if (response.data.tsp_list.TableRows == null) {
          this.setState({
            data: [{ client_name: "Незнайдено жодного результату" }],
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
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="autocomplete">
        <input
          className={`${this.state.selected ? "selected " : ""}${
            this.state.isShowInputRequest ? "" : "dn "
          }form-control`}
          placeholder="Введіть перші три букви..."
          type="text"
          onBlur={this.onBlurAutocompleteInput}
          onChange={this.onChangeAutocompleteInput}
          onClick={this.onClickAutocompleteInput}
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
          {this.state.isShowBlockSelect ? (
            this.state.data != null ? (
              this.state.data.map((item, index) => {
                return (
                  <BlockSelectItemTspName
                    key={index}
                    item={item}
                    onClickBlockSelectItem={this.onClickBlockSelectItem}
                  />
                );
              })
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        {this.state.isLoading ? (
          <div className="coverloader">
            <div className="loader"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
const BlockSelectItemIdentCode = (props) => {
  //console.log( props )
  return (
    <div
      className="blockSelectItem"
      value={props.item.ident_code}
      onClick={(e) => props.onClickBlockSelectItem(e)}
    >
      {props.item.ident_code}
    </div>
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
    console.log(param);
    this.props.addIdentCode(Number(0));
    this.setState({
      inputRequest: param,
      selected: false,
    });
    if (param != "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    if (param != "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    }
    // this.setState({
    //     isShowBlockSelect: true
    // });
  };
  onBlurAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    // if(param != '' && param.length >= 3){
    //     this.request(this.props.token, param, false);
    // }
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
    //console.log('----onClickBlockSelectItem-----');
    let val = e.currentTarget.getAttribute("value");
    //console.log(val);
    //console.log('----onClickBlockSelectItem-----');
    if (val != "") {
      //console.log(this.state.InputDICT_MCC);
      //console.log(this.state.mcc_code);
      if (val != this.state.inputRequest) {
        this.request(this.props.token, val, false);

        // let inputDataObj = this.props.AcquiringReportsCriteria;
        // inputDataObj.tsp_name = val;
        console.log(val);
        //console.log(typeof val);
        this.props.addIdentCode(Number(val));
        this.setState({
          inputResult: val,
          inputRequest: val,
          isShowBlockSelect: false,
          isShowInputResult: true,
          isShowInputRequest: false,

          selected: true,
        });
      }
      this.setState({
        isShowBlockSelect: false,
      });
    }
  };

  clickTest = (e) => {
    if (this.myRef.current != null) {
      if (this.myRef.current.className != e.target.parentElement.className) {
        this.setState({
          isShowBlockSelect: false,
        });
      }
    }
  };

  async request(token, param, showBlock) {
    this.setState({
      isLoading: true,
    });
    console.log(token);
    const baseUrl = `/api/Dictionary/QueryTSP`;
    console.log(baseUrl);
    const body = {
      institution_id: this.props.institution_id,
      branch_id: this.props.branch_id,
      ident_code: param,
    };
    console.log(body);
    await axios
      .post(baseUrl, body, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

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
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  render() {
    console.log(this.props);
    console.log(this.state);
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
          onClick={this.onClickAutocompleteInput}
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
          {this.state.isShowBlockSelect ? (
            this.state.data != null ? (
              this.state.data.map((item, index) => {
                return (
                  <BlockSelectItemIdentCode
                    key={index}
                    item={item}
                    onClickBlockSelectItem={this.onClickBlockSelectItem}
                  />
                );
              })
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        {this.state.isLoading ? (
          <div className="coverloader">
            <div className="loader"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

class REPORT_SETTINGS_NET extends React.Component {
  constructor(props) {
    super(props);
    this.requestTSPReportSettingsSTD_SAVE =
      this.requestTSPReportSettingsSTD_SAVE.bind(this);
      this.saveReport = this.saveReport.bind(this);
    this.state = {
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

      //type_acquiring: 1, 1-фізичний 2-інтернет
      isShowReport: false,

      DICT_REPORT_FORMAT: null,
      isShowREPORT_FORMAT: false,

      DICT_REPORT_PERIOD_TYPE: null,
      isShowDICT_REPORT_PERIOD_TYPE: false,

      DICT_REPORT_CHANNEL_TYPE: null,
      isShowDICT_REPORT_CHANNEL_TYPE: false,

      isShowTableTSPReportSettingsSTD: false,
      TSPReportSettingsSTD: null,

      errorRU: false,
      error_text: "Заповніть поле!",
      DICT_BRAND_VALUES: [],
      DICT_BRAND_NAME_VALUES: [],
      DICT_BRAND_NAME_VAL: null,
      responseTSPReportSettings: {
        tsp_list: [
          {
            tsp_id: 595999,
            tsp_name: "ТзОВ АПТЕКА-ЖОВТНЕВЕ ЛТД",
            bank_branch_name: "Волинське ОУ /303398/",
            ident_code: "30297548",
            merchant_id: 0,
            creation_date: "2012-05-24T18:55:58",
          },
          {
            tsp_id: 595998,
            tsp_name: "ТзОВ Нововолинський м'ясокомбіна",
            bank_branch_name: "Волинськеfrfr ОУ /303398/",
            ident_code: "30297548",
            merchant_id: 0,
            creation_date: "2012-05-24T18:55:58",
          },
          {
            tsp_id: 595997,
            tsp_name: "Тов березка на",
            bank_branch_name: "Волинськеfrfr ОУ /303398/",
            ident_code: "30297548",
            merchant_id: 0,
            creation_date: "2012-05-24T18:55:58",
          },
        ],
        settings: [
          {
            tsp_id: 595999,
            main_settings: [
              {
                acquiring_type_id: 1,
                standard_report: true,
                extended_report: false,
                installment_report: false,
                report_format_id: 2,
                report_format_name: "csv",
                report_period_type_ids: null,
                channel_type_id: 2,
                channel_type_name: "email",
                channel_address: "rere@gmail.com",
                file_name_mask: "Statement_ЄДРПОУ_період",
                file_path: "",
                report_setting_id: 0,
              },
              {
                report_setting_id: 0,
                acquiring_type_id: 2,
                standard_report: true,
                extended_report: false,
                installment_report: true,
                report_format_id: 1,
                report_format_name: "xls",
                report_period_type_ids: null,
                channel_type_id: 2,
                channel_type_name: null,
                channel_address: "re3re@gmail.com",
                file_name_mask: "Statement_ЄДРПОУ_період",
                file_path: "",
              },
            ],
          },
        ],
      },

      isShowPopupError: false,
      isShowPopupErrorSave: false,

      currentAcquiring_type_id: null,

      type_acquiring: 1,
      tsp_id: null,
      report_format_id: null,
      report_period_type_id: null,
      channel_type_id: null,
      file_name_mask: null,

      physical_acquiring_type_id: 1,
      physical_channel_address: "",
      physical_channel_type_id: 1,
      physical_extended_report: false,
      physical_file_name_mask: "",
      physical_installment_report: false,
      physical_report_format_id: 1,
      physical_report_period_type_id: 1,
      physical_standard_report: true,

      internet_acquiring_type_id: 2,
      internet_channel_address: "",
      internet_channel_type_id: 1,
      internet_extended_report: false,
      internet_file_name_mask: "",
      internet_installment_report: false,
      internet_report_format_id: 1,
      internet_report_period_type_id: 1,
      internet_standard_report: true,

      internetEmailMaskError: false,
      physicalEmailMaskError: false,
      isDisabledSaveBtn: true,

      isShowOrder_numberError: false,
      isShowBootstrapTable: true,

      isShowPopupDone: false,
    };
    //console.log(this.data.sort());
  }
  componentDidMount() {
    this.requestDICT_INSTITUTION(this.props.store.userState.token);
  }

  async get_DICT_NET_BRAND(token, param) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND?param1=&param2=${param}`;

    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data.Table.TableRows);
        //// console.log(response.data.Table);

        this.setState({
          DICT_BRAND_NAME_VALUES: response.data.Table.TableRows.map(
            (item) => item.brand_name
          ),
          DICT_BRAND_VALUES: response.data.Table.TableRows,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }

  selectDICT_INSTITUTION = (e) => {
    let param = e.target.value;
    let apiName = e.currentTarget.getAttribute("apiName");
    let inputValue = e.target.value;
    let inputDataObj = this.state.TSPReportSettingsSearchObj;
    inputDataObj[apiName] = inputValue;

    this.setState({
      isShowSelectTVBV: false,
      TSPReportSettingsSearchObj: inputDataObj,
    });
    this.requestDICT_BRANCH(this.props.store.userState.token, param);
    this.get_DICT_NET_BRAND(this.props.store.userState.token, inputValue);
  };
  async requestDICT_INSTITUTION(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_INSTITUTION`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.Table);
        this.setState({
          DICT_INSTITUTION: response.data.Table.TableRows,
          isShowSelectDICT_INSTITUTION: true,
        });

        this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_BRANCH(token, param) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_BRANCH/?param1=${param}`;
    let paramBody = {
      param1: param,
    };
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.Table);
        this.setState({
          DICT_BRANCH: response.data.Table.TableRows,
          isShowSelectTVBV: true,
          isDisableTVBV: false,
        });

        this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_REPORT_FORMAT(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_REPORT_FORMAT`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_REPORT_FORMAT: response.data.Table.TableRows,
          isShowREPORT_FORMAT: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_REPORT_PERIOD_TYPE(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_REPORT_PERIOD_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        this.setState({
          DICT_REPORT_PERIOD_TYPE: response.data.Table.TableRows,
          isShowDICT_REPORT_PERIOD_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
      });
  }
  async requestDICT_REPORT_CHANNEL_TYPE(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_REPORT_CHANNEL_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_REPORT_CHANNEL_TYPE: response.data.Table.TableRows,
          isShowDICT_REPORT_CHANNEL_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }

  async requestTSPReportSettings(token, userBody) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/NetReportSettings`;

    await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.users);
        //console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.users);
        response.data.tsp_list = [response.data.brand_settings];
        response.data.record_count = response.data.tsp_list.length;

        if (response.data.record_count >= 1) {
          if (response.data.brand_settings.main_settings === null) {
            response.data.tsp_list[0].main_settings =
              this.state.responseTSPReportSettings.settings[0].main_settings;
          } else if (response.data.tsp_list[0].main_settings.length === 1) {
            const count =
              response.data.tsp_list[0].main_settings[0].acquiring_type_id === 1
                ? 1
                : 0;
            response.data.tsp_list[0].main_settings.push(
              this.state.responseTSPReportSettings.settings[0].main_settings[
                count
              ]
            );
          }
          console.log("response.data.tsp_list[0]: ", response.data.tsp_list[0]);
          this.setState({
            tsp_list: response.data.tsp_list,
            settings: response.data.tsp_list[0].main_settings,
            //tsp_id: response.data.tsp_list[0].tsp_id,
            isShowTsp: true,
          });
        } else {
          this.setState({
            isShowPopupError: true,
          });
        }

        this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestTSPReportSettingsSTD(token) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/NetReportSettings/STD`;

    let userBody = {
      acquiring_type_id: this.state.type_acquiring,
    };
    userBody.report_setting_id =
      +this.state.type_acquiring === 1
        ? this.state.physical_report_settings_id
        : this.state.internet_report_settings_id;

    await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          TSPReportSettingsSTD: response.data.standard_settings,
          isShowTableTSPReportSettingsSTD: true,
        });
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async requestTSPReportSettingsSTD_SAVE(token, dody) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/NetReportSettings`;

    console.log(dody);
    await axios
      .put(baseUrl, dody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.setState({
          isShowTsp: false,
          isShowTypeAcquiring: false,
        });
        this.search();
        
        this.props.store.changeLoading(false);
        this.setState({ isShowPopupDone: true });
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(error.response.data);
        //console.log('error_catch');
        this.setState({
          isShowPopupErrorSave: true,
        });
        // this.props.store.changeLoading(false);
      });
  }
  changeInput = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.TSPReportSettingsSearchObj;

    if (apiName == "date_from" || apiName == "date_to") {
      inputDataObj[apiName] = this.formatDate(new Date(inputValue));
    } else {
      inputDataObj[apiName] = inputValue;
    }
    console.log(inputDataObj);
    this.setState({
      TSPReportSettingsSearchObj: inputDataObj,
    });
    console.log(this.state);
    console.log(this.state.TSPReportSettingsSearchObj);
  };

  formatDate = (date) => {
    let day = date.getDate();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return year + month + day;
  };
  search = () => {
    this.setState({
      errorRU: false,
    });
    if (this.state.isDisableTVBV) {
      this.setState({
        errorRU: true,
      });
      return;
    }
    // main
    console.log(this.state.TSPReportSettingsSearchObj);
    this.requestTSPReportSettings(
      this.props.store.userState.token,
      this.state.TSPReportSettingsSearchObj
    );

    // let obj = {
    //     date_from: "20210622",
    //     date_to: "20210630",
    //     institution_id: "824"
    // }
    // this.requestTSPReportSettings(this.props.store.userState.token, obj);

    //this.requestTSPReportSettings_test(this.props.store.userState.token, this.state.TSPReportSettingsSearchObj);

    // this.setState({
    //     settings: this.state.responseTSPReportSettings.settings,
    //     tsp_list: this.state.responseTSPReportSettings.tsp_list,
    //     isShowTsp: true
    // });
  };
  Tsp_list = (tsp_list) => {
    //console.log(tsp_list);
    return tsp_list.map((item, index) => {
      //console.log(item);
      return (
        <li className="dropdownMenuItem">
          <label for={item.brand_name}>
            <input
              name="tsp_list"
              id={item.brand_name}
              type="radio"
              onClick={this.itemTsp}
              value={item.brand_id}
            />{" "}
            {item.brand_name}
          </label>
        </li>
      );
    });
  };
  itemTsp = (e) => {
    let currentTsp = e.target.value;
    console.log(currentTsp);
    //console.log(this.state);
    this.state.tsp_list.map((item, index) => {
      if (+item.brand_id === +currentTsp) {
        this.setState({
          physical_acquiring_type_id: 1,
          physical_channel_address: "",
          physical_channel_type_id: 1,
          physical_extended_report: false,
          physical_file_name_mask: "",
          physical_installment_report: false,
          physical_report_format_id: 1,
          physical_report_period_type_id: null,
          physical_standard_report: true,

          internet_acquiring_type_id: 2,
          internet_channel_address: "",
          internet_channel_type_id: 1,
          internet_extended_report: false,
          internet_file_name_mask: "",
          internet_installment_report: false,
          internet_report_format_id: 1,
          internet_report_period_type_id: null,
          internet_standard_report: true,

          currentTsp: Number(currentTsp),
          TSPReportSettingsSTD: null,
          isShowTypeAcquiring: true,
        });
        console.log(this.state);
        if (!item.main_settings) {
          this.setState({
            isShowTypeAcquiring: true,
          });
        } else if (item.main_settings) {
          if (item.acquiring_type_id == 1) {
            console.log("item.acquiring_type_id == 1");
            //console.log(item.file_name_mask);

            if(item.main_settings.channel_address){
              this.setState({
                physical_acquiring_type_id: item.acquiring_type_id,
                physical_channel_address: item.main_settings.channel_address,
                physical_channel_type_id: item.main_settings.channel_type_id,
                //physical_extended_report: item.extended_report,
                physical_file_name_mask: item.main_settings.file_name_mask,
                physical_file_name: item.main_settings.file_path,
                //physical_installment_report: item.installment_report,
                physical_report_format_id: item.main_settings.report_format_id,
                physical_report_period_type_id: item.main_settings.report_period_type_ids,
                physical_report_settings_id: item.main_settings.report_setting_id,
                //physical_standard_report: item.standard_report,
  
                currentTsp: Number(currentTsp),
                TSPReportSettingsSTD: null,
                isShowTypeAcquiring: true,
              });
            }
          } else if (item.acquiring_type_id == 2) {
            console.log("item.acquiring_type_id == 2");
            this.setState({
              internet_acquiring_type_id: item.acquiring_type_id,
              internet_channel_address: item.main_settings.channel_address,
              internet_channel_type_id: item.main_settings.channel_type_id,
              internet_file_name: item.main_settings.file_path,
              //internet_extended_report: item.extended_report,
              internet_file_name_mask: item.main_settings.file_name_mask,
              //internet_installment_report: item.installment_report,
              internet_report_format_id: item.main_settings.report_format_id,
              internet_report_period_type_id:
                item.main_settings.report_period_type_ids,
              internet_report_settings_id: item.main_settings.report_setting_id,
              //internet_standard_report: item.standard_report,

              currentTsp: Number(currentTsp),
              TSPReportSettingsSTD: null,
              isShowTypeAcquiring: true,
            });
          }
        }
      }
    });
    console.log("-----------state---------------");
    console.log(this.state);

    this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
    this.requestDICT_REPORT_PERIOD_TYPE(this.props.store.userState.token);
    this.requestDICT_REPORT_CHANNEL_TYPE(this.props.store.userState.token);
    //this.requestTSPReportSettingsSTD(this.props.store.userState.token);
  };

  changeTypeAcquiring = (e) => {
    let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
    this.setState({
      type_acquiring: Number(typeAcquiring),
    });
  };
  changeTypeAcquiringInternet = (e) => {
    let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
    console.log(typeAcquiring);
    this.setState({
      report_period_type_id: this.state.settings[0].report_period_type_id,
      report_format_id: this.state.settings[0].report_format_id,
      channel_type_id: this.state.settings[0].channel_type_id,
      file_name_mask: this.state.settings[0].file_name_mask,

      type_acquiring: Number(typeAcquiring),
      isShowReport: true,
      isDisabledSaveBtn: true,
      physicalEmailMaskError: false,
      internetEmailMaskError: false,
    });
  };

  openStandardReport = () => {
    this.requestTSPReportSettingsSTD(this.props.store.userState.token);
  };
  closePopupTable = () => {
    this.setState({
      isShowTableTSPReportSettingsSTD: false,
      TSPReportSettingsSTD: null,
    });
  };
  seveTSPReportSettingsSTD = () => {
    const isDuplicates = () => {
      const numbers = this.state.TSPReportSettingsSTD.map(
        (item) => item.order_number
      ).filter((item) => item !== 0);
      const toFindDuplicates = (arry) =>
        arry.filter((item, index) => arry.indexOf(item) !== index);
      const duplicateElements = toFindDuplicates(numbers);
      return duplicateElements.length > 0;
    };

    if (isDuplicates()) {
      this.setState({
        isShowOrder_numberError: true,
      });
    } else {
      this.setState({
        isShowTableTSPReportSettingsSTD: false,
      });
    }
  };

  changeSelect = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(name_input);
    console.log(inputValue);
    console.log("this.state[name_input]",this.state[name_input])
    if (name_input == "physical_acquiring_type_id")
      this.setState({ physical_acquiring_type_id: Number(inputValue) });
    if (name_input == "physical_channel_type_id") {
      this.setState({
        physical_channel_type_id: Number(inputValue),
        physical_channel_address: "",
        isDisabledSaveBtn: true,
        physicalEmailMaskError: false,
        internetEmailMaskError: false,
      });
    }

    if (
      name_input == "physical_report_period_type_id" ||
      name_input == "internet_report_period_type_id"
    ) {
      let value;
      if (
        this.state[name_input] === null ||
        this.state[name_input] === undefined
      ) {
        this.setState({ physical_report_period_type_id: `${inputValue}` });
        console.log("inputValue", inputValue)
        return;
      }
      if (this.state[name_input].includes(inputValue)) {
        value = this.state[name_input]
          .split(",")
          .filter((i) => i != inputValue)
          .join();
      } else {
        value = this.state[name_input] + "," + inputValue;
      }
      this.setState({ [name_input]: value });
    }

    if (name_input == "physical_report_format_id")
      this.setState({ physical_report_format_id: Number(inputValue) });
    // if (name_input == "physical_report_period_type_id")
    //   this.setState({ physical_report_period_type_id: Number(inputValue) });

    if (name_input == "internet_acquiring_type_id")
      this.setState({ internet_acquiring_type_id: Number(inputValue) });
    if (name_input == "internet_channel_type_id") {
      this.setState({
        internet_channel_type_id: Number(inputValue),
        internet_channel_address: "",
        isDisabledSaveBtn: true,
        physicalEmailMaskError: false,
        internetEmailMaskError: false,
      });
    }
    if (name_input == "internet_report_format_id")
      this.setState({ internet_report_format_id: Number(inputValue) });
    // if (name_input == "internet_report_period_type_id")
    //   this.setState({ internet_report_period_type_id: Number(inputValue) });
  };
  changeInputTsp = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(inputValue);
    if (name_input == "physical_channel_address")
      this.setState({ physical_channel_address: inputValue });
    if (name_input == "physical_file_name_mask")
      this.setState({ physical_file_name_mask: inputValue });

    if (name_input == "internet_channel_address")
      this.setState({ internet_channel_address: inputValue });
    if (name_input == "internet_file_name_mask")
      this.setState({ internet_file_name_mask: inputValue });

    if (name_input == "catalog-physicall")
      this.setState({ physical_file_name: inputValue });
    if (name_input == "catalog-internet")
      this.setState({ internet_file_name: inputValue });
  };
  changeInputTspEmail = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(name_input);
    console.log(inputValue);
    if (name_input == "physical_channel_address") {
      console.log(/.+@.+\.[A-Za-z]+$/.test(inputValue));
      if (/.+@.+\.[A-Za-z]+$/.test(inputValue)) {
        console.log("/.+@.+.[A-Za-z]+$/.test(inputValue)");
        this.setState({
          physicalEmailMaskError: false,
          isDisabledSaveBtn: true,
        });
      } else {
        console.log("pfqikj");
        this.setState({
          physicalEmailMaskError: true,
          isDisabledSaveBtn: false,
        });
      }
      this.setState({ physical_channel_address: inputValue });
    } else if (name_input == "internet_channel_address") {
      console.log(/.+@.+\.[A-Za-z]+$/.test(inputValue));
      if (/.+@.+\.[A-Za-z]+$/.test(inputValue)) {
        console.log("/.+@.+.[A-Za-z]+$/.test(inputValue)");
        this.setState({
          internetEmailMaskError: false,
          isDisabledSaveBtn: true,
        });
      } else {
        console.log("pfqikj");
        this.setState({
          internetEmailMaskError: true,
          isDisabledSaveBtn: false,
        });
      }
      this.setState({ internet_channel_address: inputValue });
    }

    // if(name_input == 'internet_channel_address'){
    //     console.log(/.\.[A-Za-z]+$/.test(inputValue));
    //     if (/.\.[A-Za-z]+$/.test(inputValue)) {
    //         console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
    //         this.setState({
    //             physicalEmailMaskError: false,
    //             isDisabledSaveBtn: true
    //         });
    //     } else {
    //         console.log('pfqikj2');
    //         this.setState({
    //             physicalEmailMaskError: true,
    //             isDisabledSaveBtn: false
    //         });
    //     }
    //     this.setState({internet_channel_address: inputValue});
    // }
  };
  changeInputTspFtp = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(name_input);
    console.log(inputValue);

    if (name_input == "physical_channel_address") {
      console.log(inputValue.indexOf("."));
      console.log(inputValue.indexOf(".") != -1);
      if (inputValue.indexOf(".") != -1) {
        //console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
        this.setState({
          physicalEmailMaskError: false,
          isDisabledSaveBtn: true,
        });
      } else {
        console.log("pfqikj2");
        this.setState({
          physicalEmailMaskError: true,
          isDisabledSaveBtn: false,
        });
      }
      this.setState({ physical_channel_address: inputValue });
    } else if (name_input == "internet_channel_address") {
      console.log(inputValue.indexOf("."));
      console.log(inputValue.indexOf(".") != -1);
      if (inputValue.indexOf(".") != -1) {
        //console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
        this.setState({
          internetEmailMaskError: false,
          isDisabledSaveBtn: true,
        });
      } else {
        console.log("pfqikj2");
        this.setState({
          internetEmailMaskError: true,
          isDisabledSaveBtn: false,
        });
      }
      this.setState({ internet_channel_address: inputValue });
    }
  };

  changeReport_format_id = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      report_format_id: Number(inputValue),
    });
  };
  changeReport_period_type_id = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(name_input);
    console.log(inputValue);
    this.setState({
      name_input: Number(inputValue),
    });
  };
  changeChannel_type_id = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      channel_type_id: Number(inputValue),
    });
  };

  saveReport = () => {
    let acquiring_type = (type_acquiring) => {
      console.log("acquiring_type: ", this.state)
      if (type_acquiring == 1) {
        return {
          acquiring_type_id: 1, //type_acquiring
          // "standard_report": true,
          // "extended_report": true,
          // "installment_report": true,
          report_format_id: this.state.physical_report_format_id===0?1 : this.state.physical_report_format_id, //report_format_id
          report_period_type_ids: this.state.physical_report_period_type_id, //report_format_id
          // "report_format_name": "string",
          // "report_period_type_name": "string",
          channel_type_id: this.state.physical_channel_type_id, //channel_type_id
          // "channel_type_name": "string",
          file_name_mask: this.state.physical_file_name_mask, //file_name_mask
          // "file_path": "string"
          channel_address: this.state.physical_channel_address, //file_name_mask

          report_setting_id: this.state.physical_report_settings_id,
          file_path: this.state.physical_file_name,
        };
      } else if (type_acquiring == 2) {
        return {
          acquiring_type_id: 2, //type_acquiring
          // "standard_report": true,
          // "extended_report": true,
          // "installment_report": true,
          report_format_id: this.state.internet_report_format_id, //report_format_id
          report_period_type_ids: this.state.internet_report_period_type_id,
          // "report_format_name": "string",
          // "report_period_type_name": "string",
          channel_type_id: this.state.internet_channel_type_id, //channel_type_id
          // "channel_type_name": "string",
          file_name_mask: this.state.internet_file_name_mask, //file_name_mask
          // "file_path": "string"
          channel_address: this.state.internet_channel_address, //

          report_setting_id: this.state.internet_report_settings_id,
          file_path: this.state.internet_file_name,
        };
      }
    };

    const acquiring = acquiring_type.bind(this);
    let data = {
      brand_id: this.state.currentTsp, //tsp_id
      main_settings: acquiring(this.state.type_acquiring),
    };
    if (this.state.TSPReportSettingsSTD != null) {
      data.std_settings = this.state.TSPReportSettingsSTD;
    }
    this.requestTSPReportSettingsSTD_SAVE(
      this.props.store.userState.token,
      data
    );
  };
  showHtmlReport = () => {
    console.log("this.state.physical_file_name_mask");
    console.log(this.state.physical_channel_address);
    return (
      <div className="">
        {/* <div className="coverBtn border">
          <div className="title">Вид екварингу</div>
          <button
            className="btn btn-primary customBtnAc"
            disabled={this.state.type_acquiring == 1 ? "disabled" : ""}
            onClick={this.changeTypeAcquiring}
            type_acquiring={1}
          >
            Фізичний
          </button>
          <button
            className="btn btn-primary customBtnAc"
            disabled={this.state.type_acquiring == 2 ? "disabled" : ""}
            onClick={this.changeTypeAcquiring}
            type_acquiring={2}
          >
            Інтернет
          </button>
        </div> */}

        <div
          className={`${
            this.state.type_acquiring == 1 ? "" : "d-none"
          } border report`}
        >
          <div className="title">
            Перелік полів звіту ТСП по{" "}
            {this.state.type_acquiring == 1 ? "Фізичному" : "Інтернет"}{" "}
            екварингу
          </div>

          <button
            className="btn btn-primary"
            disabled={this.state.physical_standard_report ? "" : "disabled"}
            onClick={this.openStandardReport}
          >
            Стандартний звіт
          </button>
          {/* <button
            className="btn btn-secondary"
            disabled={this.state.physical_extended_report ? "" : "disabled"}
          >
            Розширений звіт
          </button>
          <button
            className="btn btn-secondary"
            disabled={this.state.physical_installment_report ? "" : "disabled"}
          >
            Звіт по операціям Installment
          </button> */}
          <br />
          <div className="coverInput">
            <label htmlFor="file_format">Формат файлу</label>
            {this.state.isShowREPORT_FORMAT ? (
              <select
                className="form-select"
                onChange={this.changeSelect}
                name="physical_report_format_id"
                id="DICT_REPORT_FORMAT"
              >
                {this.state.DICT_REPORT_FORMAT.map((item, index) => {
                  return (
                    <OptionItem
                      key={index}
                      optionItem={item}
                      report_format_id={this.state.physical_report_format_id}
                    />
                  );
                })}
              </select>
            ) : (
              <span>Завантаження...</span>
            )}
          </div>
          <div className="coverInput">
            <label htmlFor="report_period">Період звіту</label>
            {this.state.isShowDICT_REPORT_PERIOD_TYPE ? (
              <div
                className="form-select"
                onChange={this.changeSelect}
                name="physical_report_period_type_id"
                id="DICT_REPORT_PERIOD_TYPE"
              >
                {this.state.DICT_REPORT_PERIOD_TYPE.map((item, index) => {
                  return (
                    <OptionItemDICT_REPORT_PERIOD_TYPE
                      key={index}
                      optionItem={item}
                      report_period_type_id={
                        this.state.physical_report_period_type_id
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <br />
                <span>Завантаження...</span>
              </>
            )}
          </div>
          <div className="coverInput">
            <label htmlFor="сhannel">Канал</label>
            {this.state.isShowDICT_REPORT_CHANNEL_TYPE ? (
              <select
                className="form-select"
                onChange={this.changeSelect}
                name="physical_channel_type_id"
                id="DICT_REPORT_CHANNEL_TYPE"
              >
                {this.state.DICT_REPORT_CHANNEL_TYPE.map((item, index) => {
                  return (
                    <OptionItemDICT_REPORT_CHANNEL_TYPE
                      key={index}
                      optionItem={item}
                      channel_type_id={this.state.physical_channel_type_id}
                    />
                  );
                })}
              </select>
            ) : (
              <span>Завантаження...</span>
            )}
          </div>
          <div className="coverInput">
            {this.state.physical_channel_type_id == 1 ? (
              <>
                <input
                  placeholder="ftp"
                  value={this.state.physical_channel_address}
                  onChange={this.changeInputTspFtp}
                  name="physical_channel_address"
                  className={`${
                    this.state.physicalEmailMaskError ? "errorEmail" : ""
                  } customInput form-control`}
                  type="text"
                />
                {this.state.physicalEmailMaskError ? (
                  <p>Невалідний ftp</p>
                ) : (
                  <></>
                )}
                {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
              </>
            ) : (
              <>
                <input
                  name="physical_channel_address"
                  label="Email"
                  placeholder="email@email.com"
                  value={this.state.physical_channel_address}
                  onChange={this.changeInputTspEmail}
                  className={`${
                    this.state.physicalEmailMaskError ? "errorEmail" : ""
                  } customInput form-control`}
                  type="text"
                />
                {this.state.physicalEmailMaskError ? (
                  <p>Невалідний email</p>
                ) : (
                  <></>
                )}
                {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
              </>
            )}
            {/*<input placeholder="ftp" value={this.state.physical_channel_address} onChange={ this.changeInputTsp} name="physical_channel_address" className="customInput form-control"  type="text"/>*/}
          </div>
          <div className="coverInput">
            <label htmlFor="catalog">Каталог</label>
            <input
              onChange={this.changeInputTsp}
              name="catalog-physicall"
              className="customInput form-control"
              id="catalog"
              type="text"
              value={this.state.physical_file_name}
              disabled={this.state.physical_channel_type_id === 2}
            />
          </div>
          <div className="coverInput">
            <label htmlFor="file_name_mask">Маска назви файлу</label>
            <input
              onChange={this.changeInputTsp}
              name="physical_file_name_mask"
              className="customInput form-control"
              id="file_name_mask"
              type="text"
              value={this.state.physical_file_name_mask}
              disabled={this.state.physical_channel_type_id === 2}
            />
          </div>

          <br />
          <div className="reportCoverBtn">
            <button
              className="btn btn-primary"
              disabled={this.state.isDisabledSaveBtn ? "" : "disabled"}
              onClick={this.saveReport}
            >
              Зберегти
            </button>
          </div>
        </div>

        <div
          className={`${
            this.state.type_acquiring == 1 ? "d-none" : ""
          } border report`}
        >
          <div className="title">
            Перелік полів звіту ТСП по{" "}
            {this.state.type_acquiring == 1 ? "Фізичному" : "Інтернет"}{" "}
            екварингу
          </div>

          <button
            className="btn btn-primary"
            disabled={this.state.internet_standard_report ? "" : "disabled"}
            onClick={this.openStandardReport}
          >
            Стандартний звіт
          </button>
          {/* <button
            className="btn btn-secondary"
            disabled={this.state.internet_extended_report ? "" : "disabled"}
          >
            Розширений звіт
          </button>
          <button
            className="btn btn-secondary"
            disabled={this.state.internet_installment_report ? "" : "disabled"}
          >
            Звіт по операціям Installment
          </button> */}
          <br />
          <div className="coverInput">
            <label htmlFor="file_format">Формат файлу</label>
            {this.state.isShowREPORT_FORMAT ? (
              <select
                className="form-select"
                onChange={this.changeSelect}
                name="internet_report_format_id"
                id="DICT_REPORT_FORMAT"
              >
                {this.state.DICT_REPORT_FORMAT.map((item, index) => {
                  return (
                    <OptionItem
                      key={index}
                      optionItem={item}
                      report_format_id={this.state.internet_report_format_id}
                    />
                  );
                })}
              </select>
            ) : (
              <span>Завантаження...</span>
            )}
          </div>
          <div className="coverInput">
            <label htmlFor="report_period">Період звіту</label>
            {this.state.isShowDICT_REPORT_PERIOD_TYPE ? (
              <div
                className="form-select"
                onChange={this.changeSelect}
                name="internet_report_period_type_id"
                id="DICT_REPORT_PERIOD_TYPE"
              >
                {this.state.DICT_REPORT_PERIOD_TYPE.map((item, index) => {
                  return (
                    <OptionItemDICT_REPORT_PERIOD_TYPE
                      key={index}
                      optionItem={item}
                      report_period_type_id={
                        this.state.internet_report_period_type_id
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <br />
                <span>Завантаження...</span>
              </>
            )}
          </div>
          <div className="coverInput">
            <label htmlFor="сhannel">Канал</label>
            {this.state.isShowDICT_REPORT_CHANNEL_TYPE ? (
              <select
                className="form-select"
                onChange={this.changeSelect}
                name="internet_channel_type_id"
                id="DICT_REPORT_CHANNEL_TYPE"
              >
                {this.state.DICT_REPORT_CHANNEL_TYPE.map((item, index) => {
                  return (
                    <OptionItemDICT_REPORT_CHANNEL_TYPE
                      key={index}
                      optionItem={item}
                      channel_type_id={this.state.internet_channel_type_id}
                    />
                  );
                })}
              </select>
            ) : (
              <span>Завантаження...</span>
            )}
          </div>
          <div className="coverInput">
            {this.state.internet_channel_type_id == 1 ? (
              <>
                <input
                  placeholder="ftp"
                  value={this.state.internet_channel_address}
                  onChange={this.changeInputTspFtp}
                  name="internet_channel_address"
                  className={`${
                    this.state.internetEmailMaskError ? "errorEmail" : ""
                  } customInput form-control`}
                  type="text"
                />
                {this.state.internetEmailMaskError ? (
                  <p>Невалідний ftp</p>
                ) : (
                  <></>
                )}
                {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
              </>
            ) : (
              <>
                <input
                  name="internet_channel_address"
                  label="Email"
                  placeholder="email@email.com"
                  value={this.state.internet_channel_address}
                  onChange={this.changeInputTspEmail}
                  className={`${
                    this.state.internetEmailMaskError ? "errorEmail" : ""
                  } customInput form-control`}
                  type="text"
                />
                {this.state.internetEmailMaskError ? (
                  <p>Невалідний email</p>
                ) : (
                  <></>
                )}
                {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
              </>
            )}
            {/*{*/}
            {/*    this.state.internet_channel_type_id == 1*/}
            {/*        ? <input placeholder="ftp" value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
            {/*        : <input placeholder="email" value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
            {/*}*/}

            {/*<input value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
          </div>
          <div className="coverInput">
            <label htmlFor="file_name_mask">Маска назви файлу</label>
            <input
              value={this.state.internet_file_name_mask}
              onChange={this.changeInputTsp}
              name="internet_file_name_mask"
              className="customInput form-control"
              id="file_name_mask"
              type="text"
              disabled={this.state.internet_channel_type_id === 2}
            />
          </div>
          <div className="coverInput">
            <label htmlFor="сatalog">Каталог</label>
            <input
              onChange={this.changeInputTsp}
              apiName="catalog-internet"
              className="customInput form-control"
              id="сatalog"
              type="text"
              value={this.state.internet_file_name}
              disabled={this.state.internet_channel_type_id === 2}
            />
          </div>

          <br />
          <div className="reportCoverBtn">
            <button
              className="btn btn-primary"
              disabled={this.state.isDisabledSaveBtn ? "" : "disabled"}
              onClick={this.saveReport}
            >
              Зберегти
            </button>
          </div>
        </div>
      </div>
    );
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
  activeOperation = (operationArr, operation) => {
    let res;
    operationArr.map((item, index) => {
      if (item.operation == operation) {
        console.log(item.name);
        res = item.name;
      }
    });
    return res;
  };
  addTspName = (val) => {
    console.log(val);
    let inputDataObj = this.state.TSPReportSettingsSearchObj;
    inputDataObj.tsp_id = val;
    console.log(inputDataObj);
    this.setState({
      TSPReportSettingsSearchObj: inputDataObj,
    });
    console.log(this.state.TSPReportSettingsSearchObj.tsp_name);
  };
  addIdentCode = (val) => {
    console.log(val);
    let inputDataObj = this.state.TSPReportSettingsSearchObj;
    inputDataObj.ident_code = val;
    console.log(inputDataObj);
    this.setState({
      TSPReportSettingsSearchObj: inputDataObj,
    });
  };
  render() {
    // console.log(this.props.store.menuState.tableData);
    // console.log(this.state.DICT_INSTITUTION);
    // console.log(this.state.DICT_BRANCH);
    console.log(this.state.TSPReportSettingsSTD);
    console.log(this.state);
    //console.log(this.showReport(595999));
    const selectRowProp = {
      mode: "radio",
      onSelect: (row, isSelect, rowIndex) => {
        this.setState({
          selectRow: row,
          isDisableButton: false,
        });
      },
    };
    const editInclude_flagColumn = (cell, row, newValue) => {
      const test5 = (e) => {
        //console.log(cell);
        // console.log(row);
        //console.log(oldValue);
        //console.log(newValue);
        //console.log(column);
        //console.log(done);
        // console.log('---');
        //console.log(e);
        let nameRole = e.currentTarget.getAttribute("name");
        //console.log(nameRole);
        let inputValue = e.target.checked;
        //console.log(inputValue);
        //console.log(this.state.TSPReportSettingsSTD);
        //console.log(row);
        let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
        row[nameRole] = inputValue;
        let index = TSPReportSettingsSTD.findIndex(
          (el) => el.field_name === row.field_name
        );
        //console.log(row);

        TSPReportSettingsSTD[index] = row;
        console.log(TSPReportSettingsSTD);
        this.setState({
          TSPReportSettingsSTD: TSPReportSettingsSTD,
        });
      };
      return (
        <>
          <input
            onChange={test5}
            checked={cell}
            name="include_flag"
            type="checkbox"
          />
        </>
      );
    };

    const editOrder_numberColumn = (cell, row, newValue) => {
      const test5 = (e) => {
        let nameRole = e.currentTarget.getAttribute("name");
        let inputValue = Number(e.target.value);
        let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
        let cloneTSPReportSettingsSTD = TSPReportSettingsSTD.map((a) =>
          Object.assign({}, a)
        );
        let indexRow = cloneTSPReportSettingsSTD.findIndex(
          (el) => el.field_name === row.field_name
        );
        let defineOrder_number = (arr, inputValue, indexRow) => {
          let cloneArr = arr.map((a) => Object.assign({}, a));
          cloneArr.splice(indexRow, 1);
          let numberArr = [];
          cloneArr.map((item, index) => {
            numberArr.push(item.order_number);
          });
          return numberArr.indexOf(inputValue) != -1;
        };

        // if (defineOrder_number(cloneTSPReportSettingsSTD, inputValue, indexRow)) {
        //   this.setState({
        //     isShowOrder_numberError: true,
        //     TSPReportSettingsSTD,
        //   });
        // } else {
        row[nameRole] = inputValue;
        cloneTSPReportSettingsSTD[indexRow] = row;

        this.setState({
          TSPReportSettingsSTD: cloneTSPReportSettingsSTD,
        });
        // }
      };
      // const rr = (e) => {
      //   if (e.keyCode === 13) {
      //     let nameRole = e.currentTarget.getAttribute("name");
      //     let inputValue = e.target.value;
      //     row[nameRole] = Number(inputValue);
      //     let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
      //     TSPReportSettingsSTD[newValue] = row;
      //     this.setState({
      //       TSPReportSettingsSTD: TSPReportSettingsSTD,
      //     });
      //   }
      // };
      return (
        <>
          <input
            onBlur={test5}
            defaultValue={cell}
            name="order_number"
            type="text"
          />
        </>
      );
    };

    return (
      <div className="coverTable REPORT_SETTINGS_TSP">
        <div className="headerTable">
          <div className="titleTable">
            {this.activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="filter">
          <div className="coverInputSelect">
            <label htmlFor="DICT_INSTITUTION">РУ менеджера</label>
            <select
              onChange={this.selectDICT_INSTITUTION}
              apiName="institution_id"
              id="dropdown-basic-button"
              className={`form-select ${
                this.state.errorRU ? "validError" : null
              }`}
              title="Регіональні управління"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_INSTITUTION ? (
                this.state.DICT_INSTITUTION.map((item, index) => {
                  return (
                    <OptionItemDICT_INSTITUTION key={index} optionItem={item} />
                  );
                })
              ) : (
                <></>
              )}
            </select>

            <section className={this.state.errorRU ? "d-block" : "d-none "}>
              <p className="text-danger">{this.state.error_text}</p>
            </section>

            {/* <label htmlFor="TVBV">ТВБВ</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="bank_branch_id"
              className="form-select"
              disabled={this.state.isDisableTVBV ? "disabled" : ""}
              title="ТВБВ"
            >
              <option>-</option>
              {this.state.isShowSelectTVBV ? (
                this.state.DICT_BRANCH.map((item, index) => {
                  return (
                    <OptionItemDICT_BRANCH key={index} optionItem={item} />
                  );
                })
              ) : (
                <></>
              )}
            </select> */}

            <label htmlFor="tsp_id">Назва Мережі</label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={(val) => {
                this.setState({
                  DICT_BRAND_NAME_VAL: val,
                });
              }}
              options={this.state.DICT_BRAND_NAME_VALUES}
              placeholder="Почніть вводити назву"
              selected={this.state.DICT_BRAND_NAME_VAL}
              onBlur={() => {
                this.setState({
                  TSPReportSettingsSearchObj: {
                    ...this.state.TSPReportSettingsSearchObj,
                    brand_id: this.state.DICT_BRAND_NAME_VAL
                      ? this.state.DICT_BRAND_VALUES.filter(
                          (i) =>
                            i.brand_name === this.state.DICT_BRAND_NAME_VAL[0]
                        )[0].brand_id
                      : null,
                  },
                });
                // this.get_DICT_BRAND_NAME_LEVEL
              }}
              className={`${
                this.state.isBrandName_toValidation ? "" : "validError"
              }`}
            />
            <button className="search btn btn-primary" onClick={this.search}>
              Пошук
            </button>
          </div>
        </div>
        <div className="coverResult">
          <div className="resultSearch border">
            {this.state.isShowTsp ? (
              <>
                <div className="title">Результат пошуку</div>
                <ul className="blockTsp_list">
                  {this.Tsp_list(this.state.tsp_list)}
                </ul>
              </>
            ) : (
              <>Не вибрано даних для пошуку</>
            )}
          </div>
          <div className="typeAcquiring">
            {this.state.isShowTypeAcquiring ? (
              <>{this.showHtmlReport()}</>
            ) : null}
          </div>
        </div>

        {this.state.isShowTableTSPReportSettingsSTD ? (
          <>
            <div className="coverPopupTable">
              <div className="innerBlock">
                <button
                  onClick={this.seveTSPReportSettingsSTD}
                  type="button"
                  className="btn btn-primary btn-save"
                >
                  Зберегти
                </button>
                <button
                  onClick={this.closePopupTable}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
                {this.state.isShowBootstrapTable ? (
                  <BootstrapTable data={this.state.TSPReportSettingsSTD}>
                    <TableHeaderColumn
                      isKey
                      dataField="field_desc"
                      filter={{ type: "TextFilter", delay: 1000 }}
                    >
                      Ідентифікатор поля
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="include_flag"
                      dataFormat={editInclude_flagColumn}
                      filter={{ type: "TextFilter", delay: 1000 }}
                    >
                      Включити поле
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="order_number"
                      dataFormat={editOrder_numberColumn}
                      filter={{ type: "TextFilter", delay: 1000 }}
                    >
                      Порядковий номер поля
                    </TableHeaderColumn>
                  </BootstrapTable>
                ) : (
                  <div className="coverloader">
                    <div className="loader"></div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {this.state.isShowPopupError ? (
          <>
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
          </>
        ) : null}
        {this.state.isShowPopupDone ? (
          <>
            <div className="coverPopupError">
              <div className="innerBlock">
                <div className="title alert alert-success">
                Налаштування для формування виписки здійснені
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={()=>this.setState({isShowPopupDone: false})}
                >
                  Закрити
                </button>
              </div>
            </div>
          </>
        ) : null}
        {this.state.isShowPopupErrorSave ? (
          <div className="coverPopupError">
            <div className="innerBlock">
              <div className="title alert alert-primary">
                Сталася помилка при збереженні
              </div>
              <div className="msg"></div>
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
          <>
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
          </>
        ) : null}
      </div>
    );
  }
}

export default REPORT_SETTINGS_NET;
