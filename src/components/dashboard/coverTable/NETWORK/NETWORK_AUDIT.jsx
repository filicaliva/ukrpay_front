import Button from "@restart/ui/esm/Button";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

export default function NETWORK_AUDIT({ store }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [brand, setBrand] = useState(null);
  const [contact, setContact] = useState();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [formFirstLevel, setFormFirstLevel] = useState(null);

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

  const confirm = async () => {
    const body = {
      brand_id: brand.brand_id,
      date_from: dateFrom,
      date_to: dateTo,
    };
    await axios
      .post(`/api/Dictionary/GetNetworkAuditReport`, body, {
        headers: {
          token: store.userState.token,
        },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", brand.brand_name+".xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleDateFrom = (e) => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e) => {
    setDateTo(e.target.value);
  };

  return (
    <div className="coverTable DICT_NET_BRAND">
      <div className="addbBlock ">
        <div className="container">
          <div className="row col-12">
            <div className="row col-12">
              <div className="mb-1">Зміни інформації по мережі:</div>
              <AsyncTypeahead
                className="col-6"
                filterBy={() => true}
                id="async-brand-audit"
                isLoading={isLoading}
                labelKey={(option) => {
                  setBrand(option);
                  setFormFirstLevel(option);
                  return option.brand_name;
                }}
                minLength={3}
                onSearch={handleSearchBrandName}
                options={options}
                searchText="Пошук..."
                placeholder="Назва мережі..."
                promptText=""
                renderMenuItemChildren={(option, props) => (
                  <option value={option.brand_id}>{option.brand_name}</option>
                )}
              />
            </div>
            <div>
              <div className="coverInput mt-3">
                <span className="mb-1">Період звіту</span>
                <div className="row container">
                  <div className="d-flex align-items-center col-3">
                    <label htmlFor="date_report_from">З</label>
                    <Form.Control
                      onChange={handleDateFrom}
                      type="date"
                      style={{ marginLeft: "10px", maxWidth: "150px" }}
                    />
                  </div>
                  <div className="d-flex align-items-center  col-3">
                    <label htmlFor="date_report_to">По</label>
                    <Form.Control
                      onChange={handleDateTo}
                      type="date"
                      style={{ marginLeft: "10px", maxWidth: "150px"  }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btnBlock" style={{ background: "white", padding: "10px" }}>
        <button class="btn btn-success" onClick={confirm}>
          Завантажити
        </button>
      </div>
    </div>
  );
}
