import images from "../../../assets/images";
import useBalance from "../../../hooks/balance";
import { useNavigate } from "react-router-dom";
import Language from "../../modals/Language";
// import { useLanguage } from "../../../context/LanguageProvider";
import { useState } from "react";
import { Settings } from "../../../api";

export const Authorized = () => {
  // const { language } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const navigate = useNavigate();
  const { data } = useBalance();

  return (
    <div data-v-a601f501 className="balance">
      <div data-v-a601f501 className="Myaccount-after-login">
        <div data-v-a601f501 className="mo_user-blnc header_btns">
          <ul data-v-a601f501>
            <li data-v-a601f501>
              <a data-v-a601f501 href="Javascript:void(0);">
                Main PTI <b data-v-a601f501>{data?.availBalance}</b>
              </a>
            </li>
            <li data-v-a601f501>
              <a data-v-a601f501 className="exp-topcount">
                Exposure ({" "}
                <span data-v-a601f501 className="exp">
                  {data?.deductedExposure}
                </span>{" "}
                ){" "}
              </a>
            </li>
          </ul>
        </div>

        <div data-v-a601f501 className="reload-banking-btn">
          {/* <div data-v-a601f501 className="login-refresh-MAcnt-btn">
            <button
              onClick={() => refetch()}
              data-v-a601f501
              type="button"
              className="header_btns"
            >
              <img
                data-v-a601f501
                loading="lazy"
                src="/assets/reload-DKzQ224O.png"
                alt=""
              />
            </button>
          </div> */}
          <div data-v-a601f501 className="acc-setting-btn">
            <button
              onClick={() => navigate("/settings")}
              data-v-a601f501
              type="button"
              className="header_btns"
            >
              <img
                data-v-a601f501
                loading="lazy"
                src="/assets/settings-CbzoTn8v.png"
                alt=""
              />
            </button>
          </div>
          <div data-v-a601f501 className="acc-setting-btn">
            <div
              style={{
                position: "relative",
              }}
            >
              {Settings.language && (
                <button
                  className="header_btns"
                  onClick={() => setShowLanguage((prev) => !prev)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "end",
                      background: "transparent",
                      border: "none",
                      gap: "0px",
                      // marginTop: "5px",
                    }}
                  >
                    <img
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                      src={images.globe}
                      alt=""
                    />
                    <p
                      style={{
                        margin: "0px",
                        fontSize: "10px",
                        textTransform: "capitalize",
                        color: "white",
                      }}
                    >
                      {/* {language || "EN"} */}
                    </p>
                  </div>
                </button>
              )}
              {showLanguage && <Language setShowLanguage={setShowLanguage} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
