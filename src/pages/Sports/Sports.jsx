import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../const";
import { eventNameList } from "../../static/event-name-list";

const Sports = () => {
  const { valueByLanguage } = useLanguage();
  return (
    <div data-v-2f3cedbb>
      <div data-v-39546433 className="all-sports-tabs-wrapper">
        <div data-v-39546433 className="quick-header">
          <h3 data-v-39546433>Quick Links</h3>
        </div>
        <div data-v-39546433 className="quick_link-tab-sec">
          <ul data-v-39546433>
            <li data-v-39546433>
              <Link data-v-39546433 to="/in-play" className>
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/inplay-icon-BM-8EhBH.svg"
                />
                <span data-v-39546433>In-Play</span>
              </Link>
            </li>

            <li data-v-39546433 className>
              <Link to="/?eventTypeId=4" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/cricket-ball-BH_bA9CQ.png"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.CRICKET)}
                </span>
              </Link>
            </li>
            <li data-v-39546433 className>
              <Link to="/?eventTypeId=1" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/soccer-img-CWVZBzK7.png"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.FOOTBALL)}
                </span>
              </Link>
            </li>
            <li data-v-39546433 className>
              <Link to="/?eventTypeId=2" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/tennis-ball--y0i_C_9.png"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.TENNIS)}
                </span>
              </Link>
            </li>

            <li data-v-39546433 className>
              <Link to="/?eventTypeId=5" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/tb-kabbadi-DKs3rxt3.svg"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.KABADDI)}{" "}
                </span>
              </Link>
            </li>
            <li data-v-39546433 className>
              <Link to="/?eventTypeId=6" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/sports-no-DZr9pepC.svg"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  Election
                </span>
              </Link>
            </li>
            <li data-v-39546433 className>
              <Link to="/?eventTypeId=7" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/sports-no-DZr9pepC.svg"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.HORSE)}
                </span>
              </Link>
            </li>
            <li data-v-39546433 className>
              <Link to="/?eventTypeId=4339" data-v-39546433 className="active">
                <img
                  data-v-39546433
                  loading="lazy"
                  src="/assets/sports-no-DZr9pepC.svg"
                  alt=""
                />
                <span data-v-39546433 className="text-capitalize">
                  {languageValue(valueByLanguage, LanguageKey.GREYHOUND)}
                </span>
              </Link>
            </li>
            {eventNameList.map((item) => {
              return (
                <li key={item.id} data-v-39546433 className>
                  <Link to="/?eventTypeId=6" data-v-39546433 className="active">
                    <img
                      style={{ filter: "none" }}
                      data-v-39546433
                      loading="lazy"
                      src={item.image}
                      alt=""
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          data-v-39546433
          className="all-sport-cmn-h quick-header multyMarket"
        >
          <h3 data-v-39546433>
            <Link data-v-39546433 className="active">
              All Sports
            </Link>
          </h3>
        </div>
        <div data-v-39546433 className="sidebar">
          <nav data-v-39546433 className="sidebar-nav ps ps--active-y">
            <ul data-v-39546433 className="nav account-nav">
              <li data-v-39546433 className="nav-item" role="presentation">
                <Link
                  to="/?eventTypeId=4"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/cricket-ball-BH_bA9CQ.png"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.CRICKET)}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              <li data-v-39546433 className="nav-item" role="presentation">
                <Link
                  to="/?eventTypeId=1"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/soccer-img-CWVZBzK7.png"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.FOOTBALL)}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              <li data-v-39546433 className="nav-item" role="presentation">
                <Link
                  to="/?eventTypeId=2"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/tennis-ball--y0i_C_9.png"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.TENNIS)}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              <li data-v-39546433 className="nav-item">
                <Link
                  to="/?eventTypeId=5"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/tb-kabbadi-DKs3rxt3.svg"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.KABADDI)}{" "}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              <li data-v-39546433 className="nav-item">
                <Link
                  to="/?eventTypeId=6"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/tb-election-BeUX9yBo.svg"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      Election
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>

              <li data-v-39546433 className="nav-item">
                <Link
                  to="/?eventTypeId=7"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/tb-kabbadi-DKs3rxt3.svg"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.HORSE)}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              <li data-v-39546433 className="nav-item">
                <Link
                  to="/?eventTypeId=4339"
                  data-v-39546433
                  className="nav-link active"
                >
                  <div data-v-39546433 className="sports-name-lft">
                    <img
                      data-v-39546433
                      loading="lazy"
                      src="/assets/tb-kabbadi-DKs3rxt3.svg"
                      alt=""
                      className="sport-icon"
                    />
                    <span data-v-39546433 className="text-capitalize">
                      {languageValue(valueByLanguage, LanguageKey.GREYHOUND)}
                    </span>
                  </div>
                  <div data-v-39546433 className="nav-next-btn">
                    <span data-v-39546433>
                      <img
                        data-v-39546433
                        loading="lazy"
                        src="/assets/down-open-icons-BMVvhj-B.png"
                        alt=""
                      />
                    </span>
                  </div>
                </Link>
              </li>
              {eventNameList.map((item) => {
                return (
                  <li key={item.id} data-v-39546433 className="nav-item">
                    <Link
                      to={`/?eventTypeId=${item.id}`}
                      data-v-39546433
                      className="nav-link active"
                    >
                      <div data-v-39546433 className="sports-name-lft">
                        <img
                          style={{ filter: "none" }}
                          data-v-39546433
                          loading="lazy"
                          src={item.image}
                          alt=""
                          className="sport-icon"
                        />
                        <span data-v-39546433 className="text-capitalize">
                          {item.name}
                        </span>
                      </div>
                      <div data-v-39546433 className="nav-next-btn">
                        <span data-v-39546433>
                          <img
                            data-v-39546433
                            loading="lazy"
                            src="/assets/down-open-icons-BMVvhj-B.png"
                            alt=""
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sports;
