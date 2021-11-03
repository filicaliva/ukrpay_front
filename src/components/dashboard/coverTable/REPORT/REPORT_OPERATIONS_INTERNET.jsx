import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";
import LoaderUI from "../../../UI/LoaderUI";

import { Field, reduxForm } from "redux-form";
import InputMask from "react-input-mask";
import { Alert } from "react-bootstrap";

const OptionItemDICT_INSTITUTION = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.institution_id}>
      {props.optionItem.institution_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_BRANCH = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.branch_id}>
      {props.optionItem.branch_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_ACQUIRING_REPORTS = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.report_id}>
      {props.optionItem.report_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_ACQUIRING_TYPE = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.acquiring_type_id}>
      {props.optionItem.acquiring_type_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_MERCHANT_SYSTEM = (props) => {
  //console.log( props )
  return(
      <option   value={props.optionItem.merchant_id} >{props.optionItem.merchant_id}</option>
      // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  )
}
const OptionItemDICT_TERMINAL_SYSTEM = (props) => {
  //console.log( props )
  return(
      <option   value={props.optionItem.terminal_id} >{props.optionItem.terminal_id}</option>
      // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  )
}
const OptionItemDICT_MCC_SYSTEM = (props) => {
  //console.log( props )
  return(
      <option   value={props.optionItem.mcc_id} >{props.optionItem.mccs_id}</option>
      // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  )
}
const OptionItemDICT_PAYMENT_SYSTEM = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.payment_system_id}>
      {props.optionItem.payment_system_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_REPORT_FORMAT = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.report_format_id}>
      {props.optionItem.report_format_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_DATE_TYPE = (props) => {
  //console.log( props )
  return (
    <option value={props.optionItem.date_type_id}>
      {props.optionItem.date_type_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItem = (props) => {
  //console.log( props )
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
  // console.log( props );
  // console.log( props.optionItem.report_period_type_id );
  // console.log( props.report_period_type_id );
  //console.log( props.optionItem.report_period_type_id == props.report_period_type_id  );

  return (
    <option
      selected={
        props.optionItem.report_period_type_id == props.report_period_type_id
          ? "selected"
          : ""
      }
      value={props.optionItem.report_period_type_id}
    >
      {props.optionItem.report_period_type_name}
    </option>
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
const ItemDICT_MCC = (props) => {
  //console.log( props )
  return (
    <div
      className="blockSelectItem"
      value={props.item.mcc_code}
      onClick={(e) => props.onClickBlockSelectItem(e)}
    >
      {props.item.mcc_name}
    </div>
  );
};

const ItemMccCode = (props) => {
  //console.log( props )
  return (
    <div
      className="blockSelectItem"
      value={props.item.mcc_code}
      onClick={(e) => props.onClickBlockSelectItem(e)}
    >
      {props.item.mcc_name}
    </div>
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

class AutocompleteInputTspName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

      inputRequest: "",
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
    // if (param != "" && param.length >= 3) {
      this.request(this.props.token, param, true);
    // }
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
          // isShowInputResult: false,
          // isShowInputRequest: true,

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
    return (
      <div className="autocomplete">
        <input
          className={`${this.state.selected ? "selected " : ""}${
            this.state.isShowInputRequest ? "" : "dn "
          }form-control`}
          placeholder="Введіть перші букви..."
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
        ) : null}
      </div>
    );
  }
}
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
    if (param != "" && param.length >= 0) {
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
          placeholder="Введіть перші цифри..."
          type="text"
          onBlur={this.onBlurAutocompleteInput}
          onChange={this.onChangeAutocompleteInput}
          onClick={this.onClickAutocompleteInput}
          value={this.state.inputRequest}
        />
        {/*<input*/}
        {/*    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputRequest ? '' : 'dn '}form-control`}*/}
        {/*    placeholder="Введіть перші три цифри..." type="text"*/}
        {/*    onBlur={this.onBlurAutocompleteInput}*/}
        {/*    onChange={this.onChangeAutocompleteInput}*/}
        {/*    onClick={this.onClickAutocompleteInput}*/}
        {/*    value={this.state.inputRequest}*/}
        {/*/>*/}
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
class AutocompleteInputMccCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,

      inputRequest: null,
      inputResult: this.props.mcc_code,

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
    this.props.addMccCode(Number(0));
    this.setState({
      inputRequest: param,
      selected: false,
    });
    if (param != "") {
      this.request(this.props.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    if (param != "") {
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
        this.props.addMccCode(Number(val));
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
    const baseUrl = `/api/Dictionary/DICT_MCC/?param1=${param}`;
    console.log(baseUrl);
    await axios
      .get(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        if (response.data.Table.TableRows == null) {
          this.setState({
            data: [{ mcc_name: "Незнайдено жодного результату" }],
          });
        } else {
          this.setState({
            data: response.data.Table.TableRows,
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
          placeholder="Введіть код..."
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
                  <ItemMccCode
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
        {this.state.isLoading ? <LoaderUI /> : null}
      </div>
    );
  }
}

class REPORT_OPERATIONS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DICT_INSTITUTION: null,
      isShowSelectDICT_INSTITUTION: false,

      DICT_BRANCH: null,
      isDisableTVBV: true,
      isShowSelectTVBV: false,

      DICT_ACQUIRING_REPORTS: null,
      isShowSelectDICT_ACQUIRING_REPORTS: false,

      DICT_ACQUIRING_TYPE: null,
      isShowSelectDICT_ACQUIRING_TYPE: false,

      DICT_PAYMENT_SYSTEM: null,
      isShowSelectDICT_PAYMENT_SYSTEM: false,

      DICT_REPORT_FORMAT: null,
      isShowSelectDICT_REPORT_FORMAT: false,

      DICT_DATE_TYPE: null,
      isShowSelectDICT_DATE_TYPE: false,

      AcquiringReportsCriteria: {
        report_type_id: "REPORT_OPERATIONS",
        payment_system_id: 0,
        format_type_id: 1,
        terminal_type_id: 2,
        institution_id: 0,
        date_type_id: 2,
        merchant_id: 0, 
        terminal_id:0
      },

      date_from: null,
      date_to: null,
      date_type_id: 2,
      institution_id: 0,
      merchant_id: null,

      
      DICT_TERMINAL_SYSTEM: null,
      isShowSelectDICT_MERCHANT_SYSTEM: false,

      DICT_MERCHANT_SYSTEM: null,
      isShowSelectDICT_TERMINAL_SYSTEM: false,

      DICT_MCC_SYSTEM: null,
      isShowSelectDICT_MCC_SYSTEM: false,


      isInstitution_idValidation: true,
      isMerchant_idValidation: true,
      isTerminal_type_idValidation: true,
      isDate_type_idValidation: true,
      isDate_fromValidation: true,
      isDate_toValidation: true,

      DICT_MCC: null,
      InputDICT_MCC: null,
      isShowBlockSelectDICT_MCC: false,
      isShowInputResDICT_MCC: false,
      isShowInputDICT_MCC: true,
      error_text: "Заповніть будь ласка поле!",
      isSuccess: false,
      merchant_error: "",
    };
    this.myRef = React.createRef();
    //console.log(this.data.sort());
  }
  componentDidMount() {
    window.addEventListener("mousedown", this.clickTest);
    this.requestDICT_INSTITUTION(this.props.store.userState.token);
    this.requestDICT_ACQUIRING_REPORTS(this.props.store.userState.token);
    this.requestDICT_ACQUIRING_TYPE(this.props.store.userState.token);
    this.requestDICT_PAYMENT_SYSTEM(this.props.store.userState.token);
    this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
    this.requestDICT_DATE_TYPE(this.props.store.userState.token);
  }
  componentWillUnmount() {
    window.addEventListener("mousedown", null);
  }

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
        //console.log(response.data.Table);

        this.setState({
          DICT_BRANCH: response.data.Table.TableRows,
          isShowSelectTVBV: true,
          isDisableTVBV: false,
        });

        this.props.store.changeLoading(false);
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
          isShowSelectDICT_REPORT_FORMAT: true,
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
        console.log(response.data);

        this.setState({
          DICT_REPORT_PERIOD_TYPE: response.data.Table.TableRows,
          isShowDICT_REPORT_PERIOD_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }

  async requestDICT_ACQUIRING_REPORTS(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_ACQUIRING_REPORTS`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_ACQUIRING_REPORTS: response.data.Table.TableRows,
          isShowSelectDICT_ACQUIRING_REPORTS: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_ACQUIRING_TYPE(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_ACQUIRING_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_ACQUIRING_TYPE: response.data.Table.TableRows,
          isShowSelectDICT_ACQUIRING_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_PAYMENT_SYSTEM(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_PAYMENT_SYSTEM`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_PAYMENT_SYSTEM: response.data.Table.TableRows,
          isShowSelectDICT_PAYMENT_SYSTEM: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestDICT_MERCHANT_SYSTEM  () {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/QueryMerchant`;
    const userBody = {
        "institution_id": +this.state.institution_id,
        "merchant_id": +this.state.merchant_id || 0
    }

    if(this.state.AcquiringReportsCriteria.tsp_id){
        userBody.client_id=+this.state.AcquiringReportsCriteria.tsp_id;
    }else if(this.state.AcquiringReportsCriteria.ident_code){
        userBody.client_id=+this.state.AcquiringReportsCriteria.ident_code;
    }else{
        userBody.client_id=0;
    }
    await axios.post(
        baseUrl,
        userBody,
        {
            headers: {"Token" : `${ this.props.store.userState.token }`}
        }
    )
        .then((response) => {
            console.log(response.data);

            this.setState({
                DICT_MERCHANT_SYSTEM: response.data.merchant_list.TableRows,
                isShowSelectDICT_MERCHANT_SYSTEM: true
            });

            this.props.store.changeLoading(false);


        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.response.data);
            //console.log('error_catch');

        });

}
async requestDICT_TERMINAL_SYSTEM() {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/QueryTerminal`;
    const userBody = {
        "institution_id": +this.state.institution_id,
        "merchant_id": +this.state.merchant_id || 0
    }

 
    if(this.state.AcquiringReportsCriteria.tsp_id){
        userBody.client_id=+this.state.AcquiringReportsCriteria.tsp_id;
    }else if(this.state.AcquiringReportsCriteria.ident_code){
        userBody.client_id=+this.state.AcquiringReportsCriteria.ident_code;
    }else{
        userBody.client_id=0;
    }
    await axios.post(
        baseUrl,
        userBody,
        {
            headers: {"Token" : `${ this.props.store.userState.token }`}
        }
    )
        .then((response) => {
            console.log(response.data);

            this.setState({
                DICT_TERMINAL_SYSTEM: response.data.terminal_list.TableRows,
                isShowSelectDICT_TERMINAL_SYSTEM: true
            });

            this.props.store.changeLoading(false);


        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.response.data);
            //console.log('error_catch');

        });

}
async requestDICT_MCC_SYSTEM() {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/QueryMCC`;
    const userBody = {
        "terminal_id": +this.state.AcquiringReportsCriteria.tsp_id,
        "merchant_id": +this.state.merchant_id || 0
    }

    if(this.state.AcquiringReportsCriteria.ident_code){
        userBody.client_id=+this.state.AcquiringReportsCriteria.ident_code;
    }else{
        userBody.client_id=0;
    }
    await axios.post(
        baseUrl,
        userBody,
        {
            headers: {"Token" : `${ this.props.store.userState.token }`}
        }
    )
        .then((response) => {
            console.log(response.data);

            this.setState({
                DICT_TERMINAL_SYSTEM: response.data.mcc_list.TableRows,
                isShowSelectDICT_MCC_SYSTEM: true
            });

            this.props.store.changeLoading(false);


        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.response.data);
            //console.log('error_catch');

        });

}
  async requestDICT_DATE_TYPE(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_DATE_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_DATE_TYPE: response.data.Table.TableRows,
          isShowSelectDICT_DATE_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }

  async requestReports_Acquiring(token, userBody) {
    this.props.store.changeLoading(true);

    const baseUrl = `/api/Reports/Acquiring`;

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
        // if(response.data.record_count >= 1){
        //     this.setState({
        //         settings: response.data.settings,
        //         tsp_list: response.data.tsp_list,
        //         //tsp_id: response.data.tsp_list[0].tsp_id,
        //         isShowTsp: true
        //     });
        // }else if(response.data.record_count < 1){
        //     this.setState({
        //         isShowPopupError: true
        //     });
        // }
        window.location.href = "/dashboard/REPORTS_ACQUIRING_MONITOR";
        // this.setState({isSuccess: true})
        // this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(error.response.data);
        //console.log('error_catch');
      });
  }

  selectDICT_INSTITUTION = (e) => {
    console.log(e.target.value);
    let param = e.target.value;
    console.log(param);
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj[apiName] = param;

    console.log(inputDataObj);
    if (param == "") {
      console.log(param);
      this.setState({
        isShowSelectTVBV: true,
        TSPReportSettingsSearchObj: inputDataObj,
        isInstitution_idValidation: false,
      });
    } else {
      this.setState({
        isShowSelectTVBV: false,
        TSPReportSettingsSearchObj: inputDataObj,
        AcquiringReportsCriteria: inputDataObj,
        isInstitution_idValidation: true,
        institution_id: param,
      });
      this.requestDICT_BRANCH(this.props.store.userState.token, param);
    }

    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };

  changeInputDateReport = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));

    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };
  changeInputDateReport_from = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));
    if (inputValue == "") {
      console.log(inputValue);
      this.setState({
        AcquiringReportsCriteria: inputDataObj,
        isDate_fromValidation: false,
      });
    } else {
      this.setState({
        AcquiringReportsCriteria: inputDataObj,
        isDate_fromValidation: true,
        date_from: inputValue,
      });
    }

    console.log(inputDataObj);

    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };
  changeInputDateReport_to = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));

    if (inputValue == "") {
      console.log(inputValue);
      this.setState({
        AcquiringReportsCriteria: inputDataObj,
        isDate_toValidation: false,
      });
    } else {
      this.setState({
        AcquiringReportsCriteria: inputDataObj,
        isDate_toValidation: true,
        date_to: inputValue,
      });
    }

    console.log(inputDataObj);

    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };

  changeInputBase = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = inputValue;

    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };
  changeInput = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    if (
      apiName == "format_type_id" ||
      apiName == "mcc_code" ||
      apiName == "payment_system_id" ||
      apiName == "terminal_id" ||
      apiName == "bank_branch_id" ||
      apiName == "institution_id"
    ) {
      inputDataObj[apiName] = Number(inputValue);
    } else {
      if (apiName == "terminal_type_id") {
        inputDataObj[apiName] = inputValue;
        if (inputValue == "") {
          console.log(inputValue);
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isTerminal_type_idValidation: false,
          });
        } else {
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isTerminal_type_idValidation: true,
            terminal_type_id: inputValue,
          });
        }
      } else if (apiName == "merchant_id") {
        inputDataObj[apiName] = Number(inputValue);
        if (inputValue == "") {
          console.log(inputValue);
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isMerchant_idValidation: false,
          });
        } else {
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isMerchant_idValidation: true,
            merchant_id: inputValue,
          });
        }
      } else if (apiName == "date_type_id") {
        inputDataObj[apiName] = Number(inputValue);
        if (inputValue == "") {
          console.log(inputValue);
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isDate_type_idValidation: false,
          });
        } else {
          this.setState({
            AcquiringReportsCriteria: inputDataObj,
            isDate_type_idValidation: true,
            date_type_id: inputValue,
          });
        }
      } else {
        inputDataObj[apiName] = inputValue;
      }
    }

    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    console.log(this.state);
    console.log(this.state.AcquiringReportsCriteria);
  };

  formatDate = (date) => {
    let day = date.getDate();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    if (day.toString().length < 2) {
      day = "0" + day;
    }
    let year = date.getFullYear();
    return year + month + day;
  };
  search = () => {
    //this.requestTSPReportSettings(this.props.store.userState.token, this.state.TSPReportSettingsSearchObj);
    //this.requestTSPReportSettings_test(this.props.store.userState.token, this.state.TSPReportSettingsSearchObj);

    // this.setState({
    //     settings: this.state.responseTSPReportSettings.settings,
    //     tsp_list: this.state.responseTSPReportSettings.tsp_list,
    //     isShowTsp: true
    // });
    // let res = {
    //     "institution_id": 0,
    //     "bank_branch_id": 0,
    //     "ident_code": "string",
    //     "tsp_name": "string",
    //     "tsp_id": "string",
    //     "merchant_id": 0,
    //     "date_from": "string",
    //     "date_to": "string",
    //     "report_type_id": "string",
    //     "terminal_type_id": "string",
    //     "terminal_id": 0,
    //     "payment_system_id": 0,
    //     "mcc_code": 0,
    //     "format_type_id": 0,
    //     "date_type_id": 0
    // }
    //console.log(res);
    console.log(this.state.AcquiringReportsCriteria);

    this.defineValidationInputs();
  };

  sendOptionToServer() {
    if (
      this.state.isInstitution_idValidation &&
      this.state.isTerminal_type_idValidation &&
      // this.state.isMerchant_idValidation &&
      this.state.isDate_type_idValidation &&
      this.state.isDate_fromValidation &&
      this.state.isDate_toValidation
    ) {
      this.requestReports_Acquiring(
        this.props.store.userState.token,
        this.state.AcquiringReportsCriteria
      );
    }
  }

  handleCheckId() {
    this.checkMerchantID().then((res) => {
      if (res.data.ErrorStatus.ErrorCode !== 0) {
        this.setState({
          merchant_error: res.data.ErrorStatus.ErrorMessage,
          isShowPopupError: true,
        });
      }
    });
  }
  async checkMerchantID() {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/QueryMerchant`;
    const userBody = {
      institution_id: +this.state.institution_id,
      merchant_id: +this.state.merchant_id || 0,
    };

    if (this.state.tsp_id) {
      userBody.client_id = +this.state.tsp_id;
    } else if (this.state.ident_code) {
      userBody.client_id = +this.state.ident_code;
    } else {
      userBody.client_id = 0;
    }

    return await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${this.props.store.userState.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.props.store.changeLoading(false);
        return response;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  defineValidationInputs = () => {
    // if (this.state.merchant_id == null || this.state.merchant_id == "") {
    //     this.setState({isMerchant_idValidation: false});
    // }
    if (this.state.date_type_id == null || this.state.date_type_id == "") {
      this.setState({ isDate_type_idValidation: false });
    }
    if (this.state.date_from == null || this.state.date_from == "") {
      this.setState({ isDate_fromValidation: false });
    }
    if (this.state.date_to == null || this.state.date_to == "") {
      this.setState({ isDate_toValidation: false });
    }

    this.setState({}, () => this.sendOptionToServer());
  };
  Tsp_list = (tsp_list) => {
    return tsp_list.map((item, index) => {
      console.log(item);
      return (
        <li className="dropdownMenuItem">
          <p>
            <input
              name="tsp_list"
              id={item.tsp_name}
              type="radio"
              onClick={this.itemTsp}
              value={item.tsp_id}
            />{" "}
            {item.tsp_name}
          </p>
        </li>
      );
    });
  };
  itemTsp = (e) => {
    // let currentTsp = e.target.value;
    // console.log(currentTsp);
    // let currentTspArr = this.state.currentTsp;
    // currentTspArr.push(currentTsp);
    // this.setState({
    //     currentTsp: currentTspArr,
    //     isShowTypeAcquiring: true
    // });
    let currentTsp = e.target.value;
    console.log(currentTsp);
    console.log(this.state);
    this.state.settings.map((item, index) => {
      if (item.tsp_id == currentTsp) {
        if (item.main_settings == null) {
          this.setState({
            type_acquiring: 2,
            report_format_id: 1,
            report_period_type_id: 1,
            channel_type_id: 1,
            file_name_mask: "",
          });
        } else if (item.main_settings.length) {
          console.log(item.main_settings[0].acquiring_type_id);
          this.setState({
            type_acquiring: item.main_settings[0].acquiring_type_id,
            report_format_id: item.main_settings[0].report_format_id,
            report_period_type_id: item.main_settings[0].report_period_type_id,
            channel_type_id: item.main_settings[0].channel_type_id,
            file_name_mask: item.main_settings[0].file_name_mask,
          });
        }
      }
    });
    this.setState({
      currentTsp: Number(currentTsp),
      TSPReportSettingsSTD: null,
      isShowTypeAcquiring: true,
    });
    // this.setState({
    //     report_period_type_id: this.state.settings[0].main_settings[0].report_period_type_id,
    //     report_format_id: this.state.settings[0].main_settings[0].report_format_id,
    //     channel_type_id: this.state.settings[0].main_settings[0].channel_type_id,
    //     file_name_mask: this.state.settings[0].main_settings[0].file_name_mask
    // });
    this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
    this.requestDICT_REPORT_PERIOD_TYPE(this.props.store.userState.token);
    this.requestDICT_REPORT_CHANNEL_TYPE(this.props.store.userState.token);
    //this.requestTSPReportSettingsSTD(this.props.store.userState.token);
  };

  changeTypeAcquiring = (e) => {
    let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
    console.log(typeAcquiring);
    // this.setState({
    //     type_acquiring: Number(typeAcquiring),
    //     isShowReport: true
    // });
    this.state.settings.map((item, index) => {
      console.log(this.state.currentTsp);
      console.log(item.tsp_id);
      if (item.tsp_id == this.state.currentTsp) {
        if (item.main_settings.length > 1) {
          console.log(item.main_settings.length > 1);
          item.main_settings.map((item, index) => {
            if (item.acquiring_type_id == typeAcquiring) {
              console.log(item.acquiring_type_id == typeAcquiring);
              this.setState({
                type_acquiring: Number(typeAcquiring),
                report_format_id: item.report_format_id,
                report_period_type_id: item.report_period_type_id,
                channel_type_id: item.channel_type_id,
                file_name_mask: item.file_name_mask,
              });
            }
          });
        }
      }
    });

    // this.state.settings.map( ( item , index) => {
    //     if(item.tsp_id == this.state.currentTsp){
    //         if(item.main_settings.length > 1){
    //
    //             console.log(item.main_settings[0].acquiring_type_id);
    //             this.setState({
    //                 type_acquiring: item.main_settings[0].acquiring_type_id,
    //                 report_format_id: item.main_settings[0].report_format_id,
    //                 report_period_type_id: item.main_settings[0].report_period_type_id,
    //                 channel_type_id: item.main_settings[0].channel_type_id,
    //                 file_name_mask: item.main_settings[0].file_name_mask,
    //             });
    //         }
    //     }
    // });

    // this.setState({
    //     report_period_type_id: this.state.settings[0].main_settings[0].report_period_type_id,
    //     report_format_id: this.state.settings[0].main_settings[0].report_format_id,
    //     channel_type_id: this.state.settings[0].main_settings[0].channel_type_id,
    //     file_name_mask: this.state.settings[0].main_settings[0].file_name_mask,
    //
    //     type_acquiring: Number(typeAcquiring),
    //     isShowReport: true
    // });
  };

  openStandardReport = () => {
    // this.setState({
    //     isShowTableTSPReportSettingsSTD: true
    // });
    this.requestTSPReportSettingsSTD(this.props.store.userState.token);
  };
  closePopupTable = () => {
    this.setState({
      isShowTableTSPReportSettingsSTD: false,
    });
  };

  changeReport_format_id = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      report_format_id: Number(inputValue),
    });
  };
  changeReport_period_type_id = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      report_period_type_id: Number(inputValue),
    });
  };
  changeChannel_type_id = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      channel_type_id: Number(inputValue),
    });
  };
  changeFile_name_mask = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      file_name_mask: inputValue,
    });
  };
  saveReport = () => {
    let dody = {
      acquiring_type_id: this.state.type_acquiring, //type_acquiring
      tsp_list: [
        {
          tsp_id: this.state.currentTsp, //tsp_id
        },
      ],
      main_settings: {
        acquiring_type_id: this.state.type_acquiring, //type_acquiring
        // "standard_report": true,
        // "extended_report": true,
        // "installment_report": true,
        report_format_id: this.state.report_format_id, //report_format_id
        // "report_format_name": "string",
        report_period_type_id: this.state.report_period_type_id, //report_period_type_id
        // "report_period_type_name": "string",
        channel_type_id: this.state.channel_type_id, //channel_type_id
        // "channel_type_name": "string",
        file_name_mask: this.state.file_name_mask, //file_name_mask
        // "file_path": "string"
      },
    };
    if (this.state.TSPReportSettingsSTD != null) {
      dody.std_settings = this.state.TSPReportSettingsSTD;
    }
    //console.log( dody );
    this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token);
  };

  showReport = (currentTsp) => {
    console.log(currentTsp);
    return this.state.settings.map((item, index) => {
      console.log(item);

      console.log(item.tsp_id);
      console.log(item.tsp_id == currentTsp);
      if (item.tsp_id == currentTsp) {
        console.log(item.main_settings);

        if (item.main_settings == null) {
          let report_period_type_id = 1;
          let report_format_id = 1;
          let channel_type_id = 1;
          let file_name_mask = "";

          console.log(report_period_type_id);
          console.log(report_format_id);
          console.log(channel_type_id);
          console.log(file_name_mask);
          return (
            <div className="report border">
              <div className="title">Перелік полів звіту ТСП</div>
              <button
                className="btn btn-secondary"
                onClick={this.openStandardReport}
              >
                Стандартний звіт
              </button>
              <button className="btn btn-secondary" disabled>
                Розширений звіт
              </button>
              <button className="btn btn-secondary" disabled>
                Звіт по операціям Installment
              </button>
              <br />
              <div className="coverInput">
                <label htmlFor="file_format">Формат файлу</label>
                {this.state.isShowREPORT_FORMAT ? (
                  <select
                    className="form-select"
                    onChange={this.changeReport_format_id}
                    name="DICT_REPORT_FORMAT"
                    id="DICT_REPORT_FORMAT"
                  >
                    {this.state.DICT_REPORT_FORMAT.map((item, index) => {
                      return (
                        <OptionItem
                          key={index}
                          optionItem={item}
                          report_format_id={report_format_id}
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
                  <select
                    className="form-select"
                    onChange={this.changeReport_period_type_id}
                    name="DICT_REPORT_PERIOD_TYPE"
                    id="DICT_REPORT_PERIOD_TYPE"
                  >
                    {this.state.DICT_REPORT_PERIOD_TYPE.map((item, index) => {
                      return (
                        <OptionItemDICT_REPORT_PERIOD_TYPE
                          key={index}
                          optionItem={item}
                          report_period_type_id={report_period_type_id}
                        />
                      );
                    })}
                  </select>
                ) : (
                  <span>Завантаження...</span>
                )}
              </div>
              <div className="coverInput">
                <label htmlFor="file_name_mask">Маска назви файлу</label>
                <input
                  defaultValue={file_name_mask}
                  onChange={this.changeFile_name_mask}
                  apiName="file_name_mask"
                  className="customInput form-control"
                  id="file_name_mask"
                  type="text"
                />
              </div>
              <div className="coverInput">
                <label htmlFor="сatalog">Каталог</label>
                <input
                  disabled
                  onChange={this.changeInput}
                  apiName="сatalog"
                  className="customInput form-control"
                  id="сatalog"
                  type="text"
                />
              </div>
              <div className="coverInput">
                <label htmlFor="сhannel">Канал</label>
                {this.state.isShowDICT_REPORT_CHANNEL_TYPE ? (
                  <select
                    className="form-select"
                    onChange={this.changeChannel_type_id}
                    name="DICT_REPORT_CHANNEL_TYPE"
                    id="DICT_REPORT_CHANNEL_TYPE"
                  >
                    {this.state.DICT_REPORT_CHANNEL_TYPE.map((item, index) => {
                      return (
                        <OptionItemDICT_REPORT_CHANNEL_TYPE
                          key={index}
                          optionItem={item}
                          channel_type_id={channel_type_id}
                        />
                      );
                    })}
                  </select>
                ) : (
                  <span>Завантаження...</span>
                )}
              </div>
              <div className="reportCoverBtn">
                <button className="btn btn-secondary" onClick={this.saveReport}>
                  Зберегти
                </button>
              </div>
            </div>
          );
        } else if (item.main_settings.length == 1) {
          return item.main_settings.map((item, index) => {
            let report_period_type_id = item.report_period_type_id;
            let report_format_id = item.report_format_id;
            let channel_type_id = item.channel_type_id;
            let file_name_mask = item.file_name_mask;
            console.log(report_period_type_id);
            console.log(report_format_id);
            console.log(channel_type_id);
            console.log(file_name_mask);
            return (
              <div className=" border report">
                <div className="coverBtn border">
                  <div className="title">Вид екварингу</div>
                  <button className="btn btn-secondary">
                    {this.state.type_acquiring == 1 ? "Фізичний" : "Інтернет"}
                  </button>
                  {/*<button*/}
                  {/*    className="btn btn-secondary"*/}
                  {/*    disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}*/}
                  {/*    onClick={this.changeTypeAcquiringInternet}*/}
                  {/*    type_acquiring={2}>Інтернет</button>*/}
                </div>
                <div className="report border">
                  <div className="title">Перелік полів звіту ТСП</div>
                  <button
                    className="btn btn-secondary"
                    onClick={this.openStandardReport}
                  >
                    Стандартний звіт
                  </button>
                  <button className="btn btn-secondary" disabled>
                    Розширений звіт
                  </button>
                  <button className="btn btn-secondary" disabled>
                    Звіт по операціям Installment
                  </button>
                  <br />
                  <div className="coverInput">
                    <label htmlFor="file_format">Формат файлу</label>
                    {this.state.isShowREPORT_FORMAT ? (
                      <select
                        className="form-select"
                        onChange={this.changeReport_format_id}
                        name="DICT_REPORT_FORMAT"
                        id="DICT_REPORT_FORMAT"
                      >
                        {this.state.DICT_REPORT_FORMAT.map((item, index) => {
                          return (
                            <OptionItem
                              key={index}
                              optionItem={item}
                              report_format_id={report_format_id}
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
                      <select
                        className="form-select"
                        onChange={this.changeReport_period_type_id}
                        name="DICT_REPORT_PERIOD_TYPE"
                        id="DICT_REPORT_PERIOD_TYPE"
                      >
                        {this.state.DICT_REPORT_PERIOD_TYPE.map(
                          (item, index) => {
                            return (
                              <OptionItemDICT_REPORT_PERIOD_TYPE
                                key={index}
                                optionItem={item}
                                report_period_type_id={report_period_type_id}
                              />
                            );
                          }
                        )}
                      </select>
                    ) : (
                      <span>Завантаження...</span>
                    )}
                  </div>
                  <div className="coverInput">
                    <label htmlFor="file_name_mask">Маска назви файлу</label>
                    <input
                      defaultValue={file_name_mask}
                      onChange={this.changeFile_name_mask}
                      apiName="file_name_mask"
                      className="customInput form-control"
                      id="file_name_mask"
                      type="text"
                    />
                  </div>
                  <div className="coverInput">
                    <label htmlFor="сatalog">Каталог</label>
                    <input
                      disabled
                      onChange={this.changeInput}
                      apiName="сatalog"
                      className="customInput form-control"
                      id="сatalog"
                      type="text"
                    />
                  </div>
                  <div className="coverInput">
                    <label htmlFor="сhannel">Канал</label>
                    {this.state.isShowDICT_REPORT_CHANNEL_TYPE ? (
                      <select
                        className="form-select"
                        onChange={this.changeChannel_type_id}
                        name="DICT_REPORT_CHANNEL_TYPE"
                        id="DICT_REPORT_CHANNEL_TYPE"
                      >
                        {this.state.DICT_REPORT_CHANNEL_TYPE.map(
                          (item, index) => {
                            return (
                              <OptionItemDICT_REPORT_CHANNEL_TYPE
                                key={index}
                                optionItem={item}
                                channel_type_id={channel_type_id}
                              />
                            );
                          }
                        )}
                      </select>
                    ) : (
                      <span>Завантаження...</span>
                    )}
                  </div>
                  <div className="reportCoverBtn">
                    <button
                      className="btn btn-secondary"
                      onClick={this.saveReport}
                    >
                      Зберегти
                    </button>
                  </div>
                </div>
              </div>
            );
          });
        } else if (item.main_settings.length == 2) {
          return (
            <div className="">
              <div className="coverBtn border">
                <div className="title">Вид екварингу</div>
                <button
                  className="btn btn-secondary"
                  disabled={this.state.type_acquiring == 1 ? "disabled" : ""}
                  onClick={this.changeTypeAcquiring}
                  type_acquiring={1}
                >
                  Фізичний
                </button>
                <button
                  className="btn btn-secondary"
                  disabled={this.state.type_acquiring == 2 ? "disabled" : ""}
                  onClick={this.changeTypeAcquiring}
                  type_acquiring={2}
                >
                  Інтернет
                </button>
              </div>
              {item.main_settings.map((item, index) => {
                let report_period_type_id = item.report_period_type_id;
                let report_format_id = item.report_format_id;
                let channel_type_id = item.channel_type_id;
                let file_name_mask = item.file_name_mask;
                let acquiring_type_id = item.acquiring_type_id;
                let standard_report = item.standard_report;
                let extended_report = item.extended_report;
                let installment_report = item.installment_report;
                console.log(acquiring_type_id);
                console.log(report_period_type_id);
                console.log(report_format_id);
                console.log(channel_type_id);
                console.log(file_name_mask);
                console.log(this.state.type_acquiring);
                return (
                  <div
                    className={`${
                      this.state.type_acquiring == acquiring_type_id
                        ? ""
                        : "d-none"
                    } border report`}
                  >
                    <div className="title">Перелік полів звіту ТСП</div>

                    <button
                      className="btn btn-secondary"
                      disabled={standard_report ? "" : "disabled"}
                      onClick={this.openStandardReport}
                    >
                      Стандартний звіт
                    </button>
                    <button
                      className="btn btn-secondary"
                      disabled={extended_report ? "" : "disabled"}
                    >
                      Розширений звіт
                    </button>
                    <button
                      className="btn btn-secondary"
                      disabled={installment_report ? "" : "disabled"}
                    >
                      Звіт по операціям Installment
                    </button>
                    <br />
                    <div className="coverInput">
                      <label htmlFor="file_format">Формат файлу</label>
                      {this.state.isShowREPORT_FORMAT ? (
                        <select
                          className="form-select"
                          onChange={this.changeReport_format_id}
                          name="DICT_REPORT_FORMAT"
                          id="DICT_REPORT_FORMAT"
                        >
                          {this.state.DICT_REPORT_FORMAT.map((item, index) => {
                            return (
                              <OptionItem
                                key={index}
                                optionItem={item}
                                report_format_id={report_format_id}
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
                        <select
                          className="form-select"
                          onChange={this.changeReport_period_type_id}
                          name="DICT_REPORT_PERIOD_TYPE"
                          id="DICT_REPORT_PERIOD_TYPE"
                        >
                          {this.state.DICT_REPORT_PERIOD_TYPE.map(
                            (item, index) => {
                              return (
                                <OptionItemDICT_REPORT_PERIOD_TYPE
                                  key={index}
                                  optionItem={item}
                                  report_period_type_id={report_period_type_id}
                                />
                              );
                            }
                          )}
                        </select>
                      ) : (
                        <span>Завантаження...</span>
                      )}
                    </div>
                    <div className="coverInput">
                      <label htmlFor="file_name_mask">Маска назви файлу</label>
                      <input
                        defaultValue={file_name_mask}
                        onChange={this.changeFile_name_mask}
                        apiName="file_name_mask"
                        className="customInput form-control"
                        id="file_name_mask"
                        type="text"
                      />
                    </div>
                    <div className="coverInput">
                      <label htmlFor="сatalog">Каталог</label>
                      <input
                        disabled
                        onChange={this.changeInput}
                        apiName="сatalog"
                        className="customInput form-control"
                        id="сatalog"
                        type="text"
                      />
                    </div>
                    <div className="coverInput">
                      <label htmlFor="сhannel">Канал</label>
                      {this.state.isShowDICT_REPORT_CHANNEL_TYPE ? (
                        <select
                          className="form-select"
                          onChange={this.changeChannel_type_id}
                          name="DICT_REPORT_CHANNEL_TYPE"
                          id="DICT_REPORT_CHANNEL_TYPE"
                        >
                          {this.state.DICT_REPORT_CHANNEL_TYPE.map(
                            (item, index) => {
                              return (
                                <OptionItemDICT_REPORT_CHANNEL_TYPE
                                  key={index}
                                  optionItem={item}
                                  channel_type_id={channel_type_id}
                                />
                              );
                            }
                          )}
                        </select>
                      ) : (
                        <span>Завантаження...</span>
                      )}
                    </div>
                    <br />
                    <div className="reportCoverBtn">
                      <button
                        className="btn btn-secondary"
                        onClick={this.saveReport}
                      >
                        Зберегти
                      </button>
                    </div>
                  </div>
                );
              })}
              {/*<Tab eventKey="physical" title="Фізичний">*/}
              {/*    <div className="title">Перелік полів звіту ТСП</div>*/}
              {/*    <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>*/}
              {/*    <button className="btn btn-secondary" disabled>Розширений звіт</button>*/}
              {/*    <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>*/}
              {/*    <br/>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="file_format">Формат файлу</label>*/}
              {/*        {*/}
              {/*            this.state.isShowREPORT_FORMAT*/}
              {/*                ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {*/}
              {/*                        return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}

              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="report_period">Період звіту</label>*/}
              {/*        {*/}
              {/*            this.state.isShowDICT_REPORT_PERIOD_TYPE*/}
              {/*                ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {*/}
              {/*                        return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="file_name_mask">Маска назви файлу</label>*/}
              {/*        <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="сatalog">Каталог</label>*/}
              {/*        <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="сhannel">Канал</label>*/}
              {/*        {*/}
              {/*            this.state.isShowDICT_REPORT_CHANNEL_TYPE*/}
              {/*                ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {*/}
              {/*                        return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}

              {/*    </div>*/}
              {/*    <div className="reportCoverBtn">*/}
              {/*        <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>*/}
              {/*    </div>*/}
              {/*</Tab>*/}
              {/*<Tab eventKey="internet" title="Інтернет">*/}
              {/*    <div className="title">Перелік полів звіту ТСП</div>*/}
              {/*    <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>*/}
              {/*    <button className="btn btn-secondary" disabled>Розширений звіт</button>*/}
              {/*    <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>*/}
              {/*    <br/>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="file_format">Формат файлу</label>*/}
              {/*        {*/}
              {/*            this.state.isShowREPORT_FORMAT*/}
              {/*                ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {*/}
              {/*                        return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}

              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="report_period">Період звіту</label>*/}
              {/*        {*/}
              {/*            this.state.isShowDICT_REPORT_PERIOD_TYPE*/}
              {/*                ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {*/}
              {/*                        return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="file_name_mask">Маска назви файлу</label>*/}
              {/*        <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="сatalog">Каталог</label>*/}
              {/*        <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>*/}
              {/*    </div>*/}
              {/*    <div className="coverInput">*/}
              {/*        <label htmlFor="сhannel">Канал</label>*/}
              {/*        {*/}
              {/*            this.state.isShowDICT_REPORT_CHANNEL_TYPE*/}
              {/*                ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">*/}
              {/*                    <option>-</option>*/}
              {/*                    { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {*/}
              {/*                        return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />*/}
              {/*                    }) }*/}
              {/*                </select>*/}
              {/*                : <span>Завантаження...</span>*/}
              {/*        }*/}

              {/*    </div>*/}
              {/*    <div className="reportCoverBtn">*/}
              {/*        <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>*/}
              {/*    </div>*/}
              {/*</Tab>*/}
            </div>
          );
        }

        // return item.main_settings.map( ( item , index) => {
        //     console.log(item);
        //     console.log(item.acquiring_type_id == this.state.type_acquiring);
        //
        //     if(item.acquiring_type_id == this.state.type_acquiring){
        //         let report_period_type_id = item.report_period_type_id;
        //         let report_format_id = item.report_format_id;
        //         let channel_type_id = item.channel_type_id;
        //         let file_name_mask = item.file_name_mask;
        //         // this.setState({
        //         //     report_period_type_id: report_period_type_id,
        //         //     report_format_id: report_format_id,
        //         //     channel_type_id: channel_type_id,
        //         //     file_name_mask: file_name_mask
        //         // });
        //
        //         return(
        //             <div className="report border">
        //                 <div className="title">{this.state.type_acquiring == 1 ? "Фізичний" :"Інтернет"}</div>
        //                 <div className="title">Перелік полів звіту ТСП</div>
        //                 <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>
        //                 <button className="btn btn-secondary" disabled>Розширений звіт</button>
        //                 <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>
        //                 <br/>
        //                 <div className="coverInput">
        //                     <label htmlFor="file_format">Формат файлу</label>
        //                     {
        //                         this.state.isShowREPORT_FORMAT
        //                             ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
        //
        //                                 { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
        //                                     return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
        //                                 }) }
        //                             </select>
        //                             : <span>Завантаження...</span>
        //                     }
        //
        //
        //
        //                 </div>
        //                 <div className="coverInput">
        //                     <label htmlFor="report_period">Період звіту</label>
        //                     {
        //                         this.state.isShowDICT_REPORT_PERIOD_TYPE
        //                             ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
        //
        //                                 { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
        //                                     return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
        //                                 }) }
        //                             </select>
        //                             : <span>Завантаження...</span>
        //                     }
        //                 </div>
        //                 <div className="coverInput">
        //                     <label htmlFor="file_name_mask">Маска назви файлу</label>
        //                     <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
        //                 </div>
        //                 <div className="coverInput">
        //                     <label htmlFor="сatalog">Каталог</label>
        //                     <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
        //                 </div>
        //                 <div className="coverInput">
        //                     <label htmlFor="сhannel">Канал</label>
        //                     {
        //                         this.state.isShowDICT_REPORT_CHANNEL_TYPE
        //                             ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
        //
        //                                 { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
        //                                     return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
        //                                 }) }
        //                             </select>
        //                             : <span>Завантаження...</span>
        //                     }
        //
        //                 </div>
        //                 <div className="reportCoverBtn">
        //                     <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
        //                 </div>
        //             </div>
        //         )
        //     }
        // });
      }
    });
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
  activeOperation = (operationArr, operation) => {
    let res;
    operationArr.map((item, index) => {
      if (item.operation == operation) {
        //console.log(item.name);
        res = item.name;
      }
    });
    return res;
  };

  //
  onChangeAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    this.setState({
      InputDICT_MCC: param,
    });
    if (param != "") {
      this.requestDICT_MCC(this.props.store.userState.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    console.log(param);
    this.setState({
      isShowBlockSelectDICT_MCC: true,
    });
  };

  onClickAutocompleteInputRes = () => {
    this.setState({
      mcc_code: null,
      isShowBlockSelectDICT_MCC: true,
      isShowInputResDICT_MCC: false,
      isShowInputDICT_MCC: true,
    });
  };

  onBlurBlockSelect = () => {
    this.setState({
      isShowBlockSelectDICT_MCC: false,
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
      if (val != this.state.InputDICT_MCC) {
        this.requestDICT_MCC(this.props.store.userState.token, val, false);

        let inputDataObj = this.state.AcquiringReportsCriteria;
        inputDataObj.mcc_code = val;
        console.log(val);
        this.setState({
          AcquiringReportsCriteria: inputDataObj,
          InputDICT_MCC: val,
          isShowBlockSelectDICT_MCC: false,
          isShowInputResDICT_MCC: true,
          isShowInputDICT_MCC: false,
        });
      }
      this.setState({
        isShowBlockSelectDICT_MCC: false,
        // isShowInputResDICT_MCC: true,
        // isShowInputDICT_MCC: false,
      });
    }
  };

  clickTest = (e) => {
    //console.log(e.target.parentElement.className);
    //console.log(this.myRef.current.className);
    // console.log(this.myRef);
    // console.log(typeof this.myRef);
    // console.log(this.myRef != null);
    //console.log(this.myRef.current != null);
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.parentElement);
    // console.log(e.target.parentElement.className);
    // console.log(e.target.parentElement.className != null && this.myRef.current != null);
    if (this.myRef.current != null) {
      if (this.myRef.current.className != e.target.parentElement.className) {
        this.setState({
          isShowBlockSelectDICT_MCC: false,
        });
      }
    }
  };

  async requestDICT_MCC(token, param, showBlock) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_MCC/?param1=${param}`;
    console.log(baseUrl);
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        if (response.data.Table.TableRows == null) {
          this.setState({
            DICT_MCC: [
              {
                mcc_code: "",
                mcc_name: "За даним кодом незнайдено жодного результату",
              },
            ],
          });
        } else {
          this.setState({
            DICT_MCC: response.data.Table.TableRows,
          });
        }

        if (showBlock) {
          this.setState({
            isShowBlockSelectDICT_MCC: true,
          });
        } else {
          this.setState({
            isShowBlockSelectDICT_MCC: false,
          });
        }

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  //
  addTspName = (val) => {
    console.log(val);
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.tsp_id = val;
    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    console.log(this.state.AcquiringReportsCriteria.tsp_name);
  };
  addIdentCode = (val) => {
    console.log(val);
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.ident_code = val;
    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
  };
  addMccCode = (val) => {
    console.log(val);
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.mcc_code = val;
    console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
  };
  render() {
    return (
      <div className="coverTable REPORT_aquiring">
        {this.state.isSuccess ? (
          <Alert variant={"success"}>
            Звіт Виписка операцій успішно сформована. Перейдіть по{" "}
            <Alert.Link href="/dashboard/REPORTS_ACQUIRING_MONITOR">
              лінку
            </Alert.Link>
            . Для перегляду звіта.
          </Alert>
        ) : null}

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
          <div className="coverInput col-3">
            <label htmlFor="DICT_INSTITUTION">РУ менеджера</label>
            <select
              onChange={this.selectDICT_INSTITUTION}
              apiName="institution_id"
              id="dropdown-basic-button"
              className={`${
                this.state.isInstitution_idValidation ? "" : "validError"
              } form-select`}
              title="Регіональні управління"
            >
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
            <p className="error">
              {this.state.isInstitution_idValidation
                ? null
                : this.state.error_text}
            </p>
            <label htmlFor="TVBV">ТВБВ</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="bank_branch_id"
              className="form-select"
              disabled={this.state.isDisableTVBV ? "disabled" : ""}
              title="ТВБВ"
            >
              <option></option>
              {this.state.isShowSelectTVBV ? (
                this.state.DICT_BRANCH.map((item, index) => {
                  return (
                    <OptionItemDICT_BRANCH key={index} optionItem={item} />
                  );
                })
              ) : (
                <></>
              )}
            </select>
            <label htmlFor="tsp_name">Назва ТСП</label>
            {/*<input onChange={this.changeInput} className="form-control" apiName="tsp_name" id="tsp_name" type="text"/>*/}
            <AutocompleteInputTspName
              token={this.props.store.userState.token}
              institution_id={
                this.state.AcquiringReportsCriteria.institution_id
              }
              branch_id={this.state.AcquiringReportsCriteria.bank_branch_id}
              addTspName={this.addTspName}
              tsp_name={this.state.AcquiringReportsCriteria.tsp_id}
            />
            <label htmlFor="INN">ІНН/ЄДРПОУ</label>
            <AutocompleteInputIdentCode
              token={this.props.store.userState.token}
              institution_id={
                this.state.AcquiringReportsCriteria.institution_id
              }
              branch_id={this.state.AcquiringReportsCriteria.bank_branch_id}
              addIdentCode={this.addIdentCode}
              ident_code={this.state.AcquiringReportsCriteria.ident_code}
            />
            {/*<input onChange={this.changeInput} className="form-control" apiName="ident_code" id="INN" type="text"/>*/}
          </div>
          <div className="coverInput col-2">
            {/*<label htmlFor="report_type_id">Назва звіту</label>*/}
            {/*<select onChange={this.changeInput} apiName="report_type_id" id="report_type_id" className="form-select"*/}
            {/*        title="">*/}
            {/*    <option>-</option>*/}
            {/*    {*/}
            {/*        this.state.isShowSelectDICT_ACQUIRING_REPORTS*/}
            {/*            ?*/}
            {/*            this.state.DICT_ACQUIRING_REPORTS.map((item, index) => {*/}
            {/*                return < OptionItemDICT_ACQUIRING_REPORTS key={index} optionItem={item}/>*/}
            {/*            })*/}
            {/*            : <>*/}
            {/*            </>*/}
            {/*    }*/}
            {/*</select>*/}

            {/* <label htmlFor="terminal_type_id">Вид термінала</label>
                        <select onChange={this.changeInput} apiName="terminal_type_id" id="terminal_type_id" className={`${this.state.isTerminal_type_idValidation ? '' : 'validError'} form-select`}
                                title="Регіональні управління">
                            <option></option>
                            {
                                this.state.isShowSelectDICT_ACQUIRING_TYPE
                                    ?
                                    this.state.DICT_ACQUIRING_TYPE.map((item, index) => {
                                        return < OptionItemDICT_ACQUIRING_TYPE key={index} optionItem={item}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select> */}
            {/* <p className="error">{this.state.isTerminal_type_idValidation ? null : this.state.error_text}</p> */}
            <label htmlFor="merchant">merchant ID</label>
                        <select onChange={this.changeInput} onFocus={()=>this.requestDICT_MERCHANT_SYSTEM()} apiName="merchant_id" id="dropdown-basic-button" className="form-select"
                                title="merchant ID">
                                    <option></option>
                            {
                                this.state.isShowSelectDICT_MERCHANT_SYSTEM
                                    ?
                                    this.state.DICT_MERCHANT_SYSTEM.map((item, index) => {
                                        return < OptionItemDICT_MERCHANT_SYSTEM key={index} optionItem={item}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select>
                        {/* <input onChange={this.changeInput} className={`form-control`} apiName="merchant_id" id="merchant" type="text" onBlur={this.handleCheckId.bind(this)}/> */}
                        {/* <p className="error">{this.state.isMerchant_idValidation ? null : this.state.error_text}</p> */}
                        <label htmlFor="terminal_id">Terminal ID</label>
                        <select onChange={this.changeInput} onFocus={()=>this.requestDICT_TERMINAL_SYSTEM()} apiName="terminal_id" id="dropdown-basic-button" className="form-select"
                                title="Terminal ID">
                                    <option></option>

                            {
                                this.state.isShowSelectDICT_TERMINAL_SYSTEM
                                    ?
                                    this.state.DICT_TERMINAL_SYSTEM.map((item, index) => {
                                        return < OptionItemDICT_TERMINAL_SYSTEM key={index} optionItem={item}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select>
          </div>
          <div className="coverInput col-3">
            <div className="base-field">
              <label htmlFor="base">Базові поля</label>
              <input apiName="base" id="base" type="checkbox" />
            </div>
            <label htmlFor="DICT_PAYMENT_SYSTEM">Карти</label>
            <select
              onChange={this.changeInput}
              apiName="payment_system_id"
              id="dropdown-basic-button"
              className="form-select"
              title="Карти"
            >
              {this.state.isShowSelectDICT_PAYMENT_SYSTEM ? (
                this.state.DICT_PAYMENT_SYSTEM.map((item, index) => {
                  return (
                    <OptionItemDICT_PAYMENT_SYSTEM
                      key={index}
                      optionItem={item}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select>
            <label htmlFor="terminal_id">MCC</label>
                        <select onChange={this.changeInput} onFocus={()=>this.requestDICT_TERMINAL_SYSTEM()} apiName="mcc_code" id="dropdown-basic-button" className="form-select"
                                title="Terminal ID">

                            {
                                this.state.isShowSelectDICT_MCC_SYSTEM
                                    ?
                                    this.state.DICT_MCC_SYSTEM.map((item, index) => {
                                        return < OptionItemDICT_TERMINAL_SYSTEM key={index} optionItem={item}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select>
            {/* <label htmlFor="mcc_code">MCC</label>
            <AutocompleteInputMccCode
              token={this.props.store.userState.token}
              addMccCode={this.addMccCode}
              mcc_code={this.state.AcquiringReportsCriteria.mcc_code}
            /> */}

            {/*<input onChange={this.changeInput} className="form-control" apiName="mcc_code" id="mcc_code" type="text"/>*/}
            {/*<div className="autocomplete">*/}
            {/*    <input*/}
            {/*        className={`${this.state.isShowInputDICT_MCC ? '' : 'dn'} form-control`}*/}
            {/*        placeholder="Введіть код" type="text"*/}
            {/*        onBlur={this.onBlurAutocompleteInput}*/}
            {/*        onChange={this.onChangeAutocompleteInput}*/}
            {/*        onClick={this.onClickAutocompleteInput}*/}
            {/*        value={this.state.InputDICT_MCC}*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        className={`${this.state.isShowInputResDICT_MCC ? '' : 'dn'} form-control`}*/}
            {/*        placeholder="Результат" type="text"*/}
            {/*        value={this.state.AcquiringReportsCriteria.mcc_code}*/}
            {/*        onClick={this.onClickAutocompleteInputRes}*/}
            {/*    />*/}
            {/*    <div className={`${this.state.isShowBlockSelectDICT_MCC ? '' : 'dn'}blockSelect`} onBlur={this.onBlurBlockSelect} ref={this.myRef} >*/}
            {/*        {*/}
            {/*            this.state.isShowBlockSelectDICT_MCC*/}
            {/*                ? this.state.DICT_MCC != null*/}
            {/*                ? this.state.DICT_MCC.map((item, index) => {*/}
            {/*                    return < ItemDICT_MCC key={index} item={item} onClickBlockSelectItem={this.onClickBlockSelectItem}/>*/}
            {/*                })*/}
            {/*                : <></>*/}
            {/*                : <></>*/}

            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}

            <label htmlFor="format_type_id">Формат файлу</label>
            <select
              onChange={this.changeInput}
              apiName="format_type_id"
              id="format_type_id"
              className="form-select"
              title="DICT_REPORT_FORMAT"
            >
              {this.state.isShowSelectDICT_REPORT_FORMAT ? (
                this.state.DICT_REPORT_FORMAT.map((item, index) => {
                  //console.log(item)
                  return (
                    <OptionItemDICT_REPORT_FORMAT
                      key={index}
                      optionItem={item}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="coverInput col-4">
            <div className="coverInput col-11">
              <div className="coverDate">
                {/*<label htmlFor="date_type_id">Дата звіту</label>*/}
                {/*<input onChange={this.changeInputDateReport} apiName="date_type_id" className="customInput" id="date_type_id" type="date"/>*/}

                <label htmlFor="date_type_id">Дата звіту</label>
                <select
                  onChange={this.changeInput}
                  apiName="date_type_id"
                  id="date_type_id"
                  className={`${
                    this.state.isDate_type_idValidation ? "" : "validError"
                  } form-select`}
                  title="DICT_DATE_TYPE"
                >
                  {this.state.isShowSelectDICT_DATE_TYPE ? (
                    this.state.DICT_DATE_TYPE.map((item, index) => {
                      //console.log(item)
                      return (
                        <OptionItemDICT_DATE_TYPE
                          key={index}
                          optionItem={item}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </select>
                <p className="error">
                  {this.state.isDate_type_idValidation
                    ? null
                    : this.state.error_text}
                </p>
              </div>
            </div>
            <div className="coverInput col-11">
              <span>Період звіту</span>
              <div className="row">
                <div className="coverDate col-6">
                  <label htmlFor="date_report_from">З</label>
                  <input
                    onChange={this.changeInputDateReport_from}
                    apiName="date_from"
                    className={`${
                      this.state.isDate_fromValidation ? "" : "validError"
                    } customInput form-control`}
                    id="date_from"
                    type="date"
                  />
                </div>
                <div className="coverDate col-6">
                  <label htmlFor="date_report_to">По</label>
                  <input
                    onChange={this.changeInputDateReport_to}
                    apiName="date_to"
                    className={`${
                      this.state.isDate_toValidation ? "" : "validError"
                    } customInput form-control`}
                    id="date_to"
                    type="date"
                  />
                </div>
              </div>
              <p className="error">
                {this.state.isDate_fromValidation &&
                this.state.isDate_toValidation
                  ? null
                  : "Заповніть будь-ласка поля!"}
              </p>
            </div>
          </div>
        </div>
        <div className="btnBlock">
          <button className="search btn btn-primary" onClick={this.search}>
            Побудувати звіт
          </button>
        </div>

        {this.state.isShowPopupError ? (
          <>
            <div className="coverPopupError">
              <div className="innerBlock">
                <div className="title alert alert-danger">
                  Немає результату по даному пошуку
                </div>
                <div className="msg">{this.state.merchant_error}</div>
                <button
                  className="btn btn-secondary"
                  onClick={this.closePopupError}
                >
                  Закрити
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {this.state.isShowPopupErrorSave ? (
          <>
            <div className="coverPopupError">
              <div className="innerBlock">
                <div className="title alert alert-primary">
                  Упс1 Сталася помилка
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
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default REPORT_OPERATIONS;
