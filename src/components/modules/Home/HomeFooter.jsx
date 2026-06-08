import { Settings } from "../../../api";

const HomeFooter = () => {
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
    <div data-v-5e69ccab className="app-downlode">
      <div data-v-5e69ccab className="mobile-app-footer-main">
        <div data-v-5e69ccab className="support-wrap">
          <div data-v-5e69ccab className="support-mail">
            <a
              data-v-5e69ccab
              href="#privacyPolicyModal"
              data-bs-toggle="modal"
              className="support-mail-item"
            >
              Privacy Policy
            </a>
            <a
              data-v-5e69ccab
              href="#ruleRegulationModal"
              data-bs-toggle="modal"
              className="support-mail-item"
            >
              Rules and Regulations
            </a>
            <a
              data-v-5e69ccab
              href="#kycModal"
              data-bs-toggle="modal"
              className="support-mail-item"
            >
              KYC
            </a>
            <a
              data-v-5e69ccab
              href="#ruleRegulationModal"
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
  );
};

export default HomeFooter;
