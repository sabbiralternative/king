import { useLocation, useNavigate } from "react-router-dom";
import { useGroupQuery } from "../../../hooks/group";
import HorseGreyhound from "./HorseGreyhound";
import { useState } from "react";
import { FilterLiveVirtual } from "../../../utils/filter-live-virtual";
import LiveVirtual from "./LiveVirtual";

const OddSports = () => {
  const [liveVirtual, setLiveVirtual] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventTypeId = params.get("eventTypeId");
  const { data, isSuccess } = useGroupQuery({
    sportsType: Number(eventTypeId) || 4,
  });

  // const groupedData =
  //   data && data !== null && Object.keys(data).length > 0
  //     ? Object.entries(data)
  //         .filter(([, value]) => value.visible === true)
  //         .sort(([, a], [, b]) => {
  //           return b.inPlay - a.inPlay;
  //         })
  //     : [];
  const groupedData = FilterLiveVirtual(
    liveVirtual,
    Number(eventTypeId) || 4,
    data,
  );
  const navigateGameList = (eventTypeId, keys) => {
    navigate(`/event-details/${eventTypeId}/${keys}`);
  };

  return (
    <div data-v-5e69ccab className="tab-content fixed-game-header">
      <div data-v-5e69ccab className="active tab-pane">
        {eventTypeId != 7 && eventTypeId != 4339 && groupedData?.length > 0 && (
          <div data-v-5e69ccab className="mobile-width scrollHeight">
            <div data-v-c9d3df59 className="odds-header-container">
              <div data-v-c9d3df59 className="odds-header">
                <LiveVirtual
                  setLiveVirtual={setLiveVirtual}
                  category={Number(eventTypeId) || 4}
                />
                <div data-v-c9d3df59>1</div>
                <div data-v-c9d3df59>X</div>
                <div data-v-c9d3df59>2</div>
              </div>
            </div>
            {groupedData &&
              groupedData.map(([key, value]) => {
                return (
                  <div
                    onClick={() => navigateGameList(value?.eventTypeId, key)}
                    key={key}
                    data-v-c9d3df59
                    className="sportsWrap-list"
                  >
                    <div
                      data-v-c9d3df59
                      className="matchname match-details-head"
                    >
                      <div data-v-c9d3df59 className="match-name-h">
                        <div data-v-c9d3df59 className="topLine">
                          <a data-v-c9d3df59>{value?.eventName}</a>
                          {value?.inPlay === 1 ? (
                            <span
                              data-v-c9d3df59
                              className="inplay-animation-text"
                            >
                              In-Play
                            </span>
                          ) : (
                            <span
                              data-v-c9d3df59
                              className="clock-icon fas fa-clock"
                            />
                          )}
                        </div>
                        <span data-v-c9d3df59 className="match-time-and-date">
                          {value?.date}
                        </span>
                      </div>
                      <div data-v-c9d3df59 className="game-bookmaker-icons">
                        {value?.isFancy === 1 && (
                          <span data-v-c9d3df59 className="game-fancy">
                            F
                          </span>
                        )}

                        {value?.isTv === 1 && (
                          <span data-v-c9d3df59 className="game-sportbook">
                            TV
                          </span>
                        )}
                        {value?.isBookmaker === 1 && (
                          <span data-v-c9d3df59 className="game-sportbook">
                            B
                          </span>
                        )}
                      </div>
                      <div data-v-c9d3df59 className="oddsEventlist">
                        <div data-v-c9d3df59 className="btn-group">
                          <button data-v-c9d3df59 className="back">
                            {value?.[0]?.ex?.availableToBack?.[0]?.price || "-"}
                          </button>
                          <button data-v-c9d3df59 className="lay">
                            {value?.[0]?.ex?.availableToLay?.[0]?.price || "-"}
                          </button>
                        </div>
                        <div data-v-c9d3df59 className="btn-group">
                          <button data-v-c9d3df59 className="back">
                            {value?.[2]?.ex?.availableToBack?.[0]?.price || "-"}
                          </button>
                          <button data-v-c9d3df59 className="lay">
                            {value?.[2]?.ex?.availableToLay?.[0]?.price || "-"}
                          </button>
                        </div>
                        <div data-v-c9d3df59 className="btn-group">
                          <button data-v-c9d3df59 className="back">
                            {value?.[1]?.ex?.availableToBack?.[0]?.price || "-"}
                          </button>
                          <button data-v-c9d3df59 className="lay">
                            {value?.[1]?.ex?.availableToLay?.[0]?.price || "-"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {(eventTypeId == 7 || eventTypeId == 4339) && data?.length > 0 && (
          <HorseGreyhound data={data} eventTypeId={eventTypeId} />
        )}
        {(eventTypeId == 7 || eventTypeId == 4339) &&
          data?.length === 0 &&
          isSuccess && (
            <div
              style={{
                background: "white",
                padding: "5px",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              <p>No Event available right now</p>
            </div>
          )}

        {groupedData?.length === 0 &&
          eventTypeId != 7 &&
          eventTypeId != 4339 &&
          isSuccess && (
            <div
              style={{
                background: "white",
                padding: "5px",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              <p>No Event available right now</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default OddSports;
