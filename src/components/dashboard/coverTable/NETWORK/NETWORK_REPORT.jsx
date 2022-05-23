import Button from "@restart/ui/esm/Button";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

export default function NETWORK_REPORT({ store }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState(null);
  const [contact, setContact] = useState();
  const [nameBrand, setNameBrand] = useState([]);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [brandStatus, setBrandStatus] = useState(null);

  const [isLoadingNameManager, setIsLoadingNameManager] = useState(false);
  const [optionsNameManager, setOptionsNameManager] = useState([]);
  const [nameManager, setNameManager] = useState(null);

  const [isLoadingRUManager, setIsLoadingRUManager] = useState(false);
  const [optionsRUManager, setOptionsRUManager] = useState([]);
  const [ruManager, setRUManager] = useState(null);

  const [isLoadingSecondLvl, setIsLoadingSecondLvl] = useState(false);
  const [optionsSecondLvl, setOptionsSecondLvl] = useState([]);
  const [secondLvl, setSecondLvl] = useState(null);

  const [isLoadingSecondLvlRU, setIsLoadingSecondLvlRU] = useState(false);
  const [optionsSecondLvlRU, setOptionsSecondLvlRU] = useState([]);
  const [secondLvlRU, setSecondLvlRU] = useState(null);

  const [isLoadingManager, setIsLoadingManager] = useState(false);
  const [optionsManager, setOptionsManager] = useState([]);
  const [manager, setManager] = useState(null);

  const [isLoadingTSP, setIsLoadingTSP] = useState(false);
  const [optionsTSP, setOptionsTSP] = useState([]);
  const [tsp, setTSP] = useState(null);

  const [form, setForm] = useState({
    brand_id: 0,
    brand_name: 1,
    // brand_status_code: 1,
    brand_status_name: 1,
    brand_manager_id: 1,
    brand_manager_institution_id: 1,
    brand_contact_name: 1,
    brand_contact_position: 1,
    brand_contact_phone: 1,
    brand_contact_email: 1,
    level2_ident_code: 1,
    level2_id: 1,
    level2_name: 1,
    level2_manager_id: 1,
    level2_manager_institution_id: 1,
    client_name: 1,
    ident_code: 1,
    client_manager_id: 1,
    client_manager_institution_id: 1,
    client_institution_id: 1
  });
  const handleSearchBrandName = async (query) => {
    setIsLoading(true);
    await axios
      .get(`/api/Dictionary/DICT_NET_BRAND?name=brand_name&param1=${query}`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options =
          res.data.record_count > 0 ? res.data.Table.TableRows : [];
        setOptions(options);
        setIsLoading(false);
      });
  };

  const handleSearchNameManager = async () => {
    await axios
      .get(`/api/Dictionary/DICT_NETWORK_MANAGERS?name=manager_name`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.Table.TableRows.map((i) => ({
          id: i.manager_id,
          value: i.manager_name,
        }));
        setOptionsNameManager(options);
        setIsLoadingNameManager(true);
      });
  };

  useEffect(() => {
    // handleSearchBrandStatus();
    handleSearchNameManager();
    // handleSearchRUManager();
    // handleSearchBrandNameSecondLvl();
    // handleSearchBrandNameSecondLvlRU();
    // handleSearchManager();
  }, []);

  const handleContactInput = (e) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.getAttribute("name")]: e.target.value,
    }));
  };

  const confirm = async () => {
    store.changeLoading(true);
    console.log(nameBrand);
    await axios
      .post(
        `/api/Dictionary/GetNetworkClientsReport`,
        { ...form, brand_id: nameBrand.length !== 0 ? brand.brand_id : 0 },
        {
          headers: {
            token: store.userState.token,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        store.changeLoading(false);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        let fileTitle = decodeURI(
          response.headers["content-disposition"].split("filename*=UTF-8''")[1]
        );
        link.href = url;
        link.setAttribute("download", fileTitle);
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleForm = (e) => {
    if (!e.target.name) return;
    let name = e.target.name;
    let val = e.target.checked;
    setForm((i) => {
      return { ...i, [name]: val ? 1 : 0 };
    });
  };
const activeOperation = (operationArr, operation) => {
  let res;
  operationArr.map((item, index) => {
    if (item.operation == operation) {
      console.log(item.name);
      res = item.name;
    }
  });
  return res;
};
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
      <div className="addbBlock" onChange={handleForm}>
        <div className="row col-4">
          <div className="row col-8">
            <AsyncTypeahead
              filterBy={() => true}
              id="async-brand"
              isLoading={isLoading}
              labelKey={(option) => {
                setBrand(option);
                return option.brand_name;
              }}
              minLength={3}
              onSearch={handleSearchBrandName}
              options={options}
              searchText="Пошук..."
              placeholder="Назва мережі..."
              onChange={setNameBrand}
              renderMenuItemChildren={(option, props) => (
                <option value={option.brand_id}>{option.brand_name}</option>
              )}
            />
          </div>
          <div>
            {/* <label>Назва статуса мережі</label> */}
            {/* <Form.Select
              onChange={(e) => {
                setBrandStatus({
                  brand_status_name:
                    e.target.options[e.target.selectedIndex].text,
                  brand_status_code: e.target.value,
                });
              }}
            >
              <option></option>
              {isLoadingStatus
                ? optionsStatus.map((option) => (
                    <option value={option.id}>{option.value}</option>
                  ))
                : null}
            </Form.Select> */}
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_status_name`}
              label={`Назва статуса мережі`}
            />
          </div>
          <div>
            {/* <label>ПІБ менеджера мережі</label>
            <Form.Select
              onChange={(e) => {
                setNameManager({
                  brand_manager_id: e.target.value,
                });
              }}
            >
              <option></option>
              {isLoadingNameManager
                ? optionsNameManager.map((option) => (
                    <option value={option.id}>{option.value}</option>
                  ))
                : null}
            </Form.Select> */}
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_manager_id`}
              label={`ПІБ менеджера мережі`}
            />
          </div>
          <div>
            {/* <label>РУ менеджера мережі</label>
            <Form.Select
              onChange={(e) => {
                setRUManager({
                  brand_manager_institution_id: e.target.value,
                });
              }}
            >
              <option></option>
              {isLoadingRUManager
                ? optionsRUManager.map((option) => (
                    <option value={option.id}>{option.value}</option>
                  ))
                : null}
            </Form.Select> */}
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_manager_institution_id`}
              label={`РУ менеджера мережі`}
            />
       
          </div>

          <h5 className="mt-4">Контактна особа мережі</h5>

          {/* <div className="form" onChange={handleContactInput}>
            <label>ПІБ</label>
            <Form.Control
              type="text"
              name="brand_contact_name"
              name="brand_contact_name"
            />
            <label>Посада</label>
            <Form.Control
              type="text"
              name="brand_contact_position"
              name="brand_contact_position"
            />
            <label>Телефон</label>
            <Form.Control
              type="phone"
              name="brand_contact_phone"
              name="brand_contact_phone"
            />
            <label>Email</label>
            <Form.Control
              type="email"
              name="brand_contact_email"
              name="brand_contact_email"
            />
          </div>*/}
          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "10px" }}
              type={"checkbox"}
              name={`brand_contact_name`}
              label={`ПІБ`}
            />
          </div>
          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_contact_position`}
              label={`Посада`}
            />
          </div>
          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_contact_phone`}
              label={`Телефон`}
            />
          </div>
          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`brand_contact_email`}
              label={`Email`}
            />
          </div>
        </div>

        <div className="col-4">
          <div>
            <h5>2 рівень</h5>
          </div>
          {/* <div className="form" onChange={handleContactInput}>
            <label>ЄДРПОУ 2 рівень</label>
            <Form.Control
              type="number"
              name="level2_ident_code"
              name="level2_ident_code"
            />
          </div> */}

          <Form.Check
            defaultChecked={true}
            style={{ marginTop: "20px" }}
            type={"checkbox"}
            name={`level2_manager_id`}
            label={`ПІБ менеджера 2го рівня`}
          />

          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`level2_ident_code`}
              label={`ЄДРПОУ 2 рівень`}
            />
          </div>

          <div>
            {/* <label>Назва 2 рівня: </label>
            <Form.Select
              onChange={(e) => {
                console.log();
                setSecondLvl({
                  level2_id: e.target.value,
                  level2_name: e.target.options[e.target.selectedIndex].text,
                  level2_manager_id:
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "manager"
                    ),
                });
              }}
            >
              <option></option>
              {isLoadingSecondLvl
                ? optionsSecondLvl.map((option) => (
                    <option value={option.id} manager={option.manager_name}>
                      {option.value}
                    </option>
                  ))
                : null}
            </Form.Select>
            <label>ID 2 рівня: </label>
            <Form.Select>
              <option>{secondLvl ? secondLvl.level2_id : null}</option>
            </Form.Select>
            <label>Менеджер 2 рівня: </label>
            <Form.Select>
              <option>{secondLvl ? secondLvl.level2_manager_id : null}</option>
            </Form.Select>
            <label>РУ менеджера 2 рівня: </label>
            <Form.Select
              onChange={(e) => {
                console.log();
                setSecondLvlRU({
                  level2_manager_institution_id: e.target.value,
                });
              }}
            >
              <option></option>
              {isLoadingSecondLvlRU
                ? optionsSecondLvlRU.map((option) => (
                    <option value={option.id}>{option.value}</option>
                  ))
                : null}
            </Form.Select> */}

            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`level2_name`}
                label={`Назва 2 рівня`}
              />
            </div>

            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`level2_id`}
                label={`ID 2 рівня`}
              />
            </div>

            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`level2_manager_id`}
                label={`Менеджер 2 рівня`}
              />
            </div>

            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`level2_manager_institution_id`}
                label={`РУ менеджера 2 рівня`}
              />
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="row">
            <h5>ТСП</h5>
          </div>
          {/* 
          <div
            style={{ height: "120px" }}
            className="form"
            onChange={handleContactInput}
            onBlur={handleSearchTSP}
          >
            <label>ІНН/ЄДРПОУ</label>
            <Form.Control type="number" name="ident_code" name="ident_code" />
          </div> */}

          <div>
            <Form.Check
              defaultChecked={true}
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              name={`ident_code`}
              label={`ІНН/ЄДРПОУ`}
            />
          </div>

          <div>
            {/* <div>
              <label>Назва ТСП: </label>
              <Form.Select
                onChange={(e) => {
                  setTSP({
                    client_id: e.target.value,
                  });
                }}
              >
                <option></option>
                {isLoadingTSP
                  ? optionsTSP.map((option) => (
                      <option value={option.id}>{option.value}</option>
                    ))
                  : null}
              </Form.Select>
            </div>

            <div>
              <label>Менеджер ТСП: </label>
              <Form.Select
                onChange={(e) => {
                  setManager({
                    client_manager_id: e.target.value,
                    client_manager_institution_id:
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "institution-id"
                      ),
                    client_manager_institution_name:
                      e.target.options[e.target.selectedIndex].getAttribute(
                        "institution-name"
                      ),
                  });
                }}
              >
                <option></option>
                {isLoadingManager
                  ? optionsManager.map((option) => (
                      <option
                        value={option.id}
                        institution-name={option.institution_id}
                        institution-name={option.institution_name}
                      >
                        {option.value}
                      </option>
                    ))
                  : null}
              </Form.Select>
            </div>
            <div>
              <label>РУ менеджера ТСП: </label>
              <Form.Select>
                <option>
                  {manager ? manager.client_manager_institution_name : null}
                </option>
              </Form.Select>
            </div>
           */}

            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`client_name`}
                label={`Назва ТСП`}
              />
            </div>
            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`client_manager_id`}
                label={`Менеджер ТСП`}
              />
            </div>
            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`client_manager_institution_id`}
                label={`РУ менеджера ТСП`}
              />
            </div>
            <div>
              <Form.Check
                defaultChecked={true}
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                name={`client_institution_id`}
                label={`РУ рахунка ТСП`}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="btnBlock" style={{ background: "white", padding: "10px" }}>
        <button class="btn btn-success" onClick={confirm}>
          Сформувати
        </button>
      </div>
    </div>
  );
}
