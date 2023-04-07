import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useHttp from "../hooks/use-http";
import { sendQuote } from "../lib/api";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(sendQuote);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [navigate, status]);

  const addedQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <div>
      <QuoteForm
        onAddQuote={addedQuoteHandler}
        isLoading={status === "pending"}
      />
    </div>
  );
};

export default NewQuote;
