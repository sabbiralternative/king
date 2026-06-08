import { useSelector } from "react-redux";
import { Settings } from "../../../api";
import images from "../../../assets/images";

const SocialLink = () => {
  const { token } = useSelector((state) => state.auth);

  const navigateWhatsApp = () => {
    if (token && Settings?.branchWhatsapplink) {
      window.open(Settings?.branchWhatsapplink, "_blank");
    } else {
      window.open(Settings?.whatsapplink, "_blank");
    }
  };
  return (
    <div className="footer-fixed-chat-icn laser-chat container">
      {Settings?.instagramLink && (
        <a
          onClick={() => window.open(Settings?.instagramLink, "_blank")}
          aria-label="Open chat"
        >
          <img loading="lazy" src={images.instagram} alt="chat" />
        </a>
      )}
      {Settings?.telegramLink && (
        <a
          onClick={() => window.open(Settings?.telegramLink, "_blank")}
          aria-label="Open chat"
        >
          <img loading="lazy" src={images.telegram} alt="chat" />
        </a>
      )}
      {(Settings?.whatsapplink || Settings?.branchWhatsapplink) && (
        <a onClick={navigateWhatsApp} aria-label="Open chat">
          <img loading="lazy" src={images.whatsApp} alt="chat" />
        </a>
      )}
    </div>
  );
};

export default SocialLink;
