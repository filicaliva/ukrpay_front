import React, { Component } from "react";
import { activeOperation } from "./helpers";

class TableBootstrapADMIN extends Component {
  constructor(props) {
    super(props);
  }
  columnsData = (data) => {
    let res = [];
    Object.keys(data).map((a) => res.push({ dataField: a, text: data[a] }));
    return res;
  };
  render() {
    return (
      <div className="coverTable">
        <div className="headerTable">
          <div className="titleTable">
            {activeOperation(
              this.props.store.userState.OPERATIONS,
              this.props.store.location.pathname.substr(11)
            )}
          </div>
          <div className="optionBlock"></div>
        </div>
        <div className="innerTable">
          <div className="Table"></div>
        </div>
      </div>
    );
  }
}
export default TableBootstrapADMIN;
