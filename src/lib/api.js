const FIREBASE_DOMAIN = "https://react-http-6e93c-default-rtdb.firebaseio.com";

export const sendQuote = async (quoteData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something is wrong");
  }

  return null;
};

export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);

  if (!response.ok) {
    throw new Error("Something is wrong");
  }

  const responseData = await response.json();

  const loadedQuotes = [];

  for (const key in responseData) {
    loadedQuotes.push({
      id: key,
      author: responseData[key].author,
      text: responseData[key].text,
    });
  }

  return loadedQuotes;
};

export const getSingleQuote = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.messgae || "Something is wrong");
  }

  return {
    id: quoteId,
    ...responseData,
  };
};

export const addComment = async (commentData) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${commentData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify({ text: commentData.text }),
      headers: {
        "Contetnt-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something is wrong");
  }

  return null;
};

export const getAllComment = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  if (!response.ok) {
    throw new Error("Something is wrong");
  }

  const loadedComments = [];

  const responseData = await response.json();

  for (const key in responseData) {
    loadedComments.push({ id: key, text: responseData[key].text });
  }

  return loadedComments;
};
