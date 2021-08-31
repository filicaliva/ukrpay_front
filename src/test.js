import React from "react";

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