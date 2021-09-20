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
          res.data.record_count > 0
            ? res.data.Table.TableRows.map((i) => ({
                id: i.brand_id,
                value: i.brand_name,
              }))
            : [];

        setOptions(options);
        setIsLoading(false);
      });
  };

  const handleSearchBrandNameSecondLvl = async () => {
    await axios
      .get(`/api/Dictionary/DICT_NET_ENTITY?name=entity_name`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.Table.TableRows.map((i) => ({
          id: i.entity_id,
          value: i.entity_name,
          manager_name: +i.ident_code,
          institution_name: i.brand_region,
        }));
        setOptionsSecondLvl(options);
        setIsLoadingSecondLvl(true);
      });
  };

  const handleSearchBrandNameSecondLvlRU = async () => {
    await axios
      .get(`/api/Dictionary/DICT_INSTITUTION?name=institution_name`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.Table.TableRows.map((i) => ({
          id: i.institution_id,
          value: i.institution_name,
        }));
        setOptionsSecondLvlRU(options);
        setIsLoadingSecondLvlRU(true);
      });
  };

  const handleSearchManager = async () => {
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
          institution_id: i.institution_id,
          institution_name: i.institution_name,
        }));
        setOptionsManager(options);
        setIsLoadingManager(true);
      });
  };

  const handleSearchBrandStatus = async () => {
    await axios
      .get(`/api/Dictionary/DICT_NET_CLIENT_STATUS?name=status_name`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.Table.TableRows.map((i) => ({
          id: i.status_code,
          value: i.status_name,
        }));
        setOptionsStatus(options);
        setIsLoadingStatus(true);
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

  const handleSearchRUManager = async () => {
    await axios
      .get(`/api/Dictionary/DICT_INSTITUTION?name=institution_name`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.Table.TableRows.map((i) => ({
          id: i.institution_id,
          value: i.institution_name,
        }));
        setOptionsRUManager(options);
        setIsLoadingRUManager(true);
      });
  };

  const handleSearchTSP = async () => {
    const data = {
      institution_id: +secondLvlRU.level2_manager_institution_id,
      branch_id:  +brand.id,
      ident_code: contact.ident_code,
      network_brand_id: brand.id,
    };

    await axios
      .post(`/api/Dictionary/QueryTSP`, data, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        const options = res.data.record_count > 0 ? res.data.tsp_list.TableRows.map((i) => ({
          id: i.ident_code,
          value: i.client_name,
        })): [];
        setOptionsTSP(options);
        setIsLoadingTSP(true);
      });
  };

  useEffect(() => {
    handleSearchBrandStatus();
    handleSearchNameManager();
    handleSearchRUManager();
    handleSearchBrandNameSecondLvl();
    handleSearchBrandNameSecondLvlRU();
    handleSearchManager();
  }, []);

  const handleContactInput = (e) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.getAttribute("name")]: e.target.value,
    }));
  };

  const confirm = async () => {
    const data = {
      ...brand,
      ...contact,
      ...brandStatus,
      ...nameManager,
      ...ruManager,
      ...secondLvl,
      ...secondLvlRU,
      ...manager,
      ...tsp,
    };

    await axios
      .post(`/api/Dictionary/GetNetworkClientsReport`, data, {
        headers: {
          token: store.userState.token,
        },
       
      })
      .then((res) => {
        window.location.href = "/dashboard/REPORTS_ACQUIRING_MONITOR";
      });
  };

  return (
    <div className="coverTable DICT_NET_BRAND">
      <div className="headerTable">
        <div className="titleTable">Звіт по мережевим клієнтам</div>
      </div>
      <div className="addbBlock">
        <div className="row col-4">
          <div>
            <AsyncTypeahead
              filterBy={() => true}
              id="async-brand"
              isLoading={isLoading}
              labelKey={(option) => {
                setBrand(option);
                return option.value;
              }}
              minLength={3}
              onSearch={handleSearchBrandName}
              options={options}
              searchText="Пошук..."
              placeholder="Назва мережі..."
              promptText=""
              renderMenuItemChildren={(option, props) => (
                <option value={option.id}>{option.value}</option>
              )}
            />
          </div>
          <div>
            <label>Назва статуса мережі</label>
            <Form.Select
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
            </Form.Select>
          </div>
          <div>
            <label>ПІБ менеджера мережі</label>
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
            </Form.Select>
          </div>
          <div>
            <label>РУ менеджера мережі</label>
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
            </Form.Select>
          </div>

          <h3>Контактна особа мережі</h3>

          <div className="form" onChange={handleContactInput}>
            <label>ПІБ</label>
            <Form.Control
              type="text"
              name="brand_contact_name"
              id="brand_contact_name"
            />
            <label>Посада</label>
            <Form.Control
              type="text"
              name="brand_contact_position"
              id="brand_contact_position"
            />
            <label>Телефон</label>
            <Form.Control
              type="phone"
              name="brand_contact_phone"
              id="brand_contact_phone"
            />
            <label>Email</label>
            <Form.Control
              type="email"
              name="brand_contact_email"
              id="brand_contact_email"
            />
          </div>
        </div>

        <div className="row col-4">
          <h3 style={{ height: "0" }}>2 рівень</h3>
          <div className="form" onChange={handleContactInput}>
            <label>ЄДРПОУ 2 рівень</label>
            <Form.Control
              type="number"
              name="level2_ident_code"
              id="level2_ident_code"
            />
          </div>

          <div>
            <label>Назва 2 рівня: </label>
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
            </Form.Select>
          </div>
        </div>

        <div className="row col-4">
          <h3 style={{ height: "0" }}>ТСП</h3>

          <div
            style={{ height: "120px" }}
            className="form"
            onChange={handleContactInput}
            onBlur={handleSearchTSP}
          >
            <label>ІНН/ЄДРПОУ</label>
            <Form.Control type="number" name="ident_code" id="ident_code" />
          </div>

          <div>
            <div>
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
                        institution-id={option.institution_id}
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
          </div>
        </div>
      </div>
      <div class="btnBlock" style={{ background: "white", padding: "20px" }}>
        <button class="search btn btn-primary" onClick={confirm}>
          Сформувати
        </button>
      </div>
    </div>
  );
}
