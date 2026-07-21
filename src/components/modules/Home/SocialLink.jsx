import { useSelector } from "react-redux";
import { Settings } from "../../../api";
import images from "../../../assets/images";
import { useState } from "react";
import MiniGames from "../../modals/Minigames/MiniGames";

const SocialLink = () => {
  const { token } = useSelector((state) => state.auth);
  const [showMiniGamesModal, setShowMiniGamesModal] = useState(false);
  const navigateWhatsApp = () => {
    if (token && Settings?.branchWhatsapplink) {
      window.open(Settings?.branchWhatsapplink, "_blank");
    } else {
      window.open(Settings?.whatsapplink, "_blank");
    }
  };
  return (
    <div
      style={{ width: "70px" }}
      className="footer-fixed-chat-icn laser-chat container"
    >
      {showMiniGamesModal && (
        <MiniGames setShowMiniGamesModal={setShowMiniGamesModal} />
      )}
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

      <a onClick={() => setShowMiniGamesModal(true)} aria-label="Open chat">
        <img
          loading="lazy"
          src="/icon/uv_games-CkYT1PYz.gif"
          style={{ width: "50px" }}
          alt="chat"
        />
      </a>
    </div>
  );
};

export default SocialLink;
