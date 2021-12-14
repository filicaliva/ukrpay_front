import axios from "axios";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";

export default function DICT_BANK_RANGE({ store }) {
  const textError = "Заповніть будь ласка поле!";

  const [data, setData] = useState({});
  const [isErrorBin, setIsErrorBin] = useState(false);
  const [isErrorBankName, setIsErrorBankName] = useState(false);
  const [isErrorMinNum, setIsErrorMinNum] = useState(false);
  const [isErrorMaxNum, setIsErrorMaxNum] = useState(false);

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
    setIsErrorMinNum(false);
    setIsErrorMaxNum(false);
    if (!data.bin) {
      setIsErrorBin(true);
    }
    if (!data.bank_range_name) {
      setIsErrorBankName(true);
    }
    if (!data.min_number) {
      setIsErrorMinNum(true);
    }
    if (!data.max_number) {
      setIsErrorMaxNum(true);
    }
    if (isErrorBin || isErrorBankName || isErrorMinNum || isErrorMaxNum) return;

    submit();
  }

  async function submit() {
    const baseURL = `/api/Dictionary/DICT_BANK_RANGE`;
    await axios
      .post(baseURL, data, {
        headers: { token: `${store.userState.token}` },
      })
      .then((res) => {
        if (res.data.ErrorStatus.ErrorCode === 0) {
          setAlertType("success");
          setAlertText(`${res.data.ErrorStatus.ErrorMessage}`);
          setTimeout(() => {
            setIsShowAlert(false);
          }, 3000);
        } else {
          setAlertType("danger");
          setAlertText(
            `${res.data.ErrorStatus.ErrorCode}: ${res.data.ErrorStatus.ErrorMessage}`
          );
        }
      });
    setIsShowAlert(true);
    setData({});
  }

  return (
    <div className="coverTable DICT_BIN_TABLE">
      {isShowAlert ? (
        <Alert key={1} variant={alertType}>
          {alertText}
        </Alert>
      ) : null}
      <div class="headerTable">
        <div class="titleTable">Діапазон карткових продуктів банку</div>
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
                name="bank_range_name"
                value={data.bank_range_name ?? ""}
                type="text"
                placeholder="Ощадбанк"
              />
              {isErrorBankName ? (
                <p className="error-text">{textError}</p>
              ) : null}
            </Form.Group>

            <Form.Group className="form-input">
              <Form.Label>Мінімальне число</Form.Label>
              <Form.Control
                className={isErrorMinNum ? "error" : null}
                name="min_number"
                value={data.min_number ?? ""}
                type="text"
                placeholder="Введіть число..."
              />
              {isErrorMinNum ? <p className="error-text">{textError}</p> : null}
            </Form.Group>

            <Form.Group className="form-input">
              <Form.Label>Максимальне число</Form.Label>
              <Form.Control
                className={isErrorMaxNum ? "error" : null}
                name="max_number"
                value={data.max_number ?? ""}
                type="text"
                placeholder="Введіть число..."
              />
              {isErrorMaxNum ? <p className="error-text">{textError}</p> : null}
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
