import fetch from "node-fetch";

module.exports = async (req, res) => {
  try {
    const response = await fetch(
      "https://poloniex.com/public?command=returnTicker"
    );
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
