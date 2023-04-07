import { useEffect } from "react";
import { Route, Routes, useParams, Link } from "react-router-dom";
import { getSingleQuote } from "../lib/api";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import Comments from "../components/comments/Comments";

const QuoteDetail = (props) => {
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>;
  }

  return (
    <>
      <h2>QuoteDetail</h2>

      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />

      <Routes>
        <Route
          path=""
          element={
            <div className="centered">
              <Link className="btn--flat" to={"comments"}>
                Load Comments
              </Link>
            </div>
          }
        />

        <Route path="comments" element={<Comments quoteId={quoteId} />} />
      </Routes>
    </>
  );
};

export default QuoteDetail;
