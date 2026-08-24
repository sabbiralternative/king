import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import toast from "react-hot-toast";
import BetSLip from "./BetSLip";
import { Settings } from "../../../api";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import SpeedCashOut from "../../modals/SpeedCashOut/SpeedCashOut";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const Bookmaker = ({ data }) => {
  const { getLanguage } = useLanguage();
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      toast.error("Please login to place a bet.");
    }
  };

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    if (exposureA > 0 && exposureB > 0) {
      const difference = Math.abs(exposureA - exposureB);
      if (difference <= 10) {
        speedCashOut = true;
      }
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  return (
    <Fragment>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {data?.map((game) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === game?.id && profit?.isOnePositiveExposure,
        );
        const speedCashOut = teamProfit?.find(
          (profit) => profit?.gameId === game?.id && profit?.speedCashOut,
        );
        return (
          <div
            key={game?.id}
            className="bookmaker-cashout sat-odds-bk-ly-btn-design"
          >
            <div className="dScreen">
              <div className="odds-menu">
                <div className="row">
                  <div className="col-md-12 col-12 d-flex">
                    <p className="match-odds tied-cmn-h">
                      {" "}
                      {game?.name?.toUpperCase()}
                    </p>
                    {Settings.cashout &&
                      game?.runners?.length !== 3 &&
                      game?.status === "OPEN" &&
                      !speedCashOut && (
                        <div className="cashout-container empty-container ng-star-inserted">
                          <span className="cashout-label">
                            <button
                              onClick={() =>
                                handleCashOutPlaceBet(
                                  game,
                                  "lay",
                                  dispatch,
                                  pnlBySelection,
                                  token,
                                  teamProfitForGame,
                                )
                              }
                              style={{
                                cursor: `${
                                  !teamProfitForGame ? "not-allowed" : "pointer"
                                }`,
                                opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                              }}
                              type="button"
                              className="cashout-button"
                            >
                              <span className="cashout-icon">
                                <i className="fa fa-circle" />
                              </span>{" "}
                              {getLanguage(LanguageKey.CASHOUT)}{" "}
                              {teamProfitForGame?.profit &&
                                `(${teamProfitForGame.profit.toFixed(0)})`}
                            </button>
                          </span>
                        </div>
                      )}
                    {Settings.cashout &&
                      game?.runners?.length !== 3 &&
                      game?.status === "OPEN" &&
                      game?.name !== "toss" &&
                      speedCashOut && (
                        <div className="cashout-container empty-container ng-star-inserted">
                          <span className="cashout-label">
                            <button type="button" className="cashout-button">
                              <span className="cashout-icon">
                                <i className="fa fa-circle" />
                              </span>{" "}
                              {getLanguage(LanguageKey.SPEED_CASHOUT)}
                            </button>
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="odds-menu btn-color">
                <div className="row">
                  <div className="col-md-7 col-7">
                    <div className="minmax mm-fi p-1">
                      <dl className="fancy-info m-0">
                        <dt>
                          {getLanguage(LanguageKey.MIN)}/
                          {getLanguage(LanguageKey.MAX)}
                        </dt>
                        <dd>
                          {" "}
                          {game?.minLiabilityPerBet}-{game?.maxLiabilityPerBet}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-5 col-5">
                    <div className="btn-group dOddsBox">
                      <div className="back dOddsBox-wrap">
                        <button className="back2" />
                        <button className="back1" />
                        <button className="back back-img">Back</button>
                      </div>
                      <div className="lay dOddsBox-wrap">
                        <button className="lay lay-img">Lay</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {game?.runners?.map((runner) => {
                const pnl = pnlBySelection?.find(
                  (pnl) => pnl?.RunnerId === runner?.id,
                );
                const predictOddValues = predictOdd?.find(
                  (val) => val?.id === runner?.id,
                );
                return (
                  <div
                    key={runner?.id}
                    className="odds-menu bet-slip-area bookmaker-bet-slip-area"
                  >
                    <div className="row">
                      <div className="col-7 col-md-5 col-lg-7">
                        <p className="team-name">
                          {runner?.name} &nbsp;{" "}
                          <span className="SportEvent__market__title__exposure">
                            {pnl && (
                              <span
                                className={`${
                                  pnl?.pnl > 0 ? "text-success" : "text-danger"
                                }`}
                              >
                                {pnl?.pnl}
                              </span>
                            )}

                            {stake && runnerId && predictOddValues && (
                              <span
                                className={` ${
                                  predictOddValues?.exposure > 0
                                    ? "text-success"
                                    : "text-danger"
                                } `}
                              >
                                &nbsp;({predictOddValues?.exposure})
                              </span>
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="col-5 col-md-7 col-lg-5">
                        <div className="btn-group dOddsBox">
                          <div className="back dOddsBox-wrap">
                            <button className="back back2">
                              <span />
                            </button>
                            <button className="back back1">
                              <span />
                            </button>
                            <button
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  game,
                                  runner,
                                  runner?.back?.[0]?.price,
                                )
                              }
                              className="back"
                            >
                              {runner?.back?.[0]?.price}{" "}
                              <span> {runner?.back?.[0]?.size}</span>
                            </button>
                          </div>
                          <div className="lay dOddsBox-wrap">
                            <button
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  game,
                                  runner,
                                  runner?.lay?.[0]?.price,
                                )
                              }
                              className="lay"
                            >
                              {runner?.lay?.[0]?.price}{" "}
                              <span> {runner?.lay?.[0]?.size}</span>
                            </button>
                            <button className="lay lay1">
                              <span />
                            </button>
                            <button className="lay lay2">
                              <span />
                            </button>
                          </div>
                          {runner?.status !== "OPEN" && (
                            <div className="suspended">{runner?.status}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    {runner?.id === runnerId && (
                      <BetSLip currentPlaceBetEvent={game} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Bookmaker;
