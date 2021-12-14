import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import * as axios from "axios";
import InputMask from "react-input-mask";
import { Field, reduxForm } from "redux-form";

// class MyClickableComponent extends React.PureComponent {
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             isOpen: false,
//         }
//     }
//
//     handleClick = e => {
//         this.setState({ isOpen: true })
//     }
//
//     render() {
//         const { isOpen } = this.state
//
//         return (
//             <div>
//                 <div onClick={this.handleClick }>click on me</div>
//                 {isOpen && (
//                     <b>opened!</b>
//                 )}
//             </div>
//         )
//     }
// }

const SampleComponent = (props) => {
  //console.log( props )
  const OptionItemDICT_NETWORK_MANAGERS = (props) => {
    //console.log( props )
    return (
      <option
        selected={
          props.optionItem.manager_id == props.manager_name ? "selected" : ""
        }
        value={props.optionItem.manager_id}
      >
        {props.optionItem.manager_name}
      </option>
      // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    );
  };
  // const changeInput = () => {
  //
  // }
  return (
    <div className="twoLevel">
      <div className="innerBlock">
        <label htmlFor="ident_code">ЄДРПОУ</label>
        <input
          api_name="ident_code"
          entity_id={props.data.entity_id}
          onChange={(e) => props.changeInputSC(e)}
          value={props.data.ident_code}
          id="ident_code"
          type="text"
          className="form-control"
        />
        <label htmlFor="entity_name">Назва 2-го рівня</label>
        <input
          api_name="entity_name"
          entity_id={props.data.entity_id}
          onChange={(e) => props.changeInputSC(e)}
          value={props.data.entity_name}
          id="entity_name"
          type="text"
          className="form-control"
        />
        <label htmlFor="brand_id">Менеджер</label>
        <select
          id="dropdown-basic-button"
          entity_id={props.data.entity_id}
          onChange={(e) => {
            props.changeInputSC(e);
          }}
          api_name="manager_name"
          className="form-select"
          title="ТВБВ"
        >
          <option>-</option>
          {props.DICT_NETWORK_MANAGERS.map((item, index) => {
            return (
              <OptionItemDICT_NETWORK_MANAGERS
                key={index}
                optionItem={item}
                manager_name={props.data.manager_name}
              />
            );
          })}
        </select>
      </div>
      <div className="innerBlock">
        <label htmlFor="brand_id">ID 2-го рівня</label>
        <input
          api_name="brand_id"
          value={props.data.entity_id}
          id="brand_id"
          type="text"
          className="form-control"
          disabled
        />
        <label htmlFor="brand_region">РУ менеджера</label>
        <input
          api_name="brand_region"
          value={props.brand_region}
          id="brand_region"
          type="text"
          className="form-control"
          disabled
        />
      </div>
    </div>
  );
};
const OptionItemDICT_INSTITUTION = (props) => {
  //console.log( props )
  return (
    <option
      selected={
        props.optionItem.institution_id == props.institution_id
          ? "selected"
          : ""
      }
      value={props.optionItem.institution_id}
    >
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
const OptionItemDICT_NET_CLIENT_STATUS = (props) => {
  // console.log( props )
  return (
    <option
      selected={
        props.optionItem.status_code == props.status_code ? "selected" : ""
      }
      value={props.optionItem.status_code}
    >
      {props.optionItem.status_name}
    </option>
    // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
  );
};
const OptionItemDICT_NETWORK_MANAGERS = (props) => {
  //console.log( props )
  return (
    <option
      selected={
        props.optionItem.manager_id == props.manager_id ? "selected" : ""
      }
      value={props.optionItem.manager_id}
    >
      {props.optionItem.manager_name}
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

class NETWORK_CREATE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContact_emailError: false,
      isDisabledSaveBtn: false,

      DICT_INSTITUTION: null,
      isShowSelectDICT_INSTITUTION: false,

      DICT_NETWORK_MANAGERS: null,
      isShowSelectDICT_NETWORK_MANAGERS: false,

      isDisableInput: true,

      brand_name: null,
      brand_id: null,

      contact_person: "",
      contact_phone: "",
      contact_position: "",
      contact_email: "",
      brand_status_code: null,
      brand_region: null,
      manager_name: null,
      manager_id: null,

      moreTwoLevel: false,
      showTwoLevel: false,

      levelBlockNumber: 1,

      twoLevelArr: [],

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

      isShowOrder_numberError: false,
      isShowBootstrapTable: true,

      test: [
        {
          entity_id: 545454,
          ident_code: null,
          manager_name: null,
          entity_name: "frf",
        },
        {
          entity_id: 567789,
          ident_code: null,
          manager_name: null,
          entity_name: "gfg",
        },
      ],
    };
    //console.log(this.data.sort());
  }
  componentDidMount() {
    //console.log('test');
  }
  selectDICT_INSTITUTION = (e) => {
    console.log(e.target.value);
    let param = e.target.value;
    console.log(param);
    let apiName = e.currentTarget.getAttribute("apiName");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);
    let inputDataObj = this.state.TSPReportSettingsSearchObj;
    inputDataObj[apiName] = inputValue;

    console.log(inputDataObj);
    this.setState({
      isShowSelectTVBV: false,
      TSPReportSettingsSearchObj: inputDataObj,
    });
    console.log(this.state);
    console.log(this.state.TSPReportSettingsSearchObj);

    this.requestDICT_BRANCH(this.props.store.userState.token, param);
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

  async requestGetNewBrandId(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/GetNewBrandId`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.Table);

        this.requestDICT_NET_CLIENT_STATUS(this.props.store.userState.token);
        this.requestDICT_NETWORK_MANAGERS(this.props.store.userState.token);
        this.requestDICT_INSTITUTION(this.props.store.userState.token);
        this.setState({
          brand_id: response.data.brand_id,
          isDisableInput: false,
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
  async requestGetNewEntityId(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/GetNewEntityId`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.Table);
        let newObj = {
          brand_id: this.state.brand_id,
          entity_id: response.data.entity_id,
          ident_code: null,
          manager_name: null,
          entity_name: "",
        };
        let cloneArr = this.state.twoLevelArr.map((a) => Object.assign({}, a));
        cloneArr.push(newObj);

        this.setState({
          twoLevelArr: cloneArr,
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
  async requestDICT_NETWORK_MANAGERS(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NETWORK_MANAGERS`;
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
          DICT_NETWORK_MANAGERS: response.data.Table.TableRows,
          isShowSelectDICT_NETWORK_MANAGERS: true,
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

  async requestDICT_NET_CLIENT_STATUS(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NET_CLIENT_STATUS`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        console.log(response.data);

        this.setState({
          DICT_NET_CLIENT_STATUS: response.data.Table.TableRows,
          isShowDICT_NET_CLIENT_STATUS: true,
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
    const baseUrl = `/api/TSPReportSettings`;

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
        if (response.data.record_count >= 1) {
          this.setState({
            settings: response.data.settings,
            tsp_list: response.data.tsp_list,
            //tsp_id: response.data.tsp_list[0].tsp_id,
            isShowTsp: true,
          });
        } else if (response.data.record_count < 1) {
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
  async requestTSPReportSettings_test(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/TSPReportSettings`;
    let userBody = {
      date_from: "2018081",
      date_to: "2021081",
      institution_id: "824",
      tsp_name: "Тзов",
    };
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
        if (response.data.record_count >= 1) {
          this.setState({
            settings: response.data.settings,
            tsp_list: response.data.tsp_list,
            //tsp_id: response.data.tsp_list[0].tsp_id,
            isShowTsp: true,
          });
        } else if (response.data.record_count < 1) {
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
  async requestDICT_NET_BRAND(token, body) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NET_BRAND`;

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
        //console.log(response.data.users);
        //console.log(response.data.Table);

        //this.props.store.showTable(true);

        // this.props.store.addTableData(true, response.data.users);

        let cover = (item) => {
          console.log(item);
          this.requestDICT_NET_ENTITY(this.props.store.userState.token, item);
        };
        if (this.state.twoLevelArr.length != 0) {
          this.state.twoLevelArr.forEach(function (item, i, arr) {
            // console.log( i + ": " + item + " (массив:" + arr + ")" );
            console.log(item);
            cover(item);
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
  async requestDICT_NET_ENTITY(token, body) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Dictionary/DICT_NET_ENTITY`;

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
        //console.log(response.data.users);
        //console.log(response.data.Table);

        this.setState({
          brand_name: null,
          brand_id: "",
          contact_person: "",
          contact_phone: "",
          contact_position: "",
          contact_email: "",
          brand_status_code: null,
          brand_region: null,
          manager_name: null,
          manager_id: null,

          isDisableInput: true,
          showTwoLevel: false,
          moreTwoLevel: false,

          twoLevelArr: [],
        });

        this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(error.response.data);
        //console.log('error_catch');
      });
  }
  async requestTSPReportSettingsSTD_SAVE(token, dody) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/TSPReportSettings`;

    console.log(dody);
    await axios
      .put(baseUrl, dody, {
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
        // this.setState({
        //     TSPReportSettingsSTD: response.data.standard_settings,
        //     isShowTableTSPReportSettingsSTD: true
        // });
        this.setState({
          isShowTsp: false,
          isShowTypeAcquiring: false,
        });
        this.search();

        this.props.store.changeLoading(false);
        //this.props.store.showTable(true);
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(error.response.data);
        //console.log('error_catch');
        this.setState({
          isShowPopupErrorSave: true,
        });
        this.props.store.changeLoading(false);
      });
  }

  formatDate = (date) => {
    let day = date.getDate();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return year + month + day;
  };
  save = () => {
    let body = {
      brand_name: this.state.brand_name,
      brand_id: this.state.brand_id,
      contact_person: this.state.contact_person,
      contact_phone: this.state.contact_phone,
      contact_position: this.state.contact_position,
      contact_email: this.state.contact_email,
      brand_status_code: this.state.brand_status_code,
      brand_region: this.state.brand_region,
      manager_name: this.state.manager_name,
      manager_id: this.state.manager_id,

      //twoLevelArr: this.state.twoLevelArr
    };
    console.log(body);

    // this.setState({
    //     brand_name: null,
    //     brand_id: null,
    //     contact_person: "",
    //     contact_phone: "",
    //     contact_position: "",
    //     contact_email: "",
    //     brand_status_code: null,
    //     brand_region: null,
    //     manager_name: null,
    //     manager_id: null,
    // });

    this.requestDICT_NET_BRAND(this.props.store.userState.token, body);

    //this.requestDICT_NET_ENTITY(this.props.store.userState.token, this.state.twoLevelArr[0]);
    console.log(this.state.twoLevelArr != null);
    console.log(this.state.twoLevelArr.length);
    console.log(this.state.twoLevelArr.length != 0);
    console.log(this.state.twoLevelArr);

    // this.state.twoLevelArr.forEach(function(item, i, arr) {
    //     // console.log( i + ": " + item + " (массив:" + arr + ")" );
    //     console.log(item);
    //     this.requestDICT_NET_ENTITY(this.props.store.userState.token, item);
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

  changeSelect = (e) => {
    let name_input = e.currentTarget.getAttribute("name");
    let inputValue = e.target.value;
    console.log(name_input);
    console.log(inputValue);
    if (name_input == "physical_acquiring_type_id")
      this.setState({ physical_acquiring_type_id: Number(inputValue) });
    if (name_input == "physical_channel_type_id")
      this.setState({ physical_channel_type_id: Number(inputValue) });
    if (name_input == "physical_report_format_id")
      this.setState({ physical_report_format_id: Number(inputValue) });
    if (name_input == "physical_report_period_type_id")
      this.setState({ physical_report_period_type_id: Number(inputValue) });

    if (name_input == "internet_acquiring_type_id")
      this.setState({ internet_acquiring_type_id: Number(inputValue) });
    if (name_input == "internet_channel_type_id")
      this.setState({ internet_channel_type_id: Number(inputValue) });
    if (name_input == "internet_report_format_id")
      this.setState({ internet_report_format_id: Number(inputValue) });
    if (name_input == "internet_report_period_type_id")
      this.setState({ internet_report_period_type_id: Number(inputValue) });
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
    let dody = {
      tsp_list: [
        {
          tsp_id: this.state.currentTsp, //tsp_id
        },
      ],
      main_settings: [
        {
          acquiring_type_id: 1, //type_acquiring
          // "standard_report": true,
          // "extended_report": true,
          // "installment_report": true,
          report_format_id: this.state.physical_report_format_id, //report_format_id
          // "report_format_name": "string",
          report_period_type_id: this.state.physical_report_period_type_id, //report_period_type_id
          // "report_period_type_name": "string",
          channel_type_id: this.state.physical_channel_type_id, //channel_type_id
          // "channel_type_name": "string",
          file_name_mask: this.state.physical_file_name_mask, //file_name_mask
          // "file_path": "string"
          channel_address: this.state.physical_channel_address, //file_name_mask
        },
        {
          acquiring_type_id: 1, //type_acquiring
          // "standard_report": true,
          // "extended_report": true,
          // "installment_report": true,
          report_format_id: this.state.internet_report_format_id, //report_format_id
          // "report_format_name": "string",
          report_period_type_id: this.state.internet_report_period_type_id, //report_period_type_id
          // "report_period_type_name": "string",
          channel_type_id: this.state.internet_channel_type_id, //channel_type_id
          // "channel_type_name": "string",
          file_name_mask: this.state.internet_file_name_mask, //file_name_mask
          // "file_path": "string"
          channel_address: this.state.internet_channel_address, //file_name_mask
        },
      ],
    };
    if (this.state.TSPReportSettingsSTD != null) {
      dody.std_settings = this.state.TSPReportSettingsSTD;
    }
    console.log(dody);
    //this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token, dody);
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

  nameNetWork = (e) => {
    let val = e.target.value;
    console.log(val);
    console.log(val != "");
    if (val != "") {
      this.requestGetNewBrandId(this.props.store.userState.token, val);
      this.setState({ brand_name: val });
    } else {
      this.setState({ isDisableInput: true });
    }
  };
  hendleNnameNetWork = (e) => {
    if (e.keyCode === 13) {
      //console.log('enter');
      this.nameNetWork(e);
    }
  };
  changeInput = (e) => {
    let apiName = e.currentTarget.getAttribute("api_name");
    console.log(apiName);
    let inputValue = e.target.value;
    console.log(inputValue);

    if (apiName == "contact_person") {
      this.setState({
        contact_person: inputValue,
      });
    } else if (apiName == "contact_phone") {
      console.log("contact_phone");
      this.setState({
        contact_phone: inputValue,
      });
      // console.log(e.target.validity);
      // console.log(e.target.validity.valid);
      // const valid_contact_phone = !Number(inputValue) ? inputValue : this.state.contact_phone;
      // console.log(valid_contact_phone);
      // console.log(typeof valid_contact_phone);
      // this.setState({
      //     contact_phone: valid_contact_phone
      // });
      // console.log(Number(inputValue));
      // console.log(!Number(inputValue));
      // console.log(typeof Number(inputValue));
      // console.log(typeof inputValue);
      // console.log(typeof Number(inputValue) === 'number');
      // console.log(typeof inputValue === 'number');
      // console.log(typeof inputValue === 'string');
      // if(!Number(inputValue)){
      //     console.log('зайшло !Number(inputValue)');
      //     console.log(this.state.contact_phone);
      //     this.setState({
      //         contact_phone: this.state.contact_phone
      //     });
      //     return
      // }
      // console.log('недійшло');
      // this.setState({
      //     contact_phone: inputValue
      // });
    } else if (apiName == "contact_position") {
      this.setState({
        contact_position: inputValue,
      });
    } else if (apiName == "contact_email") {
      console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValue));

      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValue)) {
        console.log("email валідний все ок");
        this.setState({
          isContact_emailError: false,
          isDisabledSaveBtn: false,
          contact_email: inputValue,
        });
      } else if (inputValue == "") {
        this.setState({
          isContact_emailError: false,
          isDisabledSaveBtn: false,
          contact_email: inputValue,
        });
      } else {
        console.log("email НЕ валідний !!!");
        this.setState({
          isContact_emailError: true,
          isDisabledSaveBtn: true,
          contact_email: inputValue,
        });
      }
    } else if (apiName == "brand_status_code") {
      this.setState({
        brand_status_code: inputValue,
      });
    } else if (apiName == "brand_region") {
      this.setState({
        brand_region: inputValue,
      });
    } else if (apiName == "manager_name") {
      let rr, manager_name;
      rr = (arr, number) => {
        //console.log(arr);
        console.log(number);
        arr.filter(function (currentElement, index, array) {
          // console.log(currentElement.name);
          // console.log(index);
          // console.log(array);
          if (currentElement.manager_id == number) {
            console.log(currentElement.manager_name);
            manager_name = currentElement.manager_name;
          }
        });
      };
      console.log(rr(this.state.DICT_NETWORK_MANAGERS, inputValue));
      console.log(manager_name);
      this.setState({
        manager_name: manager_name,
        manager_id: Number(inputValue),
      });
    }
  };
  more = () => {
    this.requestGetNewEntityId(this.props.store.userState.token);

    // this.setState({
    //     //moreTwoLevel: true
    //     twoLevelArr: true
    // });

    // let newObj = {
    //     entity_id: 578210,
    //     ident_code: 1,
    //     manager_name: null
    //
    // }
    //
    //
    // let stateArr = this.state.twoLevelArr;
    // console.log(stateArr);
    // stateArr.push(newObj);
    //
    // console.log(stateArr);
    // this.setState({
    //     twoLevelArr: stateArr
    // });
  };

  showTwoLevelYes = () => {
    this.setState({
      showTwoLevel: true,
      moreTwoLevel: true,
    });
    this.more();
  };
  showTwoLevelNo = () => {
    this.setState({
      showTwoLevel: false,
      moreTwoLevel: false,

      twoLevelArr: [],
    });
  };

  changeInputSC = (e) => {
    let param = e.target.value;
    console.log(param);
    let api_name = e.currentTarget.getAttribute("api_name");
    console.log(api_name);
    let get_entity_id = e.currentTarget.getAttribute("entity_id");
    console.log(get_entity_id);

    if (api_name === "manager_name") {
      this.setState({
        brand_region: this.state.DICT_NETWORK_MANAGERS.filter(
            (item) => +item.manager_id === +e.target.value
          )[0].institution_name,
      });
    }

    // let newObj = {
    //     GetNewEntityId: 578210,
    //     edrpou: "1",
    //
    // }

    let stateArr = this.state.twoLevelArr;
    let cloneArr = stateArr.map((a) => Object.assign({}, a));
    console.log(cloneArr);

    let indexItem = cloneArr.findIndex((el) => el.entity_id == get_entity_id);
    console.log(indexItem);
    cloneArr[indexItem][api_name] = param;
    // stateArr.push(newObj);
    console.log(cloneArr);

    this.setState({
      twoLevelArr: cloneArr,
    });
  };

  render() {
    console.log(this.state);
    console.log("test2");

    return (
      <div className="coverTable DICT_NET_BRAND">
        <div className="headerTable">
          <div className="titleTable">
            {this.activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="addbBlock">
          <div className="coverInputs justify-content-end">
            <label htmlFor="name_netWork">Найменування мережі</label>
            <input
              //onChange={this.nameNetWork}
              onBlur={this.nameNetWork}
              onKeyDown={this.hendleNnameNetWork}
              //value={this.state.brand_name}
              api_name="brand_name"
              id="name_netWork"
              type="text"
              className="form-control"
            />
            <label htmlFor="status">Статус</label>
            <select
              disabled={this.state.isDisableInput ? "disabled" : ""}
              id="dropdown-basic-button"
              onChange={this.changeInput}
              api_name="brand_status_code"
              className="form-select"
              title="ТВБВ"
            >
              <option>-</option>
              {this.state.isShowDICT_NET_CLIENT_STATUS ? (
                this.state.DICT_NET_CLIENT_STATUS.map((item, index) => {
                  return (
                    <OptionItemDICT_NET_CLIENT_STATUS
                      key={index}
                      optionItem={item}
                      status_code={this.state.brand_status_code}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select>
            <label htmlFor="DICT_NETWORK_MANAGERS">Менеджер мережі</label>
            <select
              disabled={this.state.isDisableInput ? "disabled" : ""}
              id="dropdown-basic-button"
              onChange={this.changeInput}
              api_name="manager_name"
              className="form-select"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_NETWORK_MANAGERS ? (
                this.state.DICT_NETWORK_MANAGERS.map((item, index) => {
                  return (
                    <OptionItemDICT_NETWORK_MANAGERS
                      key={index}
                      optionItem={item}
                      manager_id={this.state.manager_id}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="coverInputs justify-content-end">
            <label htmlFor="brand_id">ID мережі</label>
            <input
              disabled={this.state.isDisableTVBV ? "disabled" : ""}
              value={this.state.brand_id}
              api_name="brand_id"
              id="brand_id"
              type="text"
              className="form-control"
            />
            <label htmlFor="brand_region">РУ менеджера</label>
            <select
              disabled={this.state.isDisableInput ? "disabled" : ""}
              onChange={this.changeInput}
              api_name="brand_region"
              id="brand_region"
              className="form-select"
              title="Регіональні управління"
            >
              <option>-</option>
              {this.state.isShowSelectDICT_INSTITUTION ? (
                this.state.DICT_INSTITUTION.map((item, index) => {
                  return (
                    <OptionItemDICT_INSTITUTION
                      key={index}
                      optionItem={item}
                      institution_id={this.state.brand_region}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </div>
          <div className="coverInputs contactPerson">
            <span>Контактна особа</span>
            <div className="innerBlock">
              <div className="coverInput">
                <label htmlFor="date_from">ПІБ</label>
                <input
                  disabled={this.state.isDisableInput ? "disabled" : ""}
                  onChange={this.changeInput}
                  api_name="contact_person"
                  className="customInput form-control"
                  id="date_from"
                  type="text"
                  value={this.state.contact_person}
                />
              </div>
              <div className="coverInput">
                <label htmlFor="date_to">Посада</label>
                <input
                  disabled={this.state.isDisableInput ? "disabled" : ""}
                  onChange={this.changeInput}
                  api_name="contact_position"
                  className="customInput form-control"
                  id="date_to"
                  type="text"
                  value={this.state.contact_position}
                />
              </div>
              <div className="coverInput">
                <label htmlFor="date_to">Телефон</label>
                {/*<input*/}
                {/*    disabled={this.state.isDisableInput ? 'disabled' : ''}*/}
                {/*    onChange={this.changeInput}*/}
                {/*    api_name="contact_phone"*/}
                {/*    className="customInput form-control"*/}
                {/*    id="date_to"*/}
                {/*    type="text"*/}
                {/*/>*/}
                <InputMask
                  mask="999999999999"
                  type="phone"
                  maskChar=""
                  alwaysShowMask="false"
                  pattern="[0-9]"
                  name="phone"
                  id="phoneInput"
                  api_name="contact_phone"
                  disabled={this.state.isDisableInput ? "disabled" : ""}
                  onChange={this.changeInput}
                  className="customInput form-control"
                  value={this.state.contact_phone}
                />
              </div>
              <div className="coverInput">
                <label htmlFor="email">Email</label>
                {/*<InputMask*/}
                {/*    mask="999999999999"*/}
                {/*    type="email"*/}
                {/*    maskChar=""*/}
                {/*    alwaysShowMask="false"*/}
                {/*    name="email"*/}
                {/*    id="date_to"*/}
                {/*    api_name="contact_email"*/}
                {/*    disabled={this.state.isDisableInput ? 'disabled' : ''}*/}
                {/*    onChange={this.changeInput}*/}
                {/*    className="customInput form-control"*/}
                {/*/>*/}
                <input
                  disabled={this.state.isDisableInput ? "disabled" : ""}
                  onChange={this.changeInput}
                  api_name="contact_email"
                  className={`${
                    this.state.isContact_emailError ? "errorEmail" : ""
                  } customInput form-control`}
                  id="email"
                  type="text"
                  value={this.state.contact_email}
                />
                {/*{*/}
                {/*    this.state.isContact_emailError*/}
                {/*        ? <p>Невалідний ftp</p>*/}
                {/*        : <></>*/}
                {/*}*/}
              </div>
            </div>
          </div>
        </div>
        <div className="addBlockRadio">
          <div className="title">Додати 2-й рівень мережі</div>
          <div className="coverRadioBtn">
            <label htmlFor="yes">Так</label>
            <input
              name="is_two_level"
              onClick={this.showTwoLevelYes}
              disabled={this.state.isDisableInput ? "disabled" : ""}
              type="radio"
              id="yes"
            />

            <label htmlFor="no">Ні</label>
            <input
              name="is_two_level"
              onClick={this.showTwoLevelNo}
              disabled={this.state.isDisableInput ? "disabled" : ""}
              type="radio"
              id="no"
            />
          </div>
        </div>
        <div className="coverTwoLevel">
          {/*<MyClickableComponent  />*/}

          {this.state.showTwoLevel ? (
            <>
              {/*<div className="twoLevel">*/}
              {/*    <div className="innerBlock">*/}
              {/*        <label htmlFor="edrpou">ЄДРПОУ</label>*/}
              {/*        <input  api_name="brand_id" id="edrpou" type="text" className="form-control"/>*/}
              {/*        <label htmlFor="brand_id">Назва 2-го рівня</label>*/}
              {/*        <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>*/}
              {/*        <label htmlFor="brand_id">Менеджер</label>*/}
              {/*        <select disabled={this.state.isDisableInput ? 'disabled' : ''}  id="dropdown-basic-button" onChange={this.changeInput} api_name="manager_name" className="form-select" title="ТВБВ">*/}
              {/*            <option>-</option>*/}
              {/*            {*/}
              {/*                this.state.isShowSelectDICT_NETWORK_MANAGERS*/}
              {/*                    ? this.state.DICT_NETWORK_MANAGERS.map((item, index) => {*/}
              {/*                        return < OptionItemDICT_NETWORK_MANAGERS key={index} optionItem={item}/>*/}
              {/*                    })*/}
              {/*                    : <></>*/}
              {/*            }*/}
              {/*        </select>*/}
              {/*    </div>*/}
              {/*    <div className="innerBlock">*/}
              {/*        <label htmlFor="brand_id">ID 2-го рівня</label>*/}
              {/*        <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>*/}
              {/*        <label htmlFor="brand_id">ID РУ</label>*/}
              {/*        <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*{*/}
              {/*    this.state.moreTwoLevel*/}
              {/*        ? this.retMoreHtml(this.state.levelBlockNumber)*/}
              {/*        : <></>*/}
              {/*}*/}
              {
                // здесь будет отрисовано необходимое кол-во компонентов
                this.state.twoLevelArr.map((item, index) => (
                  <SampleComponent
                    key={index}
                    data={item}
                    brand_region={this.state.brand_region}
                    DICT_NETWORK_MANAGERS={this.state.DICT_NETWORK_MANAGERS}
                    changeInputSC={this.changeInputSC}
                  />
                ))
              }
              <button className="btn btn-secondary" onClick={this.more}>
                Додати ще
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="coverBtn">
          <button
            className="btn btn-success"
            disabled={this.state.isDisabledSaveBtn ? "disabled" : ""}
            onClick={this.save}
          >
            Зберегти мережу
          </button>
        </div>
        {/*<div className="coverResult">*/}
        {/*    <div className="resultSearch border">*/}
        {/*        {*/}
        {/*            this.state.isShowTsp*/}
        {/*                ? <>*/}
        {/*                    <div className="title">Результат пошуку</div>*/}
        {/*                    <ul className="blockTsp_list">*/}
        {/*                        {*/}
        {/*                            this.Tsp_list(this.state.tsp_list)*/}
        {/*                        }*/}
        {/*                    </ul>*/}
        {/*                </>*/}
        {/*                :<>Не вибрано даних пошуку</>*/}
        {/*        }*/}
        {/*    </div>*/}
        {/*    <div className="typeAcquiring">*/}
        {/*        {*/}
        {/*            this.state.isShowTypeAcquiring*/}
        {/*                ? <>*/}

        {/*                    /!*<div className="coverBtn border">*!/*/}
        {/*                    /!*    <div className="title">Вид екварингу</div>*!/*/}
        {/*                    /!*    <button*!/*/}
        {/*                    /!*        className="btn btn-secondary"*!/*/}
        {/*                    /!*        disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}*!/*/}
        {/*                    /!*        onClick={this.changeTypeAcquiringPhysical}*!/*/}
        {/*                    /!*        type_acquiring={1}>Фізичний</button>*!/*/}
        {/*                    /!*    <button*!/*/}
        {/*                    /!*        className="btn btn-secondary"*!/*/}
        {/*                    /!*        disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}*!/*/}
        {/*                    /!*        onClick={this.changeTypeAcquiringInternet}*!/*/}
        {/*                    /!*        type_acquiring={2}>Інтернет</button>*!/*/}
        {/*                    /!*</div>*!/*/}

        {/*                    /!*{this.showReport(this.state.currentTsp)}*!/*/}
        {/*                    {this.showHtmlReport()}*/}
        {/*                </>*/}

        {/*                : <></>*/}
        {/*        }*/}
        {/*    </div>*/}
        {/*</div>*/}

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
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default NETWORK_CREATE;
