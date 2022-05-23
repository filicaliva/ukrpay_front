import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function REPORT_TERMINALS_INTERNET({ store }) {
  const [isErrorInstitution, setIsErrorInstitution] = useState(false);
  const [isErrorTerminal, setIsErrorTerminal] = useState(false);
  const [isErrorDate, setIsErrorDate] = useState(false);
  const [isErrorDateMonth, setIsErrorDateMonth] = useState(false);
  const [arrInstitution, setArrInstitution] = useState(null);
  const [isShowInstitution, setIsShowInstitution] = useState(false);
  const [arrTerminal, setArrTerminal] = useState(null);
  const [isShowTerminal, setIsShowTerminal] = useState(false);
  const [isShowTypeDate, setIsShowTypeDate] = useState(false);
  // const [brand, setBrand] = useState(null);
  const [institution, setInstitution] = useState(0);
  const [terminal, setTerminal] = useState(0);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const confirm = async () => {
    const date1 = new Date(dateFrom);
    const date2 = new Date(dateTo);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setIsErrorDate(false)
  
      if ((isShowTypeDate && !dateFrom)||(!isShowTypeDate && (!dateFrom|| !dateTo))) {
        return setIsErrorDate(true);
      }

      if (!isShowTypeDate && diffDays > 31) {
        return setIsErrorDateMonth(true);
      }
    
    
    store.changeLoading(true);
    let date_from = dateFrom.split("-");
    const body = {
      institution_id: institution,
      report_type_id: "REPORT_TERMINALS",
      terminal_type_id: 2,
      terminal_status_id: terminal,
    };
    if (dateTo) {
      let date_to = dateTo.split("-");
      body.date_from = `${date_from[0]}${date_from[1]}${date_from[2]}`;
      body.date_to = `${date_to[0]}${date_to[1]}${date_to[2]}`;
    } else {
      body.on_date = `${date_from[0]}${date_from[1]}${date_from[2]}`;
    }
    await axios
      .post(`/api/Reports/Acquiring`, body, {
        headers: {
          token: store.userState.token,
        },
        responseType: "blob",
      })
      .then((response) => {
        store.changeLoading(false);
          window.location.href = "/dashboard/REPORTS_ACQUIRING_MONITOR";
      });
  };

  const handleDateFrom = (e) => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e) => {
    setDateTo(e.target.value);
  };

  const activeOperation = (operationArr, operation) => {
    let res;
    operationArr.filter((item, index) => {
      if (item.operation === operation) {
        res = item.name;
      }
    });
    return res;
  };

  const handleTerminal = (e) => {
    let param = e.target.value;
    if (param) {
      setTerminal(param);
    }
  };
  const handleInstitution = (e) => {
    let param = e.target.value;
    if (param) {
      setInstitution(param);
    }
  };
  const reqInstitution = async (token) => {
    store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_INSTITUTION`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        setArrInstitution(response.data.Table.TableRows);
        setIsShowInstitution(true);
        store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  const reqTerminal = async (token) => {
    store.changeLoading(true);
    const baseUrl = `/api/Dictionary/DICT_TERMINAL_STATUS`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${token}` },
      })
      .then((response) => {
        setArrTerminal(response.data.Table.TableRows);
        setIsShowTerminal(true);
        store.changeLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const handleTypeDate = (e) => {
    const type = e.target.value;
    if (!type) return;

    setDateTo(null);
    setDateFrom(null);
    if (+type === 1) {
      setIsShowTypeDate(false);
    } else {
      setIsShowTypeDate(true);
    }
  };

  useEffect(() => {
    reqInstitution(store.userState.token);
    reqTerminal(store.userState.token);
  }, []);

  return (
    <div className="coverTable DICT_NET_BRAND">
      <div className="headerTable">
        <div className="titleTable">
          {activeOperation(
            store.userState.OPERATIONS,
            store.location.pathname.substr(11)
          )}
        </div>
        <div className="optionBlock"></div>
      </div>
      <div className="addbBlock ">
        <div className="container">
          <div className="row col-6">
            <div className="row col-12">
              <label htmlFor="institution">РУ менеджера</label>
              <select
                onChange={handleInstitution}
                id="institution"
                className={`${
                  isErrorInstitution ? "validError" : ""
                } form-select`}
                title="Регіональні управління"
              >
                {isShowInstitution
                  ? arrInstitution.map((item, index) => {
                      return (
                        <option value={item.institution_id}>
                          {item.institution_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="row col-12">
              <label htmlFor="terminal">Статус термінала</label>
              <select
                onChange={handleTerminal}
                className={`${isErrorTerminal ? "validError" : ""} form-select`}
                title="Регіональні управління"
                id="terminal"
              >
                {isShowTerminal
                  ? arrTerminal.map((item, index) => {
                      return (
                        <option value={item.terminal_status_id}>
                          {item.terminal_status_name}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="row col-12">
              <label htmlFor="terminal">Дата звіту</label>
              <input
                className={`${isErrorTerminal ? "validError" : ""} form-select`}
                id="type-date"
                value={"Дата реєстрації терміналу"}
              />
            </div>
            <div>
              <div className="coverInput mt-3">
                {/* <label htmlFor="date_type">Дата звіту</label> */}
                <div
                  key={`inline-radio`}
                  className="mb-3"
                  onChange={handleTypeDate}
                >
                  <Form.Check
                    inline
                    label="Період"
                    name="group1"
                    type={"radio"}
                    id={`date-1`}
                    defaultChecked={true}
                    value={1}
                  />
                  <Form.Check
                    inline
                    label="На дату"
                    name="group1"
                    type={"radio"}
                    id={`date-2`}
                    value={2}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="coverInput mt-3">
                {/* <span className="mb-1">Дата звіту</span> */}
                {!isShowTypeDate ? (
                  <div className="row container">
                    <div className="d-flex align-items-center col-6">
                      <label htmlFor="date_report_from">З</label>
                      <Form.Control
                        onChange={handleDateFrom}
                        type="date"
                        value={dateFrom}
                        className={`${isErrorDate || isErrorDateMonth ? "validError" : ""}`}
                        style={{ marginLeft: "10px", minWidth: "150px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center col-6">
                      <label htmlFor="date_report_to">По</label>
                      <Form.Control
                        onChange={handleDateTo}
                        value={dateTo}
                        type="date"
                        className={`${isErrorDate || isErrorDateMonth ? "validError" : ""}`}
                        style={{ marginLeft: "10px", minWidth: "150px" }}
                      />
                    </div>
                    <p className="error">
                      {isErrorDate ? "Заповніть, будь ласка, поля!" : null}
                      {!isErrorDateMonth
                        ? null
                        : "Максимальний термін 31 день!"}
                    </p>
                  </div>
                ) : (
                  <div className="row container">
                    <div className="d-flex align-items-center col-5">
                      <Form.Control
                        onChange={handleDateFrom}
                        type="date"
                        value={dateFrom}
                        className={`${isErrorDate || isErrorDateMonth  ? "validError" : ""}`}
                        style={{ marginLeft: "10px", minWidth: "150px" }}
                      />
                    </div>
                    <p className="error">
                      {isErrorDate ? "Заповніть, будь ласка, поле!" : null}
                      
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btnBlock" style={{ background: "white", padding: "10px" }}>
        <button class="btn btn-success" onClick={confirm}>
          Сформувати звіт
        </button>
      </div>
    </div>
  );
}
