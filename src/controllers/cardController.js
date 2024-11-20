import Card from "../models/Card";

export const showHomepage = (req, res) => {
  Card.find({})
    .then((cards) => {
      console.log("cards", cards);
      return res.render("home", { pageTitle: "Home", cards: cards });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};

export const watch = (req, res) => {
  const { id } = req.params;

  res.render("card", {
    pageTitle: `watching`,
  });
};

export const edit = (req, res) => {
  const { id } = req.params;
  res.render("Edit", {
    pageTitle: `Edit card`,
  });
};

export const card_home = (req, res) => {
  Card.find({})
    .then((cards) => {
      console.log("cards", cards);
      return res.render("card_home", {
        pageTitle: `Card Homepage`,
        cards: cards,
      });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};
