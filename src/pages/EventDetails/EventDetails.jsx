import { useEffect, useState } from "react";
import {
  useGetEventDetailsQuery,
  useVideoMutation,
} from "../../redux/features/events/events";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import { Settings } from "../../api";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import Score from "../../components/modules/EventDetails/Score";
import TennisScore from "../../components/modules/EventDetails/TennisScore";
import OpenBets from "../../components/modals/OpenBets/OpenBets";

const EventDetails = () => {
  const [showOpenBets, setShowOpenBets] = useState(false);
  const [tab, setTab] = useState("all");
  const [sportsVideo, { data: iframe }] = useVideoMutation();
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    },
  );

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match",
  );

  useEffect(() => {
    const handleGetVideo = async () => {
      const payload = {
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",
        casinoCurrency: Settings.casino_currency,
      };
      await sportsVideo(payload).unwrap();
    };
    handleGetVideo();
  }, []);

  return (
    <div data-v-2f3cedbb>
      {showOpenBets && <OpenBets setShowOpenBets={setShowOpenBets} />}
      <section
        data-v-2f3cedbb
        className="simplebar-content-wrapper dashbord-p-top"
        loading="lazy"
      >
        <div className="contan">
          <div className="user-box">
            <div className="match-menu">
              <div data-v-01cb3fd9 className="match-inplay">
                <div data-v-01cb3fd9 className="match-inplay-tv p-2">
                  {data?.result?.[0]?.inPlay && (
                    <h2 data-v-01cb3fd9 className="eventTitle tv-play">
                      <span data-v-01cb3fd9>In-Play </span>
                    </h2>
                  )}

                  <button
                    onClick={() => setShowOpenBets(true)}
                    data-v-01cb3fd9
                    data-bs-toggle="modal"
                    href="#exampleModalTogglebets"
                    role="button"
                    className="primary_btn mob_open_bets"
                  >
                    <span data-v-01cb3fd9>Bets</span>
                  </button>
                </div>
              </div>

              <div data-v-01cb3fd9 className="mat-mdc-wrap">
                <div
                  data-v-01cb3fd9
                  className="form-check mat-mdc-checkbox"
                  onClick={() => setTab("all")}
                >
                  <input
                    data-v-01cb3fd9
                    className="form-check-input"
                    type="radio"
                    id="pageFilterall"
                    name="pageFilterGroup"
                    defaultValue="all"
                  />
                  <label
                    data-v-01cb3fd9
                    className={`form-check-label  ${tab === "all" ? "active" : ""}`}
                    htmlFor="pageFilterall"
                  >
                    All
                  </label>
                </div>
                <div
                  onClick={() => setTab("match_odds")}
                  data-v-01cb3fd9
                  className="form-check mat-mdc-checkbox"
                >
                  <input
                    data-v-01cb3fd9
                    className="form-check-input"
                    type="radio"
                    id="pageFiltermatch_odds"
                    name="pageFilterGroup"
                    defaultValue="match_odds"
                  />
                  <label
                    data-v-01cb3fd9
                    className={`form-check-label  ${tab === "match_odds" ? "active" : ""}`}
                    htmlFor="pageFiltermatch_odds"
                  >
                    Match Odds
                  </label>
                </div>
                <div
                  onClick={() => setTab("bookmaker")}
                  data-v-01cb3fd9
                  className="form-check mat-mdc-checkbox"
                >
                  <input
                    data-v-01cb3fd9
                    className="form-check-input"
                    type="radio"
                    id="pageFilterbookmakers"
                    name="pageFilterGroup"
                    defaultValue="bookmakers"
                  />
                  <label
                    data-v-01cb3fd9
                    className={`form-check-label  ${tab === "bookmaker" ? "active" : ""}`}
                    htmlFor="pageFilterbookmakers"
                  >
                    Bookmakers
                  </label>
                </div>
                <div
                  onClick={() => setTab("fancy")}
                  data-v-01cb3fd9
                  className="form-check mat-mdc-checkbox"
                >
                  <input
                    data-v-01cb3fd9
                    className="form-check-input"
                    type="radio"
                    id="pageFilterfancy_filters"
                    name="pageFilterGroup"
                    defaultValue="fancy_filters"
                  />
                  <label
                    data-v-01cb3fd9
                    className={`form-check-label  ${tab === "fancy" ? "active" : ""}`}
                    htmlFor="pageFilterfancy_filters"
                  >
                    Fancy
                  </label>
                </div>
                <div
                  onClick={() => setTab("tied")}
                  data-v-01cb3fd9
                  className="form-check mat-mdc-checkbox"
                >
                  <input
                    data-v-01cb3fd9
                    className="form-check-input"
                    type="radio"
                    id="pageFilterother_match"
                    name="pageFilterGroup"
                    defaultValue="other_match"
                  />
                  <label
                    data-v-01cb3fd9
                    className={`form-check-label  ${tab === "tied" ? "active" : ""}`}
                    htmlFor="pageFilterother_match"
                  >
                    Tied
                  </label>
                </div>
              </div>
              {eventTypeId == 2 && data?.score && (
                <TennisScore eventTypeId={eventTypeId} score={data?.score} />
              )}

              {data?.score?.tracker && (
                <div
                  style={{
                    width: "100%",
                    height: "125px",
                    overflow: "hidden",
                  }}
                >
                  {" "}
                  <iframe
                    style={{
                      width: "100%",
                    }}
                    className="premium-iframe"
                    src={data?.score?.tracker}
                  ></iframe>
                </div>
              )}
              {iframe?.result?.url && data?.score?.hasVideo && (
                <div
                  style={{
                    marginTop: "10px",
                    width: "100%",

                    overflow: "hidden",
                    padding: "0px 8px",
                  }}
                  className="embed-responsive embed-responsive-16by9 ng-star-inserted"
                >
                  <iframe
                    id="tvStr"
                    className="embed-responsive-item w-100"
                    src={iframe?.result?.url}
                  ></iframe>
                </div>
              )}
              {eventTypeId == 4 && data?.iscore && (
                <Score iscore={data?.iscore} />
              )}
              {(tab === "match_odds" || tab === "all") &&
                matchOdds?.length > 0 && <MatchOdds data={matchOdds} />}
              {(tab === "bookmaker" || tab === "all") &&
                bookmaker?.length > 0 && <Bookmaker data={bookmaker} />}
              {(tab === "fancy" || tab === "all") &&
                data?.result?.length > 0 && <Fancy data={data?.result} />}

              {(tab === "tied" || tab === "all") && tiedMatch?.length > 0 && (
                <MatchOdds data={tiedMatch} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
