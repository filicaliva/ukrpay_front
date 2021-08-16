import React from 'react';
import { NavLink } from 'react-router-dom';

import * as axios from "axios";
import {Accordion} from "react-bootstrap";




class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }

        console.log(this.props);
    }
    componentDidMount() {
        //this.requestADMIN(this.props.store.userState.token, 'ADMIN_USERS');
       // this.listoperation(this.props);
       //console.log(this.props.store.userState.OPERATIONS);
        //console.log(this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS));
        //console.log(typeof this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS));
        //this.menu(this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS));
        //this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS);

        if ( this.props.store.location.pathname.substr(11) == null || this.props.store.location.pathname.substr(11) == "" ){

        }else{
            console.log(this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11)));
            this.props.store.operationName(this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11)), this.props.store.location.pathname.substr(11));

        }
    }
    generateUserRoutingMenu = (menuItems) => {
        //console.log(menuItems);
        let parentIndexData = {}, parentIndex = 0;
        let routesConfigByPage = {};
        let actions = {};

        let mappedUserConfig = menuItems.reduce((res, item) => {
            const isMenu = item && item.menu && item.operation;
            // console.log(res);
            // console.log(item);
            // console.log(item.menu);
            // console.log(item.operation);
            // console.log(isMenu);
            //console.log('---');
            try {
                if (isMenu) {
                    if (!item['parent_operation']) {
                        if(!parentIndexData[item.operation]){
                            parentIndexData[item.operation] = parentIndex;
                            parentIndex++;
                            res.push({...item, children: []});
                        }
                        //console.log(res);
                        return res;
                    }


                    const updatedItem = {
                        ...item,
                        operation: item.operation
                    };

                    res[parentIndexData[item['parent_operation']]].children.push(updatedItem);
                    //console.log(res);
                }
                //console.log(res);
                return res;
            } catch (e) {
                //console.log(e);
            }

        }, []);
        //console.log(mappedUserConfig);
        return [mappedUserConfig]
    }
    activeOperation = (operationArr, operation) => {
        //console.log(operationArr === operation ? 'itemAct' : '');
        //console.log(operationArr);
        //console.log(operation);
        let res;
        operationArr.map(( item , index) => {
            //console.log(item);
            //console.log(item.name);
            //console.log(item.operation == operation);
            if(item.operation == operation){
                res = item.name;
            }
        })
        return res;

        //return operationArr === operation ? 'itemAct' : '';
        //${ activeOperation(this.props.store.userState.OPERATIONS, item.operation) }
    }
    // menu = (obj) => {
    //     //console.log(obj);
    //     //console.log(typeof obj);
    //
    //     for (let key in obj) {
    //         let li = (objItem) => {
    //             console.log(objItem);
    //             console.log(typeof objItem);
    //             return objItem.map(( item , index) => {
    //                 //console.log(item);
    //                 //console.log(item.name);
    //                 //console.log( item.parent_operation == null );
    //                 if (item.parent_operation == null){
    //
    //                     let btnSvg = (arr) => {
    //                         if(arr != 0){
    //                             return(
    //                                 <span className="icon"><svg width="100%" height="100%" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L5 5L10 0H0Z" fill="#000000"></path></svg></span>
    //                             )
    //                         }
    //                     }
    //                     let subMenu = (objItem) => {
    //                         console.log(objItem);
    //                         if(objItem != 0){
    //                             return(
    //                                 <ul className="dropdownMenu">
    //                                     { objItem.map(( item , index) => {
    //                                         //console.log(item.parent_operation);
    //                                         return(
    //                                             <li className="dropdownMenuItem">
    //                                                 <a href="" className="dropdownMenuItemLink" operation={item.operation} onClick={this.itemLink}>
    //                                                     <span>{item.name}</span>
    //                                                 </a>
    //                                             </li>
    //                                         )
    //
    //                                     })}
    //                                 </ul>
    //                             )
    //                         }
    //                     }
    //
    //                     return(
    //                         <li className={`listMenuItem ${ this.state.toggle ? 'openItem' : ''}`} onClick={() => {this.toggleDropdown()}}>
    //                             <div className="dropdownBtn">
    //                                 <div className="dropdownName">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    //                                     <span>{item.name}</span>
    //                                 </div>
    //                                 {btnSvg(item.children.length)}
    //                             </div>
    //                             {subMenu(item.children)}
    //                         </li>
    //                     )
    //                 }
    //             })
    //         }
    //         return(
    //             <ul className="listMenu">
    //                 { li(obj[key]) }
    //             </ul>
    //         )
    //     }
    // }
    menuBoo = (obj) => {
        console.log(obj);
        //console.log(typeof obj);

        for (let key in obj) {
            let li = (objItem) => {
                console.log(objItem);
                //console.log(typeof objItem);
                return objItem.map(( item , index) => {
                    //console.log(index);
                    //console.log(item.name);
                    //console.log( item.parent_operation == null );
                    if (item.parent_operation == null){

                        let btnSvg = (arr) => {
                            if(arr != 0){
                                return(
                                    <span className="icon"><svg width="100%" height="100%" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L5 5L10 0H0Z" fill="#000000"></path></svg></span>
                                )
                            }
                        }

                        let subMenu = (objItem) => {
                            //console.log(objItem);
                            if(objItem != 0){
                                return(
                                    <Accordion.Body>
                                        { objItem.map(( item , index) => {
                                            //console.log(this.props.store.menuState.operation );
                                            //console.log(item.operation );
                                            //console.log(this.props.store.menuState.operation === item.operation ? 'itemAct' : '' );

                                            return(
                                                    <div className={`dropdownMenuItemLink ${ this.props.store.menuState.operation === item.operation ? 'itemAct' : '' }`}  name={item.name}  operation={item.operation} onClick={this.itemLink}>
                                                        <span>{item.name}</span>
                                                    </div>
                                            )

                                        })}
                                    </Accordion.Body>
                                )
                            }
                        }
                        if(item.children != 0){
                            return(
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>{item.name}</Accordion.Header>
                                    {subMenu(item.children)}
                                </Accordion.Item>
                            )
                        }else{
                            return(
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button type="button" aria-expanded="false"className="accordionWithOutChildren collapsed">{item.name}</button>
                                    </h2>
                                </div>
                            )
                        }

                    }
                })
            }
            return(
                <Accordion defaultActiveKey="0">
                    { li(obj[key]) }
                </Accordion>
            )
        }
    }


    itemLink = (e) => {
        e.preventDefault();
        this.props.store.addTableData(true, null);
        let operationName = e.currentTarget.getAttribute("name");



        let operation = e.currentTarget.getAttribute("operation");
        this.props.store.history.push(`/dashboard/${operation}`);
        console.log(operationName);
        console.log(operation);

        this.props.store.operationName(operationName, operation);



        this.typeRequest(operation);
    }
    typeRequest = (operation) => {
        let operationType = operation.split('_')[0];
        console.log( operation );
       // console.log( operation.startsWith('DICT') );
        switch (operation) {
            case 'ADMIN_USERS':
                console.log( "--------ADMIN_USERS------------" );
                 this.funActionADMIN_USERS();
                return
            case 'ADMIN_ROLES':
                return this.requestADMIN_ROLES(this.props.store.userState.token);
            case 'ADMIN_OPERATIONS':
                return this.requestADMIN_OPERATIONS(this.props.store.userState.token);
            case 'ADMIN_ROLE_OPERATIONS':
                return this.requestADMIN_ROLE_OPERATIONS(this.props.store.userState.token);

            //REPORT

            case 'REPORT_SETTINGS_TSP':
                console.log( "--------REPORT_SETTINGS_TSP------------" );
                this.actionREPORT_SETTINGS_TSP();
                return

            case "DICT_PAYMENT_SYSTEM":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_REPORT_FORMAT":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_CURRENCY":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_DATE_TYPE":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_REPORT_ACTION":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_OPERATION_TYPE":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_ACQUIRING_TYPE":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_ACQUIRING_SERVICE":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_INSTITUTION":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_BRANCH":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_REPORT_PERIOD_TYPE":
                return this.requestDICT(this.props.store.userState.token, operation);
            case "DICT_REPORT_CHANNEL_TYPE":
                return this.requestDICT(this.props.store.userState.token, operation);

            default:
                return '';
        }
    }
    async requestDICT  (token, operation) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( operation );
        const baseUrl = `/api/Dictionary/${operation}`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);
                console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.Table);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }

    //ADMIN
    funActionADMIN_USERS = () => {
        console.log('=========================funActionADMIN_USERS==================');
        this.props.store.addTableData(true, "empty")
    }
    async requestADMIN_ROLES  (token) {
        console.log('=========================requestADMIN_ROLES==================');
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Role`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.roles);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
               // console.log(error.response);
                //console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_OPERATIONS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Operations`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.operations);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLE_OPERATIONS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Role`;
        await axios.get(
            baseUrl,
            {
                headers: {
                    "Token" : `${ token }`
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addRoleData(response.data.roles);
                this.props.store.addTableData(true, response.data.roles);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }

    //REPORT
    actionREPORT_SETTINGS_TSP = () => {
        console.log('=========================actionREPORT_SETTINGS_TSP==================');
        this.props.store.addTableData(true, 'empty');
    }
    listOperation = ( obj ) => {
        //console.log(obj);
        for (var key in obj){
            //console.log(key, ':', obj[key]);

            let subMenu = (itemObj, operation) => {
                //console.log(itemObj);
                //console.log(operation);
                return(
                    <ul className="dropdownMenu">
                        { itemObj.map(( item , index) => {
                            // console.log(item.parent_operation);
                            // console.log(operation);
                            // console.log(item.parent_operation == operation);
                            if (item.parent_operation == operation){
                                //console.log(item.parent_operation);
                                return(
                                    <li className="dropdownMenuItem">
                                        <a href="" className="dropdownMenuItemLink" operation={item.operation} onClick={this.itemLink}>
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                )
                // return itemObj.map(( item , index) => {
                //     console.log(item.parent_operation == operation);
                //     if (item.parent_operation == operation){
                //         console.log(item.parent_operation);
                //         return(
                //             <ul className="dropdownMenu">
                //                 <li className="dropdownMenuItem">
                //                     <a href=""><span className="icon"></span><span>{item.name}</span></a>
                //                 </li>
                //             </ul>
                //         )
                //     }
                // });


                // let funUl = () => {
                //     return(
                //         <ul className="dropdownMenu">
                //
                //         </ul>
                //     )
                // }
                // let funLi = () => {
                //     return itemObj.map(( item , index) => {
                //         console.log(item.parent_operation == operation);
                //         if (item.parent_operation == operation){
                //             console.log(item.parent_operation);
                //             return(
                //                 <li className="dropdownMenuItem">
                //                     <a href=""><span className="icon"></span><span>{item.name}</span></a>
                //                 </li>
                //             )
                //         }
                //     });
                // }
            }

            let liItem = (arrItem) => {
                console.log(arrItem);
                return arrItem.map(( item , index) => {
                    //console.log(item);
                    //console.log(item.name);
                    //console.log( item.parent_operation == null );
                    if (item.parent_operation == null){
                        return(
                            <li className="listMenuItem">
                                <div className="dropdownBtn">
                                    <div className="dropdownName">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="icon">
                                        <svg width="100%" height="100%" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L5 5L10 0H0Z" fill="#000000"></path></svg>
                                    </span>
                                </div>
                                { subMenu(arrItem, item.operation) }
                            </li>
                        )
                    }
                })
            }
            return(
                <ul className="listMenu">
                    { liItem(obj[key]) }
                </ul>
            )
        }
    }

    render() {
        console.log(this.props.store.userState.OPERATIONS);
        console.log(this.props.params);
        // console.log(this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS));
        return (
            <div className="menu">
                <p>{this.props.params == '' ? 'Не вибрано жодного звіту' : this.props.params}</p>
                <div className="coverList">
                    {this.menuBoo(this.generateUserRoutingMenu(this.props.store.userState.OPERATIONS))}
                </div>
                {
                    this.props.store.menuState.isLoading
                        ? <div className="loading">
                            <div className="rotating">
                                <svg viewBox="0 0 512 512">
                                    <path
                                        d="m244.36 372.36c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#2D50A7"/>
                                    <path
                                        d="m244.36 0c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#73A1FB"/>
                                    <path
                                        d="m359.56 338.28c-9.087-9.089-23.824-9.089-32.912 0-9.089 9.087-9.089 23.824 0 32.912l65.826 65.826c4.544 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.816c9.089-9.089 9.089-23.824 0-32.912l-65.826-65.826z"
                                        fill="#355EC9"/>
                                    <g fill="#C4D9FD">
                                        <path
                                            d="m81.455 232.73h-46.546c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h46.545c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.272-23.273z"/>
                                        <path
                                            d="m96.256 74.982c-9.087-9.089-23.824-9.089-32.912 0s-9.089 23.825 0 32.912l65.826 65.825c4.544 4.544 10.501 6.817 16.455 6.817 5.956 0 11.913-2.273 16.455-6.817 9.089-9.089 9.089-23.824 0-32.912l-65.824-65.825z"/>
                                    </g>
                                    <path
                                        d="m477.09 232.73h-93.091c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h93.091c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.273-23.273z"
                                        fill="#3D6DEB"/>
                                    <path
                                        d="m392.47 74.982-65.826 65.825c-9.089 9.087-9.089 23.824 0 32.912 4.544 4.544 10.501 6.817 16.455 6.817 5.955 0 11.913-2.273 16.457-6.817l65.826-65.825c9.089-9.087 9.089-23.824 0-32.912-9.087-9.089-23.823-9.089-32.912 0z"
                                        fill="#5286FA"/>
                                </svg>
                            </div>
                        </div>
                        : <>

                        </>
                }
            </div>
        )
    }
}

export default Menu;