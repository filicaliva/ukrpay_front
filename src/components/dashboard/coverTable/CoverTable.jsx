import React from "react";
import * as axios from "axios";
import TableBootstrapDICT from "./DICT/TableBootstrapDICT";
import NETWORK_REPORT from "./NETWORK/NETWORK_REPORT";
import DICT_BIN_TABLE from "./DICT/DICT_BIN_TABLE";
import DICT_BANK_RANGE from "./DICT/DICT_BANK_RANGE";
import NETWORK_ADD_CLIENT from "./NETWORK/NETWORK_ADD_CLIENT";
import NETWORK_CREATE from "./NETWORK/NETWORK_CREATE";
import NETWORK_EDIT from "./NETWORK/NETWORK_EDIT";
import NETWORK_AUDIT from "./NETWORK/NETWORK_AUDIT";
import TableADMIN_USERS from "./ADMIN/TableADMIN_USERS";
import TableADMIN_OPERATIONS from "./ADMIN/TableADMIN_OPERATIONS";
import TableADMIN_ROLE_OPERATIONS from "./ADMIN/TableADMIN_ROLE_OPERATIONS";
import TableADMIN_USER_OPERATIONS from "./ADMIN/TableADMIN_USER_OPERATIONS";
import TableADMIN_ROLES from "./ADMIN/TableADMIN_ROLES";
import REPORT_SETTINGS_TSP from "./REPORT/REPORT_SETTINGS_TSP";
import REPORT_SETTINGS_NET from "./REPORT/REPORT_SETTINGS_NET";
import REPORTS_acquiring from "./REPORT/REPORTS_acquiring";
import REPORTS_ACQUIRING_MONITOR from "./REPORT/REPORTS_ACQUIRING_MONITOR";
import REPORT_FIX_COMMISSION from "./REPORT/REPORT_FIX_COMMISSION";
import REPORT_ACQ_DETAILED_INT from "./REPORT/REPORT_ACQ_DETAILED_INT";
import REPORT_ACQ_DETAILED from "./REPORT/REPORT_ACQ_DETAILED";
import REPORT_GROSS_COMM from "./REPORT/REPORT_GROSS_COMM";
import REPORT_GROSS_COMM_INTERNET from "./REPORT/REPORT_GROSS_COMM_INTERNET";
import REPORT_OPERATIONS from "./REPORT/REPORT_OPERATIONS";
import REPORT_CASH_TIPS from "./REPORT/REPORT_CASH_TIPS";
import REPORT_CASH_OUT from "./REPORT/REPORT_CASH_OUT";
import REPORT_OPERATIONS_INTERNET from "./REPORT/REPORT_OPERATIONS_INTERNET";
import REPORT_OPERATIONS_NET from "./REPORT/REPORT_OPERATIONS_NET";
import REPORT_TERMINALS_INTERNET from "./REPORT/REPORT_TERMINALS_INTERNET";
import REPORT_TERMINALS from "./REPORT/REPORT_TERMINALS";

function Default() {
  return (
    <div className="coverTable">
      <div className="headerTable">
        <span>
          Вас вітає <b>Ощадбанк Звітність.</b> <br /> Перейдіть на одну зі
          сторінок в меню.
        </span>
        <div className="optionBlock"></div>
      </div>
      <div className="innerTable">
        <div className="Table"></div>
      </div>
    </div>
  );
}

class CoverTable extends React.Component {
  constructor(props) {
    super(props);
  }
  async requestOperation(token, operation) {
    this.props.store.changeLoading(true);
    const baseUrl = `/api/Dictionary/${operation}`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        this.props.store.addTableData(true, response.data.Table);
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error)
      });
  }

  tableType = (operation) => {
    switch (operation) {
      case "ADMIN_USERS":
        return <TableADMIN_USERS store={this.props.store} />;
      case "ADMIN_ROLES":
        return <TableADMIN_ROLES store={this.props.store} />;
      case "ADMIN_OPERATIONS":
        return <TableADMIN_OPERATIONS store={this.props.store} />;
      case "ADMIN_ROLE_OPERATIONS":
        return <TableADMIN_ROLE_OPERATIONS store={this.props.store} />;
      case "ADMIN_USER_OPERATIONS":
        return <TableADMIN_USER_OPERATIONS store={this.props.store} />;
      case "REPORT_SETTINGS_TSP":
        return <REPORT_SETTINGS_TSP store={this.props.store} />;
      case "REPORT_SETTINGS_NET":
        return <REPORT_SETTINGS_NET store={this.props.store} />;
      case "REPORTS_ACQUIRING":
        return <REPORTS_acquiring store={this.props.store} />;
      case "REPORTS_ACQUIRING_MONITOR":
        return <REPORTS_ACQUIRING_MONITOR store={this.props.store} />;
      case "REPORT_TERMINALS_INTERNET":
        return <REPORT_TERMINALS_INTERNET store={this.props.store} />;
      case "REPORT_TERMINALS":
        return <REPORT_TERMINALS store={this.props.store} />;
      case "REPORT_OPERATIONS":
        return <REPORT_OPERATIONS store={this.props.store} />;
      case "REPORT_CASH_TIPS":
        return <REPORT_CASH_TIPS store={this.props.store} />;
      case "REPORT_ACQ_DETAILED":
        return <REPORT_ACQ_DETAILED store={this.props.store} />;
      case "REPORT_ACQ_DETAILED_INT":
        return <REPORT_ACQ_DETAILED_INT store={this.props.store} />;
      case "REPORT_FIX_COMMISSION":
        return <REPORT_FIX_COMMISSION store={this.props.store} />;
      case "REPORT_GROSS_COMM":
        return <REPORT_GROSS_COMM store={this.props.store} />;
      case "REPORT_GROSS_COMM_INTERNET":
        return <REPORT_GROSS_COMM_INTERNET store={this.props.store} />;
      case "REPORT_OPERATIONS_INTERNET":
        return <REPORT_OPERATIONS_INTERNET store={this.props.store} />;
      case "REPORT_OPERATIONS_NET":
        return <REPORT_OPERATIONS_NET store={this.props.store} />;
      case "REPORT_CASH_OUT":
        return <REPORT_CASH_OUT store={this.props.store} />;
      case "DICT_PAYMENT_SYSTEM":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_REPORT_FORMAT":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_CURRENCY":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_DATE_TYPE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_REPORT_ACTION":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_OPERATION_TYPE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_ACQUIRING_TYPE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_ACQUIRING_SERVICE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_INSTITUTION":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_BRANCH":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_REPORT_PERIOD_TYPE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "DICT_REPORT_CHANNEL_TYPE":
        return <TableBootstrapDICT store={this.props.store} />;
      case "NETWORK_CREATE":
        return <NETWORK_CREATE store={this.props.store} />;
      case "NETWORK_EDIT":
        return <NETWORK_EDIT store={this.props.store} />;
      case "NETWORK_AUDIT":
        return <NETWORK_AUDIT store={this.props.store} />;
      case "NETWORK_ADD_CLIENT":
        return <NETWORK_ADD_CLIENT store={this.props.store} />;
      case "NETWORK_REPORT":
        return <NETWORK_REPORT store={this.props.store} />;
      case "DICT_BIN_TABLE":
        return <DICT_BIN_TABLE store={this.props.store} />;
      case "DICT_BANK_RANGE":
        return <DICT_BANK_RANGE store={this.props.store} />;
      default:
        return <Default />;
    }
  };
  render() {
    return this.tableType(this.props.params);
  }
}
export default CoverTable;