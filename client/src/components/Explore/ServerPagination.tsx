import { useCallback } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { debounce } from "lodash";
import { AppState } from "AppState";
import { observer } from "mobx-react";


type Props = {
  onPageChange: (page: number) => void;
  totalPages: number;
};

const ServerPagination: React.FC<Props> = ({ onPageChange, totalPages }) => {
  const handlePagination = useCallback(
    debounce((isIncrement) => {
      const page = isIncrement ? AppState.page + 1 : AppState.page - 1;
      onPageChange(page);
    }, 500),
    [onPageChange]
  );

  return (
    <div className="my-3 flex items-center justify-center">
      <button
        className="btn-primary disabled:cursor-not-allowed"
        disabled={AppState.page === 1}
        onClick={() => handlePagination(false)}
      >
        <FaArrowCircleLeft size={32} />
      </button>
      <div className="mx-3 flex gap-x-3">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => (
            <div
              className={`text-gray-300${
                pageNum === AppState.page
                  ? " rounded-full bg-indigo-400 px-2  "
                  : ""
              }`}
              key={pageNum}
              onClick={() => {
                onPageChange(pageNum);
              }}
            >
              {pageNum}
            </div>
          )
        )}
      </div>
      <button
        className="btn-primary disabled:cursor-not-allowed"
        disabled={AppState.page === totalPages}
        onClick={() => handlePagination(true)}
      >
        <FaArrowCircleRight size={32} />
      </button>
    </div>
  );
};

export default observer(ServerPagination);
