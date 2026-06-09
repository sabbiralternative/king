/* eslint-disable react/no-unknown-property */
import "../../../assets/css/horseGreyhound.css";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HorseGreyhound = ({ data, eventTypeId }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.[0]?.childs?.[0]?.countryCode);
    }
  }, [data]);

  const findChildByCountryCode =
    selectedCategory &&
    data &&
    data?.[0]?.childs?.find((child) => child?.countryCode === selectedCategory);

  const convertToIST = (utc) => {
    return moment(utc).tz("Asia/Kolkata").format("HH:mm");
  };
  return (
    <div>
      <div
        _ngcontent-wne-c149=""
        className="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <div
          _ngcontent-wne-c149=""
          className="card m-1"
          style={{ borderRadius: "2px", boxSizing: "border-box" }}
        >
          <ul
            _ngcontent-wne-c149=""
            ngbnav=""
            className="nav-tabs nav"
            role="tablist"
          >
            {data?.[0]?.childs?.map((horseRacing) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCategory(horseRacing?.countryCode)}
                  key={horseRacing?.countryCode}
                  _ngcontent-wne-c149=""
                  className="navItems nav-item ng-star-inserted"
                >
                  <a
                    _ngcontent-wne-c149=""
                    ngbnavlink=""
                    className={`race-region nav-link ${
                      selectedCategory === horseRacing?.countryCode
                        ? "active"
                        : ""
                    }`}
                    aria-labelledby="NZ"
                    id="ngb-nav-9"
                    role="tab"
                    aria-controls="ngb-nav-9-panel"
                    aria-selected="true"
                    aria-disabled="false"
                  >
                    <span
                      _ngcontent-wne-c149=""
                      className={`flag_logo ${horseRacing?.countryCode}`}
                    ></span>
                    <span _ngcontent-wne-c149="" className="city">
                      {" "}
                      {horseRacing?.countryCode}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div _ngcontent-wne-c149="" className="mt-0 tab-content">
            <div
              ngbnavpane=""
              className="tab-pane fade show active ng-star-inserted"
              id="ngb-nav-9-panel"
              role="tabpanel"
              aria-labelledby="ngb-nav-9"
            >
              {findChildByCountryCode?.childs?.map((child) => {
                return (
                  <div
                    key={child?.trackName}
                    _ngcontent-wne-c149=""
                    className="row mx-0 item-box px-0 py-1 ng-star-inserted"
                  >
                    <div _ngcontent-wne-c149="" className="col-md-2">
                      <span _ngcontent-wne-c149="" className="trackName">
                        {child?.trackName}
                      </span>
                    </div>
                    <div _ngcontent-wne-c149="" className="col-md-10">
                      {child?.childs?.map((item) => {
                        return (
                          <span
                            onClick={() =>
                              navigate(
                                `/event-details/${eventTypeId}/${item?.eventId}`,
                              )
                            }
                            key={item?.eventId}
                            _ngcontent-wne-c149=""
                            className="ng-star-inserted"
                          >
                            <span
                              _ngcontent-wne-c149=""
                              className="startTime p-2"
                              tabindex="0"
                            >
                              {convertToIST(item?.startTime)}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseGreyhound;
