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
const OptionItem = (props) => {
    console.log( props )
    return(
        <option
            selected={props.optionItem.report_format_id == props.report_format_id ? 'selected' : ''}
            value={props.optionItem.report_format_id}
        >{props.optionItem.report_format_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_REPORT_PERIOD_TYPE = (props) => {
   // console.log( props );
   // console.log( props.optionItem.report_period_type_id );
   // console.log( props.report_period_type_id );
    //console.log( props.optionItem.report_period_type_id == props.report_period_type_id  );

    return(
        <option
            selected={props.optionItem.report_period_type_id == props.report_period_type_id ? 'selected' : ''}
            value={props.optionItem.report_period_type_id}
        >{props.optionItem.report_period_type_name}</option>
    )
}
const OptionItemDICT_REPORT_CHANNEL_TYPE = (props) => {
    //console.log( props )
    return(
        <option
            selected={props.optionItem.report_channel_type_id == props.channel_type_id ? 'selected' : ''}
            value={props.optionItem.report_channel_type_id}
        >{props.optionItem.report_channel_type_name}</option>
    )
}

class REPORT_SETTINGS_TSP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DICT_INSTITUTION: null,
            isShowSelectDICT_INSTITUTION: false,

            isDisableButton: false,
            selectRow: null,



            DICT_BRANCH: null,
            isDisableTVBV: true,
            isShowSelectTVBV: false,

            TSPReportSettings:{

            },

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


            // TSPReportSettings: {
            //     tsp_list: [
            //         {
            //             tsp_id: 595999,
            //             tsp_name: "ТзОВ АПТЕКА-ЖОВТНЕВЕ ЛТД",
            //             bank_branch_name: "Волинське ОУ /303398/",
            //             ident_code: "30297548",
            //             merchant_id: 0,
            //             creation_date: "2012-05-24T18:55:58"
            //         }
            //     ],
            //     settings: [
            //         {
            //             tsp_id: 595999,
            //             main_settings: [
            //                 {
            //                     acquiring_type_id: 1,
            //                     standard_report: true,
            //                     extended_report: false,
            //                     installment_report: false,
            //                     report_format_id: 2,
            //                     report_format_name: "csv",
            //                     report_period_type_id: 2,
            //                     report_period_type_name: "Щотижня",
            //                     channel_type_id: 2,
            //                     channel_type_name: "email",
            //                     file_name_mask: "TEST_MASK",
            //                     file_path: "TEST"
            //                 },
            //                 {
            //                     acquiring_type_id: 2,
            //                     standard_report: true,
            //                     extended_report: false,
            //                     installment_report: false,
            //                     report_format_id: 1,
            //                     report_format_name: "Xls",
            //                     report_period_type_id: 1,
            //                     report_period_type_name: "Щоденно",
            //                     channel_type_id: 22,
            //                     channel_type_name: null,
            //                     file_name_mask: "API_TEST_MASK",
            //                     file_path: "TEST"
            //                 }
            //             ]
            //         }
            //     ]
            // },

            type_acquiring: 1,
            tsp_id: null,
            report_format_id: null,
            report_period_type_id: null,
            channel_type_id: null,
            file_name_mask: null,


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
                //console.log(response.data.Table);


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
    async requestDICT_REPORT_FORMAT  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_REPORT_FORMAT`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);

                this.setState({
                    DICT_REPORT_FORMAT: response.data.Table.TableRows,
                    isShowREPORT_FORMAT: true
                });

                this.props.store.changeLoading(false);


            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestDICT_REPORT_PERIOD_TYPE  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_REPORT_PERIOD_TYPE`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);

                this.setState({
                    DICT_REPORT_PERIOD_TYPE: response.data.Table.TableRows,
                    isShowDICT_REPORT_PERIOD_TYPE: true
                });

                this.props.store.changeLoading(false);


            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestDICT_REPORT_CHANNEL_TYPE  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_REPORT_CHANNEL_TYPE`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ token }`}
            }
        )
            .then((response) => {
                console.log(response.data);

                this.setState({
                    DICT_REPORT_CHANNEL_TYPE: response.data.Table.TableRows,
                    isShowDICT_REPORT_CHANNEL_TYPE: true
                });

                this.props.store.changeLoading(false);


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
                    tsp_id: response.data.tsp_list[0].tsp_id,
                    isShowTsp: true
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
    async requestTSPReportSettingsSTD  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings/STD`;
        let userBody = {
            tsp_id: this.state.settings[0].tsp_id,
            type_acquiring: this.state.type_acquiring
        };
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
                    TSPReportSettingsSTD: response.data.standard_settings,
                    //isShowTableTSPReportSettingsSTD: true
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
    async requestTSPReportSettingsSTD_SAVE  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings`;
        let dody = {
            acquiring_type_id: this.state.type_acquiring, //type_acquiring
            tsp_list: [
                {
                    tsp_id: this.state.tsp_id     //tsp_id
                }
            ],
            main_settings: {
                acquiring_type_id: this.state.type_acquiring,//type_acquiring
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
            std_settings: this.state.TSPReportSettingsSTD
        };
        console.log( dody );
        await axios.put(
            baseUrl,
            dody,
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
                // this.setState({
                //     TSPReportSettingsSTD: response.data.standard_settings,
                //     isShowTableTSPReportSettingsSTD: true
                // });

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
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

        // this.setState({
        //     settings: this.state.TSPReportSettings.settings,
        //     tsp_list: this.state.TSPReportSettings.tsp_list,
        //     isShowTsp: true
        // });
    }
    Tsp_list = (tsp_list) => {
        console.log(tsp_list);
        return tsp_list.map(( item , index) => {
            console.log(item);
            return(
                <li className="dropdownMenuItem">
                    <label htmlFor={item.tsp_name} >{item.tsp_name}</label>
                    <input name={item.tsp_name} id={item.tsp_name} type="radio" onClick={this.itemTsp} value={item.tsp_id}/>
                </li>
            )
        });
    }
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
        this.setState({
            currentTsp: Number(currentTsp),
            isShowTypeAcquiring: true
        });
        this.setState({
            report_period_type_id: this.state.settings[0].main_settings[0].report_period_type_id,
            report_format_id: this.state.settings[0].main_settings[0].report_format_id,
            channel_type_id: this.state.settings[0].main_settings[0].channel_type_id,
            file_name_mask: this.state.settings[0].main_settings[0].file_name_mask
        });
        this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
        this.requestDICT_REPORT_PERIOD_TYPE(this.props.store.userState.token);
        this.requestDICT_REPORT_CHANNEL_TYPE(this.props.store.userState.token);
        this.requestTSPReportSettingsSTD(this.props.store.userState.token);


    }

    changeTypeAcquiringPhysical = (e) => {
        let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
        console.log(typeAcquiring);
        // this.setState({
        //     type_acquiring: Number(typeAcquiring),
        //     isShowReport: true
        // });
        this.setState({
            report_period_type_id: this.state.settings[0].main_settings[0].report_period_type_id,
            report_format_id: this.state.settings[0].main_settings[0].report_format_id,
            channel_type_id: this.state.settings[0].main_settings[0].channel_type_id,
            file_name_mask: this.state.settings[0].main_settings[0].file_name_mask,

            type_acquiring: Number(typeAcquiring),
            isShowReport: true
        });

    }
    changeTypeAcquiringInternet = (e) => {
        let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
        console.log(typeAcquiring);
        // this.setState({
        //     type_acquiring: Number(typeAcquiring),
        //     isShowReport: true
        // });
        this.setState({
            report_period_type_id: this.state.settings[0].main_settings[1].report_period_type_id,
            report_format_id: this.state.settings[0].main_settings[1].report_format_id,
            channel_type_id: this.state.settings[0].main_settings[1].channel_type_id,
            file_name_mask: this.state.settings[0].main_settings[1].file_name_mask,

            type_acquiring: Number(typeAcquiring),
            isShowReport: true
        });

    }
    // listREPORT_FORMAT = (obj) => {
    //     console.log( obj )
    //     return(
    //         <option
    //             //selected={this.state.isSelected == props.optionItem.role_id ? 'selected' : ''}
    //             value={props.optionItem.role_id}
    //         >{props.optionItem.role_name}</option>
    //     )
    //
    // }
    openStandardReport = () => {
        this.setState({
            isShowTableTSPReportSettingsSTD: true
        });
        // this.requestTSPReportSettingsSTD(this.props.store.userState.token);
    }
    closePopupTable = () => {
        this.setState({
            isShowTableTSPReportSettingsSTD: false
        });
    }
    changeReport_format_id = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            report_format_id: Number(inputValue)
        });
    }
    changeReport_period_type_id = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            report_period_type_id: Number(inputValue)
        });
    }
    changeChannel_type_id = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            channel_type_id: Number(inputValue)
        });
    }
    changeFile_name_mask = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            file_name_mask: inputValue
        });
    }
    saveReport = () => {
        let dody = {
            acquiring_type_id: this.state.type_acquiring, //type_acquiring
            tsp_list: [
                {
                    tsp_id: this.state.tsp_id     //tsp_id
                }
            ],
            main_settings: {
                acquiring_type_id: this.state.type_acquiring,//type_acquiring
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
            std_settings: this.state.TSPReportSettingsSTD
        };
        console.log(dody);
        this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token);
    }

    showReport = (currentTsp) => {
        console.log(currentTsp);
        return this.state.settings.map( ( item , index) => {
            console.log(item);
            console.log(item.tsp_id);
            console.log(item.tsp_id == currentTsp);
            if(item.tsp_id == currentTsp){
                console.log(item.main_settings);
                return item.main_settings.map( ( item , index) => {
                    console.log(item);
                    console.log(item.acquiring_type_id == this.state.type_acquiring);

                    if(item.acquiring_type_id == this.state.type_acquiring){
                        let report_period_type_id = item.report_period_type_id;
                        let report_format_id = item.report_format_id;
                        let channel_type_id = item.channel_type_id;
                        let file_name_mask = item.file_name_mask;
                        // this.setState({
                        //     report_period_type_id: report_period_type_id,
                        //     report_format_id: report_format_id,
                        //     channel_type_id: channel_type_id,
                        //     file_name_mask: file_name_mask
                        // });

                        return(
                            <div className="report">
                                <div className="title">{this.state.type_acquiring == 1 ? "Фізичний" :"Інтернет"}</div>
                                <div className="title">Перелік полів звіту ТСП</div>
                                <button onClick={this.openStandardReport} >Стандартний звіт</button>
                                <button disabled>Розширений звіт</button>
                                <button disabled>Звіт по операціям Installment</button>
                                <br/>
                                <div className="coverInput">
                                    <label htmlFor="file_format">Формат файлу</label>
                                    {
                                        this.state.isShowREPORT_FORMAT
                                            ? <select onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">

                                                { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
                                                    return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
                                                }) }
                                            </select>
                                            : <span>Завантаження...</span>
                                    }



                                </div>
                                <div className="coverInput">
                                    <label htmlFor="report_period">Період звіту</label>
                                    {
                                        this.state.isShowDICT_REPORT_PERIOD_TYPE
                                            ? <select onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">

                                                { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
                                                    return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
                                                }) }
                                            </select>
                                            : <span>Завантаження...</span>
                                    }
                                </div>
                                <div className="coverInput">
                                    <label htmlFor="file_name_mask">Маска назви файлу</label>
                                    <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput" id="file_name_mask" type="text"/>
                                </div>
                                <div className="coverInput">
                                    <label htmlFor="сatalog">Каталог</label>
                                    <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput" id="сatalog" type="text"/>
                                </div>
                                <div className="coverInput">
                                    <label htmlFor="сhannel">Канал</label>
                                    {
                                        this.state.isShowDICT_REPORT_CHANNEL_TYPE
                                            ? <select onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">

                                                { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
                                                    return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
                                                }) }
                                            </select>
                                            : <span>Завантаження...</span>
                                    }

                                </div>
                                <div className="reportCoverBtn">
                                    <button onClick={this.saveReport}>Зберегти</button>
                                </div>
                            </div>
                        )
                    }
                });

            }
        })
    }

    render() {
        // console.log(this.props.store.menuState.tableData);
        // console.log(this.state.DICT_INSTITUTION);
        // console.log(this.state.DICT_BRANCH);
        console.log(this.state.TSPReportSettingsSTD);
        console.log(this.state);
        //console.log(this.showReport(595999));
        const selectRowProp = {
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex) => {
                this.setState({
                    selectRow: row,
                    isDisableButton: false
                });
            }
        }
        const editInclude_flagColumn = (cell,row, newValue) => {

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
                row.[nameRole] = inputValue;
                //console.log(row);
                let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
                TSPReportSettingsSTD[newValue] = row;
                console.log(TSPReportSettingsSTD);
                this.setState({
                    TSPReportSettingsSTD: TSPReportSettingsSTD
                });

                //this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            return (
                <>
                    <input onChange={ test5 } checked={cell} name="include_flag" type="checkbox" />
                </>
            )
        }
        const editOrder_numberColumn = (cell,row, newValue) => {

            const test5 = (e) => {
                let nameRole = e.currentTarget.getAttribute("name");
                //console.log(nameRole);
                let inputValue = e.target.value;
                //console.log(inputValue);
                //console.log(this.state.TSPReportSettingsSTD);
                //console.log(row);
                row.[nameRole] = Number(inputValue);
                //console.log(row);
                let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
                TSPReportSettingsSTD[newValue] = row;
                console.log(TSPReportSettingsSTD);
                this.setState({
                    TSPReportSettingsSTD: TSPReportSettingsSTD
                });

                //this.requestADMIN_ROLE_OPERATIONS_edit(this.props.store.userState.token, obj);

            }
            const rr = (e) => {
                if (e.keyCode === 13) {
                    console.log(e.keyCode === 13);
                    let nameRole = e.currentTarget.getAttribute("name");
                    //console.log(nameRole);
                    let inputValue = e.target.value;
                    //console.log(inputValue);
                    //console.log(this.state.TSPReportSettingsSTD);
                    //console.log(row);
                    row.[nameRole] = Number(inputValue);
                    //console.log(row);
                    let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
                    TSPReportSettingsSTD[newValue] = row;
                    console.log(TSPReportSettingsSTD);
                    this.setState({
                        TSPReportSettingsSTD: TSPReportSettingsSTD
                    });
                }
            }
            return (
                <>
                    <input onBlur={ test5 } defaultValue={cell} name="order_number" type="text" />

                </>
            )
        }

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
                        {
                            this.state.isShowTypeAcquiring
                                ? <>
                                    <div className="title">Вид екварингу</div>
                                    <div className="coverBtn">
                                        <button
                                            disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}
                                            onClick={this.changeTypeAcquiringPhysical}
                                            type_acquiring={1}>Фізичний</button>
                                        <button
                                            disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}
                                            onClick={this.changeTypeAcquiringInternet}
                                            type_acquiring={2}>Інтернет</button>
                                    </div>
                                    {this.showReport(this.state.currentTsp)}
                                </>

                                : <></>
                        }
                    </div>
                </div>

                {
                    this.state.isShowTableTSPReportSettingsSTD
                        ? <>
                        <div className="coverPopupTable">
                            <div className="innerBlock">
                                <button onClick={this.closePopupTable} type="button" className="btn-close" aria-label="Close"></button>
                                <BootstrapTable data={this.state.TSPReportSettingsSTD}
                                                // selectRow={selectRowProp}
                                >

                                    {/*{this.testRendColums}*/}

                                    <TableHeaderColumn isKey dataField='field_desc' filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Ідентифікатор поля
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='include_flag' dataFormat={editInclude_flagColumn} filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Включити поле
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField='order_number' dataFormat={editOrder_numberColumn} filter={ { type: 'TextFilter', delay: 1000 } }>
                                        Порядковий номер поля
                                    </TableHeaderColumn>

                                </BootstrapTable>
                            </div>
                        </div>
                        </>
                        : <>
                        </>
                }
            </div>

        );
    }
}

export default REPORT_SETTINGS_TSP