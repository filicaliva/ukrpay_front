import { Fragment, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
const SEARCH_URI = 'https://api.github.com/search/users';


export default function NETWORK_REPORT() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
  
    const handleSearch = (query) => {
      setIsLoading(true);
  
      fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
        .then((resp) => resp.json())
        .then(({ items }) => {
          const options = items.map((i) => ({
            avatar_url: i.avatar_url,
            id: i.id,
            login: i.login,
          }));
  
          setOptions(options);
          setIsLoading(false);
        });
    };



  return (
    <div className="coverTable DICT_NET_BRAND">
      <div className="headerTable">
        <div className="titleTable">Звіт по мережевим клієнтам</div>
      </div>
      <div className="addbBlock">
        <div className="row">
          <div>
            <AsyncTypeahead
              filterBy={true}
              isLoading={isLoading}
              labelKey="login"
              minLength={3}
              onSearch={handleSearch}
              options={options}
              placeholder="Назва мережі"
              renderMenuItemChildren={(option, props) => (
                <Fragment>
                  <img
                    alt={option.login}
                    src={option.avatar_url}
                    style={{
                      height: "24px",
                      marginRight: "10px",
                      width: "24px",
                    }}
                  />
                  <span>{option.login}</span>
                </Fragment>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
