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