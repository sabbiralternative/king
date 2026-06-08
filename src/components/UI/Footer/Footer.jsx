import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  return (
    <div data-v-59732b1e className="container">
      <footer
        data-v-59732b1e
        className="mobile-footer-menu-hide"
        loading="lazy"
      >
        <nav data-v-59732b1e className="mobile-footer-menu">
          <ul data-v-59732b1e>
            <li data-v-59732b1e>
              <Link
                data-v-59732b1e
                aria-current="page"
                to="/"
                className={`ui-link   ${location.pathname === "/" ? "router-link-active router-link-exact-active active" : ""}`}
              >
                <img
                  data-v-59732b1e
                  loading="lazy"
                  src="/assets/home-DRd6byi1.svg"
                  className="icon-home"
                />
                Home
              </Link>
            </li>
            <li data-v-59732b1e>
              <Link
                data-v-59732b1e
                to="/in-play"
                className={`ui-link   ${location.pathname === "/in-play" ? "router-link-active router-link-exact-active active" : ""}`}
              >
                <img
                  data-v-59732b1e
                  loading="lazy"
                  src="/assets/timer-Du_GFUIt.svg"
                  className="icon-inplay"
                />
                In-Play
              </Link>
            </li>
            <li data-v-59732b1e className="main-nav">
              <Link
                data-v-59732b1e
                to="/sports"
                className={`ui-link sports-tabs-icon ${location.pathname === "/sports" ? "router-link-active router-link-exact-active active" : ""}`}
              >
                <img
                  data-v-59732b1e
                  loading="lazy"
                  src="/assets/trophy-WU5WzHOR.svg"
                  className="icon-sports"
                />
                <span data-v-59732b1e className>
                  Sports
                </span>
              </Link>
            </li>
            <li data-v-59732b1e>
              <Link
                data-v-59732b1e
                to="/live-casino"
                className={`ui-link   ${location.pathname === "/casino" ? "router-link-active router-link-exact-active active" : ""}`}
              >
                <img
                  data-v-59732b1e
                  loading="lazy"
                  rel="preload"
                  src="/assets/ChipRotate-BiqYdzAx.gif"
                  className="icon-pin"
                />
                Casino
              </Link>
            </li>
            <li data-v-59732b1e className="cursor-pointer">
              <Link
                data-v-59732b1e
                className={`ui-link   ${location.pathname === "/account" ? "router-link-active router-link-exact-active active" : ""}`}
                to={token ? "/account" : "/login"}
              >
                <img
                  data-v-59732b1e
                  loading="lazy"
                  src="/assets/user-CM5moiLF.svg"
                  className="icon-account"
                />
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
