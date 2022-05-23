import React from "react";
import { Field, reduxForm } from 'redux-form'

const DeleteRow = (props) => {
    console.log(props);
    const save = () => {
        props.store.showPopupTable(false, null );
    }
    const close = () => {
        props.store.showPopupTable(false, null );
    }
    return (
        <div className="coverInputBlock">
            <div className="coverBtn">
                <button className="sendCallback" onClick={save}>Видалити</button>
                <button className="closeCallback" onClick={close}>Закрити</button>
            </div>
        </div>
    )
}

const FormInput = (props) => {
    console.log(props);
    const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div className="inputblock">
            <label className="control-label" htmlFor={label}>{label}</label>
            <div>
                <input id={label} {...input} placeholder={label} type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
    const close = () => {
        props.store.showPopupTable(false, null );
    }
    const RenderingInputsForm = (data) => {
        console.log(data);
        let number = 0;
        console.log(data.TableHeaders);
        return Object.values( data.TableHeaders ).map(( item , index) => {
            console.log(item);
            console.log(number++);
            let name = `${item}_${number++}`;
            return(
                <Field name={item} type="text" component={renderField} label={item} />
            )
        })
    }
    return (
        <form className="coverInputBlock" onSubmit={props.handleSubmit}>
            {RenderingInputsForm(props.store.menuState.tableData)}
            {/*<Field name="username" type="username"*/}
            {/*       component={renderField} label="Username"*/}
            {/*       validate={required}*/}
            {/*/>*/}

            <div className="coverBtn">
                <button className="sendCallback" type="submit">Зберегти</button>
                <button className="closeCallback" onClick={close}>Закрити</button>
            </div>
        </form>
    )
}

const FormInputRedux = reduxForm({ form: 'formInput' })(FormInput)

class PopupTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }

        console.log(this.props);
    }
    namePopup = (name) => {
        switch (name) {
            case 'add':
                return 'Додавання';
            case 'edit':
                return 'Редагування';
            case 'delete':
                return 'Видалення';
            default:
                return '';
        }
    }
    close = () => {
        this.props.store.showPopupTable(false, null );
    }
    renderingInputs = (data) => {
        console.log(data);

        console.log(data.TableHeaders);
        return Object.values( data.TableHeaders ).map(( item , index) => {
            console.log(item);
            return(
                <div className="inputblock">
                    <label className="control-label" htmlFor="data">{item}</label>
                    <input type="text" name="data" placeholder={item} autoComplete="off" required="required" pattern=".{3,}"/>
                </div>
            )

        })

    }
    renderingInputsForm = (data) => {
        console.log(data);

        console.log(data.TableHeaders);
        return Object.values( data.TableHeaders ).map(( item , index) => {
            console.log(item);
            return(
                <div className="inputblock">
                    <label className="control-label" htmlFor="data">{item}</label>
                    <input type="text" name="data" placeholder={item} autoComplete="off" required="required" pattern=".{3,}"/>
                </div>
            )

        })

    }
    formInputData = (val) => {
        console.log(val);
        this.props.store.showPopupTable(false, null );
    }
    typePopup = (type) => {
        switch (type) {
            case 'add':
                return <FormInputRedux store={this.props.store} onSubmit={this.formInputData}/>;
            case 'edit':
                return 'Редагування';
            case 'delete':
                return <DeleteRow store={this.props.store} />;
            default:
                return '';
        }
    }
    render() {
        return (
            <div className="popupTable">
                <div className="innerBlock">
                    <h2>{this.namePopup(this.props.store.menuState.typePopup)}</h2>

                    {
                        this.typePopup(this.props.store.menuState.typePopup)
                    }
                </div>
            </div>
        )
    }
}

export default PopupTable;