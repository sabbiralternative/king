import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const Ladder = ({ setLadderData, ladderData }) => {
  const { getLanguage } = useLanguage();
  const ladderRef = useRef();

  useCloseModalClickOutside(ladderRef, () => {
    setLadderData([]);
  });
  return (
    <div>
      <div className="modal-backdrop fade in show" />
      <div
        role="dialog"
        tabIndex={-1}
        className="modal fade show"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
        <div role="document" className="modal-dialog">
          <div className="modal-content" ref={ladderRef}>
            <div className="modal-body">
              <button
                onClick={() => setLadderData([])}
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                className="close"
                style={{
                  top: "0px",
                  right: "0px",
                  position: "absolute",
                  fontSize: "15px",
                  opacity: 1,
                  color: "black",
                }}
              >
                <FontAwesomeIcon icon={faClose} className="ml-2" />
              </button>
              <div className="table-responsive" style={{ marginTop: "15px" }}>
                <table
                  id="btDataTable"
                  className="table table-bordered btDataTable mb-0"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>{getLanguage(LanguageKey.RUN)}</th>
                      <th>{getLanguage(LanguageKey.POSITION)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ladderData?.map((item, i) => {
                      return (
                        <tr key={i} id="goto-169" className="ng-star-inserted">
                          <td>
                            {" "}
                            {item?.start}-{item?.end}
                          </td>
                          <td
                            className={` ${
                              item?.exposure > 0 ? "text-green" : "text-red"
                            }`}
                          >
                            {item?.exposure}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ladder;
