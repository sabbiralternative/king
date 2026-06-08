import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import { useState } from "react";
import WarningCondition from "../../shared/WarningCondition/WarningCondition";

const HomeNavigationBar = () => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventTypeId = params.get("eventTypeId");
  const { token } = useSelector((state) => state.auth);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (Settings.casino_currency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div data-v-5e69ccab className="mobile-view-nav">
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div data-v-5e69ccab className="mobile-view lft-side-tabs makeFull">
        <ul data-v-5e69ccab className="home-navigation-bar">
          <li data-v-5e69ccab className="nav-item">
            <a
              data-v-5e69ccab
              className="nav-link aviator_link"
              onClick={() => handleNavigateToIFrame("aviator", "200296")}
            >
              <div data-v-5e69ccab className="aviator_content">
                <img
                  data-v-5e69ccab
                  src="/assets/aviator-CjVQwI37.png"
                  alt="aviator"
                  loading="lazy"
                />
                <span data-v-5e69ccab>Vimaan</span>
              </div>
            </a>
          </li>

          <li data-v-5e69ccab className="nav-item">
            <a
              onClick={() => navigate("?eventTypeId=4")}
              data-v-5e69ccab
              className={`nav-link  ${eventTypeId === "4" || eventTypeId === null ? "active" : ""}`}
            >
              <img
                data-v-5e69ccab
                src="/assets/tb-cricket-player-with-bat-CvG7IKFf.svg"
                alt=""
                loading="lazy"
              />
              <span data-v-5e69ccab>&nbsp;cricket</span>
            </a>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <a
              onClick={() => navigate("?eventTypeId=1")}
              data-v-5e69ccab
              className={`nav-link  ${eventTypeId === "1" ? "active" : ""}`}
            >
              <img
                data-v-5e69ccab
                src="/assets/tb-soccer-Bp8hUWlZ.svg"
                alt=""
                loading="lazy"
              />
              <span data-v-5e69ccab>&nbsp;Football</span>
            </a>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <a
              onClick={() => navigate("?eventTypeId=2")}
              data-v-5e69ccab
              className={`nav-link  ${eventTypeId === "2" ? "active" : ""}`}
            >
              <img
                data-v-5e69ccab
                src="/assets/tb-tennis-player-BzPmAIfj.svg"
                alt=""
                loading="lazy"
              />
              <span data-v-5e69ccab>&nbsp;tennis</span>
            </a>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <a data-v-5e69ccab className="nav-link">
              <img
                data-v-5e69ccab
                src="/assets/tb-kabbadi-DKs3rxt3.svg"
                alt=""
                loading="lazy"
              />
              <span data-v-5e69ccab>Kabaddi </span>
            </a>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <a
              data-v-5e69ccab
              aria-current="page"
              onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
              className="router-link-active router-link-exact-active nav-link"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-sports-book-CMNk2rvf.svg"
                alt=""
              />
              <span data-v-5e69ccab>Sports Book</span>
            </a>
          </li>

          <li data-v-5e69ccab className="nav-item">
            <Link
              data-v-5e69ccab
              aria-current="page"
              to="/mac88"
              className="router-link-active router-link-exact-active nav-link"
              data-role="live-casino"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-poker-cards-D3T_YA8Y.svg"
                alt=""
              />
              <span data-v-5e69ccab>Mac88</span>
            </Link>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <Link
              data-v-5e69ccab
              aria-current="page"
              to="/live-casino"
              className="router-link-active router-link-exact-active nav-link"
              data-role="live-casino"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-poker-cards-D3T_YA8Y.svg"
                alt=""
              />
              <span data-v-5e69ccab>Live Casino</span>
            </Link>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <Link
              data-v-5e69ccab
              aria-current="page"
              to="/slots"
              className="router-link-active router-link-exact-active nav-link"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-poker-cards-D3T_YA8Y.svg"
                alt=""
              />
              <span data-v-5e69ccab>Slots</span>
            </Link>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <Link
              data-v-5e69ccab
              aria-current="page"
              to="/crash-games"
              className="router-link-active router-link-exact-active nav-link"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-poker-cards-D3T_YA8Y.svg"
                alt=""
              />
              <span data-v-5e69ccab>Crash Games</span>
            </Link>
          </li>
          <li data-v-5e69ccab className="nav-item">
            <Link
              data-v-5e69ccab
              aria-current="page"
              to="/fishing-games"
              className="router-link-active router-link-exact-active nav-link"
            >
              <img
                data-v-5e69ccab
                loading="lazy"
                src="/assets/tb-poker-cards-D3T_YA8Y.svg"
                alt=""
              />
              <span data-v-5e69ccab>Fishing Games</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeNavigationBar;
