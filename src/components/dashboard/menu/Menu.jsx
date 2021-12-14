// TODO: refacoring render menu
import { useContext } from "react";
import { Component } from "react";
import { Accordion } from "react-bootstrap";


const AccordionContent = (content) => (
  <div className="indent">
    {content}
  </div>
)
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
    let mappedUserConfig = menuItems.reduce((res, item) => {
      const isMenu = item && item.menu && item.operation;
      try {
        if (isMenu) {
          let firstLevelMenu = menuItems.filter(
            (item) => item.parent_operation === null
          );
          let notFirstLevelMenu = menuItems.filter(
            (item) => item.parent_operation !== null
          );
          firstLevelMenu = firstLevelMenu.map((i) => {
            const secondLevel = notFirstLevelMenu.filter(
              (item) => i.operation === item.parent_operation
            );
            return { ...i, children: secondLevel };
          });

          for (let i = 0; i < firstLevelMenu.length; i++) {
            const el = firstLevelMenu[i];
            el.children = el.children.map((i) => {
              const thirdLevel = notFirstLevelMenu.filter(
                (item) => i.operation === item.parent_operation
              );
              return { ...i, children: thirdLevel };
            });
          }
          return firstLevelMenu;
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
                  <div>
                    {objItem.map((item, indexTwo) => {
                      if (item.children.length !== 0) {
                        return (
                          <Accordion.Item eventKey={indexTwo+10}>
                            <Accordion.Header >{item.name}</Accordion.Header>
                            <Accordion.Body>
                              {item.children.map((i) => {
                                return (
                                  <div
                                    className={`dropdownMenuItemLink ${
                                      this.props.store.location.pathname.substr(
                                        11
                                      ) === i.operation
                                        ? "itemAct"
                                        : ""
                                    }`}
                                    name={i.name}
                                    operation={i.operation}
                                    onClick={this.itemLink}
                                  >
                                    <span>{i.name}</span>
                                  </div>
                                );
                              })}
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      }
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
                  </div>
                );
              }
            };
            if (item.children != 0) {
              return (
                <div>
                  <h5 style={{fontWeight: "500"}}>{item.name}</h5>
                  {subMenu(item.children)}
                </div>
              );
            } else {
              return (
                <div className="accordion-item">
                  <h5 className="accordion-header">
                    <button
                      type="button"
                      aria-expanded="false"
                      className="accordionWithOutChildren collapsed"
                    >
                      {item.name}
                    </button>
                  </h5>
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
