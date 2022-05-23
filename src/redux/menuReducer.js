

let isLoading = 'isLoading';
let tableData = 'tableData';
let operationName = 'operationName';
let showPopupTable = 'showPopupTable';
let roleData = 'roleData';

let initialState = {
    isLoading: false,
    showTable: false,
    tableData: null,
    nameOperation: null,
    operation: null,
    showPopupTable: false,
    typePopup: null,
    roleData: null
}



const menuReducer = (state = initialState, action ) => {
    //console.log(state);
    //console.log(action);
    //console.log('zaushlo - commonReducer');
    switch (action.type) {

        case 'showPopupTable' :
            let stateShowPopupTable= {...state};
            stateShowPopupTable.showPopupTable = action.showPopupTable;
            stateShowPopupTable.typePopup = action.typePopup;
            console.log(stateShowPopupTable);
            return stateShowPopupTable;
        case 'isLoading' :
            let stateIsLoading= {...state};
            stateIsLoading.isLoading = action.loading;
            console.log(stateIsLoading);
            return stateIsLoading;
        case 'tableData' :
            let stateAddTableData= {...state};
            console.log(action.tableData);
            console.log( action.tableData != 'empty' );
            stateAddTableData.tableData = action.tableData;
            // if(action.tableData != 'empty') {
            //     stateAddTableData.tableData = action.tableData;
            // }
            stateAddTableData.showTable = action.showTable;
            console.log(stateAddTableData);
            return stateAddTableData;
        case 'operationName' :
            let stateOperationName= {...state};
            stateOperationName.nameOperation = action.nameOperation;
            stateOperationName.operation = action.operation;
            console.log(stateOperationName);
            return stateOperationName;
        case 'roleData' :
            let stateRoleData= {...state};
            stateRoleData.roleData = action.roleData;
            console.log(stateRoleData);
            return stateRoleData;

        default:
            return state;
    }
}

export const showPopupTableCreator = (value, typePopup) => {
    console.log(value);
    return {
        type: showPopupTable, showPopupTable: value, typePopup:typePopup
    }
}
export const addTableDataCreator = (showTable, operation) => {
    console.log(showTable);
    console.log(operation);
    return {
        type: tableData,
        showTable: showTable,
        tableData: operation
    }
}
export const changeLoadingCreator = (loading) => {
    //console.log(operation);
    return {
        type: isLoading, loading: loading
    }
}
export const operationNameCreator = (nameOperation, operation) => {
    console.log(nameOperation);
    console.log(operation);
    return {
        type: operationName, nameOperation: nameOperation, operation: operation
    }
}
export const roleDataCreator = (role) => {
    console.log(roleData);
    return {
        type: roleData, roleData: role
    }
}



export default menuReducer;


