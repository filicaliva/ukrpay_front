import React from "react";
import * as axios from "axios";
import InputMask from "react-input-mask";





const ItemMccCode = (props) => {
    //console.log( props )
    return(
        <div className="blockSelectItem"  value={props.item.mcc_code} onClick={(e) => props.onClickBlockSelectItem(e)} >{props.item.mcc_name}</div>
    )
}
const BlockSelectItemTspName = (props) => {
    //console.log( props )
    return(
        <div className="blockSelectItem"  value={props.item.client_id} name={props.item.client_name} onClick={(e) => props.onClickBlockSelectItem(e)} >{props.item.client_name}</div>
    )
}
const BlockSelectItemIdentCode = (props) => {
    //console.log( props )
    return(
        <div className="blockSelectItem"  value={props.item.ident_code} onClick={(e) => props.onClickBlockSelectItem(e)} >{props.item.ident_code}</div>
    )
}

class AutocompleteInputTspName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,

            inputRequest: null,
            inputResult: this.props.tsp_name,

            isShowBlockSelect: false,
            isShowInputResult: false,
            isShowInputRequest: true,

            isLoading: false,

            selected: false
        }
        this.myRef = React.createRef();
    }


    componentDidMount() {
        window.addEventListener("mousedown", this.clickTest);
    }
    componentWillUnmount() {
        window.addEventListener("mousedown", null);
    }

    onChangeAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        this.props.addTspName(Number(0));
        this.setState({
            inputRequest: param,
            selected: false
        });
        if(param != '' && param.length >= 3){
            this.request(this.props.token, param, true);
        }
    }
    onClickAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        if(param != '' && param.length >= 3){
            this.request(this.props.token, param, true);
        }
        // this.setState({
        //     isShowBlockSelect: true
        // });
    }
    onBlurAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        // if(param != '' && param.length >= 3){
        //     this.request(this.props.token, param, false);
        // }
    }

    onClickAutocompleteInputRes = () => {
        this.setState({
            inputResult: null,
            isShowBlockSelect: true,
            isShowInputResult: false,
            isShowInputRequest: true,
        });
    }

    onBlurBlockSelect = () => {
        this.setState({
            isShowBlockSelect: false,
        });
    }

    onClickBlockSelectItem = (e) => {
        //console.log('----onClickBlockSelectItem-----');
        let val = e.currentTarget.getAttribute("value");
        let name = e.currentTarget.getAttribute("name");
        //console.log(val);
        //console.log('----onClickBlockSelectItem-----');
        if(val != ''){
            //console.log(this.state.InputDICT_MCC);
            //console.log(this.state.mcc_code);
            if(val != this.state.inputRequest){
                this.request(this.props.token, val, false);

                // let inputDataObj = this.props.AcquiringReportsCriteria;
                // inputDataObj.tsp_name = val;
                console.log(val);
                //console.log(typeof val);
                this.props.addTspName(Number(val));
                this.setState({
                    inputResult: name,
                    inputRequest: name,
                    isShowBlockSelect: false,
                    isShowInputResult: true,
                    isShowInputRequest: false,

                    selected: true
                });
            }
            this.setState({
                isShowBlockSelect: false,
            });
        }
    }

    clickTest = (e) => {
        if(this.myRef.current != null){
            if(this.myRef.current.className != e.target.parentElement.className){
                this.setState({
                    isShowBlockSelect: false,
                });
            }
        }
    }

    async request( token, param, showBlock) {
        this.setState({
            isLoading: true
        });
        console.log( token );
        const baseUrl = `/api/Dictionary/QueryTSP`;
        console.log( baseUrl );
        const body =
            {
                institution_id: this.props.institution_id,
                branch_id: this.props.branch_id,
                client_name: param,
            }
        console.log( body );
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
                //console.log(response.data.Table);



                if(response.data.tsp_list.TableRows == null){
                    this.setState({
                        data: [{client_name: "Незнайдено жодного результату"}],
                    });
                }else{
                    this.setState({
                        data: response.data.tsp_list.TableRows,
                    });
                }

                if(showBlock){
                    this.setState({
                        isShowBlockSelect: true
                    });
                }else{
                    this.setState({
                        isShowBlockSelect: false
                    });
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');
            });

    }
    render() {
        console.log(this.props);
        console.log(this.state);
        return(
            <div className="autocomplete">
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputRequest ? '' : 'dn '}form-control`}
                    placeholder="Введіть перші три букви..." type="text"
                    onBlur={this.onBlurAutocompleteInput}
                    onChange={this.onChangeAutocompleteInput}
                    onClick={this.onClickAutocompleteInput}
                    value={this.state.inputRequest}
                />
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputResult ? '' : 'dn '}form-control`}
                    placeholder="Результат" type="text"
                    value={this.state.inputResult}
                    onClick={this.onClickAutocompleteInputRes}
                />
                <div className={`${this.state.isShowBlockSelect ? '' : 'dn '}blockSelect`} onBlur={this.onBlurBlockSelect} ref={this.myRef} >
                    {
                        this.state.isShowBlockSelect
                            ? this.state.data != null
                            ? this.state.data.map((item, index) => {
                                return <BlockSelectItemTspName key={index} item={item} onClickBlockSelectItem={this.onClickBlockSelectItem}/>
                            })
                            : <></>
                            : <></>

                    }
                </div>
                {
                    this.state.isLoading
                        ? <div className="coverloader">
                            <div className="loader"></div>
                        </div>
                        : <></>
                }
            </div>
        )
    }
}
class AutocompleteInputIdentCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,

            inputRequest: null,
            inputResult: this.props.ident_code,

            isShowBlockSelect: false,
            isShowInputResult: false,
            isShowInputRequest: true,

            isLoading: false,

            selected: false
        }
        this.myRef = React.createRef();
    }


    componentDidMount() {
        window.addEventListener("mousedown", this.clickTest);
    }
    componentWillUnmount() {
        window.addEventListener("mousedown", null);
    }

    onChangeAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        this.props.addIdentCode(Number(0));
        this.setState({
            inputRequest: param,
            selected: false
        });
        if(param != '' && param.length >= 3){
            this.request(this.props.token, param, true);
        }
    }
    onClickAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        if(param != '' && param.length >= 3){
            this.request(this.props.token, param, true);
        }
        // this.setState({
        //     isShowBlockSelect: true
        // });
    }
    onBlurAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        // if(param != '' && param.length >= 3){
        //     this.request(this.props.token, param, false);
        // }
    }

    onClickAutocompleteInputRes = () => {
        this.setState({
            inputResult: null,
            isShowBlockSelect: true,
            isShowInputResult: false,
            isShowInputRequest: true,
        });
    }

    onBlurBlockSelect = () => {
        this.setState({
            isShowBlockSelect: false,
        });
    }

    onClickBlockSelectItem = (e) => {
        //console.log('----onClickBlockSelectItem-----');
        let val = e.currentTarget.getAttribute("value");
        //console.log(val);
        //console.log('----onClickBlockSelectItem-----');
        if(val != ''){
            //console.log(this.state.InputDICT_MCC);
            //console.log(this.state.mcc_code);
            if(val != this.state.inputRequest){
                this.request(this.props.token, val, false);

                // let inputDataObj = this.props.AcquiringReportsCriteria;
                // inputDataObj.tsp_name = val;
                console.log(val);
                //console.log(typeof val);
                this.props.addIdentCode(Number(val));
                this.setState({
                    inputResult: val,
                    inputRequest: val,
                    isShowBlockSelect: false,
                    isShowInputResult: true,
                    isShowInputRequest: false,

                    selected: true
                });
            }
            this.setState({
                isShowBlockSelect: false,
            });
        }
    }

    clickTest = (e) => {
        if(this.myRef.current != null){
            if(this.myRef.current.className != e.target.parentElement.className){
                this.setState({
                    isShowBlockSelect: false,
                });
            }
        }
    }

    async request( token, param, showBlock) {
        this.setState({
            isLoading: true
        });
        console.log( token );
        const baseUrl = `/api/Dictionary/QueryTSP`;
        console.log( baseUrl );
        const body =
            {
                institution_id: this.props.institution_id,
                branch_id: this.props.branch_id,
                ident_code: param,
            }
        console.log( body );
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
                //console.log(response.data.Table);



                if(response.data.tsp_list.TableRows == null){
                    this.setState({
                        data: [{ident_code: "Незнайдено жодного результату"}],
                    });
                }else{
                    this.setState({
                        data: response.data.tsp_list.TableRows,
                    });
                }

                if(showBlock){
                    this.setState({
                        isShowBlockSelect: true
                    });
                }else{
                    this.setState({
                        isShowBlockSelect: false
                    });
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');
            });

    }
    render() {
        console.log(this.props);
        console.log(this.state);
        return(
            <div className="autocomplete">
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputRequest ? '' : 'dn '}form-control`}
                    placeholder="Введіть перші три цифри..." type="text"
                    onBlur={this.onBlurAutocompleteInput}
                    onChange={this.onChangeAutocompleteInput}
                    onClick={this.onClickAutocompleteInput}
                    value={this.state.inputRequest}
                />
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputResult ? '' : 'dn '}form-control`}
                    placeholder="Результат" type="text"
                    value={this.state.inputResult}
                    onClick={this.onClickAutocompleteInputRes}
                />
                <div className={`${this.state.isShowBlockSelect ? '' : 'dn '}blockSelect`} onBlur={this.onBlurBlockSelect} ref={this.myRef} >
                    {
                        this.state.isShowBlockSelect
                            ? this.state.data != null
                            ? this.state.data.map((item, index) => {
                                return <BlockSelectItemIdentCode key={index} item={item} onClickBlockSelectItem={this.onClickBlockSelectItem}/>
                            })
                            : <></>
                            : <></>

                    }
                </div>
                {
                    this.state.isLoading
                        ? <div className="coverloader">
                            <div className="loader"></div>
                        </div>
                        : <></>
                }
            </div>
        )
    }
}
class AutocompleteInputMccCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,

            inputRequest: null,
            inputResult: this.props.mcc_code,

            isShowBlockSelect: false,
            isShowInputResult: false,
            isShowInputRequest: true,

            isLoading: false,

            selected: false
        }
        this.myRef = React.createRef();
    }


    componentDidMount() {
        window.addEventListener("mousedown", this.clickTest);
    }
    componentWillUnmount() {
        window.addEventListener("mousedown", null);
    }

    onChangeAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        this.props.addMccCode(Number(0));
        this.setState({
            inputRequest: param,
            selected: false
        });
        if(param != ''){
            this.request(this.props.token, param, true);
        }
    }
    onClickAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        if(param != ''){
            this.request(this.props.token, param, true);
        }
        // this.setState({
        //     isShowBlockSelect: true
        // });
    }
    onBlurAutocompleteInput = (e) => {
        let param = e.target.value;
        console.log(param);
        // if(param != '' && param.length >= 3){
        //     this.request(this.props.token, param, false);
        // }
    }

    onClickAutocompleteInputRes = () => {
        this.setState({
            inputResult: null,
            isShowBlockSelect: true,
            isShowInputResult: false,
            isShowInputRequest: true,
        });
    }

    onBlurBlockSelect = () => {
        this.setState({
            isShowBlockSelect: false,
        });
    }

    onClickBlockSelectItem = (e) => {
        //console.log('----onClickBlockSelectItem-----');
        let val = e.currentTarget.getAttribute("value");
        //console.log(val);
        //console.log('----onClickBlockSelectItem-----');
        if(val != ''){
            //console.log(this.state.InputDICT_MCC);
            //console.log(this.state.mcc_code);
            if(val != this.state.inputRequest){
                this.request(this.props.token, val, false);

                // let inputDataObj = this.props.AcquiringReportsCriteria;
                // inputDataObj.tsp_name = val;
                console.log(val);
                //console.log(typeof val);
                this.props.addMccCode(Number(val));
                this.setState({
                    inputResult: val,
                    inputRequest: val,
                    isShowBlockSelect: false,
                    isShowInputResult: true,
                    isShowInputRequest: false,

                    selected: true
                });
            }
            this.setState({
                isShowBlockSelect: false,
            });
        }
    }

    clickTest = (e) => {
        if(this.myRef.current != null){
            if(this.myRef.current.className != e.target.parentElement.className){
                this.setState({
                    isShowBlockSelect: false,
                });
            }
        }
    }
    async request( token, param, showBlock) {
        this.setState({
            isLoading: true
        });
        console.log( token );
        const baseUrl = `/api/Dictionary/DICT_MCC/?param1=${param}`;
        console.log( baseUrl );
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
                //console.log(response.data.Table);



                if(response.data.Table.TableRows == null){
                    this.setState({
                        data: [{mcc_code: "Незнайдено жодного результату"}],
                    });
                }else{
                    this.setState({
                        data: response.data.Table.TableRows,
                    });
                }

                if(showBlock){
                    this.setState({
                        isShowBlockSelect: true
                    });
                }else{
                    this.setState({
                        isShowBlockSelect: false
                    });
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');
            });

    }
    render() {
        console.log(this.props);
        console.log(this.state);
        return(
            <div className="autocomplete">
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputRequest ? '' : 'dn '}form-control`}
                    placeholder="Введіть код..." type="text"
                    onBlur={this.onBlurAutocompleteInput}
                    onChange={this.onChangeAutocompleteInput}
                    onClick={this.onClickAutocompleteInput}
                    value={this.state.inputRequest}
                />
                <input
                    className={`${this.state.selected ? 'selected ' : ''}${this.state.isShowInputResult ? '' : 'dn '}form-control`}
                    placeholder="Результат" type="text"
                    value={this.state.inputResult}
                    onClick={this.onClickAutocompleteInputRes}
                />
                <div className={`${this.state.isShowBlockSelect ? '' : 'dn '}blockSelect`} onBlur={this.onBlurBlockSelect} ref={this.myRef} >
                    {
                        this.state.isShowBlockSelect
                            ? this.state.data != null
                            ? this.state.data.map((item, index) => {
                                return <ItemMccCode key={index} item={item} onClickBlockSelectItem={this.onClickBlockSelectItem}/>
                            })
                            : <></>
                            : <></>

                    }
                </div>
                {
                    this.state.isLoading
                        ? <div className="coverloader">
                            <div className="loader"></div>
                        </div>
                        : <></>
                }
            </div>
        )
    }
}





addTspName = (val) => {
    console.log( val );
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.tsp_id = val;
    console.log( inputDataObj );
    this.setState({
        AcquiringReportsCriteria: inputDataObj,
    });
    console.log( this.state.AcquiringReportsCriteria.tsp_name );
}
addIdentCode = (val) => {
    console.log( val );
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.ident_code = val;
    console.log( inputDataObj );
    this.setState({
        AcquiringReportsCriteria: inputDataObj,
    });
}
addMccCode = (val) => {
    console.log( val );
    let inputDataObj = this.state.AcquiringReportsCriteria;
    inputDataObj.mcc_code = val;
    console.log( inputDataObj );
    this.setState({
        AcquiringReportsCriteria: inputDataObj,
    });
}




<AutocompleteInputTspName
    token={ this.props.store.userState.token }
    institution_id={ this.state.AcquiringReportsCriteria.institution_id }
    branch_id={ this.state.AcquiringReportsCriteria.bank_branch_id }
    addTspName={this.addTspName}
    tsp_name={this.state.AcquiringReportsCriteria.tsp_id}
/>

<AutocompleteInputIdentCode
    token={ this.props.store.userState.token }
    institution_id={ this.state.AcquiringReportsCriteria.institution_id }
    branch_id={ this.state.AcquiringReportsCriteria.bank_branch_id }
    addIdentCode={this.addIdentCode}
    ident_code={this.state.AcquiringReportsCriteria.ident_code}
/>


<AutocompleteInputMccCode
    token={ this.props.store.userState.token }
    addMccCode={this.addMccCode}
    mcc_code={this.state.AcquiringReportsCriteria.mcc_code}
/>


TSPReportSettingsSearchObj


InputMask


mask="999999999999"
type="text"
maskChar=""
alwaysShowMask="false"
pattern='[0-9]'







let rr = [{
    acquiring_type_id: 1,
    standard_report: true,
    extended_report: false,
    installment_report: false,
    report_format_id: 1,
    report_format_name: "Xls",
    report_period_type_id: 1,
    report_period_type_name: "Щоденно",
    channel_type_id: 1,
    channel_type_name: "ftp",
    file_name_mask: "TEST_MASK",
    file_path: "TEST"
},
{
    acquiring_type_id: 2,
    standard_report: true,
    extended_report: false,
    installment_report: false,
    report_format_id: 1,
    report_format_name: "Xls",
    report_period_type_id: 1,
    report_period_type_name: "Щоденно",
    channel_type_id: 22,
    channel_type_name: null,
    file_name_mask: "API_TEST_MASK",
    file_path: "TEST"
}]

let tt = {
    "acquiring_type_id": 0, //type_acquiring
    "tsp_list": [
        {
            "tsp_id": 0     //tsp_id
        }
    ],
    "main_settings": {
        "acquiring_type_id": 0,//type_acquiring
        "standard_report": true,
        "extended_report": true,
        "installment_report": true,
        "report_format_id": 0, //report_format_id
        "report_format_name": "string",
        "report_period_type_id": 0, //report_period_type_id
        "report_period_type_name": "string",
        "channel_type_id": 0, //channel_type_id
        "channel_type_name": "string",
        "file_name_mask": "string", //file_name_mask
        "file_path": "string"
    },
    "std_settings": [ //TSPReportSettingsSTD
        {
            "field_name": "string",
            "field_desc": "string",
            "include_flag": true,
            "order_number": 0
        }
    ]
}




let rr2 = {
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
};





let rr = () => {
    return(
        <div className={`${this.state.type_acquiring == acquiring_type_id ? '' : 'd-none'} border report`}>
            <div className="title">Перелік полів звіту ТСП</div>

            <button className="btn btn-secondary" disabled={standard_report ? '' : 'disabled'} onClick={this.openStandardReport} >Стандартний звіт</button>
            <button className="btn btn-secondary" disabled={extended_report ? '' : 'disabled'} >Розширений звіт</button>
            <button className="btn btn-secondary" disabled={installment_report ? '' : 'disabled'} >Звіт по операціям Installment</button>
            <br/>
            <div className="coverInput">
                <label htmlFor="file_format">Формат файлу</label>
                {
                    this.state.isShowREPORT_FORMAT
                        ? <select className="form-select" onChange={this.changeReport_format_id} name="DICT_REPORT_FORMAT" id="DICT_REPORT_FORMAT">
                            <option>-</option>
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
                        ? <select className="form-select" onChange={this.changeReport_period_type_id} name="DICT_REPORT_PERIOD_TYPE" id="DICT_REPORT_PERIOD_TYPE">
                            <option>-</option>
                            { this.state.DICT_REPORT_PERIOD_TYPE.map( ( item , index) => {
                                return < OptionItemDICT_REPORT_PERIOD_TYPE key={index} optionItem={item} report_period_type_id={report_period_type_id} />
                            }) }
                        </select>
                        : <span>Завантаження...</span>
                }
            </div>
            <div className="coverInput">
                <label htmlFor="file_name_mask">Маска назви файлу</label>
                <input defaultValue={file_name_mask} onChange={this.changeFile_name_mask} apiName="file_name_mask" className="customInput form-control" id="file_name_mask" type="text"/>
            </div>
            <div className="coverInput">
                <label htmlFor="сatalog">Каталог</label>
                <input disabled onChange={this.changeInput} apiName="сatalog" className="customInput form-control" id="сatalog" type="text"/>
            </div>
            <div className="coverInput">
                <label htmlFor="сhannel">Канал</label>
                {
                    this.state.isShowDICT_REPORT_CHANNEL_TYPE
                        ? <select className="form-select" onChange={this.changeChannel_type_id} name="DICT_REPORT_CHANNEL_TYPE" id="DICT_REPORT_CHANNEL_TYPE">
                            <option>-</option>
                            { this.state.DICT_REPORT_CHANNEL_TYPE.map( ( item , index) => {
                                return < OptionItemDICT_REPORT_CHANNEL_TYPE key={index} optionItem={item} channel_type_id={channel_type_id} />
                            }) }
                        </select>
                        : <span>Завантаження...</span>
                }

            </div>
            <br/>
            <div className="reportCoverBtn">
                <button className="btn btn-secondary" onClick={this.saveReport}>Зберегти</button>
            </div>
        </div>
    )
}



let res = {
    "institution_id": 0,          // РУ
    "bank_branch_id": 0,          // ТВБВ
    "ident_code": "string",       // ІНН/ЄДРПОУ
    "tsp_name": "string",         // Назва ТСП
    "tsp_id": "string",      //---------------

    "report_type_id": "string",   // Назва звіту
    "terminal_type_id": "string",  // вид терминала
    "merchant_id": 0,             // merchant id
    "terminal_id": 0,              // terminal id


    "payment_system_id": 0,        // карти
    "mcc_code": 0,                 // mcc
    "format_type_id": 0,           // формат файлу


    "date_type_id": 0,             // дата звіту
    "date_from": "string",        // перід звіту p
    "date_to": "string",          // перід звіту по
}



"report_type_id" : "REPORT_OPERATIONS",
    "dateFrom" : "20210622",
    "dateTo" : "20210622",
    "merchantId" : "20200202",
    "institutionId" : 824


anton.d
Anton2021



<a href="blob:http://192.168.65.71:8473/84f031cf-c246-4001-9455-93c1a46ea8a3" download="report.xls">Download file</a>




let arr = [
    {
        date_submitted: "2021-08-30T16:03:15",
        date_updated: "2021-08-30T16:03:15",
        report_id: 41,
        report_name: "Звіт Виписка операцій",
        status: "Сформовано",
        user: "OKURYLENKO"
    },
    {
        date_submitted: "2021-08-30T16:03:15",
        date_updated: "2021-08-30T16:03:15",
        report_id: 42,
        report_name: "Звіт Виписка операцій",
        status: "Не сформовано",
        user: "OKURYLENKO"
    }
]




let arr = [
    {field_name: "TRANS_DATE", field_desc: "Дата транзакції", include_flag: true, order_number: 1},
    {field_name: "TRANS_TIME", field_desc: "Час транзакції", include_flag: true, order_number: 2},
    {field_name: "BANKING_DATE", field_desc: "Дата обробки", include_flag: true, order_number: 3},
    {field_name: "TERMINAL_ID", field_desc: "ID термінала", include_flag: true, order_number: 4},
    {field_name: "SERIAL_NUMBER", field_desc: "с/н термінала", include_flag: true, order_number: 5},
    {field_name: "MERCHANT_ID", field_desc: "ID мерчанта", include_flag: true, order_number: 6}
]



let arr = [
    {field_name: "TRANS_DATE", field_desc: "Дата транзакції", include_flag: true, order_number: 1},
    {field_name: "TRANS_TIME", field_desc: "Час транзакції", include_flag: true, order_number: 2},
    {field_name: "BANKING_DATE", field_desc: "Дата обробки", include_flag: true, order_number: 3},
    {field_name: "TERMINAL_ID", field_desc: "ID термінала", include_flag: true, order_number: 4},
    {field_name: "SERIAL_NUMBER", field_desc: "с/н термінала", include_flag: true, order_number: 5},
    {field_name: "MERCHANT_ID", field_desc: "ID мерчанта", include_flag: true, order_number: 6}
]
let row = {field_name: "MERCHANT_ID", field_desc: "ID мерчанта", include_flag: true, order_number: 99}
arr.map(( item , index) => {

})




let rr3 = {
    contact_person: "",
    contact_phone: "",
    contact_position: "",
    contact_email: "",
    brand_status_code: null,
    brand_region: null,
    manager_name: null,
};

let w = {
    "brand_id": 0,
    "brand_name": "string",
    "brand_status_code": "string",
    "brand_region": "string",
    "contact_person": "string",
    "contact_phone": "string",
    "contact_position": "string",
    "contact_email": "string",
    "entity_id": 0,
    "entity_name": "string",
    "ident_code": 0,
    "entity_region": "string",
    "client_id": 0,
    "client_name": "string",
    "bin": "string",
    "bankname": "string",
    "banknameloc": "string",
    "emberid": "string",
    "cardtypename": "string",
    "country": "string",
    "bank_range_name": "string",
    "min_number": "string",
    "max_number": "string",
    "manager_id": 0,
    "manager_name": "string",
    "institution_id": 0
}

async requestDICT_MCC  ( token, param, showBlock) {
    this.props.store.changeLoading(true);
    console.log( token );
    const baseUrl = `/api/Dictionary/DICT_MCC/?param1=${param}`;
    console.log( baseUrl );
    await axios.get(
        baseUrl,
        {
            headers: {"Token" : `${ token }`}
        }
    )
        .then((response) => {
            console.log(response.data);
            //console.log(response.data.Table);



            if(response.data.Table.TableRows == null){
                this.setState({
                    DICT_MCC: [{mcc_code: "", mcc_name: "За даним кодом незнайдено жодного результату"}],
                });
            }else{
                this.setState({
                    DICT_MCC: response.data.Table.TableRows,
                });
            }

            if(showBlock){
                this.setState({
                    isShowBlockSelectDICT_MCC: true
                });
            }else{
                this.setState({
                    isShowBlockSelectDICT_MCC: false
                });
            }


            this.props.store.changeLoading(false);


        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.response.data);
            //console.log('error_catch');
        });

}

Юзер Юзерович Юзеренко


const OptionItemDICT_NETWORK_MANAGERS = (props) => {
    console.log( props )
    return(
        <option
            selected={props.optionItem.manager_id == props.manager_id ? 'selected' : ''}
            value={props.optionItem.manager_id}
        >{props.optionItem.manager_name}</option>
        // <Dropdown.Item  onClick={() => this.selectRoleID} value={props.optionItem.role_id} >{props.optionItem.role_name}</Dropdown.Item>
    )
}



let newObj = {
    GetNewEntityId: 578210,
    edrpou: "1",

}


const SampleComponent = (props) => {
    console.log( props )
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
    return(
        <div className="twoLevel">
            <div className="innerBlock">
                <label htmlFor="edrpou">ЄДРПОУ</label>
                <input  api_name="edrpou" GetNewEntityId={props.item.GetNewEntityId}  value={props.item.edrpou} id="edrpou" type="text" className="form-control"/>
                <label htmlFor="brand_id">Назва 2-го рівня</label>
                <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>
                <label htmlFor="brand_id">Менеджер</label>
                <select  id="dropdown-basic-button" onChange={this.changeInput} api_name="manager_name" className="form-select" title="ТВБВ">
                    <option>-</option>
                    {
                        props.DICT_NETWORK_MANAGERS.map((item, index) => {
                            return < OptionItemDICT_NETWORK_MANAGERS key={index} optionItem={item}/>
                        })
                    }
                </select>
            </div>
            <div className="innerBlock">
                <label htmlFor="brand_id">ID 2-го рівня</label>
                <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>
                <label htmlFor="brand_id">ID РУ</label>
                <input api_name="brand_id" id="brand_id" type="text" className="form-control"/>
            </div>
        </div>
    )
}

ЄДРПОУ             ident_code
Назва 2-го рівня   entity_name
Менеджер           manager_name
ID 2-горівня       entity_id
ID РУ              institution_id





ЄДРПОУ             ident_code
Назва ТСП      client_name + client_id

Менеджер ТСП    manager_id

Мережа      brand_id
2 рівень      entity_id




<div
key={item.ident_code}
style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
className="autocompleteOption"
    >
    <span>{item.ident_code} </span>
{item.client_name}
</div>  13351072


isDisableInputDICT_NETWORK_MANAGERS: true,
DICT_NETWORK_MANAGERS: null,
isShowSelectDICT_NETWORK_MANAGERS: false,


this.setState({
DICT_NETWORK_MANAGERS: response.data.Table.TableRows,
isShowSelectDICT_NETWORK_MANAGERS: true
});


isDisableInputDICT_NET_BRAND: true,
isShowSelectDICT_NET_BRAND: false,
DICT_NET_BRAND: null,


isDisableInputDICT_NET_ENTITY: false,
isShowSelectDICT_NET_ENTITY: true,
DICT_NET_ENTITY: response.data.Table.TableRows,


date_from: "20210924"
date_to: "20210922"
date_type_id: 1
institution_id: "824"
merchant_id: 0

terminal_type_id: "2"


date_from: null,
date_to: null,

date_type_id: null,
institution_id: null,
merchant_id: null,
terminal_type_id: null,

isInstitution_idValidation: true,
isMerchant_idValidation
isTerminal_type_idValidation
isDate_type_idValidation
isDate_fromValidation
isDate_toValidation


className={`${this.state.isInstitution_idValidation ? '' : 'validError'} form-select`}
//
let rr1 = () => {
if(param == '' ){
console.log(param);
this.setState({
isShowSelectTVBV: true,
TSPReportSettingsSearchObj: inputDataObj,
isInstitution_idValidation: false
});
}else{
this.setState({
isShowSelectTVBV: false,
TSPReportSettingsSearchObj: inputDataObj,
isInstitution_idValidation: true,
institution_id: param
});
this.requestDICT_BRANCH(this.props.store.userState.token, param);
}
}



DICT_MCC: response.data.Table.TableRows,
isShowBlockSelectDICT_MCC: true

isShowInputDICT_MCC
isShowInputResDICT_MCC

className={`${this.state.isShowBlockSelectDICT_MCC ? '' : 'dn'} blockSelect`}




isShowInputTsp_name
isShowInputResTsp_name
isShowBlockSelectTsp_name

isShowBlockSelectTsp_name




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


this.props.token
institution_id: this.props.institution_id,
branch_id: this.props.branch_id,





data: null,

inputRequest: null,
isShowBlockSelect: false,
isShowInputResult: false,
isShowInputRequest: true,


isShowBlockSelectDICT_MCC  isShowBlockSelect