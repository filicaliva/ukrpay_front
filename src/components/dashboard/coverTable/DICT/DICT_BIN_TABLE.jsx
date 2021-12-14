import axios from "axios";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";

export default function DICT_BIN_TABLE({ store }) {
  const textError = "Заповніть будь ласка поле!";

  const [data, setData] = useState({});
  const [isErrorBin, setIsErrorBin] = useState(false);
  const [isErrorBankName, setIsErrorBankName] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");

  function handleForm(e) {
    if (e.target.value === null) return;
    const item = { [e.target.name]: e.target.value };
    setData((data) => (data !== null ? { ...data, ...item } : item));
  }

  function validateForm() {
    setIsErrorBin(false);
    setIsErrorBankName(false);
    if (!data.bin) {
      setIsErrorBin(true);
    }
    if (!data.bankname) {
      setIsErrorBankName(true);
    }
    if (isErrorBin || isErrorBankName) return;

    submit();
  }

  async function submit() {
    const baseURL = `/api/Dictionary/DICT_BIN_TABLE`;
    await axios
      .post(baseURL, data, {
        headers: { token: `${store.userState.token}` },
      })
      .then((res) => {
        if (res.data.ErrorStatus.ErrorCode === 0) {
          setAlertType("success");
          setAlertText(`${res.data.ErrorStatus.ErrorMessage}`);
        } else {
          setAlertType("danger");
          setAlertText(
            `${res.data.ErrorStatus.ErrorCode}: ${res.data.ErrorStatus.ErrorMessage}`
          );
        }
      });
    setIsShowAlert(true);
    setData({});
    setTimeout(() => {
      setIsShowAlert(false);
    }, 3000);
  }

  return (
    <div className="coverTable DICT_BIN_TABLE">
      {isShowAlert ? (
        <Alert key={1} variant={alertType}>
          {alertText}
        </Alert>
      ) : null}
      <div class="headerTable">
        <div class="titleTable">BIN таблиця</div>
        <div class="optionBlock"></div>
      </div>

      <div className="filter row">
        <div className="col-4">
          <Form onChange={handleForm}>
            <Form.Group className="form-input">
              <Form.Label>BIN</Form.Label>
              <Form.Control
                className={isErrorBin ? "error" : null}
                name="bin"
                value={data.bin ?? ""}
                type="text"
                placeholder="Впишіть bin"
              />
              {isErrorBin ? <p className="error-text">{textError}</p> : null}
            </Form.Group>
            <Form.Group className="form-input">
              <Form.Label>Назва банку</Form.Label>
              <Form.Control
                className={isErrorBankName ? "error" : null}
                name="bankname"
                value={data.bankname ?? ""}
                type="text"
                placeholder="ОщадБанк"
              />
              {isErrorBankName ? (
                <p className="error-text">{textError}</p>
              ) : null}
            </Form.Group>
            <Form.Group className="form-input">
              <Form.Label>Локальна назва банку </Form.Label>
              <Form.Control
                name="banknameloc"
                type="text"
                value={data.banknameloc ?? ""}
                placeholder="Впишіть bin"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="col-4">
          <Form onChange={handleForm}>
            <Form.Group className="form-input">
              <Form.Label>Ember id</Form.Label>
              <Form.Control
                name="emberid"
                type="text"
                value={data.emberid ?? ""}
                placeholder="Впишіть ember id"
              />
            </Form.Group>
            <Form.Group className="form-input">
              <Form.Label>Назва типу картки </Form.Label>
              <Form.Control
                name="cardtypename"
                type="text"
                value={data.cardtypename ?? ""}
                placeholder="Впишіть тип картки"
              />
            </Form.Group>
            <Form.Group className="form-input">
              <Form.Label>Назва держави</Form.Label>
              <Form.Control
                name="country"
                type="text"
                value={data.country ?? ""}
                placeholder="Впишіть назву держави"
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <div class="btnBlock">
        <button class="search btn btn-primary" onClick={validateForm}>
          Створити
        </button>
      </div>
    </div>
  );
}
