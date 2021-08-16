import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";

const cellEditProp = {
    mode: 'click'
};
const OptionItemDICT_INSTITUTION = (props) => {
    //console.log( props )
    return(
        <option   value={props.optionItem.institution_id} >{props.optionItem.institution_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_BRANCH = (props) => {
    //console.log( props )
    return(
        <option   value={props.optionItem.branch_id} >{props.optionItem.branch_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}

class REPORT_SETTINGS_TSP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DICT_INSTITUTION: null,
            isShowSelectDICT_INSTITUTION: false,


            DICT_BRANCH: null,
            isDisableTVBV: true,
            isShowSelectTVBV: false,

            TSPReportSettings:{

            },

            settings: null,
            tsp_list: null,

            isShowTsp: false,

            currentTsp: null,

            user_code: "",
            user_name: "",
            only_active: false,
            isShowTable: false,
            isShowDeleteBlock: false,
            dateBlock: null

        }
        //console.log(this.data.sort());
    }
    componentDidMount() {
        this.requestDICT_INSTITUTION( this.props.store.userState.token );
    }
    selectDICT_INSTITUTION = (e) => {
        console.log(e.target.value);
        let param = e.target.value;
        console.log(param);
        let apiName = e.currentTarget.getAttribute("apiName");
        console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.TSPReportSettings;
        inputDataObj.[apiName] = inputValue;

        console.log(inputDataObj);
        this.setState({
            isShowSelectTVBV: false,
            TSPReportSettings: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.TSPReportSettings);


        this.requestDICT_BRANCH(this.props.store.userState.token, param)
    }
    async requestDICT_INSTITUTION  ( token ) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_INSTITUTION`;
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

                // this.props.store.addTableData(true, response.data.Table);
                this.setState({
                    DICT_INSTITUTION: response.data.Table.TableRows,
                    isShowSelectDICT_INSTITUTION: true
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
    async requestDICT_BRANCH  ( token, param ) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_BRANCH/?param1=${param}`;
        let paramBody = {
            "param1": param
        }
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

                // this.props.store.addTableData(true, response.data.Table);
                this.setState({
                    DICT_BRANCH: response.data.Table.TableRows,
                    isShowSelectTVBV: true,
                    isDisableTVBV: false
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

    async requestTSPReportSettings  (token, userBody) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings`;

        await axios.post(
            baseUrl,
            userBody,
            {
                headers: {
                    "Token" : `${ token }`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                // this.props.store.addTableData(true, response.data.users);
                this.setState({
                    settings: response.data.settings,
                    tsp_list: response.data.tsp_list,
                    isShowTsp: true
                });

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    changeInput = (e) => {
        let apiName = e.currentTarget.getAttribute("apiName");
        console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.TSPReportSettings;

        if(apiName == 'date_from' || apiName == 'date_to'){
            inputDataObj.[apiName] = this.formatDate(new Date(inputValue));
        }else{
            inputDataObj.[apiName] = inputValue;
        }
        console.log(inputDataObj);
        this.setState({
            TSPReportSettings: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.TSPReportSettings);
    }
    formatDate = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        return year + month + day;
    }
    search = () => {
        this.requestTSPReportSettings(this.props.store.userState.token, this.state.TSPReportSettings);
    }
    Tsp_list = (tsp_list) => {

        return tsp_list.map(( item , index) => {
            console.log(item);
            return(
                <li className="dropdownMenuItem">
                    <span>{item.tsp_name}</span>
                    <input name={item.tsp_name} type="radio" onClick={this.itemTsp} value={item.id}/>
                </li>
            )
        });
    }
    itemTsp = (currentTsp) => {

        this.setState({
            currentTsp: currentTsp
        });

    }
    render() {
        console.log(this.props.store.menuState.tableData);
        console.log(this.state.DICT_INSTITUTION);
        console.log(this.state.DICT_BRANCH);
        console.log(this.state.TSPReportSettings);
        console.log(this.state);

        return (
            <div className="coverTable REPORT_SETTINGS_TSP">
                <div className="headerTable">
                    <div className="titleTable">{this.props.store.menuState.nameOperation}</div>
                    <div className="optionBlock">

                    </div>
                </div>
                <div className="filter">
                    <div className="coverInputSelect">
                        <label htmlFor="DICT_INSTITUTION">Регіональні управління</label>
                        <select onChange={this.selectDICT_INSTITUTION} apiName="institution_id" id="dropdown-basic-button" className="form-select"
                                title="Регіональні управління">
                            <option selected>-</option>
                            {
                                this.state.isShowSelectDICT_INSTITUTION
                                    ?
                                        this.state.DICT_INSTITUTION.map((item, index) => {
                                            return < OptionItemDICT_INSTITUTION key={index} optionItem={item}/>
                                        })
                                    : <>
                                    </>
                            }
                        </select>
                        <label htmlFor="TVBV">ТВБВ</label>
                        <select  id="dropdown-basic-button" onChange={this.changeInput} apiName="bank_branch_id" className="form-select"
                                disabled={this.state.isDisableTVBV ? 'disabled' : ''}
                                title="ТВБВ">
                            <option selected>-</option>
                                {

                                    this.state.isShowSelectTVBV
                                        ? this.state.DICT_BRANCH.map((item, index) => {
                                            return < OptionItemDICT_BRANCH key={index} optionItem={item}/>
                                        })
                                        : <></>

                                }
                        </select>
                     </div>
                    <div className="coverInputText">
                        <label htmlFor="INN">ІНН/ЄДРПОУ</label>
                        <input onChange={this.changeInput} apiName="ident_code" id="INN" type="text"/>
                        <label htmlFor="TPS">Назва ТСП</label>
                        <input onChange={this.changeInput} apiName="tsp_name" id="TPS" type="text"/>
                        <label htmlFor="merchant">merchant ID</label>
                        <input onChange={this.changeInput} apiName="merchant_id" id="merchant" type="text"/>
                    </div>
                    <div className="coverInputDate">
                        <span>Період відкриття ТСП</span>
                        <div className="coverInputs">
                            <div className="coverDate">
                                <label htmlFor="date_from">З</label>
                                <input onChange={this.changeInput} apiName="date_from" className="customInput" id="date_from" type="date"/>
                            </div>
                            <div className="coverDate">
                                <label htmlFor="date_to">По</label>
                                <input onChange={this.changeInput} apiName="date_to" className="customInput" id="date_to" type="date"/>
                            </div>
                        </div>
                        <button className="search" onClick={this.search}>Пошук</button>
                    </div>
                </div>
                <div className="coverResult">
                    <div className="resultSearch">
                        {
                            this.state.isShowTsp
                                ? <>
                                    <div className="title">Результат пошуку</div>
                                    <ul className="blockTsp_list">
                                        {
                                            this.Tsp_list(this.state.tsp_list)
                                        }
                                    </ul>
                                </>
                                :<>Не вибрано даних пошуку</>
                        }
                    </div>
                    <div className="typeAcquiring">
                        <div className="title">Вид екварингу</div>
                        <div className="coverBtn">
                            <button>фзичний</button>
                            <button>Інтернет</button>
                        </div>
                    </div>
                </div>


                {/*{*/}
                {/*    this.state.isShowDeleteBlock*/}
                {/*        ? <div className="coverDeleteBlock">*/}
                {/*            <div className="deleteBlock">*/}
                {/*                <div className="coverInput">*/}
                {/*                    <label htmlFor="user_code">Код користувача</label>*/}
                {/*                    <input  defaultValue={this.state.user_code} className="customInput" id="user_code" type="text" disabled/>*/}
                {/*                </div>*/}
                {/*                <div className="coverInput">*/}
                {/*                    <label htmlFor="user_date">Дата до якої призупинити користувача</label>*/}
                {/*                    <input onChange={this.changeDate} className="customInput" id="user_date" type="date"/>*/}
                {/*                </div>*/}
                {/*                <button className="search" onClick={this.requestDeleteUser}>Видалити користувача</button>*/}
                {/*                <button className="search" onClick={this.closePopup}>Скасувати</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        : <></>*/}
                {/*}*/}

                {/*<div className="innerTable">*/}
                {/*    <div className="Table">*/}
                {/*        {*/}
                {/*            this.state.isShowTable*/}
                {/*                ? <BootstrapTable data={this.addId(this.props.store.menuState.tableData)}*/}
                {/*                                  insertRow={true}*/}
                {/*                                  deleteRow={true}*/}
                {/*                                  selectRow={selectRowProp}*/}
                {/*                                  options={options}*/}
                {/*                                  cellEdit={cellEditFactory}*/}
                {/*                >*/}

                {/*                    /!*{this.testRendColums}*!/*/}


                {/*                    <TableHeaderColumn isKey dataField='id' width="40" tdStyle={{ "text-align": 'center' }} autoValue >*/}
                {/*                        №*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn  dataField='user_code'  filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Код користувача*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='status_code'  filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Статус користувача*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='user_name' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Ім'я користувача*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='user_position' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Посада користувача*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='mobile' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Телефон*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='user_email' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Email*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='division' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Відділ*/}
                {/*                    </TableHeaderColumn>*/}
                {/*                    <TableHeaderColumn dataField='user_role' filter={ { type: 'TextFilter', delay: 1000 } }>*/}
                {/*                        Роль*/}
                {/*                    </TableHeaderColumn>*/}

                {/*                </BootstrapTable>*/}
                {/*                : <>*/}
                {/*                    <span>Скористайтеся пошуком</span>*/}
                {/*                </>*/}
                {/*        }*/}

                {/*        /!*{*!/*/}
                {/*        /!*    this.props.store.menuState.isLoading*!/*/}
                {/*        /!*        ? <div className="coverloader">*!/*/}
                {/*        /!*            <div className="loader"></div>*!/*/}
                {/*        /!*        </div>*!/*/}
                {/*        /!*        : <></>*!/*/}
                {/*        /!*}*!/*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default REPORT_SETTINGS_TSP