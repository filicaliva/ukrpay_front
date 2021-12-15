import Button from "@restart/ui/esm/Button";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import AsyncSelect from "react-select/async";

export default function NETWORK_EDIT({ store }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState(null);
  const [contact, setContact] = useState();
  const [firstLevel, setFirstLevel] = useState(false);
  const [secondLevel, setSecondLevel] = useState(false);
  const [thirdLevel, setThirdLevel] = useState(false);
  const [query, setQuery] = useState("");

  const [brandName, setBrandName] = useState(null);

  const [formFirstLevel, setFormFirstLevel] = useState({});

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

  const handleSearchBrandName = async (query='') => {
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

  const handleSearchBrandNameSecondLvl = async (param) => {
    await axios
      .get(`/api/Dictionary/DICT_NET_ENTITY?param1=${param}`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        if (res.data.ErrorStatus.ErrorCode !== 0) return;
        const options = res.data.Table.TableRows
          ? res.data.Table.TableRows.map((i) => ({
              id: i.entity_id,
              value: i.entity_name,
              manager_name: +i.ident_code,
              institution_name: i.brand_region,
            }))
          : null;
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
        const options = res.data.Table.TableRows
          ? res.data.Table.TableRows.map((i) => ({
              id: i.institution_id,
              value: i.institution_name,
            }))
          : null;
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

  const handleSearchBrandStatus = async (param) => {
    await axios
      .get(`/api/Dictionary/DICT_NET_CLIENT?param1=${param}`, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((res) => {
        if (res.data.ErrorStatus.ErrorCode !== 0) return;
        const options = res.data.Table.TableRows
          ? res.data.Table.TableRows.map((i) => ({
              id: i.status_code,
              value: i.status_name,
            }))
          : null;
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
      branch_id: +brand.id,
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
        const options =
          res.data.record_count > 0
            ? res.data.tsp_list.TableRows.map((i) => ({
                id: i.ident_code,
                value: i.client_name,
              }))
            : [];
        setOptionsTSP(options);
        setIsLoadingTSP(true);
      });
  };

  const handleContactInput = (e) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.getAttribute("name")]: e.target.value,
    }));
  };

  useEffect(() => {
    handleSearchNameManager();
    handleSearchManager();
    handleSearchBrandName();
  }, []);

  const confirm = async () => {
    // const data = {
    //   ...brand,
    //   ...contact,
    //   ...brandStatus,
    //   ...nameManager,
    //   ...ruManager,
    //   ...secondLvl,
    //   ...secondLvlRU,
    //   ...manager,
    //   ...tsp,
    // };

    const brand = { ...formFirstLevel };
    const entity = {};

    await axios
      .post(`/api/Dictionary/DICT_NET_BRAND`, brand, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((response) => {
        setFirstLevel(false);
        setFormFirstLevel({});
      });
    await axios
      .post(`/api/Dictionary/DICT_NET_ENTITY`, entity, {
        headers: {
          token: store.userState.token,
        },
      })
      .then((response) => {});
  };

  const handleFirstLevel = () => {
    setFirstLevel(!firstLevel);
  };
  const handleSecondLevel = () => {
    setSecondLevel(!secondLevel);
  };
  const handleThirdLevel = () => {
    setThirdLevel(!thirdLevel);
  };

  const handleSearchSubmit = () => {
    handleSearchBrandNameSecondLvl(brand.brand_id);
    handleSearchBrandStatus(brand.brand_id);
  };

  function handleForm(e, type) {
    const handleLevel = (param) => {
      return { ...param, [e.target.dataset.id]: e.target.value };
    };
    switch (type) {
      case "firstLevel":
        setFormFirstLevel(handleLevel);
        break;
      case "secondLevel":
        setSecondLevel(handleLevel);
        break;
      case "thirdLevel":
        setThirdLevel(handleLevel);
        break;

      default:
        throw new Error("this type no exist!");
    }
  }

  const handlePIB = (e) => {
    const eventManagerID = {
      target: { value: e.target.value, dataset: { id: "manager_id" } },
    };
    const manager = optionsManager.filter((i) => +i.id === +e.target.value)[0];
    const eventManagerName = {
      target: { value: manager.value, dataset: { id: "manager_name" } },
    };
    const eventBrandID = {
      target: { value: manager.institution_id, dataset: { id: "brand_id" } },
    };
    const eventBrandRegion = {
      target: {
        value: manager.institution_name,
        dataset: { id: "brand_region" },
      },
    };
    handleForm(eventManagerID, "firstLevel");
    handleForm(eventManagerName, "firstLevel");
    handleForm(eventBrandID, "firstLevel");
    handleForm(eventBrandRegion, "firstLevel");
  };

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.brand_name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const handleInputChange = (newValue) => {
    return newValue;
  };

  return (
    <div className="coverTable DICT_NET_BRAND">
      {/* <div className="headerTable">
        <h3 className="titleTable">Звіт по мережевим клієнтам</h3>
      </div> */}
      <div className="addbBlock ">
        <div className="container">
          <div className="row col-12">
            <div className="row col-12">
              <div>Редагування інформації по мережі:</div>
              {/* <AsyncTypeahead
                className="col-6"
                filterBy={() => true}
                id="async-brand-edit"
                isLoading={isLoading}
                labelKey={(option) => {
                  setBrand(option);
                  setFormFirstLevel(option);
                  setBrandName(option.brand_name);
                  return option.brand_name;
                }}
                minLength={3}
                onSearch={handleSearchBrandName}
                options={options}
                searchText="Пошук..."
                placeholder="Назва мережі..."
                onBlur={handleSearchSubmit}
                value={query}
                onChange={setQuery}
                renderMenuItemChildren={(option, props) => (
                  <option value={option.brand_1id}>{option.brand_name}</option>
                )}
              /> */}
              {/* <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onInputChange={handleInputChange}
              /> */}
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
              {/* <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`brand_name_checkbox`}
                label={`I Рівень`}
                checked={firstLevel}
                onChange={handleFirstLevel}
              /> */}
            </div>
            <div>
              {/* <label>ПІБ менеджера мережі</label> */}
              {/* <Form.Select
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
              {/* <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`brand_contact_name`}
                label={`II Рівень`}
                checked={secondLevel}
                onChange={handleSecondLevel}
              /> */}
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
              {/* <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`brand_manager_id`}
                label={`III Рівень`}
                checked={thirdLevel}
                onChange={handleThirdLevel}
              /> */}
            </div>

            {/* <h5 className="mt-4">Контактна особа мережі</h5>

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
          <div>
            <Form.Check
              style={{ marginTop: "10px" }}
              type={"checkbox"}
              id={`brand_contact_name`}
              label={`ПІБ`}
              checked={true}
            />
          </div>
          <div>
            <Form.Check
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              id={`brand_contact_position`}
              label={`Посада`}
              checked={true}
            />
          </div>
          <div>
            <Form.Check
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              id={`brand_contact_phone`}
              label={`Телефон`}
              checked={true}
            />
          </div>
          <div>
            <Form.Check
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              id={`brand_contact_email`}
              label={`Email`}
              checked={true}
            />
          </div> */}
          </div>
          {firstLevel ? (
            <div
              className="row col-12 mt-5"
              onChange={(e) => handleForm(e, "firstLevel")}
            >
              <h2>I Рівень </h2>
              <div className="container row  d-flex  justify-content-between">
                <div className="col-5 mt-2">
                  <label>Назва мережі</label>
                  <Form.Control
                    type="text"
                    data-id="brand_name"
                    value={formFirstLevel.brand_name}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label>Контактна особа</label>
                  <Form.Control
                    type="text"
                    data-id="contact_person"
                    value={formFirstLevel.contact_person}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label>Назва статусу</label>
                  <Form.Control
                    type="text"
                    data-id="brand_status_name"
                    value={formFirstLevel.brand_status_name}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label> Посада конт. особи </label>
                  <Form.Control
                    type="text"
                    data-id="contact_position"
                    value={formFirstLevel.contact_position}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label>ПІБ менеджера мережі</label>
                  <Form.Select onChange={handlePIB} data-id="manager_id">
                    <option>{brand.manager_name}</option>
                    {isLoadingNameManager
                      ? optionsNameManager.map((option) => (
                          <option value={option.id}>{option.value}</option>
                        ))
                      : null}
                  </Form.Select>
                </div>
                <div className="col-5 mt-2">
                  <label> Телефон конт. особи </label>
                  <Form.Control
                    type="text"
                    data-id="contact_phone"
                    value={formFirstLevel.contact_phone}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label>РУ менеджера</label>
                  <Form.Control
                    type="text"
                    data-id="brand_region"
                    disabled={true}
                    value={formFirstLevel.brand_region}
                  />
                </div>
                <div className="col-5 mt-2">
                  <label>Email конт. особи </label>
                  <Form.Control
                    type="text"
                    data-id="contact_email"
                    value={formFirstLevel.contact_email}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {secondLevel ? (
            <div className="row col-12 mt-5">
              <h2>II Рівень </h2>
            </div>
          ) : null}
          {thirdLevel ? (
            <div className="row col-12 mt-5">
              <h2>III Рівень </h2>
            </div>
          ) : null}
        </div>
        {/* <div className="col-4">
          <div>
            <h5>2 рівень</h5>
          </div>
          <div className="form" onChange={handleContactInput}>
            <label>ЄДРПОУ 2 рівень</label>
            <Form.Control
              type="number"
              name="level2_ident_code"
              id="level2_ident_code"
            />
          </div>

          <div>
            <Form.Check
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              id={`level2_ident_code`}
              label={`ЄДРПОУ 2 рівень`}
              checked={true}
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

            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`level2_name`}
                label={`Назва 2 рівня:`}
                checked={true}
              />
            </div>

            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`level2_id`}
                label={`ID 2 рівня:`}
                checked={true}
              />
            </div>

            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`level2_manager_id`}
                label={`Менеджер 2 рівня:`}
                checked={true}
              />
            </div>

            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`level2_manager_institution_id`}
                label={`РУ менеджера 2 рівня:`}
                checked={true}
              />
            </div>
          </div>
        </div> */}

        {/* <div className="col-4">
          <div className="row">
            <h5>ТСП</h5>
          </div>

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
            <Form.Check
              style={{ marginTop: "20px" }}
              type={"checkbox"}
              id={`inn`}
              label={`ІНН/ЄДРПОУ`}
              checked={true}
            />
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

            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`name_tsp`}
                label={`Назва ТСП:`}
                checked={true}
              />
            </div>
            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`manager_tsp`}
                label={`Менеджер ТСП:`}
                checked={true}
              />
            </div>
            <div>
              <Form.Check
                style={{ marginTop: "20px" }}
                type={"checkbox"}
                id={`ru_tsp`}
                label={`РУ менеджера ТСП:`}
                checked={true}
              />
            </div>
          </div>
        </div> */}
      </div>

      <div class="btnBlock" style={{ background: "white", padding: "10px" }}>
        {/* <button class="btn btn-success" onClick={confirm}>
          Зберегти
        </button> */}
      </div>
    </div>
  );
}
