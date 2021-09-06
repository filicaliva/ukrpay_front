import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {useState} from "react";
import * as axios from "axios";
import {Field, reduxForm} from "redux-form";


const renderField = ({input, label, type, meta: {touched, error, warning}, defaultValue }) => {
    // console.log(input);
    // console.log(label);
    // console.log(type);
    // console.log(value);
    // console.log(initialValue);
    // console.log(defaultValue);
    // console.log(currentValue);
    return (
        <div className="coverInput ">
            <label htmlFor={label}>{label}</label>
            <div>
                <input id={label} {...input} placeholder={label} type={type} value={defaultValue}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
};
const renderFieldCheckBox = ({input, label, type, meta: {touched, error, warning}, defaultValue }) => {
    // console.log(input);
    // console.log(label);
    // console.log(type);
    // console.log(value);
    // console.log(initialValue);
    console.log(defaultValue);
    // console.log(currentValue);
    // const [rowVal, setRowVal] = useState(defaultValue);
    return (
        <div className="coverInput ">
            <label htmlFor={label}>{label}</label>
            <div>
                <input id={label} {...input} placeholder={label} type={type} defaultValue={defaultValue}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
};

const required = value => value ? undefined : 'Обовязкове поле';
const editForm = (props) => {
    console.log(props);
    console.log(props.initialValues.value);
   // console.log(props.selectRow.user_code);
    //console.log(this.props.menuState.isLoading);
    // const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <Field name="user_code" type="text"
                   component={renderField} label="Код користувача"
                   validate={required}
                   defaultValue={props.initialValues.user_code}
            />
            {/*<Field name="status_code" type="checkbox" component={renderFieldCheckBox} label="Статус користувача"*/}
            {/*       defaultValue={props.selectRow.status_code}/>*/}
            <Field name="user_name" type="text" component={renderField} label="Ім'я користувача"
                   defaultValue={props.initialValues.user_name}/>
            <Field name="user_position" type="text" component={renderField} label="Посада користувача"
                   defaultValue={props.initialValues.user_position}/>
            <Field name="mobile" type="text" component={renderField} label="Телефон" defaultValue={props.initialValues.mobile}/>
            <Field name="user_email" type="text" component={renderField} label="Email" defaultValue={props.initialValues.user_email}/>
            <Field name="division" type="text" component={renderField} label="Відділ" defaultValue={props.initialValues.division}/>
            <Field name="user_role" type="text" component={renderField} label="Роль" defaultValue={props.initialValues.user_role}/>

            <div className="coverBtn">
                <button className="btn btn-success" type="submit">Зберегти</button>
                <button onClick={props.closeEditForm} className="btn btn-danger">Закрити</button>
            </div>
        </form>
    )

}
const AddForm = (props) => {
    console.log(props);
    //console.log(this.props.menuState.isLoading);
    // const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form className="form" onSubmit={props.handleSubmitAdd}>
            <Field name="user_code" type="text"
                   component={renderField} label="Код користувача"
                   validate={required}
            />
            {/*<Field name="status_code" type="checkbox" component={renderFieldCheckBox} label="Статус користувача"*/}
            {/*       defaultValue={props.selectRow.status_code}/>*/}
            <Field name="user_name" type="text" component={renderField} label="Ім'я користувача"/>
            <Field name="user_position" type="text" component={renderField} label="Посада користувача"/>
            <Field name="mobile" type="text" component={renderField} label="Телефон" />
            <Field name="user_email" type="text" component={renderField} label="Email" />
            <Field name="division" type="text" component={renderField} label="Відділ" />
            <Field name="user_role" type="text" component={renderField} label="Роль" />

            <div className="coverBtn">
                <button className="btn btn-success" type="submit">Додати</button>
                <button onClick={props.closeEditForm} className="btn btn-danger">Скасувати</button>
            </div>
        </form>
    )

}
let EditADMIN_USERSForm = reduxForm({
    form: 'editForm'
    // initialValues: {
    //         account: null,
    //         bank_branch_id: 0,
    //         branch_name: "Тут буде банк бренч",
    //         date_registered: "04/08/2021",
    //         department: null,
    //         division: null,
    //         ipphone: null,
    //         language_code: "UK",
    //         language_name: "Українська",
    //         last_logon_date: null,
    //         middle_name: null,
    //         mobile: null,
    //         name: null,
    //         office: null,
    //         phone: null,
    //         region: null,
    //         role_name: "Розробник",
    //         status: "Активний",
    //         status_code: "ACTIVE",
    //         surname: null,
    //         tvbv: "no_data",
    //         user_code: "TEST22",
    //         user_email: null,
    //         user_name: "Test",
    //         user_position: "tester",
    //         user_role: "DEV"
    //
    // }
})(editForm);


// let EditADMIN_USERSForm = reduxForm({
//     form: 'editForm'
//     initialValues: {
//             account: null,
//             bank_branch_id: 0,
//             branch_name: "Тут буде банк бренч",
//             date_registered: "04/08/2021",
//             department: null,
//             division: null,
//             ipphone: null,
//             language_code: "UK",
//             language_name: "Українська",
//             last_logon_date: null,
//             middle_name: null,
//             mobile: null,
//             name: null,
//             office: null,
//             phone: null,
//             region: null,
//             role_name: "Розробник",
//             status: "Активний",
//             status_code: "ACTIVE",
//             surname: null,
//             tvbv: "no_data",
//             user_code: "TEST22",
//             user_email: null,
//             user_name: "Test",
//             user_position: "tester",
//             user_role: "DEV"
//
//     }
// })(editForm);
// EditADMIN_USERSForm = connect(
//     state => ({
//         initialValues: state.account.data // pull initial values from account reducer
//     }),
//     { load: loadAccount } // bind account loading action creator
// )(EditADMIN_USERSForm)


const AddADMIN_USERSForm = reduxForm({ form: 'AddForm' })(AddForm);

class TableADMIN_USERS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { id: 'id', text: 'Id' },
                { id: 'name', text: 'Name' },
                { id: 'animal', text: 'Animal' },
            ],
            data:[
                { id: 1, name: 'George', animal: 'Monkey' },
                { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
                { id: 3, name: 'Alice', animal: 'Giraffe' },
                { id: 4, name: 'Alice', animal: 'Tiger' }
            ],
            user_code: "",
            user_name: "",
            only_active: false,
            isShowTable: false,
            isShowDeleteBlock: false,
            dateBlock: null,

            role:null,

            selectRow: null,
            addRow: {},
            isDisableButton: true,
            isShowEditBlock: false,
            isShowAddBlock: false,

            value: {
                user_code: "TEST22"
            },
            initialValues: {
                account: null,
                bank_branch_id: 0,
                branch_name: "Тут буде банк бренч",
                date_registered: "04/08/2021",
                department: null,
                division: null,
                ipphone: null,
                language_code: "UK",
                language_name: "Українська",
                last_logon_date: null,
                middle_name: null,
                mobile: null,
                name: null,
                office: null,
                phone: null,
                region: null,
                role_name: "Розробник",
                status: "Активний",
                status_code: "ACTIVE",
                surname: null,
                tvbv: "no_data",
                user_code: "TEST22",
                user_email: null,
                user_name: "Test",
                user_position: "tester",
                user_role: "DEV"
            }
        }
        console.log(this.props);
    }
    async requestADMIN_USERS  (token) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/User`;
        const userBody = {
            user_code: this.state.user_code,
            user_name: this.state.user_name,
            bank_branch_id: 0,
            only_active: this.state.only_active

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
                console.log(response.data.users);
                //console.log(response.data.Table);


                //this.props.store.showTable(true);

                this.props.store.addTableData(true, response.data.users);
                this.setState({isShowTable: true});

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_USERS_delete  (token, selectRow) {
        this.props.store.changeLoading(true);
        console.log( token );
        const baseUrl = `/api/User/${this.state.selectRow.user_code}/0/${this.state.dateBlock}`;
        await axios.delete(
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
                // this.setState({isShowTable: true});

                // this.setState({
                //     user_code: null,
                //     isShowDeleteBlock: false
                // });

                this.closeEditForm();
                this.requestADMIN_USERS(this.props.store.userState.token);

                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_USERS_add  (token, userBody) {
        this.props.store.changeLoading(true);
        console.log( token );
        console.log( userBody );
        const baseUrl = `/api/User`;
        await axios.put(
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
                // this.setState({isShowTable: true});
                // this.setState({
                //     selectRow: {},
                //     isShowEditBlock: false,
                //     isShowAddBlock: false
                // });
                this.closeEditForm();
                this.requestADMIN_USERS(this.props.store.userState.token);
                this.props.store.changeLoading(false);
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    async requestADMIN_ROLES  (token) {
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



                this.setState({
                    isShowEditBlock: true,
                    role: response.data.roles
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
    changeUserCode = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            user_code: inputValue
        });
    }
    changeUserName = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            user_name: inputValue
        });
    }
    changeOnlyActive = (e) => {
        // let apiName = e.currentTarget.getAttribute("apiName");
        // console.log(apiName);
        let inputValue = e.target.checked;
        console.log(inputValue);
        this.setState({
            only_active: inputValue
        });
    }
    search = () => {
        this.requestADMIN_USERS(this.props.store.userState.token);
    }
    addId = (arr) => {
        if(arr == 'empty'){
            arr = [];
        }
        //console.log(arr);
        let newArr = [];
        let resultObj = arr.reduce((res, item, index) => {
            //console.log(res);
            //console.log(item);
            let newObj = {...item};
            newObj.id = index;
            //console.log(newObj);
            newArr.push(newObj);
        }, 0);
        //console.log(newArr);
        return newArr;
    }
    // deleteUser = (obj) => {
    //     console.log(obj);
    //     this.setState({
    //         user_code: obj[0].user_code,
    //         isShowDeleteBlock: true
    //     });
    // }
    closePopup = () => {
        console.log();
        this.setState({
            user_code: null,
            isShowDeleteBlock: false
        });
    }

    requestDeleteUser = () => {
        this.requestADMIN_USERS_delete(this.props.store.userState.token);
    }
    changeDate = (e) => {
        let inputValue = e.target.value;
        console.log(inputValue);
        this.setState({
            dateBlock: this.formatDate(new Date(inputValue))
        });
    }
    formatDate = (date) => {
        let day = date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear();
        return year + month + day;
    }
    addNewUser = (obj) => {
        console.log(obj);
        delete obj.id
        console.log(obj);
        this.requestADMIN_USERS_add(this.props.store.userState.token, obj);
    }

    editHandle = () => {
        this.requestADMIN_ROLES(this.props.store.userState.token);
    }
    addHandle = () => {
        this.setState({
            isShowAddBlock: true
        });
    }
    deleteHandle = () => {
        this.setState({
            isShowDeleteBlock: true
        });
    }




    closeEditForm = () => {
        console.log('close');
        this.setState({
            selectRow: {},
            isShowEditBlock: false,
            isShowAddBlock: false,
            isShowDeleteBlock: false
        });
    }

    changeInputSelect = (e) => {
        let keyName = e.currentTarget.getAttribute("name");
        console.log(keyName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.selectRow;
        inputDataObj.[keyName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            selectRow: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.selectRow);
    }
    changeInput = (e) => {
        let keyName = e.currentTarget.getAttribute("name");
        console.log(keyName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.selectRow;
        inputDataObj.[keyName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            selectRow: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.selectRow);
    }
    changeInputAdd = (e) => {
        let keyName = e.currentTarget.getAttribute("name");
        console.log(keyName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.addRow;
        inputDataObj.[keyName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            addRow: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.addRow);
    }
    saveUser = () => {
        console.log(this.state.selectRow);
        this.requestADMIN_USERS_add(this.props.store.userState.token, this.state.selectRow);
    }
    addUser = () => {

        console.log(this.state.addRow);
        this.requestADMIN_USERS_add(this.props.store.userState.token, this.state.addRow);
    }
    deleteUser = () => {
        console.log(this.state.addRow);
        this.requestADMIN_USERS_delete(this.props.store.userState.token);
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
        //console.log(this.props.store.menuState.tableData);
        // console.log(this.addId(this.props.store.menuState.tableData));
        console.log(this.props);
        console.log(this.state);
        const onDeleteRow = (rowKeys) => {
            //console.log(rowKeys);
            //alert('You deleted: ' + rowKeys)
            let res;
            for(let i = 0; i != rowKeys.length; i++){
                res = this.addId(this.props.store.menuState.tableData).filter((item) => {
                    return item.id == rowKeys[i]
                })
            }
            //localStorage.setItem("rows", JSON.stringify(this.state.columns))
            //console.log(res);
            this.deleteUser(res);
            //console.log(rowKeys);
        }
        const onInsertRow = (row) => {
            let newRowStr = ''
            for (const prop in row) {
                //console.log(row);
                newRowStr += prop + ': ' + row[prop] + ' \n'
                //obj.prop.row[prop]
            }
            //console.log(newRowStr);
            console.log(row);
            this.addNewUser(row);
            //alert('You inserted:\n ' + newRowStr)
        }
        const cellEditFactory = {
            mode: 'dbclick',
            blurToSave: true,
            // nonEditableRows: () => [0, 3],
            beforeSaveCell(oldValue, newValue, row, column, done) {
                // console.log( oldValue );
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( done );
                // console.log( '-----------------' );
                // setTimeout(() => {
                //     if (window.confirm('Do you want to accep this change?')) {
                //         done(); // contine to save the changes
                //     } else {
                //         done(false); // reject the changes
                //     }
                // }, 0);
                // return { async: true };
            },
            afterSaveCell: (oldValue, newValue, row, column) => {
                console.log( oldValue );
                delete oldValue.id
                console.log( oldValue );
                this.requestADMIN_USERS_add(this.props.store.userState.token, oldValue);
                // console.log( newValue );
                // console.log( row );
                // console.log( column );
                // console.log( '-----------------' );
            }
        }
        const selectRowProp = {
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex) => {
                this.setState({
                    selectRow: row,
                    isDisableButton: false
                });
                // console.log("row", row);
                // console.log("isSelect", isSelect);
                // console.log("rowIndex", rowIndex);
                //console.log(this.state);
            }
        }
        const options = {
            afterInsertRow: onInsertRow,
            afterDeleteRow: onDeleteRow
        }
        const OptionItem = (props) => {
            console.log( props );
            return(
                <option
                    selected={props.optionItem.role_id == this.state.selectRow.user_role ? 'selected' : ''}
                    value={props.optionItem.role_id}
                >{props.optionItem.role_name}</option>
            )
        }

        return (
            <div className="coverTable TableADMIN_USERS">
                <div className="headerTable">
                    <div className="titleTable">{this.activeOperation(this.props.store.userState.OPERATIONS, this.props.store.location.pathname.substr(11))}</div>

                </div>
                <div className="filter">
                    <div className="coverInput">
                        <label htmlFor="user_code">Код користувача</label>
                        <input onChange={this.changeUserCode} defaultValue={this.state.user_code} className="customInput" id="user_code" type="text"/>
                    
                        <label htmlFor="user_name">Імя користувача</label>
                        <input onChange={this.changeUserName} defaultValue={this.state.user_name} className="customInput" id="user_name" type="text"/>
                    </div>
                    <div className="coverCheckbox">
                        <label htmlFor="status_code">Тільки активні користувачі</label>
                        <input onChange={this.changeOnlyActive} id="status_code" type="checkbox"/>
                    </div>
                    <button className="search btn btn-primary" onClick={this.search}>Пошук</button>
                </div>
                {
                    this.state.isShowDeleteBlock
                        ? <div className="coverDeleteBlock">
                            <div className="innerBlock">
                                <div className="coverInput">
                                    <label htmlFor="user_code">Код користувача</label>
                                    <input  defaultValue={this.state.selectRow.user_code} className="customInput" id="user_code" type="text" disabled/>
                                </div>
                                <div className="coverInput">
                                    <label htmlFor="user_date">Дата до якої призупинити користувача</label>
                                    <input onChange={this.changeDate} className="customInput" id="user_date" type="date"/>
                                </div>
                                <button className="btn btn-danger" onClick={this.requestDeleteUser}>Видалити користувача</button>
                                <button className="btn btn-secondary" onClick={this.closeEditForm}>Скасувати</button>
                            </div>
                        </div>
                        : <></>
                }
                {
                    this.state.isShowEditBlock
                        ? <div className="coverEditBlock">
                            <div className="innerBlock">
                                <input onChange={this.changeInput} name="user_code" type="text" placeholder="Код користувача" defaultValue={this.state.selectRow.user_code} disabled/>
                                {/*<Field name="status_code" type="checkbox" component={renderFieldCheckBox} label="Статус користувача"*/}
                                {/*       defaultValue={props.selectRow.status_code}/>*/}
                                <input onChange={this.changeInput} name="user_name" type="text" placeholder="Ім'я користувача"
                                       defaultValue={this.state.selectRow.user_name}/>
                                <input onChange={this.changeInput} name="user_position" type="text"  placeholder="Посада користувача"
                                       defaultValue={this.state.selectRow.user_position}/>
                                <input onChange={this.changeInput} name="mobile" type="text"  placeholder="Телефон" defaultValue={this.state.selectRow.mobile}/>
                                <input onChange={this.changeInput} name="user_email" type="text"  placeholder="Email" defaultValue={this.state.selectRow.user_email}/>
                                <input onChange={this.changeInput} name="division" type="text"  placeholder="Відділ" defaultValue={this.state.selectRow.division}/>
                                {/*<input onChange={this.changeInput} name="user_role" type="text"  placeholder="Роль" defaultValue={this.state.selectRow.user_role}/>*/}

                                <select onChange={this.changeInputSelect} name="user_role" id="dropdown-basic-button" className="form-select"
                                        title="Виберіть роль">
                                    {this.state.role.map((item, index) => {
                                        return < OptionItem key={index} optionItem={item}/>
                                    })}
                                    {/*<Dropdown.Item onClick={this.logOut} as="button">Вийти</Dropdown.Item>*/}
                                </select>

                                <div className="coverBtn">
                                    <button onClick={this.saveUser} className="btn btn-success" >Зберегти</button>
                                    <button onClick={this.closeEditForm} className="btn btn-secondary">Закрити</button>
                                </div>
                                {/*<input type="text" defaultValue={this.state.value.user_code}/>*/}
                                {/*<EditADMIN_USERSForm selectRow={this.state.selectRow} store={this.props} closeEditForm={this.closeEditForm} onSubmit={this.requestEdit} />*/}
                            </div>
                        </div>
                        : <></>
                }
                {
                    this.state.isShowAddBlock
                        ? <div className="coverAddBlock">
                            <div className="innerBlock">
                                <input onChange={this.changeInputAdd} name="user_code" type="text" placeholder="Код користувача"/>
                                {/*<Field name="status_code" type="checkbox" component={renderFieldCheckBox} label="Статус користувача"*/}
                                {/*       defaultValue={props.selectRow.status_code}/>*/}
                                <input onChange={this.changeInputAdd} name="user_name" type="text" placeholder="Ім'я користувача"/>
                                <input onChange={this.changeInputAdd} name="user_position" type="text"  placeholder="Посада користувача"/>
                                <input onChange={this.changeInputAdd} name="mobile" type="text"  placeholder="Телефон" />
                                <input onChange={this.changeInputAdd} name="user_email" type="text"  placeholder="Email" />
                                <input onChange={this.changeInputAdd} name="division" type="text"  placeholder="Відділ" />
                                <input onChange={this.changeInputAdd} name="user_role" type="text"  placeholder="Роль" />
                                <div className="coverBtn">
                                    <button onClick={this.addUser} className="btn btn-success" >Зберегти</button>
                                    <button onClick={this.closeEditForm} className="btn btn-secondary">Закрити</button>
                                </div>
                                {/*<input type="text" defaultValue={this.state.selectRow.user_code}/>*/}
                                {/*<AddADMIN_USERSForm store={this.props} closeEditForm={this.closeEditForm} onSubmit={this.handleSubmitAdd} />*/}
                            </div>
                        </div>
                        : <></>
                }



                <div className="innerTable">
                    <div className="Table">
                        {
                            this.state.isShowTable
                                ? <>
                                    <div className="controlBlock">
                                        <button
                                            onClick={this.editHandle}
                                            disabled={this.state.isDisableButton ? 'disabled' : ''}
                                            className="btn btn-secondary"
                                        >Редагування</button>
                                        <button onClick={this.addHandle} className="btn btn-info">Додавання</button>
                                        <button onClick={this.deleteHandle} disabled={this.state.isDisableButton ? 'disabled' : ''} className="btn btn-warning">Видалення</button>
                                    </div>
                                    <BootstrapTable data={this.props.store.menuState.tableData}
                                        // insertRow={true}
                                        // deleteRow={true}
                                                    selectRow={selectRowProp}
                                                    // options={options}
                                        // cellEdit={cellEditFactory}
                                    >

                                        {/*{this.testRendColums}*/}


                                        {/*<TableHeaderColumn isKey dataField='id' width="40"  tdStyle={{ "text-align": 'center' }} autoValue >*/}
                                        {/*    №*/}
                                        {/*</TableHeaderColumn>*/}

                                        {/*<TableHeaderColumn dataField='edit' dataFormat={ this.imgFormatter }>Edit</TableHeaderColumn>*/}

                                        <TableHeaderColumn isKey  dataField='user_code'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Код користувача
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='status_code'  filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Статус користувача
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='user_name' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Ім'я користувача
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='user_position' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Посада користувача
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='mobile' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Телефон
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='user_email' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Email
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='division' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Відділ
                                        </TableHeaderColumn>
                                        <TableHeaderColumn dataField='user_role' filter={ { type: 'TextFilter', delay: 1000 } }>
                                            Роль
                                        </TableHeaderColumn>

                                    </BootstrapTable>
                                </>
                                : <>
                                    <span>Скористайтеся пошуком</span>
                                </>
                        }

                        {/*{*/}
                        {/*    this.props.store.menuState.isLoading*/}
                        {/*        ? <div className="coverloader">*/}
                        {/*            <div className="loader"></div>*/}
                        {/*        </div>*/}
                        {/*        : <></>*/}
                        {/*}*/}
                    </div>
                </div>
            </div>

        );
    }
}

export default TableADMIN_USERS