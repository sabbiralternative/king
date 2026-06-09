import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useNavigate } from "react-router-dom";

const Search = ({ setShowSearch }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  /* hide the search modal */
  const handleOpenGame = (item) => {
    const link = `/event-details/${item?.eventTypeId}/${item?.eventId}`;

    setSearchText("");
    setData([]);
    navigate(link);
  };

  useCloseModalClickOutside(ref, () => {
    setShowSearch(false);
    setSearchText("");
    setData([]);
  });

  return (
    <div data-v-99484868 data-v-5e69ccab className="sports-search-modal">
      <div
        data-v-99484868
        className="modal fade show"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div data-v-99484868 className="modal-dialog container" ref={ref}>
          <div data-v-99484868 className="modal-content">
            <div data-v-99484868 className="input-search-box-modal">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                data-v-99484868
                type="text"
                placeholder="Search Events"
                className="form-control"
              />
              <button
                data-v-99484868
                type="button"
                className="sports-close-icons"
              >
                <img
                  data-v-99484868
                  loading="lazy"
                  src="/assets/search-FeNNTuV7.png"
                  alt=""
                  className="invert-1"
                />
              </button>
            </div>
            <div data-v-99484868 className="modal-body p-0">
              <div data-v-99484868 className="sports-wrapper">
                <div data-v-99484868 className="scrollSearchBox">
                  {data?.length > 0 && searchText && (
                    <ul data-v-99484868 className="search-game-ul">
                      {data?.map((item, i) => (
                        <li
                          onClick={() => handleOpenGame(item)}
                          key={i}
                          data-v-99484868
                        >
                          <a data-v-99484868>
                            <div
                              data-v-99484868
                              className="d-flex justify-content-between w-100"
                            >
                              <div
                                data-v-99484868
                                className="search-game-name d-flex"
                              >
                                <b data-v-99484868> {item?.name}</b>
                              </div>
                              <div data-v-99484868 className="text-end">
                                {item?.openDate}
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
