import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import React, {useState} from "react";
import * as axios from "axios";
import InputMask from 'react-input-mask';
import {Field, reduxForm} from "redux-form";
import TextInput from 'react-autocomplete-input';
import { Typeahead } from 'react-bootstrap-typeahead';
import Autocomplete from "react-autocomplete";
import ReactAutocomplete from "react-autocomplete";


const MyForm = () => {
    const [options, setOptions] = useState(["Apples", "Oranges", "Bananas", "Grapes"]);

    const handleChange = (event) => {
        console.log(event);
        console.log(event.target.value);
        console.log(event.nativeEvent.inputType);
        if (!event.nativeEvent.inputType) {
            console.log(event.nativeEvent.inputType);
            console.log(event.target);
            console.log(event.target.blur());
            event.target.blur();
        }
    };

    const clear = (event) => {
        event.target.value = "";
    };

    return (
        <>
            <input
                type="input"
                list="optionsList"
                onChange={handleChange}
                onClick={clear}
                onFocus={clear}
                placeholder="Select an option"
            />
            <datalist id="optionsList">
                {options.map((o) => (
                    <option key={o}>{o}</option>
                ))}
            </datalist>
        </>
    );
};



const OptionItemDICT_INSTITUTION = (props) => {
    //console.log( props )
    return(
        <option selected={props.optionItem.institution_id == props.institution_id ? 'selected' : ''}   value={props.optionItem.institution_id} >{props.optionItem.institution_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_NET_BRAND = (props) => {
    //console.log( props )
    return(
        <option   value={props.optionItem.brand_id} >{props.optionItem.brand_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_NET_ENTITY = (props) => {
    // console.log( props )
    return(
        <option  value={props.optionItem.entity_id} >{props.optionItem.entity_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_NETWORK_MANAGERS = (props) => {
    //console.log( props )
    return(
        <option
            selected={props.optionItem.manager_id == props.manager_id ? 'selected' : ''}
            value={props.optionItem.manager_id}
        >{props.optionItem.manager_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}
const OptionItemDICT_NET_BRAND_QueryTSP = (props) => {
    console.log( props )
    return(
        <option
            className="autocompleteOption"
            value={props.optionItem.ident_code}
        >{props.optionItem.client_name}</option>
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

class NETWORK_ADD_CLIENT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            isContact_emailError: false,
            isDisabledSaveBtn: false,

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






            isShowOrder_numberError: false,
            isShowBootstrapTable: true,

            options: [
                {client_id: 6595650, client_name: "МП Октан1", entity_id: 0, entity_name: null, ident_code: "13351072"},
                {client_id: 6595651, client_name: "МП Октан2", entity_id: 1, entity_name: null, ident_code: "13351073"}
            ],
            // options: [
            // ],
            value: '',
            DICT_NET_BRAND_QueryTSP: [],
            isShowDICT_NET_BRAND_QueryTSP: false,

            isDisableInputDICT_NETWORK_MANAGERS: true,
            DICT_NETWORK_MANAGERS: null,
            isShowSelectDICT_NETWORK_MANAGERS: false,

            isDisableInputDICT_NET_BRAND: true,
            isShowSelectDICT_NET_BRAND: false,
            DICT_NET_BRAND: null,

            isDisableInputDICT_NET_ENTITY: true,
            isShowSelectDICT_NET_ENTITY: false,
            DICT_NET_ENTITY: null,

            isDisableBtnSave: true,

            isDisableIdent_code: true,

            isDisableInput: true,


            ident_code: null,
            client_name: null,
            client_id: null,
            manager_id: null,
            brand_id: null,
            entity_id: null,


            isDICT_NET_BRAND_QueryTSPEmpty: false

        }
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
            TSPReportSettingsSearchObj: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.TSPReportSettingsSearchObj);


        this.requestDICT_BRANCH(this.props.store.userState.token, param);
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

    async requestGetNewBrandId  ( token ) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/GetNewBrandId`;
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

                this.requestDICT_NET_CLIENT_STATUS( this.props.store.userState.token );
                this.requestDICT_NETWORK_MANAGERS( this.props.store.userState.token );
                this.requestDICT_INSTITUTION( this.props.store.userState.token );
                this.setState({
                    brand_id: response.data.brand_id,
                    isDisableInput: false
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
    async requestGetNewEntityId  ( token ) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/GetNewEntityId`;
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
                let newObj = {
                    brand_id: this.state.brand_id,
                    entity_id: response.data.entity_id,
                    ident_code: null,
                    manager_name: null,
                    entity_name: "",

                }
                let cloneArr = this.state.twoLevelArr.map(a => Object.assign({}, a));
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
    async requestDICT_NETWORK_MANAGERS ( token ) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_NETWORK_MANAGERS`;
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
                    DICT_NETWORK_MANAGERS: response.data.Table.TableRows,
                    isShowSelectDICT_NETWORK_MANAGERS: true,
                    isDisableInputDICT_NETWORK_MANAGERS: false
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

    async requestDICT_NET_CLIENT  (token, body) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_NET_CLIENT`;

        await axios.post(
            baseUrl,
            body,
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

                // this.setState({
                //     DICT_NET_BRAND_QueryTSP: response.data.tsp_list,
                //     isDisableIdent_code: false,
                //     isShowDICT_NET_BRAND_QueryTSP: true
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

    async requestDICT_NET_BRAND_QueryTSP  (token, val) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_NET_BRAND/QueryTSP`;
        let ident_code = {
            ident_code: val
        }
        await axios.post(
            baseUrl,
            ident_code,
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

                if(response.data.record_count == 0){
                    this.setState({
                        isDICT_NET_BRAND_QueryTSPEmpty: true,
                        isDisableIdent_code: true,
                        isShowDICT_NET_BRAND_QueryTSP: false,
                        DICT_NET_BRAND_QueryTSP: []
                    });
                }else{
                    this.setState({
                        DICT_NET_BRAND_QueryTSP: response.data.tsp_list,
                        isDisableIdent_code: false,
                        isShowDICT_NET_BRAND_QueryTSP: true,
                        isDICT_NET_BRAND_QueryTSPEmpty: false
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
    async requestDICT_NET_BRAND  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_NET_BRAND`;



        await axios.get(
            baseUrl,
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
                    isDisableInputDICT_NET_BRAND: false,
                    isShowSelectDICT_NET_BRAND: true,
                    DICT_NET_BRAND: response.data.Table.TableRows,
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
    async requestDICT_NET_ENTITY (token, brand_id) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( brand_id );
        const baseUrl = `/api/Dictionary/DICT_NET_ENTITY/?param1=${brand_id}`;

        await axios.get(
            baseUrl,
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


                this.setState({
                    isDisableInputDICT_NET_ENTITY: false,
                    isShowSelectDICT_NET_ENTITY: true,
                    DICT_NET_ENTITY: response.data.Table.TableRows
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


    formatDate = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        return year + month + day;
    }



    openStandardReport = () => {
        // this.setState({
        //     isShowTableTSPReportSettingsSTD: true
        // });
        this.requestTSPReportSettingsSTD(this.props.store.userState.token);
    }
    closePopupTable = () => {
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
        if(name_input == 'physical_channel_type_id')this.setState({physical_channel_type_id: Number(inputValue)});
        if(name_input == 'physical_report_format_id')this.setState({physical_report_format_id: Number(inputValue)});
        if(name_input == 'physical_report_period_type_id')this.setState({physical_report_period_type_id: Number(inputValue)});

        if(name_input == 'internet_acquiring_type_id')this.setState({internet_acquiring_type_id: Number(inputValue)});
        if(name_input == 'internet_channel_type_id')this.setState({internet_channel_type_id: Number(inputValue)});
        if(name_input == 'internet_report_format_id')this.setState({internet_report_format_id: Number(inputValue)});
        if(name_input == 'internet_report_period_type_id')this.setState({internet_report_period_type_id: Number(inputValue)});
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
        let dody = {
            tsp_list: [
                {
                    tsp_id: this.state.currentTsp     //tsp_id
                }
            ],
            main_settings: [
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

                },
                {
                    acquiring_type_id: 1,//type_acquiring
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

            ],

        };
        if( this.state.TSPReportSettingsSTD != null){
            dody.std_settings = this.state.TSPReportSettingsSTD;
        }
        console.log( dody );
        //this.requestTSPReportSettingsSTD_SAVE(this.props.store.userState.token, dody);
    }




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
                //console.log(item.name);
                res = item.name;
            }
        })
        return res;
    }



    hendleIdent_code = (e) => {
        if (e.keyCode === 13) {
            //console.log('enter');
            this.ident_code(e);
        }
    }
    changeInput = (e) => {
        let apiName = e.currentTarget.getAttribute("api_name");
        console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);

        if( apiName == 'contact_person'){
            this.setState({
                contact_person: inputValue
            });
        }else if( apiName == 'contact_phone'){
            console.log('contact_phone');
            this.setState({
                contact_phone: inputValue
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
        }else if( apiName == 'contact_position'){
            this.setState({
                contact_position: inputValue
            });
        }else if( apiName == 'contact_email'){
            console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValue));

            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValue)) {
                console.log('email валідний все ок');
                this.setState({
                    isContact_emailError: false,
                    isDisabledSaveBtn: false,
                    contact_email: inputValue
                });
            }else if(inputValue == ''){
                this.setState({
                    isContact_emailError: false,
                    isDisabledSaveBtn: false,
                    contact_email: inputValue
                });
            }else {
                console.log('email НЕ валідний !!!');
                this.setState({
                    isContact_emailError: true,
                    isDisabledSaveBtn: true,
                    contact_email: inputValue
                });
            }
        }else if( apiName == 'brand_status_code'){
            this.setState({
                brand_status_code: inputValue
            });
        }else if( apiName == 'brand_region'){
            this.setState({
                brand_region: inputValue
            });
        } else if( apiName == 'manager_name'){
            let rr, manager_name;
            rr = (arr, number) => {
                //console.log(arr);
                console.log(number);
                arr.filter(function(currentElement, index, array){
                    // console.log(currentElement.name);
                    // console.log(index);
                    // console.log(array);
                    if(currentElement.manager_id == number){
                        console.log(currentElement.manager_name);
                        manager_name = currentElement.manager_name;
                    }
                })
            }
            console.log(rr(this.state.DICT_NETWORK_MANAGERS, inputValue));
            console.log(manager_name);
            this.setState({
                manager_name: manager_name,
                manager_id: Number(inputValue)
            });
        }

    }
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

    }

    showTwoLevelYes = () => {
        this.setState({
            showTwoLevel: true,
            moreTwoLevel: true
        });

    }
    showTwoLevelNo = () => {
        this.setState({
            showTwoLevel: false,
            moreTwoLevel: false,

            twoLevelArr: []

        });

    }

    changeInputSC = (e) => {
        let param = e.target.value;
        console.log(param);
        let api_name = e.currentTarget.getAttribute("api_name");
        console.log(api_name);
        let get_entity_id = e.currentTarget.getAttribute("entity_id");
        console.log(get_entity_id);


        // let newObj = {
        //     GetNewEntityId: 578210,
        //     edrpou: "1",
        //
        // }


        let stateArr = this.state.twoLevelArr;
        let cloneArr = stateArr.map(a => Object.assign({}, a));
        console.log(cloneArr);

        let indexItem = cloneArr.findIndex(el => el.entity_id == get_entity_id);
        console.log(indexItem);
        cloneArr[indexItem][api_name] = param;
        // stateArr.push(newObj);
        console.log(cloneArr);


        this.setState({
            twoLevelArr: cloneArr
        });


    }
    handleRequestOptions = (e) => {
        console.log('fdfdffd');
        console.log(e);
        let param = e.target.value;
        console.log(param);
    }
    autocompleteOnChange = (e) => {
        //let val = e.target.value;
        console.log(e);

        let val = e.target.value;
        console.log(val);

        this.setState({
            value:  val
        });
        //this.requestDICT_NET_BRAND_QueryTSP(this.props.store.userState.token, val);


    }
    renderItem = (item, highlighted) => {
        //console.log(item);
        return(
            <div id={item.ident_code}
                key={item.ident_code}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
                {item.ident_code}
            </div>
        )
    }
    shouldItemRender = (item, value ) => {
        console.log(item);
        console.log(value);
        console.log(item.ident_code.toLowerCase().indexOf(value.toLowerCase()) > -1);
        return item.ident_code.toLowerCase().indexOf(value.toLowerCase()) > -1


    }
    autocompleteSelect = (value) => {
        console.log(value);
        this.setState({ value })

    }



    ident_code = (e) => {
        let val = e.target.value;
        console.log( val );
        console.log( val != "" );
        if(val != ""){
            this.requestDICT_NET_BRAND_QueryTSP(this.props.store.userState.token, val);
            //this.setState({ ident_code: val });
        }else{
            this.setState({ isDisableInput: true });
        }
    }
    changeSelectDICT_NET_BRAND_QueryTSP = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        let client_name, client_id;
        this.state.DICT_NET_BRAND_QueryTSP.filter(function(currentElement, index, array){
            //console.log(currentElement);
            //console.log(currentElement.ident_code);
            // console.log(index);
            // console.log(array);
            if(currentElement.ident_code == inputValue){
                //console.log(currentElement.client_name);
                client_name = currentElement.client_name;
                client_id = currentElement.client_id;
            }
        })
        //console.log(client_name);
        //console.log(client_id);
        this.setState({
            ident_code: inputValue,
            client_name: client_name,
            client_id: client_id
        });
        this.requestDICT_NETWORK_MANAGERS( this.props.store.userState.token );
    }
    changeInputDICT_NETWORK_MANAGERS = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({ manager_id: inputValue });

        this.requestDICT_NET_BRAND(this.props.store.userState.token);
    }
    changeInputDICT_NET_BRAND = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({ brand_id: inputValue });

        this.requestDICT_NET_ENTITY(this.props.store.userState.token, inputValue);
    }
    changeInputDICT_NET_ENTITY = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            entity_id: inputValue,
            isDisableBtnSave: false
        });

    }
    save = () => {
        let body = {
            ident_code: Number(this.state.ident_code),
            client_id: Number(this.state.client_id),
            manager_id: Number(this.state.manager_id),
            brand_id: Number(this.state.brand_id),
            entity_id: Number(this.state.entity_id),
            client_name: this.state.client_name
        }
        console.log(body);
        this.requestDICT_NET_CLIENT(this.props.store.userState.token, body);
    }
    onKeyDownInputTest = () => {
        console.log('onKeyDownInputTest');
    }
    onChangeInputTest = () => {
        console.log('onChangeInputTest');
    }
    onChangeDatalistTest = () => {
        console.log('onChangeDatalistTest');
    }

    render() {

        console.log(this.state);
        console.log(this.state.DICT_NET_BRAND_QueryTSP);
        // console.log(this.state.value);
        // console.log(typeof this.state.value);
        let data = {
            disabled: false,
            dropup: false,
            flip: false,
            highlightOnlyResult: false,
            minLength: 1,
            open: undefined,
        }
        let style = {
            display: 'block',
            width: '100%',
        //     padding: .375rem .75rem
        //     font-size: 1rem;
        // font-weight: 400;
        // line-height: 1.5;
        // color: #212529;
        // background-color: #fff;
        // background-clip: padding-box;
        // border: 1px solid #ced4da;
        // -webkit-appearance: none;
        // appearance: none;
        // border-radius: .25rem;
        // transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

        return (
            <div className="coverTable DICT_NET_BRAND">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>
                    <div className="optionBlock"></div>
                </div>
                <div className="addbBlock">
                    <div className="coverInputs">


                        <label htmlFor="name_netWork">ІНН/ЄДРПОУ</label>
                        <input
                            //onChange={this.nameNetWork}
                            onBlur={this.ident_code} onKeyDown={this.hendleIdent_code}
                            //value={this.state.brand_name}
                            api_name="ident_code" id="ident_code" type="text" className={`${this.state.isDICT_NET_BRAND_QueryTSPEmpty ? 'errorEmpty' : ''} form-control`}
                            placeholder="Введіть код"
                        />
                        {
                            this.state.isDICT_NET_BRAND_QueryTSPEmpty
                                ?<span className="spanEmptyError">НЕзнайдено жодного ІНН/ЄДРПОУ</span>
                                :<></>
                        }
                        <input
                            className="form-control"
                            disabled={this.state.isDisableIdent_code ? 'disabled' : ''}
                            //onChange={this.ident_code}
                            //onBlur={this.ident_code}
                            name="DICT_NET_BRAND_QueryTSP" list="DICT_NET_BRAND_QueryTSP"
                            onChange={this.changeSelectDICT_NET_BRAND_QueryTSP}
                            title="Виберіть назву із списку"
                        />
                        <datalist
                            disabled={this.state.isDisableIdent_code ? 'disabled' : ''}
                            id="DICT_NET_BRAND_QueryTSP"
                            //onChange={this.changeSelectDICT_NET_BRAND_QueryTSP}
                            //onClick={this.changeSelectDICT_NET_BRAND_QueryTSP}
                            api_name="manager_name"
                        >

                            {
                                this.state.isShowDICT_NET_BRAND_QueryTSP
                                    ? this.state.DICT_NET_BRAND_QueryTSP.map((item, index) => {
                                        return < OptionItemDICT_NET_BRAND_QueryTSP key={index} optionItem={item}/>
                                    })
                                    : <></>
                            }
                        </datalist>
                        <label htmlFor="status">Назва ТСП</label>
                        <input className="form-control" disabled value={this.state.client_name} type="text"/>
                        {/*<label htmlFor="status">Назва ТСП</label>*/}
                        {/*<input*/}
                        {/*    disabled={this.state.isDisableInput ? 'disabled' : ''}*/}
                        {/*    //onChange={this.nameNetWork}*/}
                        {/*    onBlur={this.nameNetWork} onKeyDown={this.hendleNnameNetWork}*/}
                        {/*    //value={this.state.brand_name}*/}
                        {/*    api_name="brand_name" id="name_netWork" type="text" className="form-control"*/}
                        {/*/>*/}
                        <label htmlFor="DICT_NETWORK_MANAGERS">Менеджер ТСП</label>
                        <select disabled={this.state.isDisableInputDICT_NETWORK_MANAGERS ? 'disabled' : ''}  id="dropdown-basic-button" onChange={this.changeInputDICT_NETWORK_MANAGERS} api_name="manager_name" className="form-select" title="ТВБВ">
                            <option>-</option>
                            {
                                this.state.isShowSelectDICT_NETWORK_MANAGERS
                                    ? this.state.DICT_NETWORK_MANAGERS.map((item, index) => {
                                        return < OptionItemDICT_NETWORK_MANAGERS key={index} optionItem={item} manager_id={this.state.manager_id}/>
                                    })
                                    : <></>
                            }
                        </select>
                    </div>
                    <div className="coverInputs">

                        <label htmlFor="brand_region">Мережа</label>
                        <select disabled={this.state.isDisableInputDICT_NET_BRAND ? 'disabled' : ''} onChange={this.changeInputDICT_NET_BRAND} api_name="brand_region" id="brand_region" className="form-select"
                                title="Регіональні управління">
                            <option>-</option>
                            {
                                this.state.isShowSelectDICT_NET_BRAND
                                    ?
                                    this.state.DICT_NET_BRAND.map((item, index) => {
                                        return < OptionItemDICT_NET_BRAND key={index} optionItem={item} institution_id={this.state.brand_region}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select>
                        <label htmlFor="brand_region">2 рівень</label>
                        <select disabled={this.state.isDisableInputDICT_NET_ENTITY ? 'disabled' : ''} onChange={this.changeInputDICT_NET_ENTITY} api_name="brand_region" id="brand_region" className="form-select"
                                title="Регіональні управління">
                            <option>-</option>
                            {
                                this.state.isShowSelectDICT_NET_ENTITY
                                    ?
                                    this.state.DICT_NET_ENTITY.map((item, index) => {
                                        return < OptionItemDICT_NET_ENTITY key={index} optionItem={item}/>
                                    })
                                    : <>
                                    </>
                            }
                        </select>
                        <label htmlFor="status">ID менеджера ТСП</label>
                        <input
                            disabled
                            //onChange={this.nameNetWork}

                            value={this.state.manager_id}
                            api_name="brand_name" id="name_netWork" type="text" className="form-control"
                        />
                    </div>
                </div>

                <div className="coverBtn">
                    <button className="btn btn-success" disabled={this.state.isDisableBtnSave ? 'disabled' : ''} onClick={this.save}>Зберегти мережу</button>
                </div>



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
                                    <div className="title alert alert-primary">Упс1 Сталася помилка</div>
                                    <div className="msg">:(</div>
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

export default NETWORK_ADD_CLIENT



{/*<Autocomplete*/}
{/*    getItemValue={(item) => item.label}*/}
{/*    items={[*/}
{/*        { label: 'apple' },*/}
{/*        { label: 'banana' },*/}
{/*        { label: 'pear' }*/}
{/*    ]}*/}
{/*    renderItem={(item, isHighlighted) =>*/}
{/*        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>*/}
{/*            {item.label}*/}
{/*        </div>*/}
{/*    }*/}
{/*    value={value}*/}
{/*    onChange={(e) => value = e.target.value}*/}
{/*    onSelect={(val) => value = val}*/}
{/*/>*/}
{/*<ReactAutocomplete*/}
{/*    items={[*/}
{/*        {client_id: 6595650, client_name: "МП Октан1", entity_id: 0, entity_name: null, ident_code: "13351072"},*/}
{/*        {client_id: 6595651, client_name: "МП Октан2", entity_id: 1, entity_name: null, ident_code: "13351073"},*/}
{/*        {client_id: 6595651, client_name: "МП Октан3", entity_id: 1, entity_name: null, ident_code: "23351073"},*/}
{/*        {client_id: 6595651, client_name: "МП Октан4", entity_id: 1, entity_name: null, ident_code: "33351073"},*/}
{/*        {client_id: 6595651, client_name: "МП Октан5", entity_id: 1, entity_name: null, ident_code: "13451073"}*/}
{/*    ]}*/}
{/*    // items={[*/}
{/*    //*/}
{/*    // ]}*/}
{/*    shouldItemRender={(item, value) => {*/}
{/*            console.log(item.ident_code);*/}
{/*            console.log(typeof item.ident_code);*/}
{/*            console.log( value);*/}
{/*            console.log(typeof value);*/}
{/*            console.log(item.ident_code.indexOf(value));*/}
{/*            console.log( item.ident_code.indexOf(value)  > -1 );*/}
{/*            return item.ident_code.indexOf(value) > -1*/}
{/*        }*/}
{/*    }*/}
{/*    getItemValue={item => item.ident_code}*/}
{/*    renderItem={(item, highlighted) =>*/}
{/*        <div*/}
{/*            key={item.ident_code}*/}
{/*            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}*/}
{/*            className="autocompleteOption"*/}
{/*        >*/}
{/*            <span>{item.ident_code} </span>*/}
{/*            {item.client_name}*/}
{/*        </div>*/}
{/*    }*/}
{/*    value={this.state.value}*/}
{/*    onChange={*/}
{/*        (e) => {*/}
{/*            console.log(e.target.value);*/}
{/*            console.log(typeof e.target.value);*/}
{/*            this.setState({ value: e.target.value })*/}
{/*        }*/}
{/*    }*/}
{/*    onSelect={value => this.setState({ value })}*/}
{/*/>*/}
{/*<br/>*/}
{/*<ReactAutocomplete*/}

{/*    items={this.state.options}*/}
{/*    shouldItemRender={this.shouldItemRender}*/}
{/*    getItemValue={item => item.label}*/}
{/*    renderItem={this.renderItem }*/}
{/*    value={this.state.value}*/}
{/*    onChange={this.autocompleteOnChange}*/}
{/*    onSelect={this.autocompleteSelect}*/}
{/*    //wrapperProps={{ style: style }}*/}
{/*/>*/}