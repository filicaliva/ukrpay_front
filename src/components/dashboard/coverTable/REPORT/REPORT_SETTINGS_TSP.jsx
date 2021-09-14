import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React from "react";
import * as axios from "axios";
import InputMask from 'react-input-mask';
import {Field, reduxForm} from "redux-form";
import MaskedInput from "react-text-mask";


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

            TSPReportSettingsSearchObj:{

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


            responseTSPReportSettings: {
                tsp_list: [
                    {
                        tsp_id: 595999,
                        tsp_name: "ТзОВ АПТЕКА-ЖОВТНЕВЕ ЛТД",
                        bank_branch_name: "Волинське ОУ /303398/",
                        ident_code: "30297548",
                        merchant_id: 0,
                        creation_date: "2012-05-24T18:55:58"
                    },
                    {
                        tsp_id: 595998,
                        tsp_name: "ТзОВ Нововолинський м'ясокомбіна",
                        bank_branch_name: "Волинськеfrfr ОУ /303398/",
                        ident_code: "30297548",
                        merchant_id: 0,
                        creation_date: "2012-05-24T18:55:58"
                    },
                    {
                        tsp_id: 595997,
                        tsp_name: "Тов березка на",
                        bank_branch_name: "Волинськеfrfr ОУ /303398/",
                        ident_code: "30297548",
                        merchant_id: 0,
                        creation_date: "2012-05-24T18:55:58"
                    }
                ],
                settings: [
                    {
                        tsp_id: 595999,
                        main_settings: [
                            {
                                acquiring_type_id: 1,
                                standard_report: true,
                                extended_report: false,
                                installment_report: false,
                                report_format_id: 2,
                                report_format_name: "csv",
                                report_period_type_id: 2,
                                report_period_type_name: "Щотижня",
                                channel_type_id: 2,
                                channel_type_name: "email",
                                channel_address: "rere@gmail.com",
                                file_name_mask: "TEST_MASK",
                                file_path: "TEST"
                            },
                            {
                                acquiring_type_id: 2,
                                standard_report: true,
                                extended_report: false,
                                installment_report: true,
                                report_format_id: 1,
                                report_format_name: "Xls",
                                report_period_type_id: 1,
                                report_period_type_name: "Щоденно",
                                channel_type_id: 2,
                                channel_type_name: null,
                                channel_address: "re3re@gmail.com",
                                file_name_mask: "API_TEST_MASK",
                                file_path: "TEST"
                            }
                        ]
                    },
                    {
                        tsp_id: 595998,
                        main_settings: [
                            {
                                acquiring_type_id: 1,
                                standard_report: true,
                                extended_report: false,
                                installment_report: false,
                                report_format_id: 2,
                                report_format_name: "csv",
                                report_period_type_id: 3,
                                report_period_type_name: "Щомісяця",
                                channel_type_id: 1,
                                channel_type_name: "ftp",
                                channel_address: "ftp/fdfd324234",
                                file_name_mask: "Нововолинський",
                                file_path: "TEST"
                            }
                        ]
                    },
                    {
                        tsp_id: 595997,
                        main_settings: null
                    }
                ]
            },

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



            internetEmailMaskError: false,
            physicalEmailMaskError: false,
            isDisabledSaveBtn: true,

            isShowOrder_numberError: false,
            isShowBootstrapTable: true

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
        let inputDataObj = this.state.TSPReportSettingsSearchObj;
        inputDataObj.[apiName] = inputValue;

        console.log(inputDataObj);
        this.setState({
            isShowSelectTVBV: false,
            TSPReportSettingsSearchObj: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.TSPReportSettingsSearchObj);


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
                if(response.data.record_count >= 1){
                    this.setState({
                        settings: response.data.settings,
                        tsp_list: response.data.tsp_list,
                        //tsp_id: response.data.tsp_list[0].tsp_id,
                        isShowTsp: true
                    });
                }else if(response.data.record_count < 1){
                    this.setState({
                        isShowPopupError: true
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
    async requestTSPReportSettings_test  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings`;
        let userBody = {
            date_from: "2018081",
            date_to: "2021081",
            institution_id: "824",
            tsp_name: "Тзов"
        }
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
                if(response.data.record_count >= 1){
                    this.setState({
                        settings: response.data.settings,
                        tsp_list: response.data.tsp_list,
                        //tsp_id: response.data.tsp_list[0].tsp_id,
                        isShowTsp: true
                    });
                }else if(response.data.record_count < 1){
                    this.setState({
                        isShowPopupError: true
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
    async requestTSPReportSettingsSTD  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings/STD`;
        console.log( this.state.currentTsp );
        console.log( this.state.tsp_id );
        let userBody = {
            tsp_id: this.state.currentTsp,
            acquiring_type_id: this.state.type_acquiring
        };
        console.log( userBody );

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
                    isShowTableTSPReportSettingsSTD: true
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
    async requestTSPReportSettingsSTD_SAVE  (token, dody) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/TSPReportSettings`;


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
                this.setState({
                    isShowTsp: false,
                    isShowTypeAcquiring: false
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
                    isShowPopupErrorSave: true
                });
                this.props.store.changeLoading(false);
            });

    }
    changeInput = (e) => {
        let apiName = e.currentTarget.getAttribute("apiName");
        console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.TSPReportSettingsSearchObj;

        if(apiName == 'date_from' || apiName == 'date_to'){
            inputDataObj.[apiName] = this.formatDate(new Date(inputValue));
        }else{
            inputDataObj.[apiName] = inputValue;
        }
        console.log(inputDataObj);
        this.setState({
            TSPReportSettingsSearchObj: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.TSPReportSettingsSearchObj);
    }

    formatDate = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        return year + month + day;
    }
    search = () => {
        // main
        this.requestTSPReportSettings(this.props.store.userState.token, this.state.TSPReportSettingsSearchObj);


        // let obj = {
        //     date_from: "20210622",
        //     date_to: "20210630",
        //     institution_id: "824"
        // }
        // this.requestTSPReportSettings(this.props.store.userState.token, obj);
        
        
        
        //this.requestTSPReportSettings_test(this.props.store.userState.token, this.state.TSPReportSettingsSearchObj);

        // this.setState({
        //     settings: this.state.responseTSPReportSettings.settings,
        //     tsp_list: this.state.responseTSPReportSettings.tsp_list,
        //     isShowTsp: true
        // });
    }
    Tsp_list = (tsp_list) => {
        //console.log(tsp_list);
        return tsp_list.map(( item , index) => {
            //console.log(item);
            return(
                <li className="dropdownMenuItem">
                    <p><input name="tsp_list" id={item.tsp_name} type="radio" onClick={this.itemTsp} value={item.tsp_id}/> {item.tsp_name}</p>
                </li>
            )
        });
    }
    itemTsp = (e) => {
        let currentTsp = e.target.value;
        console.log(currentTsp);
        //console.log(this.state);
        this.state.settings.map( ( item , index) => {

            if(item.tsp_id == currentTsp){
                this.setState({
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


                    currentTsp: Number(currentTsp),
                    TSPReportSettingsSTD: null,
                    isShowTypeAcquiring: true,

                });
                console.log(this.state);
                if(item.main_settings == null){
                    this.setState({
                        isShowTypeAcquiring: true,
                    });

                }else if(item.main_settings.length){
                    item.main_settings.map( ( item , index) => {
                        //console.log('-----------start---------------');
                        //console.log(item);
                        //console.log(item.file_name_mask);
                        //console.log(item.acquiring_type_id);
                        if(item.acquiring_type_id == 1){
                            console.log('item.acquiring_type_id == 1');
                            //console.log(item.file_name_mask);
                            this.setState({
                                physical_acquiring_type_id: item.acquiring_type_id,
                                physical_channel_address: item.channel_address,
                                physical_channel_type_id: item.channel_type_id,
                                //physical_extended_report: item.extended_report,
                                physical_file_name_mask: item.file_name_mask,
                                //physical_installment_report: item.installment_report,
                                physical_report_format_id: item.report_format_id,
                                physical_report_period_type_id: item.report_period_type_id,
                                //physical_standard_report: item.standard_report,

                                currentTsp: Number(currentTsp),
                                TSPReportSettingsSTD: null,
                                isShowTypeAcquiring: true,
                            });
                        }else if(item.acquiring_type_id == 2){
                            console.log('item.acquiring_type_id == 2');
                            this.setState({
                                internet_acquiring_type_id: item.acquiring_type_id,
                                internet_channel_address: item.channel_address,
                                internet_channel_type_id: item.channel_type_id,
                                //internet_extended_report: item.extended_report,
                                internet_file_name_mask: item.file_name_mask,
                                //internet_installment_report: item.installment_report,
                                internet_report_format_id: item.report_format_id,
                                internet_report_period_type_id: item.report_period_type_id,
                                //internet_standard_report: item.standard_report,

                                currentTsp: Number(currentTsp),
                                TSPReportSettingsSTD: null,
                                isShowTypeAcquiring: true,
                            });
                        }

                        // if(item.acquiring_type_id != 1){
                        //     console.log('item.acquiring_type_id != 1');
                        //     this.setState({
                        //         physical_acquiring_type_id: 1,
                        //         physical_channel_address: "",
                        //         physical_channel_type_id: 1,
                        //         physical_extended_report: false,
                        //         physical_file_name_mask: "",
                        //         physical_installment_report: false,
                        //         physical_report_format_id: 1,
                        //         physical_report_period_type_id: 1,
                        //         physical_standard_report: true,
                        //
                        //         currentTsp: Number(currentTsp),
                        //         TSPReportSettingsSTD: null,
                        //         isShowTypeAcquiring: true,
                        //     });
                        // } else if(item.acquiring_type_id == 1){
                        //     console.log('item.acquiring_type_id == 1');
                        //     console.log(item.file_name_mask);
                        //     this.setState({
                        //         physical_acquiring_type_id: item.acquiring_type_id,
                        //         physical_channel_address: item.channel_address,
                        //         physical_channel_type_id: item.channel_type_id,
                        //         //physical_extended_report: item.extended_report,
                        //         physical_file_name_mask: item.file_name_mask,
                        //         //physical_installment_report: item.installment_report,
                        //         physical_report_format_id: item.report_format_id,
                        //         physical_report_period_type_id: item.report_period_type_id,
                        //         //physical_standard_report: item.standard_report,
                        //
                        //         currentTsp: Number(currentTsp),
                        //         TSPReportSettingsSTD: null,
                        //         isShowTypeAcquiring: true,
                        //     });
                        // }
                        // if(item.acquiring_type_id != 2){
                        //     console.log('item.acquiring_type_id != 2');
                        //     this.setState({
                        //         internet_acquiring_type_id: 2,
                        //         internet_channel_address: "",
                        //         internet_channel_type_id: 1,
                        //         internet_extended_report: false,
                        //         internet_file_name_mask: "",
                        //         internet_installment_report: false,
                        //         internet_report_format_id: 1,
                        //         internet_report_period_type_id: 1,
                        //         internet_standard_report: true,
                        //
                        //         currentTsp: Number(currentTsp),
                        //         TSPReportSettingsSTD: null,
                        //         isShowTypeAcquiring: true,
                        //     });
                        // } else if(item.acquiring_type_id == 2){
                        //     console.log('item.acquiring_type_id == 2');
                        //     this.setState({
                        //         internet_acquiring_type_id: item.acquiring_type_id,
                        //         internet_channel_address: item.channel_address,
                        //         internet_channel_type_id: item.channel_type_id,
                        //         //internet_extended_report: item.extended_report,
                        //         internet_file_name_mask: item.file_name_mask,
                        //         //internet_installment_report: item.installment_report,
                        //         internet_report_format_id: item.report_format_id,
                        //         internet_report_period_type_id: item.report_period_type_id,
                        //         //internet_standard_report: item.standard_report,
                        //
                        //         currentTsp: Number(currentTsp),
                        //         TSPReportSettingsSTD: null,
                        //         isShowTypeAcquiring: true,
                        //     });
                        // }


                    })

                }
            }
        });
        console.log('-----------state---------------');
        console.log(this.state);

        this.requestDICT_REPORT_FORMAT(this.props.store.userState.token);
        this.requestDICT_REPORT_PERIOD_TYPE(this.props.store.userState.token);
        this.requestDICT_REPORT_CHANNEL_TYPE(this.props.store.userState.token);
        //this.requestTSPReportSettingsSTD(this.props.store.userState.token);


    }

    changeTypeAcquiring = (e) => {
        let typeAcquiring = e.currentTarget.getAttribute("type_acquiring");
        console.log(typeAcquiring);
        // this.setState({
        //     type_acquiring: Number(typeAcquiring),
        //     isShowReport: true
        // });
        this.setState({
            type_acquiring: Number(typeAcquiring),
            isDisabledSaveBtn: true,
            physicalEmailMaskError: false,
            internetEmailMaskError: false,

            internet_channel_address: '' ,
            physical_channel_address: ''
        });
        // this.state.settings.map( ( item , index) => {
        //     console.log(this.state.currentTsp);
        //     console.log(item.tsp_id);
        //     if(item.tsp_id == this.state.currentTsp){
        //
        //         if(item.main_settings != null && item.main_settings.length > 1){
        //             console.log(item.main_settings.length > 1);
        //             item.main_settings.map( ( item , index) => {
        //                 if(item.acquiring_type_id == typeAcquiring){
        //                     console.log(item.acquiring_type_id == typeAcquiring);
        //                     this.setState({
        //                         type_acquiring: Number(typeAcquiring),
        //                         report_format_id: item.report_format_id,
        //                         report_period_type_id: item.report_period_type_id,
        //                         channel_type_id: item.channel_type_id,
        //                         file_name_mask: item.file_name_mask,
        //                     });
        //                 }
        //             });
        //
        //         }else{
        //             this.setState({
        //                 type_acquiring: Number(typeAcquiring)
        //             });
        //         }
        //     }
        // });

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
            isShowReport: true,
            isDisabledSaveBtn: true,
            physicalEmailMaskError: false,
            internetEmailMaskError: false
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
        // this.setState({
        //     isShowTableTSPReportSettingsSTD: true
        // });
        this.requestTSPReportSettingsSTD(this.props.store.userState.token);
    }
    closePopupTable = () => {
        this.setState({
            isShowTableTSPReportSettingsSTD: false,
            TSPReportSettingsSTD: null
        });
    }
    seveTSPReportSettingsSTD = () => {
        this.setState({
            isShowTableTSPReportSettingsSTD: false
        });
    }


    changeSelect = (e) => {
        let name_input = e.currentTarget.getAttribute("name");
        let inputValue = e.target.value;
        console.log(name_input);
        console.log(inputValue);
        if(name_input == 'physical_acquiring_type_id')this.setState({physical_acquiring_type_id: Number(inputValue)});
        if(name_input == 'physical_channel_type_id'){
            this.setState({
                physical_channel_type_id: Number(inputValue),
                physical_channel_address: '',
                isDisabledSaveBtn: true,
                physicalEmailMaskError: false,
                internetEmailMaskError: false,
            });
        }
        if(name_input == 'physical_report_format_id')this.setState({physical_report_format_id: Number(inputValue)});
        if(name_input == 'physical_report_period_type_id')this.setState({physical_report_period_type_id: Number(inputValue)});

        if(name_input == 'internet_acquiring_type_id')this.setState({internet_acquiring_type_id: Number(inputValue)});
        if(name_input == 'internet_channel_type_id'){
            this.setState({
                internet_channel_type_id: Number(inputValue),
                internet_channel_address: '' ,
                isDisabledSaveBtn: true,
                physicalEmailMaskError: false,
                internetEmailMaskError: false,
            });
        }
        if(name_input == 'internet_report_format_id')this.setState({internet_report_format_id: Number(inputValue)});
        if(name_input == 'internet_report_period_type_id')this.setState({internet_report_period_type_id: Number(inputValue)});
    }
    changeInputTsp = (e) => {
        let name_input = e.currentTarget.getAttribute("name");
        let inputValue = e.target.value;
        console.log(inputValue);
        if(name_input == 'physical_channel_address')this.setState({physical_channel_address: inputValue});
        if(name_input == 'physical_file_name_mask')this.setState({physical_file_name_mask: inputValue});

        if(name_input == 'internet_channel_address')this.setState({internet_channel_address: inputValue});
        if(name_input == 'internet_file_name_mask')this.setState({internet_file_name_mask: inputValue});
    }
    changeInputTspEmail = (e) => {
        let name_input = e.currentTarget.getAttribute("name");
        let inputValue = e.target.value;
        console.log(name_input);
        console.log(inputValue);
        if(name_input == 'physical_channel_address'){
            console.log(/.+@.+\.[A-Za-z]+$/.test(inputValue));
            if (/.+@.+\.[A-Za-z]+$/.test(inputValue)) {
                console.log('/.+@.+\.[A-Za-z]+$/.test(inputValue)');
                this.setState({
                    physicalEmailMaskError: false,
                    isDisabledSaveBtn: true
                });
            } else {
                console.log('pfqikj');
                this.setState({
                    physicalEmailMaskError: true,
                    isDisabledSaveBtn: false
                });
            }
            this.setState({physical_channel_address: inputValue});
        }else if(name_input == 'internet_channel_address'){
            console.log(/.+@.+\.[A-Za-z]+$/.test(inputValue));
            if (/.+@.+\.[A-Za-z]+$/.test(inputValue)) {
                console.log('/.+@.+\.[A-Za-z]+$/.test(inputValue)');
                this.setState({
                    internetEmailMaskError: false,
                    isDisabledSaveBtn: true
                });
            } else {
                console.log('pfqikj');
                this.setState({
                    internetEmailMaskError: true,
                    isDisabledSaveBtn: false
                });
            }
            this.setState({internet_channel_address: inputValue});
        }

        // if(name_input == 'internet_channel_address'){
        //     console.log(/.\.[A-Za-z]+$/.test(inputValue));
        //     if (/.\.[A-Za-z]+$/.test(inputValue)) {
        //         console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
        //         this.setState({
        //             physicalEmailMaskError: false,
        //             isDisabledSaveBtn: true
        //         });
        //     } else {
        //         console.log('pfqikj2');
        //         this.setState({
        //             physicalEmailMaskError: true,
        //             isDisabledSaveBtn: false
        //         });
        //     }
        //     this.setState({internet_channel_address: inputValue});
        // }

    }
    changeInputTspFtp = (e) => {
        let name_input = e.currentTarget.getAttribute("name");
        let inputValue = e.target.value;
        console.log(name_input);
        console.log(inputValue);

        if(name_input == 'physical_channel_address'){
            console.log(inputValue.indexOf("."));
            console.log(inputValue.indexOf(".") != -1);
            if(inputValue.indexOf(".") != -1) {
                //console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
                this.setState({
                    physicalEmailMaskError: false,
                    isDisabledSaveBtn: true
                });
            } else {
                console.log('pfqikj2');
                this.setState({
                    physicalEmailMaskError: true,
                    isDisabledSaveBtn: false
                });
            }
            this.setState({physical_channel_address: inputValue});
        }else if(name_input == 'internet_channel_address'){
            console.log(inputValue.indexOf("."));
            console.log(inputValue.indexOf(".") != -1);
            if(inputValue.indexOf(".") != -1) {
                //console.log('/.\\.[A-Za-z]+$/.test(inputValue)');
                this.setState({
                    internetEmailMaskError: false,
                    isDisabledSaveBtn: true
                });
            } else {
                console.log('pfqikj2');
                this.setState({
                    internetEmailMaskError: true,
                    isDisabledSaveBtn: false
                });
            }
            this.setState({internet_channel_address: inputValue});
        }

    }


    changeReport_format_id = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            report_format_id: Number(inputValue)
        });
    }
    changeReport_period_type_id = (e) => {
        let name_input = e.currentTarget.getAttribute("name");
        let inputValue = e.target.value;
        console.log(name_input);
        console.log(inputValue);
        this.setState({
            name_input: Number(inputValue)
        });
    }
    changeChannel_type_id = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            channel_type_id: Number(inputValue)
        });
    }

    saveReport = () => {
        let acquiring_type = (type_acquiring) => {
            if(type_acquiring == 1){
                return(
                    {
                        acquiring_type_id: 1,//type_acquiring
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

                    }
                )
            }else if(type_acquiring == 2){
                return(
                    {
                        acquiring_type_id: 2,//type_acquiring
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

                    }
                )
            }
        }
        let dody = {
            tsp_list: [
                {
                    tsp_id: this.state.currentTsp     //tsp_id
                }
            ],
            main_settings: acquiring_type(this.state.type_acquiring),
            //     [
            //     {
            //         acquiring_type_id: 1,//type_acquiring
            //         // "standard_report": true,
            //         // "extended_report": true,
            //         // "installment_report": true,
            //         report_format_id: this.state.physical_report_format_id, //report_format_id
            //         // "report_format_name": "string",
            //         report_period_type_id: this.state.physical_report_period_type_id, //report_period_type_id
            //         // "report_period_type_name": "string",
            //         channel_type_id: this.state.physical_channel_type_id, //channel_type_id
            //         // "channel_type_name": "string",
            //         file_name_mask: this.state.physical_file_name_mask, //file_name_mask
            //         // "file_path": "string"
            //         channel_address: this.state.physical_channel_address, //file_name_mask
            //
            //     },
            //     {
            //         acquiring_type_id: 2,//type_acquiring
            //         // "standard_report": true,
            //         // "extended_report": true,
            //         // "installment_report": true,
            //         report_format_id: this.state.internet_report_format_id, //report_format_id
            //         // "report_format_name": "string",
            //         report_period_type_id: this.state.internet_report_period_type_id, //report_period_type_id
            //         // "report_period_type_name": "string",
            //         channel_type_id: this.state.internet_channel_type_id, //channel_type_id
            //         // "channel_type_name": "string",
            //         file_name_mask: this.state.internet_file_name_mask, //file_name_mask
            //         // "file_path": "string"
            //         channel_address: this.state.internet_channel_address, //file_name_mask
            //
            //     }
            //
            // ],

        };
        if( this.state.TSPReportSettingsSTD != null){
            dody.std_settings = this.state.TSPReportSettingsSTD;
        }
        console.log( dody );
        this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token, dody);
    }
    showHtmlReport = () => {
        console.log('this.state.physical_file_name_mask');
        console.log(this.state.physical_channel_address);
        return(
            <div className="">

                <div className="coverBtn border">
                    <div className="title">Вид екварингу</div>
                    <button
                        className="btn btn-secondary customBtnAc"
                        disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}
                        onClick={  this.changeTypeAcquiring }
                        type_acquiring={1}>Фізичний</button>
                    <button
                        className="btn btn-secondary customBtnAc"
                        disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}
                        onClick={ this.changeTypeAcquiring }
                        type_acquiring={2}>Інтернет</button>
                </div>



                <div className={`${this.state.type_acquiring == 1 ? '' : 'd-none'} border report`}>
                    <div className="title">Перелік полів звіту ТСП по {this.state.type_acquiring == 1 ? "Фізичному" :"Інтернет"} екварингу</div>

                    <button className="btn btn-secondary" disabled={this.state.physical_standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
                    <button className="btn btn-secondary" disabled={this.state.physical_extended_report ? '' : 'disabled'} >Розширений звіт</button>
                    <button className="btn btn-secondary" disabled={this.state.physical_installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
                    <br/>
                    <div className="coverInput">
                        <label htmlFor="file_format">Формат файлу</label>
                        {
                            this.state.isShowREPORT_FORMAT
                                ? <select className="form-select" onChange={this.changeSelect} name="physical_report_format_id" id="DICT_REPORT_FORMAT">

                                    { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
                                        return < OptionItem key={index} optionItem={item} report_format_id={this.state.physical_report_format_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }



                    </div>
                    <div className="coverInput">
                        <label htmlFor="report_period">Період звіту</label>
                        {
                            this.state.isShowDICT_REPORT_PERIOD_TYPE
                                ? <select className="form-select" onChange={this.changeSelect} name="physical_report_period_type_id" id="DICT_REPORT_PERIOD_TYPE">

                                    { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
                                        return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={this.state.physical_report_period_type_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }
                    </div>
                    <div className="coverInput">
                        <label htmlFor="file_name_mask">Маска назви файлу</label>
                        <input
                            onChange={this.changeInputTsp}
                            name="physical_file_name_mask"
                            className="customInput form-control"
                            id="file_name_mask" type="text"
                            value={this.state.physical_file_name_mask}
                        />
                    </div>
                    <div className="coverInput">
                        <label htmlFor="сatalog">Каталог</label>
                        <input disabled onChange={this.changeInputTsp} name="сatalog" className="customInput form-control" id="сatalog" type="text"/>
                    </div>
                    <div className="coverInput">
                        <label htmlFor="сhannel">Канал</label>
                        {
                            this.state.isShowDICT_REPORT_CHANNEL_TYPE
                                ? <select className="form-select" onChange={this.changeSelect} name="physical_channel_type_id" id="DICT_REPORT_CHANNEL_TYPE">

                                    { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
                                        return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={this.state.physical_channel_type_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }

                    </div>
                    <div className="coverInput">
                        {
                            this.state.physical_channel_type_id == 1
                                ? <>
                                    <input placeholder="ftp" value={this.state.physical_channel_address} onChange={ this.changeInputTspFtp} name="physical_channel_address" className={`${this.state.physicalEmailMaskError ? 'errorEmail' : ''} customInput form-control`}  type="text"/>
                                    {
                                        this.state.physicalEmailMaskError
                                            ? <p>Невалідний ftp</p>
                                            : <></>
                                    }
                                    {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
                                </>

                                : <>
                                    <input name="physical_channel_address" label="Email"  placeholder="email@email.com" value={this.state.physical_channel_address} onChange={ this.changeInputTspEmail} className={`${this.state.physicalEmailMaskError ? 'errorEmail' : ''} customInput form-control`}  type="text"/>
                                    {
                                        this.state.physicalEmailMaskError
                                            ? <p>Невалідний email</p>
                                            : <></>
                                    }
                                    {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
                                </>

                        }
                        {/*<input placeholder="ftp" value={this.state.physical_channel_address} onChange={ this.changeInputTsp} name="physical_channel_address" className="customInput form-control"  type="text"/>*/}
                    </div>
                    <br/>
                    <div className="reportCoverBtn">
                        <button className="btn btn-secondary" disabled={this.state.isDisabledSaveBtn ? '' : 'disabled'} onClick={this.saveReport}>Зберегти</button>
                    </div>
                </div>

                <div className={`${this.state.type_acquiring == 1 ? 'd-none' : ''} border report`}>
                    <div className="title">Перелік полів звіту ТСП по {this.state.type_acquiring == 1 ? "Фізичному" :"Інтернет"} екварингу</div>

                    <button className="btn btn-secondary" disabled={this.state.internet_standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
                    <button className="btn btn-secondary" disabled={this.state.internet_extended_report ? '' : 'disabled'} >Розширений звіт</button>
                    <button className="btn btn-secondary" disabled={this.state.internet_installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
                    <br/>
                    <div className="coverInput">
                        <label htmlFor="file_format">Формат файлу</label>
                        {
                            this.state.isShowREPORT_FORMAT
                                ? <select className="form-select" onChange={this.changeSelect} name="internet_report_format_id" id="DICT_REPORT_FORMAT">

                                    { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
                                        return < OptionItem key={index} optionItem={item} report_format_id={this.state.internet_report_format_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }



                    </div>
                    <div className="coverInput">
                        <label htmlFor="report_period">Період звіту</label>
                        {
                            this.state.isShowDICT_REPORT_PERIOD_TYPE
                                ? <select className="form-select" onChange={this.changeSelect} name="internet_report_period_type_id" id="DICT_REPORT_PERIOD_TYPE">

                                    { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
                                        return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={this.state.internet_report_period_type_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }
                    </div>
                    <div className="coverInput">
                        <label htmlFor="file_name_mask">Маска назви файлу</label>
                        <input value={this.state.internet_file_name_mask} onChange={this.changeInputTsp} name="internet_file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
                    </div>
                    <div className="coverInput">
                        <label htmlFor="сatalog">Каталог</label>
                        <input disabled onChange={this.changeInputTsp} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
                    </div>
                    <div className="coverInput">
                        <label htmlFor="сhannel">Канал</label>
                        {
                            this.state.isShowDICT_REPORT_CHANNEL_TYPE
                                ? <select className="form-select" onChange={this.changeSelect} name="internet_channel_type_id" id="DICT_REPORT_CHANNEL_TYPE">

                                    { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
                                        return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={this.state.internet_channel_type_id} />
                                    }) }
                                </select>
                                : <span>Завантаження...</span>
                        }

                    </div>
                    <div className="coverInput">
                        {
                            this.state.internet_channel_type_id == 1
                                ? <>
                                    <input placeholder="ftp" value={this.state.internet_channel_address} onChange={ this.changeInputTspFtp} name="internet_channel_address" className={`${this.state.internetEmailMaskError ? 'errorEmail' : ''} customInput form-control`}  type="text"/>
                                    {
                                        this.state.internetEmailMaskError
                                            ? <p>Невалідний ftp</p>
                                            : <></>
                                    }
                                    {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
                                </>

                                : <>
                                    <input name="internet_channel_address" label="Email"  placeholder="email@email.com" value={this.state.internet_channel_address} onChange={ this.changeInputTspEmail} className={`${this.state.internetEmailMaskError ? 'errorEmail' : ''} customInput form-control`}  type="text"/>
                                    {
                                        this.state.internetEmailMaskError
                                            ? <p>Невалідний email</p>
                                            : <></>
                                    }
                                    {/*<MaskedInput name="physical_channel_address" label="Email" type="email" placeholder="email" value={this.state.physical_channel_address} onChange={() => this.changeInputTsp} className="customInput form-control"  type="text"/>*/}
                                </>

                        }
                        {/*{*/}
                        {/*    this.state.internet_channel_type_id == 1*/}
                        {/*        ? <input placeholder="ftp" value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
                        {/*        : <input placeholder="email" value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
                        {/*}*/}

                        {/*<input value={this.state.internet_channel_address} onChange={this.changeInputTsp} name="internet_channel_address" className="customInput form-control"  type="text"/>*/}
                    </div>
                    <br/>
                    <div className="reportCoverBtn">
                        <button className="btn btn-secondary" disabled={this.state.isDisabledSaveBtn ? '' : 'disabled'} onClick={this.saveReport}>Зберегти</button>
                    </div>
                </div>


            </div>
        )
    }

    // showReport = (currentTsp) => {
    //     console.log(currentTsp);
    //     return this.state.settings.map( ( item , index) => {
    //         console.log(item);
    //
    //
    //         console.log(item.tsp_id);
    //         console.log(item.tsp_id == currentTsp);
    //         if(item.tsp_id == currentTsp){
    //             console.log(item.main_settings);
    //             if(item.main_settings == null){
    //                 // let report_period_type_id = 1;
    //                 // let report_format_id = 1;
    //                 // let channel_type_id = 1;
    //                 // let file_name_mask = "";
    //                 // let channel_address = "";
    //                 // console.log(acquiring_type_id);
    //                 // console.log(report_period_type_id);
    //                 // console.log(report_format_id);
    //                 // console.log(channel_type_id);
    //                 // console.log(file_name_mask);
    //                 // console.log(channel_address);
    //                 console.log(this.state.type_acquiring);
    //                 return(
    //                     <div className="">
    //                         <div className="coverBtn border">
    //                             <div className="title">Вид екварингу</div>
    //                             <button
    //                                 className="btn btn-secondary"
    //                                 disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}
    //                                 onClick={  this.changeTypeAcquiring }
    //                                 type_acquiring={1}>Фізичний</button>
    //                             <button
    //                                 className="btn btn-secondary"
    //                                 disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}
    //                                 onClick={ this.changeTypeAcquiring }
    //                                 type_acquiring={2}>Інтернет</button>
    //                         </div>
    //                         <div className="title">{this.state.type_acquiring == 1 ? "Фізичний" :"Інтернет"}</div>
    //
    //                         <div className={`${this.state.type_acquiring == 1 ? '' : 'd-none'} border report`}>
    //                                     <div className="title">Перелік полів звіту ТСП</div>
    //
    //                                     <button className="btn btn-secondary" disabled={this.state.standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
    //                                     <button className="btn btn-secondary" disabled={this.state.extended_report ? '' : 'disabled'} >Розширений звіт</button>
    //                                     <button className="btn btn-secondary" disabled={this.state.installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
    //                                     <br/>
    //                                     <div className="coverInput">
    //                                         <label htmlFor="file_format">Формат файлу</label>
    //                                         {
    //                                             this.state.isShowREPORT_FORMAT
    //                                                 ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //
    //                                                     { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //                                                         return < OptionItem key={index} optionItem={item} report_format_id={this.state.report_format_id} />
    //                                                     }) }
    //                                                 </select>
    //                                                 : <span>Завантаження...</span>
    //                                         }
    //
    //
    //
    //                                     </div>
    //                                     <div className="coverInput">
    //                                         <label htmlFor="report_period">Період звіту</label>
    //                                         {
    //                                             this.state.isShowDICT_REPORT_PERIOD_TYPE
    //                                                 ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //
    //                                                     { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //                                                         return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={this.state.report_period_type_id} />
    //                                                     }) }
    //                                                 </select>
    //                                                 : <span>Завантаження...</span>
    //                                         }
    //                                     </div>
    //                                     <div className="coverInput">
    //                                         <label htmlFor="file_name_mask">Маска назви файлу</label>
    //                                         <input defaultValue={this.state.file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //                                     </div>
    //                                     <div className="coverInput">
    //                                         <label htmlFor="сatalog">Каталог</label>
    //                                         <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //                                     </div>
    //                                     <div className="coverInput">
    //                                         <label htmlFor="сhannel">Канал</label>
    //                                         {
    //                                             this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //                                                 ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //
    //                                                     { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //                                                         return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={this.state.channel_type_id} />
    //                                                     }) }
    //                                                 </select>
    //                                                 : <span>Завантаження...</span>
    //                                         }
    //
    //                                     </div>
    //                                     <div className="coverInput">
    //                                         <input defaultValue={this.state.channel_address} onChange={this.changeFile_name_mask} apiName="channel_address" className="customInput form-control"  type="text"/>
    //                                     </div>
    //                                     <br/>
    //                                     <div className="reportCoverBtn">
    //                                         <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //                                     </div>
    //                                 </div>
    //
    //                         <div className={`${this.state.type_acquiring == 1 ? 'd-none' : ''} border report`}>
    //                             <div className="title">Перелік полів звіту ТСП</div>
    //
    //                             <button className="btn btn-secondary" disabled={this.state.standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
    //                             <button className="btn btn-secondary" disabled={this.state.extended_report ? '' : 'disabled'} >Розширений звіт</button>
    //                             <button className="btn btn-secondary" disabled={this.state.installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
    //                             <br/>
    //                             <div className="coverInput">
    //                                 <label htmlFor="file_format">Формат файлу</label>
    //                                 {
    //                                     this.state.isShowREPORT_FORMAT
    //                                         ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //
    //                                             { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //                                                 return < OptionItem key={index} optionItem={item} report_format_id={this.state.report_format_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //
    //
    //
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="report_period">Період звіту</label>
    //                                 {
    //                                     this.state.isShowDICT_REPORT_PERIOD_TYPE
    //                                         ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //
    //                                             { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //                                                 return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={this.state.report_period_type_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="file_name_mask">Маска назви файлу</label>
    //                                 <input defaultValue={this.state.file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="сatalog">Каталог</label>
    //                                 <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="сhannel">Канал</label>
    //                                 {
    //                                     this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //                                         ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //
    //                                             { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //                                                 return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={this.state.channel_type_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //
    //                             </div>
    //                             <div className="coverInput">
    //                                 <input defaultValue={this.state.channel_address} onChange={this.changeFile_name_mask} apiName="channel_address" className="customInput form-control"  type="text"/>
    //                             </div>
    //                             <br/>
    //                             <div className="reportCoverBtn">
    //                                 <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //                             </div>
    //                         </div>
    //
    //
    //                     </div>
    //                 )
    //             }else if(false){
    //                 //item.main_settings.length
    //                 let physicalAcquiringData =  item.main_settings[1]
    //
    //
    //                 let report_period_type_id = item.report_period_type_id;
    //                 let report_format_id = item.report_format_id;
    //                 let channel_type_id = item.channel_type_id;
    //                 let file_name_mask = item.file_name_mask;
    //                 let acquiring_type_id = item.acquiring_type_id;
    //                 let standard_report = item.standard_report;
    //                 let extended_report = item.extended_report;
    //                 let installment_report = item.installment_report;
    //                 let channel_address = item.channel_address;
    //                 console.log(acquiring_type_id);
    //                 console.log(report_period_type_id);
    //                 console.log(report_format_id);
    //                 console.log(channel_type_id);
    //                 console.log(file_name_mask);
    //                 console.log(channel_address);
    //                 console.log(this.state.type_acquiring);
    //                 return(
    //                     <div className="">
    //                         <div className="coverBtn border">
    //                             <div className="title">Вид екварингу</div>
    //                             <button
    //                                 className="btn btn-secondary"
    //                                 disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}
    //                                 onClick={  this.changeTypeAcquiring }
    //                                 type_acquiring={1}>Фізичний</button>
    //                             <button
    //                                 className="btn btn-secondary"
    //                                 disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}
    //                                 onClick={ this.changeTypeAcquiring }
    //                                 type_acquiring={2}>Інтернет</button>
    //                         </div>
    //                         <div className={`${this.state.type_acquiring == acquiring_type_id ? '' : 'd-none'} border report`}>
    //                             <div className="title">Перелік полів звіту ТСП</div>
    //
    //                             <button className="btn btn-secondary" disabled={standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
    //                             <button className="btn btn-secondary" disabled={extended_report ? '' : 'disabled'} >Розширений звіт</button>
    //                             <button className="btn btn-secondary" disabled={installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
    //                             <br/>
    //                             <div className="coverInput">
    //                                 <label htmlFor="file_format">Формат файлу</label>
    //                                 {
    //                                     this.state.isShowREPORT_FORMAT
    //                                         ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //
    //                                             { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //                                                 return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //
    //
    //
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="report_period">Період звіту</label>
    //                                 {
    //                                     this.state.isShowDICT_REPORT_PERIOD_TYPE
    //                                         ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //
    //                                             { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //                                                 return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="file_name_mask">Маска назви файлу</label>
    //                                 <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="сatalog">Каталог</label>
    //                                 <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //                             </div>
    //                             <div className="coverInput">
    //                                 <label htmlFor="сhannel">Канал</label>
    //                                 {
    //                                     this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //                                         ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //
    //                                             { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //                                                 return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //                                             }) }
    //                                         </select>
    //                                         : <span>Завантаження...</span>
    //                                 }
    //
    //                             </div>
    //                             <div className="coverInput">
    //                                 <input defaultValue={channel_address} onChange={this.changeFile_name_mask} apiName="channel_address" className="customInput form-control"  type="text"/>
    //                             </div>
    //                             <br/>
    //                             <div className="reportCoverBtn">
    //                                 <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //                             </div>
    //                         </div>
    //                         {
    //                             item.main_settings.map( ( item , index) => {
    //                                 let report_period_type_id = item.report_period_type_id;
    //                                 let report_format_id = item.report_format_id;
    //                                 let channel_type_id = item.channel_type_id;
    //                                 let file_name_mask = item.file_name_mask;
    //                                 let acquiring_type_id = item.acquiring_type_id;
    //                                 let standard_report = item.standard_report;
    //                                 let extended_report = item.extended_report;
    //                                 let installment_report = item.installment_report;
    //                                 let channel_address = item.channel_address;
    //                                 console.log(acquiring_type_id);
    //                                 console.log(report_period_type_id);
    //                                 console.log(report_format_id);
    //                                 console.log(channel_type_id);
    //                                 console.log(file_name_mask);
    //                                 console.log(channel_address);
    //                                 console.log(this.state.type_acquiring);
    //                                 return(
    //                                     <div className={`${this.state.type_acquiring == acquiring_type_id ? '' : 'd-none'} border report`}>
    //                                         <div className="title">Перелік полів звіту ТСП</div>
    //
    //                                         <button className="btn btn-secondary" disabled={standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
    //                                         <button className="btn btn-secondary" disabled={extended_report ? '' : 'disabled'} >Розширений звіт</button>
    //                                         <button className="btn btn-secondary" disabled={installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
    //                                         <br/>
    //                                         <div className="coverInput">
    //                                             <label htmlFor="file_format">Формат файлу</label>
    //                                             {
    //                                                 this.state.isShowREPORT_FORMAT
    //                                                     ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //
    //                                                         { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //                                                             return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //                                                         }) }
    //                                                     </select>
    //                                                     : <span>Завантаження...</span>
    //                                             }
    //
    //
    //
    //                                         </div>
    //                                         <div className="coverInput">
    //                                             <label htmlFor="report_period">Період звіту</label>
    //                                             {
    //                                                 this.state.isShowDICT_REPORT_PERIOD_TYPE
    //                                                     ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //
    //                                                         { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //                                                             return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //                                                         }) }
    //                                                     </select>
    //                                                     : <span>Завантаження...</span>
    //                                             }
    //                                         </div>
    //                                         <div className="coverInput">
    //                                             <label htmlFor="file_name_mask">Маска назви файлу</label>
    //                                             <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //                                         </div>
    //                                         <div className="coverInput">
    //                                             <label htmlFor="сatalog">Каталог</label>
    //                                             <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //                                         </div>
    //                                         <div className="coverInput">
    //                                             <label htmlFor="сhannel">Канал</label>
    //                                             {
    //                                                 this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //                                                     ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //
    //                                                         { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //                                                             return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //                                                         }) }
    //                                                     </select>
    //                                                     : <span>Завантаження...</span>
    //                                             }
    //
    //                                         </div>
    //                                         <div className="coverInput">
    //                                             <input defaultValue={channel_address} onChange={this.changeFile_name_mask} apiName="channel_address" className="customInput form-control"  type="text"/>
    //                                         </div>
    //                                         <br/>
    //                                         <div className="reportCoverBtn">
    //                                             <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //                                         </div>
    //                                     </div>
    //                                 )
    //                             })
    //                         }
    //
    //                     </div>
    //                 )
    //             }
    //
    //
    //             // if(item.main_settings == null){
    //             //         let report_period_type_id = 1;
    //             //         let report_format_id = 1;
    //             //         let channel_type_id = 1;
    //             //         let file_name_mask = "";
    //             //         let channel_address = "";
    //             //
    //             //         console.log(report_period_type_id);
    //             //         console.log(report_format_id);
    //             //         console.log(channel_type_id);
    //             //         console.log(file_name_mask);
    //             //         console.log(channel_address);
    //             //         return(
    //             //             <div className="report border">
    //             //                 <div className="title">Перелік полів звіту ТСП</div>
    //             //                 <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>
    //             //                 <button className="btn btn-secondary" disabled>Розширений звіт</button>
    //             //                 <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>
    //             //                 <br/>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="file_format">Формат файлу</label>
    //             //                     {
    //             //                         this.state.isShowREPORT_FORMAT
    //             //                             ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //             //
    //             //                                 { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //             //                                     return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //
    //             //
    //             //
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="report_period">Період звіту</label>
    //             //                     {
    //             //                         this.state.isShowDICT_REPORT_PERIOD_TYPE
    //             //                             ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //             //
    //             //                                 { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //             //                                     return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="file_name_mask">Маска назви файлу</label>
    //             //                     <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="сatalog">Каталог</label>
    //             //                     <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="сhannel">Канал</label>
    //             //                     {
    //             //                         this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //             //                             ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //             //
    //             //                                 { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //             //                                     return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <input defaultValue={channel_address} onChange={this.changeFile_name_mask} apiName="channel_address" className="customInput form-control"  type="text"/>
    //             //                 </div>
    //             //
    //             //                 <div className="reportCoverBtn">
    //             //                     <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //             //                 </div>
    //             //             </div>
    //             //         )
    //             // }else if(item.main_settings.length == 1){
    //             //     return item.main_settings.map( ( item , index) => {
    //             //         let report_period_type_id = item.report_period_type_id;
    //             //         let report_format_id = item.report_format_id;
    //             //         let channel_type_id = item.channel_type_id;
    //             //         let file_name_mask = item.file_name_mask;
    //             //         console.log(report_period_type_id);
    //             //         console.log(report_format_id);
    //             //         console.log(channel_type_id);
    //             //         console.log(file_name_mask);
    //             //         return(
    //             //             <div className=" border report">
    //             //                 <div className="coverBtn border">
    //             //                     <div className="title">Вид екварингу</div>
    //             //                     <button className="btn btn-secondary">{this.state.type_acquiring == 1 ? 'Фізичний' : 'Інтернет'}</button>
    //             //                     {/*<button*/}
    //             //                     {/*    className="btn btn-secondary"*/}
    //             //                     {/*    disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}*/}
    //             //                     {/*    onClick={this.changeTypeAcquiringInternet}*/}
    //             //                     {/*    type_acquiring={2}>Інтернет</button>*/}
    //             //                 </div>
    //             //                 <div className="report border">
    //             //                     <div className="title">Перелік полів звіту ТСП</div>
    //             //                     <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>
    //             //                     <button className="btn btn-secondary" disabled>Розширений звіт</button>
    //             //                     <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>
    //             //                     <br/>
    //             //                     <div className="coverInput">
    //             //                         <label htmlFor="file_format">Формат файлу</label>
    //             //                         {
    //             //                             this.state.isShowREPORT_FORMAT
    //             //                                 ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //             //
    //             //                                     { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //             //                                         return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //             //                                     }) }
    //             //                                 </select>
    //             //                                 : <span>Завантаження...</span>
    //             //                         }
    //             //
    //             //
    //             //
    //             //                     </div>
    //             //                     <div className="coverInput">
    //             //                         <label htmlFor="report_period">Період звіту</label>
    //             //                         {
    //             //                             this.state.isShowDICT_REPORT_PERIOD_TYPE
    //             //                                 ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //             //
    //             //                                     { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //             //                                         return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //             //                                     }) }
    //             //                                 </select>
    //             //                                 : <span>Завантаження...</span>
    //             //                         }
    //             //                     </div>
    //             //                     <div className="coverInput">
    //             //                         <label htmlFor="file_name_mask">Маска назви файлу</label>
    //             //                         <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //             //                     </div>
    //             //                     <div className="coverInput">
    //             //                         <label htmlFor="сatalog">Каталог</label>
    //             //                         <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //             //                     </div>
    //             //                     <div className="coverInput">
    //             //                         <label htmlFor="сhannel">Канал</label>
    //             //                         {
    //             //                             this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //             //                                 ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //             //
    //             //                                     { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //             //                                         return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //             //                                     }) }
    //             //                                 </select>
    //             //                                 : <span>Завантаження...</span>
    //             //                         }
    //             //
    //             //                     </div>
    //             //                     <div className="reportCoverBtn">
    //             //                         <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //             //                     </div>
    //             //                 </div>
    //             //             </div>
    //             //         )
    //             //     });
    //             //
    //             // }else if(item.main_settings.length == 2){
    //             //
    //             //
    //             //         return(
    //             //             <div className="">
    //             //                 <div className="coverBtn border">
    //             //                     <div className="title">Вид екварингу</div>
    //             //                     <button
    //             //                         className="btn btn-secondary"
    //             //                         disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}
    //             //                         onClick={  this.changeTypeAcquiring }
    //             //                         type_acquiring={1}>Фізичний</button>
    //             //                     <button
    //             //                         className="btn btn-secondary"
    //             //                         disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}
    //             //                         onClick={ this.changeTypeAcquiring }
    //             //                         type_acquiring={2}>Інтернет</button>
    //             //                 </div>
    //             //                     {
    //             //                         item.main_settings.map( ( item , index) => {
    //             //                             let report_period_type_id = item.report_period_type_id;
    //             //                             let report_format_id = item.report_format_id;
    //             //                             let channel_type_id = item.channel_type_id;
    //             //                             let file_name_mask = item.file_name_mask;
    //             //                             let acquiring_type_id = item.acquiring_type_id;
    //             //                             let standard_report = item.standard_report;
    //             //                             let extended_report = item.extended_report;
    //             //                             let installment_report = item.installment_report;
    //             //                             console.log(acquiring_type_id);
    //             //                             console.log(report_period_type_id);
    //             //                             console.log(report_format_id);
    //             //                             console.log(channel_type_id);
    //             //                             console.log(file_name_mask);
    //             //                             console.log(this.state.type_acquiring);
    //             //                             return(
    //             //                                 <div className={`${this.state.type_acquiring == acquiring_type_id ? '' : 'd-none'} border report`}>
    //             //                                     <div className="title">Перелік полів звіту ТСП</div>
    //             //
    //             //                                     <button className="btn btn-secondary" disabled={standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
    //             //                                     <button className="btn btn-secondary" disabled={extended_report ? '' : 'disabled'} >Розширений звіт</button>
    //             //                                     <button className="btn btn-secondary" disabled={installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
    //             //                                     <br/>
    //             //                                     <div className="coverInput">
    //             //                                         <label htmlFor="file_format">Формат файлу</label>
    //             //                                         {
    //             //                                             this.state.isShowREPORT_FORMAT
    //             //                                                 ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //             //
    //             //                                                     { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //             //                                                         return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //             //                                                     }) }
    //             //                                                 </select>
    //             //                                                 : <span>Завантаження...</span>
    //             //                                         }
    //             //
    //             //
    //             //
    //             //                                     </div>
    //             //                                     <div className="coverInput">
    //             //                                         <label htmlFor="report_period">Період звіту</label>
    //             //                                         {
    //             //                                             this.state.isShowDICT_REPORT_PERIOD_TYPE
    //             //                                                 ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //             //
    //             //                                                     { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //             //                                                         return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //             //                                                     }) }
    //             //                                                 </select>
    //             //                                                 : <span>Завантаження...</span>
    //             //                                         }
    //             //                                     </div>
    //             //                                     <div className="coverInput">
    //             //                                         <label htmlFor="file_name_mask">Маска назви файлу</label>
    //             //                                         <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //             //                                     </div>
    //             //                                     <div className="coverInput">
    //             //                                         <label htmlFor="сatalog">Каталог</label>
    //             //                                         <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //             //                                     </div>
    //             //                                     <div className="coverInput">
    //             //                                         <label htmlFor="сhannel">Канал</label>
    //             //                                         {
    //             //                                             this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //             //                                                 ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //             //
    //             //                                                     { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //             //                                                         return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //             //                                                     }) }
    //             //                                                 </select>
    //             //                                                 : <span>Завантаження...</span>
    //             //                                         }
    //             //
    //             //                                     </div>
    //             //                                     <br/>
    //             //                                     <div className="reportCoverBtn">
    //             //                                         <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //             //                                     </div>
    //             //                                 </div>
    //             //                             )
    //             //                         })
    //             //                     }
    //             //
    //             //             </div>
    //             //         )
    //             //
    //             // }
    //
    //
    //             // return item.main_settings.map( ( item , index) => {
    //             //     console.log(item);
    //             //     console.log(item.acquiring_type_id == this.state.type_acquiring);
    //             //
    //             //     if(item.acquiring_type_id == this.state.type_acquiring){
    //             //         let report_period_type_id = item.report_period_type_id;
    //             //         let report_format_id = item.report_format_id;
    //             //         let channel_type_id = item.channel_type_id;
    //             //         let file_name_mask = item.file_name_mask;
    //             //         // this.setState({
    //             //         //     report_period_type_id: report_period_type_id,
    //             //         //     report_format_id: report_format_id,
    //             //         //     channel_type_id: channel_type_id,
    //             //         //     file_name_mask: file_name_mask
    //             //         // });
    //             //
    //             //         return(
    //             //             <div className="report border">
    //             //                 <div className="title">{this.state.type_acquiring == 1 ? "Фізичний" :"Інтернет"}</div>
    //             //                 <div className="title">Перелік полів звіту ТСП</div>
    //             //                 <button className="btn btn-secondary" onClick={this.openStandardReport} >Стандартний звіт</button>
    //             //                 <button className="btn btn-secondary" disabled>Розширений звіт</button>
    //             //                 <button className="btn btn-secondary" disabled>Звіт по операціям Installment</button>
    //             //                 <br/>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="file_format">Формат файлу</label>
    //             //                     {
    //             //                         this.state.isShowREPORT_FORMAT
    //             //                             ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
    //             //
    //             //                                 { this.state.DICT_REPORT_FORMAT.map( ( item , index) => {
    //             //                                     return < OptionItem key={index} optionItem={item} report_format_id={report_format_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //
    //             //
    //             //
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="report_period">Період звіту</label>
    //             //                     {
    //             //                         this.state.isShowDICT_REPORT_PERIOD_TYPE
    //             //                             ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
    //             //
    //             //                                 { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
    //             //                                     return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="file_name_mask">Маска назви файлу</label>
    //             //                     <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="сatalog">Каталог</label>
    //             //                     <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
    //             //                 </div>
    //             //                 <div className="coverInput">
    //             //                     <label htmlFor="сhannel">Канал</label>
    //             //                     {
    //             //                         this.state.isShowDICT_REPORT_CHANNEL_TYPE
    //             //                             ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
    //             //
    //             //                                 { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
    //             //                                     return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
    //             //                                 }) }
    //             //                             </select>
    //             //                             : <span>Завантаження...</span>
    //             //                     }
    //             //
    //             //                 </div>
    //             //                 <div className="reportCoverBtn">
    //             //                     <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
    //             //                 </div>
    //             //             </div>
    //             //         )
    //             //     }
    //             // });
    //
    //         }
    //     })
    // }

    closePopupError = () => {
        this.setState({
            isShowPopupError: false
        });
    }
    closePopupErrorSave = () => {
        this.setState({
            isShowPopupErrorSave: false
        });
    }
    closePopupOrder_numberError = () => {
        this.setState({
            isShowOrder_numberError: false,
            isShowBootstrapTable: true
        });
    }
    activeOperation = (operationArr, operation) => {
        let res;
        operationArr.map(( item , index) => {
            if(item.operation == operation){
                console.log(item.name);
                res = item.name;
            }
        })
        return res;
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
                let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
                row.[nameRole] = inputValue;
                let index = TSPReportSettingsSTD.findIndex(el => el.field_name === row.field_name);
                //console.log(row);

                TSPReportSettingsSTD[index] = row;
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
            //console.log(newValue);
            const test5 = (e) => {
                let nameRole = e.currentTarget.getAttribute("name");
                //console.log(nameRole);
                let inputValue =  Number(e.target.value);
                //console.log(inputValue);
                let TSPReportSettingsSTD = this.state.TSPReportSettingsSTD;
                //console.log(TSPReportSettingsSTD);
                //console.log(row);


                // let cloneTSPReportSettingsSTD = Object.assign({}, TSPReportSettingsSTD);
                // console.log(TSPReportSettingsSTD);


                let cloneTSPReportSettingsSTD = TSPReportSettingsSTD.map(a => Object.assign({}, a));
                //console.log(cloneTSPReportSettingsSTD);



                //console.log(row.field_name);
                let indexRow = cloneTSPReportSettingsSTD.findIndex(el => el.field_name === row.field_name);
                //console.log(indexRow);


                let defineOrder_number = (arr, inputValue, indexRow) => {
                    let cloneArr = arr.map(a => Object.assign({}, a));
                    //console.log(arr == cloneArr);
                    //console.log(arr == arr);
                    //console.log(arr === cloneArr);
                    //console.log(cloneArr);
                    //console.log(arr);

                    cloneArr.splice(indexRow, 1);
                    let numberArr = [];
                    cloneArr.map(( item , index) => {
                        numberArr.push(item.order_number);
                    });
                    //console.log(numberArr);

                    //console.log(arr);
                    //console.log(cloneArr);

                    //console.log(numberArr.indexOf( inputValue ) != -1);
                    return numberArr.indexOf( inputValue ) != -1;
                    // if(numberArr.indexOf( inputValue ) != -1){
                    //     return false
                    // }else if(){
                    //
                    // }
                }
                //console.log(defineOrder_number(cloneTSPReportSettingsSTD, inputValue,indexRow ));

                if(defineOrder_number(cloneTSPReportSettingsSTD, inputValue,indexRow )){
                    // row.[nameRole] = inputValue;
                    // cloneTSPReportSettingsSTD[indexRow] = row;
                    console.log(cloneTSPReportSettingsSTD);
                    this.setState({
                        isShowBootstrapTable: false,
                        isShowOrder_numberError: true,
                        TSPReportSettingsSTD: TSPReportSettingsSTD,
                    });

                    // setTimeout(
                    //     () => this.setState({ isShowOrder_numberError: false }),
                    //     6000
                    // );
                }else{
                    row.[nameRole] = inputValue;
                    //console.log(row);
                    cloneTSPReportSettingsSTD[indexRow] = row;
                    console.log(cloneTSPReportSettingsSTD);


                    this.setState({
                        TSPReportSettingsSTD: cloneTSPReportSettingsSTD
                    });
                }




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

                    <input onBlur={ test5 }  defaultValue={cell} name="order_number" type="text" />

                </>
            )
        }

        return (
            <div className="coverTable REPORT_SETTINGS_TSP">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock">

                    </div>
                </div>
                <div className="filter">
                    <div className="coverInputSelect">
                        <label htmlFor="DICT_INSTITUTION">Регіональні управління</label>
                        <select onChange={this.selectDICT_INSTITUTION} apiName="institution_id" id="dropdown-basic-button" className="form-select"
                                title="Регіональні управління">
                                <option>-</option>
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
                            <option>-</option>
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
                        <input onChange={this.changeInput} apiName="ident_code" id="INN" type="text" className="form-control"/>
                        <label htmlFor="TPS">Назва ТСП</label>
                        <input onChange={this.changeInput} apiName="tsp_name" id="TPS" type="text" className="form-control"/>
                        <label htmlFor="merchant">merchant ID</label>
                        <input onChange={this.changeInput} apiName="merchant_id" id="merchant" type="text" className="form-control"/>
                    </div>
                    <div className="coverInputDate">
                        <span>Період відкриття ТСП</span>
                        <div className="coverInputs">
                            <div className="coverDate">
                                <label htmlFor="date_from">З</label>
                                <input onChange={this.changeInput} apiName="date_from" className="customInput form-control" id="date_from" type="date"/>
                            </div>
                            <div className="coverDate">
                                <label htmlFor="date_to">По</label>
                                <input onChange={this.changeInput} apiName="date_to" className="customInput form-control" id="date_to" type="date"/>
                            </div>
                        </div>
                        <button className="search btn btn-primary" onClick={this.search}>Пошук</button>
                    </div>
                </div>
                <div className="coverResult">
                    <div className="resultSearch border">
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

                                    {/*<div className="coverBtn border">*/}
                                    {/*    <div className="title">Вид екварингу</div>*/}
                                    {/*    <button*/}
                                    {/*        className="btn btn-secondary"*/}
                                    {/*        disabled={this.state.type_acquiring == 1 ? 'disabled' : ''}*/}
                                    {/*        onClick={this.changeTypeAcquiringPhysical}*/}
                                    {/*        type_acquiring={1}>Фізичний</button>*/}
                                    {/*    <button*/}
                                    {/*        className="btn btn-secondary"*/}
                                    {/*        disabled={this.state.type_acquiring == 2 ? 'disabled' : ''}*/}
                                    {/*        onClick={this.changeTypeAcquiringInternet}*/}
                                    {/*        type_acquiring={2}>Інтернет</button>*/}
                                    {/*</div>*/}


                                    {/*{this.showReport(this.state.currentTsp)}*/}
                                    {this.showHtmlReport()}
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
                                <button onClick={this.seveTSPReportSettingsSTD} type="button" className="btn btn-primary btn-save">Зберегти</button>
                                <button onClick={this.closePopupTable} type="button" className="btn-close" aria-label="Close"></button>
                                {
                                    this.state.isShowBootstrapTable
                                        ? <BootstrapTable data={this.state.TSPReportSettingsSTD}
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
                                        : <>
                                            <div className="coverloader">
                                                <div className="loader"></div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                        </>
                        : <>
                        </>
                }
                {
                    this.state.isShowPopupError
                        ? <>
                            <div className="coverPopupError">
                                <div className="innerBlock">
                                    <div className="title alert alert-primary">Немає результату по даному пошуку</div>
                                    <div className="msg">Спробуйте ввести інші дані для пошуку</div>
                                    <button className="btn btn-secondary" onClick={this.closePopupError}>Закрити</button>
                                </div>
                            </div>
                        </>
                        : <>
                            </>
                }
                {
                    this.state.isShowPopupErrorSave
                        ? <>
                            <div className="coverPopupError">
                                <div className="innerBlock">
                                    <div className="title alert alert-primary">Сталася помилка при збереженні</div>
                                    <div className="msg"></div>
                                    <button className="btn btn-secondary" onClick={this.closePopupErrorSave}>Закрити</button>
                                </div>
                            </div>
                        </>
                        : <>
                        </>
                }
                {
                    this.state.isShowOrder_numberError
                        ? <>
                            <div className="coverOrder_numberError">
                                <div className="innerBlock">
                                    <div className="title alert alert-primary">Такий порядковий номер вже вибрано</div>
                                    <div className="msg">Введіть інший порядковий номер поля</div>
                                    <button className="btn btn-secondary" onClick={this.closePopupOrder_numberError}>Закрити</button>
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