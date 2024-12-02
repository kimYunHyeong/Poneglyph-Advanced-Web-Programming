import Card from "../models/Card";

export const showHomepage = (req, res) => {
  const cards = Card.find({})
    .sort({ createdAt: "descending" })
    .then((cards) => {
      return res.render("home", { pageTitle: "Home", cards: cards });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id);
  if (!card) {
    return res.render("404", { pageTitle: "card Not Found" });
  }
  res.render("card", {
    pageTitle: `watching "${card.title}"`,
    card,
  });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload card" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashTags } = req.body;
  try {
    await Card.create({
      title,
      description,
      hashTags: Card.formatHashTags(hashTags),
    });
    return res.redirect("/cards");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Card",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id);
  if (!card) {
    return res.render("404", { pageTitle: "Card Not Found" });
  }
  return res.render("edit", {
    pageTitle: `Editing ${card.title}`,
    card,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashTags } = req.body;
  const card = await Card.exists({ _id: id });
  if (!card) {
    return res.render("404", { pageTitle: "Card Not Found" });
  }
  await Card.findByIdAndUpdate(id, {
    title,
    description,
    hashTags: Card.formatHashTags2(hashTags),
  });

  return res.redirect(`/cards/${id}`);
};

export const delteCard = async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  return res.redirect("/cards");
};

export const getSearch = async (req, res) => {
  const { keyword } = req.query;
  let cards = [];
  if (keyword) {
    cards = await Card.find({
      title: { $regex: new RegExp(keyword, "i") },
    });
  }
  return res.render("search", { pageTitle: "Search", cards });
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
