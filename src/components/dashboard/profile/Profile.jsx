import React from 'react';
import { NavLink } from 'react-router-dom';

import * as axios from "axios";
import {Accordion} from "react-bootstrap";
import {Button} from "react-bootstrap";
import InputMask from "react-input-mask";



class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            isDisableBtnSave: true,
            inputsData: {}
        }

        console.log(this.props);
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.props.changeLoading(true);

        if (window.localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }else{
            this.authToken();
        }
    }
    async authToken ()  {
        const baseUrl = `/api/Auth/ALL`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ window.localStorage.getItem('token') }`}
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.token);
                this.props.addUserData(response.data.token,response.data.user_code,response.data.user_name,response.data.user_position,response.data.OPERATIONS);
                this.props.changeLoading(false);
                this.requestUserCabinet(this.props.userState.token);
            })
            .catch((error) => {
                console.log(error.response);
                //console.log(error.response.data);
                //console.log('error_catch');

            });
    }
    async requestUserCabinet  (token) {
        console.log( token );
        const baseUrl = `/api/UserCabinet`;
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
                let inputDataObj = this.state.inputsData;
                inputDataObj.user_code = response.data.user_code;
                this.setState({
                    data: response.data,
                    inputsData: inputDataObj,
                    showContent: true
                });
                //console.log(response.data.sort());

                // this.props.au_addToken(response.data.token); //записуєм token в store
                //this.props.history.push('/login');
                this.props.changeLoading(false);
                console.log(this.state.data);
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });

    }
    day = (date) => {
        let days = [
            'Неділя',
            'Понеділок',
            'Вівторок',
            'Середа',
            'Четвер',
            'П\'ятниця',
            'Субота'
        ];
        let number = date.getDay();
        return days[number]
    }
    formatDate = (date) => {
        let monthNames = [
            "Січень", "Лютий", "Березень",
            "Квітень", "Травень", "Червень", "Липень",
            "Серпень", "Вересень", "Жовтень",
            "Листопад", "Грудень"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    changeInput = (e) => {
        let apiName = e.currentTarget.getAttribute("apiName");
        console.log(apiName);
        let inputValue = e.target.value;
        console.log(inputValue);
        let inputDataObj = this.state.inputsData;
        inputDataObj.[apiName] = inputValue;
        console.log(inputDataObj);
        this.setState({
            isDisableBtnSave: false,
            inputsData: inputDataObj
        });
        console.log(this.state);
        console.log(this.state.inputsData);
    }
    saveUserData = () => {
        this.requestSaveUserData(this.props.userState.token);
    }
    async requestSaveUserData  (token) {
        this.props.changeLoading(true);
        console.log( token );
        console.log( this.state.inputsData );
        const baseUrl = `/api/User`;
        const userBody = {
            //this.state.inputsData
        };
        await axios.put(
            baseUrl,
            this.state.inputsData,
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

                //this.props.store.addTableData(true, response.data.users);

                this.props.changeLoading(false);
                this.setState({ isDisableBtnSave: true });
                //this.props.store.showTable(true);

            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
            });

    }
    closeProfile = () => {
        this.props.history.push('/dashboard');
    }
    render() {
        console.log(this.props);
        console.log(this.state);
        console.log(this.props.menuState.isLoading);
        console.log('--------');
        return (
            <div className="profile">
                {
                    this.state.showContent
                        ? <div className="innerProfile">
                            <div className="headerBlock">
                                <h3>Мій кабінет</h3>
                                <div className="dataBlock">
                                    <div className="date">
                                        <input defaultValue={this.formatDate(new Date())} className="customInput" id="dateInput" type="text" disabled/>
                                        <input defaultValue={this.day(new Date())} className="customInput" id="dateDayInput" type="text" disabled/>
                                        <div className="coverInput">
                                            <label htmlFor="dateLastInput">Час останнього входу</label>
                                            <input defaultValue={this.state.data.last_logon_date} className="customInput" id="dateLastInput" type="text" disabled/>
                                        </div>
                                    </div>
                                    <div className="user">
                                        <div className="coverInput">
                                            <label htmlFor="userFullName">Користувач</label>
                                            <input defaultValue={this.state.data.user_name} className="customInput" id="userFullName" type="text" disabled/>
                                        </div>
                                        <div className="coverInput">
                                            <label htmlFor="powers">Повноваження</label>
                                            <input defaultValue={this.state.data.role_name} className="customInput" id="powers" type="text" disabled/>
                                        </div>
                                        <div className="coverInput">
                                            <label htmlFor="statusInput">Статус</label>
                                            <input defaultValue={this.state.data.status} className="customInput" id="statusInput" type="text" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="commmonBlock">
                                <h4>Мій профіль</h4>
                                <div className="dataBlock">
                                    <div className="coverInput">
                                        <label htmlFor="registrationDateInput">Дата реєстрації</label>
                                        <input defaultValue={this.state.data.date_registered} className="customInput" id="registrationDateInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="accountInput">Обліковий запис</label>
                                        <input defaultValue={this.state.data.user_code} className="customInput" id="accountInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="lastNameInput">Прізвище</label>
                                        <input defaultValue={this.state.data.surname} className="customInput" id="lastNameInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="nameInput">Імя</label>
                                        <input defaultValue={this.state.data.name} className="customInput" id="nameInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="surnameInput">По батькові</label>
                                        <input defaultValue={this.state.data.middle_name} className="customInput" id="surnameInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="phoneInput">Телефон</label>
                                        <div className="coverInputs">
                                            <input
                                                className="customInput"
                                                id="phoneInput"
                                                placeholder="044 000 00 00"
                                                type="phone"
                                                defaultValue={this.state.data.phone}
                                                apiName="phone"
                                                onChange={this.changeInput}

                                            />
                                            <input
                                                className="customInput"
                                                id="phoneInput"
                                                type="phone"
                                                apiName="ipphone"
                                                defaultValue={this.state.data.ipphone}
                                                onChange={this.changeInput}
                                                disabled
                                            />
                                            <input
                                                className="customInput"
                                                id="phoneInput"
                                                placeholder="+38 000 000 00 00"
                                                type="phone"
                                                apiName="mobile"
                                                defaultValue={this.state.data.mobile}
                                                onChange={this.changeInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="managementAreaInput">Область управління</label>
                                        <input defaultValue={this.state.data.region} className="customInput" id="managementAreaInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="positionInput">Посада</label>
                                        <input defaultValue={this.state.data.user_position} className="customInput" id="positionInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="emailInput">Ел. адреса</label>
                                        <input defaultValue={this.state.data.user_email} className="customInput" id="emailInput" type="email" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="tvbvInput">ТВБВ</label>
                                        <input defaultValue={this.state.data.tvbv} className="customInput" id="tvbvInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="departmentInput">Департамент</label>
                                        <input defaultValue={this.state.data.department} className="customInput" id="departmentInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="managementInput">Управління</label>
                                        <input defaultValue={this.state.data.office} className="customInput" id="managementInput" type="text" disabled/>
                                    </div>
                                    <div className="coverInput">
                                        <label htmlFor="sectionInput">Відділ</label>
                                        <input defaultValue={this.state.data.division} className="customInput" id="sectionInput" type="text" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="btnBlock">
                                <Button variant="secondary" onClick={this.closeProfile}>Закрити</Button>
                                <Button variant="success" onClick={this.saveUserData} disabled={this.state.isDisableBtnSave ? 'disabled' : ''}>Зберегти</Button>
                            </div>
                        </div>
                        : <></>
                }

                {
                    this.props.menuState.isLoading
                        ? <div className="coverloader">
                            <div className="loader"></div>
                        </div>
                        : <></>
                }
            </div>
        )
    }
}

export default Profile;