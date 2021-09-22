import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";

import { Field, reduxForm } from "redux-form";
import { ListGroup } from "react-bootstrap";

const OptionItemDICT_INSTITUTION = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.institution_id}>
      {props.optionItem.institution_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_BRANCH = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.branch_id}>
      {props.optionItem.branch_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_BRANCH_ENTITY = (props) => {
  console.log("OptionItemDICT_BRANCH_ENTITY:", props);
  return (
    <option value={props.optionItem.entity_id}>
      {props.optionItem.entity_name}
    </option>
  );
};
const OptionItemCommon = ({ name, id }) => {
  return <option value={id}>{name}</option>;
};
const OptionItemDICT_ACQUIRING_REPORTS = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.report_id}>
      {props.optionItem.report_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_ACQUIRING_TYPE = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.acquiring_type_id}>
      {props.optionItem.acquiring_type_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_TSP_TYPE = ({ optionItem }) => {
  //// console.log( props )
  return (
    <option value={optionItem.id}>{optionItem.name}</option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};

const OptionItemDICT_PAYMENT_SYSTEM = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.payment_system_id}>
      {props.optionItem.payment_system_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_REPORT_FORMAT = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.report_format_id}>
      {props.optionItem.report_format_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_DATE_TYPE = (props) => {
  //// console.log( props )
  return (
    <option value={props.optionItem.date_type_id}>
      {props.optionItem.date_type_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItem = (props) => {
  //// console.log( props )
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
  // // console.log( props );
  // // console.log( props.optionItem.report_period_type_id );
  // // console.log( props.report_period_type_id );
  //// console.log( props.optionItem.report_period_type_id == props.report_period_type_id  );

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
  //// console.log( props )
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
  //// console.log( props )
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

class REPORT_OPERATIONS_NET extends React.Component {
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
        report_type_id: "REPORT_OPERATIONS_NET",
        payment_system_id: 1,
        format_type_id: 1,
      },

      date_from: null,
      date_to: null,
      date_type_id: null,
      institution_id: null,
      merchant_id: null,
      terminal_type_id: null,
      brand_name: null,

      isInstitution_idValidation: true,
      isMerchant_idValidation: true,
      isTerminal_type_idValidation: true,
      isDate_type_idValidation: true,
      isDate_fromValidation: true,
      isDate_toValidation: true,
      isMerchant_toValidation: true,
      isTerminal_toValidation: true,
      isBrandName_toValidation: true,
      isTSP_toValidation: true,
      isMCC_toValidation: true,

      DICT_BRAND_NAME_ID: null,
      DICT_MCC: null,
      InputDICT_MCC: null,
      isShowBlockSelectDICT_MCC: false,
      isShowInputResDICT_MCC: false,
      isShowInputDICT_MCC: true,
      isShow_BRANCH_NAME_VALUES: false,
      DICT_BRAND_VALUES: [],
      DICT_BRAND_NAME_VALUES: [],
      DICT_BRAND_NAME_VAL: null,
      isShow_ENTITY_NAME_VALUES: false,

      isShow_DICT_TSP: false,
      DICT_TSP_VALUE: [],

      isShow_DICT_MERCHANT: false,
      DICT_MERCHANT_VALUE: [],

      isShow_DICT_TERMINAL: false,
      DICT_TERMINAL_VALUE: [],
      error_text: "Заповніть будь ласка поле!"
    };
    this.myRef = React.createRef();
    this.handleRequestDICT_BRANCH_NAME =
      this.handleRequestDICT_BRANCH_NAME.bind(this);
    this.get_DICT_BRAND_NAME_LEVEL = this.get_DICT_BRAND_NAME_LEVEL.bind(this);
    this.get_DICT_TSP = this.get_DICT_TSP.bind(this);

    //// console.log(this.data.sort());
  }
  componentDidMount() {
    window.addEventListener("mousedown", this.clickTest);
    this.requestDICT_INSTITUTION(this.props.store.userState.token);
    this.requestDICT_ACQUIRING_REPORTS(this.props.store.userState.token);
    this.requestDICT_ACQUIRING_TYPE(this.props.store.userState.token);
    this.requestDICT_PAYMENT_SYSTEM(this.props.store.userState.token);
    this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
    this.requestDICT_DATE_TYPE(this.props.store.userState.token);
    this.requestDICT_DATE_TYPE(this.props.store.userState.token);
    this.get_DICT_NET_BRAND(this.props.store.userState.token);
  }
  componentWillUnmount() {
    window.addEventListener("mousedown", null);
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

  async requestDICT_INSTITUTION(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_INSTITUTION`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        //// console.log(response.data.Table);

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
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }

  async get_DICT_NET_BRAND(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND`;

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
  async get_DICT_BRAND_NAME_LEVEL() {
    if (!this.state.DICT_BRAND_NAME_VAL) return;
    this.props.store.changeLoading(true);

    const { second_level_flag, brand_id } = this.state.DICT_BRAND_VALUES.filter(
      (item) => item.brand_name === this.state.DICT_BRAND_NAME_VAL[0]
    )[0];

    this.setState({
      DICT_BRAND_NAME_ID: brand_id,
    });

    console.log("this.state", this.state);

    if (second_level_flag === 1) {
      const secondUrl = `/api/Dictionary/DICT_NET_ENTITY/?param1=${brand_id}`;
      await axios
        .get(secondUrl, {
          headers: { Token: `${this.props.store.userState.token}` },
        })
        .then((res) => {
          console.log("res.data.Table.TableRows", res.data.Table.TableRows);
          this.setState({
            DICT_BRANCH_ENTITY_VALUES: res.data.Table.TableRows,
            isShow_ENTITY_NAME_VALUES: true,
          });
        });
    } else {
      this.setState({
        DICT_BRANCH_ENTITY_VALUES: [],
        isShow_ENTITY_NAME_VALUES: false,
      });
    }
    this.props.store.changeLoading(false);
    this.get_DICT_TSP(brand_id);
    this.get_DICT_BRAND_MERCHANT(brand_id);
    this.get_DICT_BRAND_TERMINALS(brand_id);
  }

  async get_DICT_BRAND_MERCHANT(brand_id = null) {
    this.props.store.changeLoading(true);

    const params = {
      param1: brand_id ? brand_id : this.state.DICT_BRAND_NAME_ID,
    };
    if (this.state.AcquiringReportsCriteria.network_entity_id) {
      params.param2 = this.state.AcquiringReportsCriteria.network_entity_id;
    }

    console.log("params: ", params);
    const secondUrl = `/api/Dictionary/DICT_NETWORK_MERCHANTS`;
    await axios
      .get(secondUrl, {
        headers: { Token: `${this.props.store.userState.token}` },
        params,
      })
      .then((res) => {
        console.log("res.data.Table.TableRows", res.data.Table.TableRows);
        this.setState({
          DICT_MERCHANT_VALUE: res.data.Table.TableRows,
          isShow_DICT_MERCHANT: res.data.Table.TableRows !== null,
        });
      });

    this.props.store.changeLoading(false);
  }

  async get_DICT_BRAND_TERMINALS(brand_id = null) {
    this.props.store.changeLoading(true);

    const params = {
      param1: brand_id ? brand_id : this.state.DICT_BRAND_NAME_ID,
    };
    if (this.state.AcquiringReportsCriteria.network_entity_id) {
      params.param2 = this.state.AcquiringReportsCriteria.network_entity_id;
    }

    const secondUrl = `/api/Dictionary/DICT_NETWORK_TERMINALS`;
    await axios
      .get(secondUrl, {
        headers: { Token: `${this.props.store.userState.token}` },
        params,
      })
      .then((res) => {
        console.log("res.data.Table.TableRows", res.data.Table.TableRows);
        this.setState({
          DICT_TERMINAL_VALUE: res.data.Table.TableRows,
          isShow_DICT_TERMINAL: res.data.Table.TableRows !== null,
        });
      });

    this.props.store.changeLoading(false);
  }
  async get_DICT_TSP(brand_id) {
    this.props.store.changeLoading(true);
    // const client_name =
    //   !this.state.DICT_BRAND_NAME_VAL
    //     ? ""
    //     : this.state.DICT_BRAND_NAME_VAL[0];

    const body = {
      institution_id: Number(this.state.institution_id),
      branch_id: this.state.AcquiringReportsCriteria.bank_branch_id,
      network_brand_id: brand_id,
    };

    const baseURL = `/api/Dictionary/QueryTSP`;
    await axios
      .post(baseURL, body, {
        headers: { token: `${this.props.store.userState.token}` },
      })
      .then((res) => {
        console.log("/api/Dictionary/QueryTSP", res.data.tsp_list.TableRows);
        this.setState({
          DICT_TSP_VALUE: res.data.tsp_list.TableRows,
          isShow_DICT_TSP: res.data.tsp_list.TableRows !== null,
        });
      });

    this.props.store.changeLoading(false);
  }
  async requestDICT_REPORT_FORMAT(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_REPORT_FORMAT`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_REPORT_FORMAT: response.data.Table.TableRows,
          isShowSelectDICT_REPORT_FORMAT: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  async requestDICT_REPORT_PERIOD_TYPE(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_REPORT_PERIOD_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_REPORT_PERIOD_TYPE: response.data.Table.TableRows,
          isShowDICT_REPORT_PERIOD_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }

  async requestDICT_ACQUIRING_REPORTS(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_ACQUIRING_REPORTS`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_ACQUIRING_REPORTS: response.data.Table.TableRows,
          isShowSelectDICT_ACQUIRING_REPORTS: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  async requestDICT_ACQUIRING_TYPE(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_ACQUIRING_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_ACQUIRING_TYPE: response.data.Table.TableRows,
          isShowSelectDICT_ACQUIRING_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  async requestDICT_PAYMENT_SYSTEM(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_PAYMENT_SYSTEM`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_PAYMENT_SYSTEM: response.data.Table.TableRows,
          isShowSelectDICT_PAYMENT_SYSTEM: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  async requestDICT_BRANCH_NAME() {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND?param1=${this.state.brand_name}`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${this.props.store.userState.token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_BRAND_NAME_VALUES: response.data.Table.TableRows,
          isShow_BRANCH_NAME_VALUES: response.data.Table.TableRows !== null,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  handleRequestDICT_BRANCH_NAME(e) {
    const item = {
      brand_name: e.target.innerText,
      brand_id: e.target.dataset.id,
    };
    this.setState({
      brand_name: item.brand_name,
      brand_id: item.brand_id,
      isShow_BRANCH_NAME_VALUES: false,
    });
  }

  async requestDICT_DATE_TYPE(token) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_DATE_TYPE`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({
          DICT_DATE_TYPE: response.data.Table.TableRows,
          isShowSelectDICT_DATE_TYPE: true,
        });

        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }

  async requestReports_Acquiring(token, userBody) {
    this.props.store.changeLoading(true);
    // console.log(token);
    const baseUrl = `/api/Reports/Acquiring`;

    await axios
      .post(baseUrl, userBody, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        //// console.log(response.data.users);
        //// console.log(response.data.Table);

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
        this.props.store.changeLoading(false);
        window.location.href = "/dashboard/REPORTS_ACQUIRING_MONITOR";
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        // console.log(error.response);
        // // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }

  selectDICT_INSTITUTION = (e) => {
    // console.log(e.target.value);
    let param = e.target.value;
    // console.log(param);
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj[apiName] = inputValue;

    // console.log(inputDataObj);
    if (param == "") {
      // console.log(param);
      this.setState({
        isShowSelectTVBV: true,
        TSPReportSettingsSearchObj: inputDataObj,
        isInstitution_idValidation: false,
      });
    } else {
      this.setState({
        isShowSelectTVBV: false,
        TSPReportSettingsSearchObj: inputDataObj,
        isInstitution_idValidation: true,
        institution_id: param,
      });
      this.requestDICT_BRANCH(this.props.store.userState.token, param);
    }

    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };

  changeInputDateReport = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));

    // console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };
  changeInputDateReport_from = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));
    if (inputValue == "") {
      // console.log(inputValue);
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

    // console.log(inputDataObj);

    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };
  changeInputDateReport_to = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = this.formatDate(new Date(inputValue));

    if (inputValue == "") {
      // console.log(inputValue);
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

    // console.log(inputDataObj);

    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };

  changeInputBase = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    inputDataObj[apiName] = inputValue;

    // console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };
  changeInput = (e) => {
    let apiName = e.currentTarget.getAttribute("apiName");
    // console.log(apiName);
    let inputValue = e.target.value;
    // console.log(inputValue);
    let inputDataObj = this.state.AcquiringReportsCriteria;

    if (
      apiName == "format_type_id" ||
      apiName == "mcc_code" ||
      apiName == "payment_system_id" ||
      apiName == "terminal_id" ||
      apiName == "bank_branch_id" ||
      apiName == "institution_id" ||
      apiName == "tsp_id" ||
      apiName == "merchant_id" ||
      apiName == "terminal_id" ||
      apiName == "ident_code" ||
      apiName == "network_entity_id"
    ) {
      inputDataObj[apiName] = Number(inputValue);
    } else {
      if (apiName == "terminal_type_id") {
        inputDataObj[apiName] = inputValue;
        if (inputValue == "") {
          // console.log(inputValue);
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
          // console.log(inputValue);
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
      } else if (apiName == "network_entity_id") {
        inputDataObj[apiName] = Number(inputValue);
      } else if (apiName == "date_type_id") {
        inputDataObj[apiName] = Number(inputValue);
        if (inputValue == "") {
          // console.log(inputValue);
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
      } else if (apiName == "brand_name") {
        this.setState({
          [apiName]: inputValue,
        });
        // console.log(this.state);
      } else {
        inputDataObj[apiName] = inputValue;
      }
    }

    // console.log(inputDataObj);
    this.setState({
      AcquiringReportsCriteria: inputDataObj,
    });
    // console.log(this.state);
    // console.log(this.state.AcquiringReportsCriteria);
  };

  formatDate = (date) => {
    let day = date.getDate();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
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

    //// console.log(res);
    // console.log(this.state.AcquiringReportsCriteria);

    this.defineValidationInputs();
    
  };

  sendOptionToServer(){
    if (
      this.state.isInstitution_idValidation &&
      this.state.isDate_type_idValidation &&
      this.state.isDate_fromValidation &&
      this.state.isDate_toValidation
    ) {
      
      //// console.log(this.state.isInstitution_idValidation && this.state.isMerchant_idValidation && this.state.isTerminal_type_idValidation && this.state.isDate_type_idValidation && this.state.isDate_fromValidation && this.state.isDate_toValidation);
      //// console.log('agon');
      if( this.state.DICT_BRAND_NAME_ID){
        this.state.AcquiringReportsCriteria.network_brand_id =
          this.state.DICT_BRAND_NAME_ID;
      }
      this.state.AcquiringReportsCriteria.institution_id = Number(
        this.state.AcquiringReportsCriteria.institution_id
      );
      if(this.state.AcquiringReportsCriteria.mcc_code){
        this.state.AcquiringReportsCriteria.mcc_code = Number(
          this.state.AcquiringReportsCriteria.mcc_code
        );
      }

      this.requestReports_Acquiring(
        this.props.store.userState.token,
        this.state.AcquiringReportsCriteria
      );

    }
  }
  defineValidationInputs = () => {
    if (this.state.institution_id == null || this.state.institution_id == "") {
      this.setState({ isInstitution_idValidation: false });
    }

    if (this.state.date_type_id == null || this.state.date_type_id == "") {
      this.setState({ isDate_type_idValidation: false });
    }

    if (this.state.date_from == null || this.state.date_from == "") {
      this.setState({isDate_fromValidation: false});
  }
  if (this.state.date_to == null || this.state.date_to == "") {
      this.setState({isDate_toValidation: false});
  }


    this.setState({}, ()=>this.sendOptionToServer())
  };
  Tsp_list = (tsp_list) => {
    // console.log(tsp_list);
    return tsp_list.map((item, index) => {
      // console.log(item);
      return (
        <li className="dropdownMenuItem">
          <p>
            <input
              name="tsp_list"
              id={item.tsp_id}
              type="radio"
              onClick={this.itemTsp}
              value={item.tsp_id}
            />{" "}
            {item.tsp_id}
          </p>
        </li>
      );
    });
  };
  itemTsp = (e) => {
    // let currentTsp = e.target.value;
    // // console.log(currentTsp);
    // let currentTspArr = this.state.currentTsp;
    // currentTspArr.push(currentTsp);
    // this.setState({
    //     currentTsp: currentTspArr,
    //     isShowTypeAcquiring: true
    // });
    let currentTsp = e.target.value;
    // console.log(currentTsp);
    // console.log(this.state);
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
          // console.log(item.main_settings[0].acquiring_type_id);
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
    // console.log(typeAcquiring);
    // this.setState({
    //     type_acquiring: Number(typeAcquiring),
    //     isShowReport: true
    // });
    this.state.settings.map((item, index) => {
      // console.log(this.state.currentTsp);
      // console.log(item.tsp_id);
      if (item.tsp_id == this.state.currentTsp) {
        if (item.main_settings.length > 1) {
          // console.log(item.main_settings.length > 1);
          item.main_settings.map((item, index) => {
            if (item.acquiring_type_id == typeAcquiring) {
              // console.log(item.acquiring_type_id == typeAcquiring);
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
    //             // console.log(item.main_settings[0].acquiring_type_id);
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
    // console.log(inputValue);
    this.setState({
      report_format_id: Number(inputValue),
    });
  };
  changeReport_period_type_id = (e) => {
    let inputValue = e.target.value;
    // console.log(inputValue);
    this.setState({
      report_period_type_id: Number(inputValue),
    });
  };
  changeChannel_type_id = (e) => {
    let inputValue = e.target.value;
    // console.log(inputValue);
    this.setState({
      channel_type_id: Number(inputValue),
    });
  };
  changeFile_name_mask = (e) => {
    let inputValue = e.target.value;
    // console.log(inputValue);
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
    //// console.log( dody );
    this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token);
  };

  showReport = (currentTsp) => {
    // console.log(currentTsp);
    return this.state.settings.map((item, index) => {
      // console.log(item);

      // console.log(item.tsp_id);
      // console.log(item.tsp_id == currentTsp);
      if (item.tsp_id == currentTsp) {
        // console.log(item.main_settings);

        if (item.main_settings == null) {
          let report_period_type_id = 1;
          let report_format_id = 1;
          let channel_type_id = 1;
          let file_name_mask = "";

          // console.log(report_period_type_id);
          // console.log(report_format_id);
          // console.log(channel_type_id);
          // console.log(file_name_mask);
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
            // console.log(report_period_type_id);
            // console.log(report_format_id);
            // console.log(channel_type_id);
            // console.log(file_name_mask);
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
                // console.log(acquiring_type_id);
                // console.log(report_period_type_id);
                // console.log(report_format_id);
                // console.log(channel_type_id);
                // console.log(file_name_mask);
                // console.log(this.state.type_acquiring);
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
        //     // console.log(item);
        //     // console.log(item.acquiring_type_id == this.state.type_acquiring);
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
        //// console.log(item.name);
        res = item.name;
      }
    });
    return res;
  };

  //
  onChangeAutocompleteInput = (e) => {
    let param = e.target.value;
    // console.log(param);
    this.setState({
      InputDICT_MCC: param,
    });
    if (param != "") {
      this.requestDICT_MCC(this.props.store.userState.token, param, true);
    }
  };
  onClickAutocompleteInput = (e) => {
    let param = e.target.value;
    // console.log(param);
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
    //// console.log('----onClickBlockSelectItem-----');
    let val = e.currentTarget.getAttribute("value");
    //// console.log(val);
    //// console.log('----onClickBlockSelectItem-----');
    if (val != "") {
      //// console.log(this.state.InputDICT_MCC);
      //// console.log(this.state.mcc_code);
      if (val != this.state.InputDICT_MCC) {
        this.requestDICT_MCC(this.props.store.userState.token, val, false);

        let inputDataObj = this.state.AcquiringReportsCriteria;
        inputDataObj.mcc_code = val;
        // console.log(val);
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
    //// console.log(e.target.parentElement.className);
    //// console.log(this.myRef.current.className);
    // // console.log(this.myRef);
    // // console.log(typeof this.myRef);
    // // console.log(this.myRef != null);
    //// console.log(this.myRef.current != null);
    // // console.log(e);
    // // console.log(e.target);
    // // console.log(e.target.parentElement);
    // // console.log(e.target.parentElement.className);
    // // console.log(e.target.parentElement.className != null && this.myRef.current != null);
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
    // console.log(token);
    const baseUrl = `/api/Dictionary/DICT_MCC/?param1=${param}`;
    // console.log(baseUrl);
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        //// console.log(response.data.Table);

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
        // console.log(error.response);
        // console.log(error.response.data);
        //// console.log('error_catch');
      });
  }
  //
  render() {
    // // console.log(this.props.store.menuState.tableData);
    // // console.log(this.state.DICT_INSTITUTION);
    // // console.log(this.state.DICT_BRANCH);
    //// console.log(this.state.TSPReportSettingsSTD);
    // console.log(this.state);

    return (
      <div className="coverTable REPORT_aquiring">
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
          <div className="col-3 coverInput">
            <label htmlFor="DICT_INSTITUTION">Регіональні управління</label>
            <select
              onChange={this.selectDICT_INSTITUTION}
              apiName="institution_id"
              id="dropdown-basic-button"
              className={`${
                this.state.isInstitution_idValidation ? "" : "validError"
              } form-select`}
              title="Регіональні управління"
            >
              <option></option>
              {this.state.isShowSelectDICT_INSTITUTION ? (
                this.state.DICT_INSTITUTION.map((item, index) => {
                  return (
                    <OptionItemDICT_INSTITUTION key={index} optionItem={item} />
                  );
                })
              ) : null}
            </select>
            <p className="error">{this.state.isInstitution_idValidation ? null : this.state.error_text}</p>
            <label htmlFor="TVBV">ТВБВ</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="bank_branch_id"
              className={`form-select`}
              disabled={this.state.isDisableTVBV ? "disabled" : ""}
              title="ТВБВ"
            >
              {this.state.isShowSelectTVBV
                ? this.state.DICT_BRANCH.map((item, index) => {
                    return (
                      <OptionItemDICT_BRANCH key={index} optionItem={item} />
                    );
                  })
                : null}
            </select>

            {/* 
            <div className="autocomplete">
              <input
                className={`${
                  this.state.isShowInputTsp_name ? "" : "dn"
                } form-control`}
                placeholder="Введіть код"
                type="text"
                onBlur={this.onBlurAutocompleteInput}
                onChange={this.onChangeAutocompleteInput}
                onClick={this.onClickAutocompleteInput}
                value={this.state.InputDICT_MCC}
              />
              <input
                className={`${
                  this.state.isShowInputResTsp_name ? "" : "dn"
                } form-control`}
                placeholder="Результат"
                type="text"
                value={this.state.AcquiringReportsCriteria.mcc_code}
                onClick={this.onClickAutocompleteInputRes}
              />
              <div
                className={`${
                  this.state.isShowBlockSelectTsp_name ? "" : "dn"
                }blockSelect`}
                onBlur={this.onBlurBlockSelect}
                ref={this.myRef}
              >
                {this.state.isShowBlockSelectDICT_MCC ? (
                  this.state.DICT_MCC != null ? (
                    this.state.DICT_MCC.map((item, index) => {
                      return (
                        <ItemDICT_MCC
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
            </div> */}

            {/* <label htmlFor="tsp_id">Назва Мережі</label>
            <input
              onChange={this.changeInput}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  this.requestDICT_BRANCH_NAME();
                }
              }}
              className="form-control"
              apiName="brand_name"
              id="brand_name"
              type="text"
              value={this.state.brand_name}
              placeholder="Назва мережі Enter..."
            />
            <ListGroup
              style={{ cursor: "pointer" }}
              onClick={this.handleRequestDICT_BRANCH_NAME}
            >
              {this.state.isShow_BRANCH_NAME_VALUES
                ? this.state.DICT_BRAND_NAME_VALUES.map((item, key) => {
                    return (
                      <ListGroup.Item key={key} data-id={item.brand_id}>
                        {item.brand_name}
                      </ListGroup.Item>
                    );
                  })
                : null}
            </ListGroup> */}

            <label htmlFor="tsp_id">Назва Мережі</label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={(val) => this.setState({ DICT_BRAND_NAME_VAL: val })}
              options={this.state.DICT_BRAND_NAME_VALUES}
              placeholder="Почніть вводити назву"
              selected={this.state.DICT_BRAND_NAME_VAL}
              onBlur={this.get_DICT_BRAND_NAME_LEVEL}
              className={`${
                this.state.isBrandName_toValidation ? "" : "validError"
              }`}
            />

            <label htmlFor="TVBV">Назва мережі 2-го рівня</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="network_entity_id"
              className="form-select"
              disabled={!this.state.isShow_ENTITY_NAME_VALUES ? "disabled" : ""}
              onBlur={() => {
                this.get_DICT_BRAND_MERCHANT();
                this.get_DICT_BRAND_TERMINALS();
              }}
            >
              <option></option>
              {this.state.isShow_ENTITY_NAME_VALUES
                ? this.state.DICT_BRANCH_ENTITY_VALUES.map((item, index) => {
                    return (
                      <OptionItemDICT_BRANCH_ENTITY
                        key={index}
                        optionItem={item}
                      />
                    );
                  })
                : null}
            </select>
            <label htmlFor="tsp_id">Назва ТСП</label>
            <select
              onChange={this.changeInput}
              apiName="tsp_id"
              id="tsp_id"
              disabled={!this.state.isShow_DICT_TSP ? "disabled" : ""}
              className={`${
                this.state.isTSP_toValidation ? "" : "validError"
              } form-select`}
            >
              <option></option>
              {this.state.isShow_DICT_TSP
                ? this.state.DICT_TSP_VALUE.map((item, index) => {
                    return (
                      <OptionItemDICT_TSP_TYPE
                        key={index}
                        optionItem={{
                          id: item.client_id,
                          name: item.client_name,
                        }}
                      />
                    );
                  })
                : null}
            </select>
            <label htmlFor="ident_code">ІНН/ЄДРПОУ</label>
            <select
              onChange={this.changeInput}
              apiName="ident_code"
              id="ident_code"
              className="form-select"
              disabled={!this.state.isShow_DICT_TSP ? "disabled" : ""}
            >
              <option></option>
              {this.state.isShow_DICT_TSP
                ? this.state.DICT_TSP_VALUE.map((item, index) => {
                    return (
                      <OptionItemDICT_TSP_TYPE
                        key={index}
                        optionItem={{
                          id: item.ident_code,
                          name: item.ident_code,
                        }}
                      />
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-2 coverInput">
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
            <select
              onChange={this.changeInput}
              apiName="terminal_type_id"
              id="terminal_type_id"
              className={`${
                this.state.isTerminal_type_idValidation ? "" : "validError"
              } form-select`}
              title="Регіональні управління"
            >
              <option></option>
              {this.state.isShowSelectDICT_ACQUIRING_TYPE ? (
                this.state.DICT_ACQUIRING_TYPE.map((item, index) => {
                  return (
                    <OptionItemDICT_ACQUIRING_TYPE
                      key={index}
                      optionItem={item}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select> */}

            {/* <label htmlFor="merchant">merchant ID</label>
            <input
              onChange={this.changeInput}
              className={`${
                this.state.isMerchant_idValidation ? "" : "validError"
              } form-control`}
              apiName="merchant_id"
              id="merchant"
              type="text"
            /> */}
            <label htmlFor="merchant">merchant ID</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="merchant_id"
              id="merchant"
              className={`${
                this.state.isMerchant_toValidation ? "" : "validError"
              } form-select`}
              disabled={!this.state.isShow_DICT_MERCHANT ? "disabled" : ""}
            >
              {this.state.isShow_DICT_MERCHANT
                ? this.state.DICT_MERCHANT_VALUE.map((item, index) => {
                    return (
                      <OptionItemCommon
                        key={index}
                        name={item.merchant_id}
                        id={item.merchant_id}
                      />
                    );
                  })
                : null}
            </select>

            <label htmlFor="terminal_id">Terminal ID</label>
            <select
              id="dropdown-basic-button"
              onChange={this.changeInput}
              apiName="terminal_id"
              id="terminal_id"
              className={`${
                this.state.isTerminal_toValidation ? "" : "validError"
              } form-select`}
              disabled={!this.state.isShow_DICT_TERMINAL ? "disabled" : ""}
            >
              {this.state.isShow_DICT_TERMINAL
                ? this.state.DICT_TERMINAL_VALUE.map((item, index) => {
                    return (
                      <OptionItemCommon
                        key={index}
                        name={item.terminal_id}
                        id={item.terminal_id}
                      />
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-2 coverInput">
            {/* <label htmlFor="base">Базові поля</label>
            <input apiName="base" id="base" type="checkbox" checked={true} /> */}
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
            <label htmlFor="mcc_code">MCC</label>
            {/*<input onChange={this.changeInput} className="form-control" apiName="mcc_code" id="mcc_code" type="text"/>*/}
            <div className="autocomplete">
              <input
                className={`${
                  this.state.isShowInputDICT_MCC ? "" : "dn"
                } form-control`}
                placeholder="Введіть код"
                type="text"
                onBlur={this.onBlurAutocompleteInput}
                onChange={this.onChangeAutocompleteInput}
                onClick={this.onClickAutocompleteInput}
                value={this.state.InputDICT_MCC}
              />
              <input
                className={`${
                  this.state.isShowInputResDICT_MCC ? "" : "dn"
                } form-control`}
                placeholder="Результат"
                type="text"
                value={this.state.AcquiringReportsCriteria.mcc_code}
                onClick={this.onClickAutocompleteInputRes}
              />
              <div
                className={`${
                  this.state.isShowBlockSelectDICT_MCC ? "" : "dn"
                }blockSelect`}
                onBlur={this.onBlurBlockSelect}
                ref={this.myRef}
              >
                {this.state.isShowBlockSelectDICT_MCC ? (
                  this.state.DICT_MCC != null ? (
                    this.state.DICT_MCC.map((item, index) => {
                      return (
                        <ItemDICT_MCC
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
            </div>

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
                  //// console.log(item)
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
          <div className="col-2 coverInput">
            <div className="coverInput">
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
                  <option></option>
                  {this.state.isShowSelectDICT_DATE_TYPE
                    ? this.state.DICT_DATE_TYPE.map((item, index) => {
                        //// console.log(item)
                        return (
                          <OptionItemDICT_DATE_TYPE
                            key={index}
                            optionItem={item}
                          />
                        );
                      })
                    : null}
                </select>
                <p className="error">{this.state.isDate_type_idValidation ? null : this.state.error_text}</p>
              </div>
            </div>
            <div className="coverInput">
              <span>Період звіту</span>
              <div className="coverInputs">
                <div className="coverDate">
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
                <div className="coverDate">
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
              <p className="error">{this.state.isDate_fromValidation &&this.state.isDate_toValidation  ? null : "Заповніть будь-ласка поля!"}</p>
            </div>
          </div>
        </div>
        <div className="btnBlock">
          <button className="search btn btn-primary" onClick={this.search}>
            Сформувати
          </button>
        </div>

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

export default REPORT_OPERATIONS_NET;
