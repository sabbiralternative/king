import { Fragment, useState } from "react";
import { Settings } from "../../../api";
import PrivacyPolicy from "../../modals/Home/PrivacyPolicy";
import Rules from "../../modals/Home/Rules";
import KYC from "../../modals/Home/KYC";
import ResponsibleGambling from "../../modals/Home/ResponsibleGambling";

const HomeFooter = () => {
  const [modalName, setModalName] = useState(null);
  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <Fragment>
      {modalName === "privacy-policy" && (
        <PrivacyPolicy closeModal={() => setModalName(null)} />
      )}
      {modalName === "rules" && <Rules closeModal={() => setModalName(null)} />}
      {modalName === "kyc" && <KYC closeModal={() => setModalName(null)} />}
      {modalName === "responsible-gambling" && (
        <ResponsibleGambling closeModal={() => setModalName(null)} />
      )}
      <div data-v-5e69ccab className="app-downlode">
        <div data-v-5e69ccab className="mobile-app-footer-main">
          <div data-v-5e69ccab className="support-wrap">
            <div data-v-5e69ccab className="support-mail">
              <a
                data-v-5e69ccab
                onClick={() => setModalName("privacy-policy")}
                data-bs-toggle="modal"
                className="support-mail-item"
              >
                Privacy Policy
              </a>
              <a
                data-v-5e69ccab
                onClick={() => setModalName("rules")}
                data-bs-toggle="modal"
                className="support-mail-item"
              >
                Rules and Regulations
              </a>
              <a
                data-v-5e69ccab
                onClick={() => setModalName("kyc")}
                data-bs-toggle="modal"
                className="support-mail-item"
              >
                KYC
              </a>
              <a
                onClick={() => setModalName("responsible-gambling")}
                data-v-5e69ccab
                data-bs-toggle="modal"
                className="support-mail-item"
              >
                Responsible Gambling
              </a>
            </div>
          </div>
          {Settings.apk_link && (
            <div data-v-5e69ccab className="download-apk-btn">
              <a data-v-5e69ccab type="button" onClick={handleDownload}>
                <img
                  data-v-5e69ccab
                  loading="lazy"
                  src="/assets/androidapk-KwkklMem.png"
                  alt=""
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomeFooter;
