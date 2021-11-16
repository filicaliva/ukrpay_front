import { Component } from "react";
import { Accordion } from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.activeOperation(
      this.props.store.userState.OPERATIONS,
      this.props.params
    );
  }
  generateUserRoutingMenu = (menuItems) => {
    let parentIndexData = {},
      parentIndex = 0;
    let mappedUserConfig = menuItems.reduce((res, item) => {
      const isMenu = item && item.menu && item.operation;
      try {
        if (isMenu) {
          if (!item["parent_operation"]) {
            if (!parentIndexData[item.operation]) {
              parentIndexData[item.operation] = parentIndex;
              parentIndex++;
              res.push({ ...item, children: [] });
            }
            return res;
          }
          const updatedItem = {
            ...item,
            operation: item.operation,
          };

          res[parentIndexData[item["parent_operation"]]].children.push(
            updatedItem
          );
        }
        return res;
      } catch (e) {
        throw new Error(e);
      }
    }, []);
    return [mappedUserConfig];
  };

  activeOperation = (operationArr, operation) => {
    let res;
    for (let i = 0; i < operationArr.length; i++) {
      const item = operationArr[i];
      if (item.operation === operation) {
        res = item.name;
      }
    }
    return res;
  };

  menuRender = (obj) => {
    for (let key in obj) {
      let li = (objItem) => {
        return objItem.map((item, index) => {
          if (!item.parent_operation) {
            let subMenu = (objItem) => {
              if (objItem != 0) {
                return (
                  <Accordion.Body>
                    {objItem.map((item) => {
                      return (
                        <div
                          className={`dropdownMenuItemLink ${
                            this.props.store.location.pathname.substr(11) ===
                            item.operation
                              ? "itemAct"
                              : ""
                          }`}
                          name={item.name}
                          operation={item.operation}
                          onClick={this.itemLink}
                        >
                          <span>{item.name}</span>
                        </div>
                      );
                    })}
                  </Accordion.Body>
                );
              }
            };
            if (item.children != 0) {
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{item.name}</Accordion.Header>
                  {subMenu(item.children)}
                </Accordion.Item>
              );
            } else {
              return (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      type="button"
                      aria-expanded="false"
                      className="accordionWithOutChildren collapsed"
                    >
                      {item.name}
                    </button>
                  </h2>
                </div>
              );
            }
          }
        });
      };
      return <Accordion defaultActiveKey="0">{li(obj[key])}</Accordion>;
    }
  };

  itemLink = (e) => {
    e.stopPropagation();
    let operation = e.currentTarget.getAttribute("operation");
    this.props.store.history.push(`/dashboard/${operation}`);
  };

  render() {
    return (
      <div className="menu">
        <div className="coverList">
          {this.menuRender(
            this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS)
          )}
        </div>
      </div>
    );
  }
}
export default Menu;