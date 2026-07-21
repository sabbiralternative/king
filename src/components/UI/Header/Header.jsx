import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../../api";
import { useLogo } from "../../../context/ApiProvider";
import { Authorized } from "./authorized";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppPopup from "./AppPopUp";
import { Fragment, useEffect, useState } from "react";
import {
  setClosePopUpForForever,
  setShowAPKModal,
  setShowAppPopUp,
} from "../../../redux/features/global/globalSlice";
import Error from "../../modals/Error/Error";
import Notification from "./Notification";
import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modals/BuildVersion/BuildVersion";
import { useLanguage } from "../../../context/LanguageProvider";
import images from "../../../assets/images";
import Language from "../../modals/Language";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";

const Header = () => {
  const { valueByLanguage, setLanguage } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const stored_build_version = localStorage.getItem("build_version");
  const [showBuildVersion, setShowBuildVersion] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logo } = useLogo();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAppPopUp, windowWidth, closePopupForForever, showAPKModal } =
    useSelector((state) => state?.global);

  useEffect(() => {
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    dispatch(setClosePopUpForForever(closePopupForForever ? true : false));
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      dispatch(setClosePopUpForForever(true));
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        dispatch(setShowAPKModal(true));
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings.apk_link) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);

  useEffect(() => {
    const newVersion = Settings?.build_version;
    if (!stored_build_version) {
      if (newVersion) {
        localStorage.setItem("build_version", newVersion);
      }
    }
    if (stored_build_version && newVersion) {
      const parseVersion = JSON.parse(stored_build_version);
      if (newVersion > parseVersion) {
        setShowBuildVersion(true);
      }
    }
  }, [stored_build_version]);

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "english");
  }, [setLanguage]);

  if (Settings.app_only && !closePopupForForever) {
    return <Error />;
  }

  return (
    <Fragment>
      <Notification />
      {Settings.apk_link && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      {Settings.apk_link && showAPKModal && (
        <DownloadAPK setShowAPKModal={setShowAPKModal} />
      )}
      {showBuildVersion && !showAPKModal && (
        <BuildVersion
          build_version={Settings?.build_version}
          setShowBuildVersion={setShowBuildVersion}
        />
      )}
      <header data-v-a601f501 className="heading-section" loading="lazy">
        <div data-v-a601f501 className="contanier">
          <div data-v-a601f501 className="header_fixed">
            <div data-v-a601f501 className="haeder-nav flex-d">
              <div data-v-a601f501 className="header-logo">
                {token ? (
                  <div data-v-a601f501 className="after-login-bets-buttons">
                    <Link
                      data-v-a601f501
                      to="/open-bets"
                      className="router-link-active router-link-exact-active open-bets header_btns"
                      title="Setting"
                      aria-current="page"
                    >
                      <img
                        data-v-a601f501
                        loading="lazy"
                        src="/assets/open-bet-DHiPf1zm.svg"
                        alt=""
                      />{" "}
                      &nbsp;Bets
                    </Link>
                  </div>
                ) : (
                  <Link
                    data-v-a601f501
                    aria-current="page"
                    to="/"
                    className="router-link-active router-link-exact-active"
                  >
                    <img data-v-a601f501 loading="lazy" src={logo} alt="" />
                  </Link>
                )}
              </div>
              {token ? (
                <Authorized />
              ) : (
                <div data-v-a601f501 className="user-login index-view">
                  <div data-v-a601f501 className="mobile-login flex-d">
                    <button
                      onClick={() => navigate("/login")}
                      data-v-a601f501
                      type="button"
                      className="btn btn-login-1"
                    >
                      {languageValue(valueByLanguage, LanguageKey.LOGIN)}
                      <i
                        data-v-a601f501
                        className="fa-solid fa-right-to-bracket"
                      />
                    </button>
                    {Settings.registration && (
                      <button
                        onClick={() => navigate("/register")}
                        data-v-a601f501
                        type="button"
                        className="btn btn-login-1"
                      >
                        {languageValue(valueByLanguage, LanguageKey.REGISTER)}
                        <i
                          data-v-a601f501
                          className="fa-solid fa-right-to-bracket"
                        />
                      </button>
                    )}
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      {Settings.language && (
                        <button
                          className="btn btn-login-1"
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
                      {showLanguage && (
                        <Language setShowLanguage={setShowLanguage} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
