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

export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", {
    pageTitle: `editing ${card.title}`,
  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/cards/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload card" });
};

export const postUpload = async (req, res) => {
  //add card
  const { title, descripttion, hashtags } = req.body;
  await card.create({
    title,
    descripttion,
    createdAt: Date.now(),
    hashTags: hashtags.split(",").map((word) => `${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  return res.redirect("/");
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
