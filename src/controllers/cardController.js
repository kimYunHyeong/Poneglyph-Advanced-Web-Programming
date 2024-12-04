import Card from "../models/Card";
import UserCard from "../models/UserCard";

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

  const imagePath = `/assets/${card.img}`;

  res.render("card", {
    pageTitle: `watching "${card.cardName}"`,
    imagePath: imagePath,
    card,
  });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload card" });
};

export const postUpload = async (req, res) => {
  const {
    cardName,
    cost,
    attribute,
    power,
    counter,
    color,
    feature,
    text,
    getInfo,
    img,
  } = req.body;
  try {
    await UserCard.create({
      cardName,
      cost,
      attribute,
      power,
      counter,
      color,
      feature,
      text,
      getInfo,
      img,
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
  const card = await UserCard.findById(id);
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
  const {
    cardName,
    cost,
    attribute,
    power,
    counter,
    color,
    feature,
    text,
    getInfo,
    img,
  } = req.body;
  const card = await UserCard.exists({ _id: id });
  if (!card) {
    return res.render("404", { pageTitle: "Card Not Found" });
  }
  await UserCard.findByIdAndUpdate(id, {
    cardName,
    cost,
    attribute,
    power,
    counter,
    color,
    feature,
    text,
    getInfo,
    img,
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
      const imagePath = `/assets/${Card.img}`;
      return res.render("card_home", {
        pageTitle: `Card Homepage`,
        cards: cards,
        imagePath: imagePath,
      });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};

export const user_card_home = (req, res) => {
  UserCard.find({})
    .then((userCards) => {
      console.log("cards", userCards);
      return res.render("user_card_home", {
        pageTitle: `User Card Homepage`,
        userCards: userCards,
      });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};

export const userCardWatch = async (req, res) => {
  const { id } = req.params;
  const userCard = await UserCard.findById(id);
  console.log("cards", userCard);
  if (!userCard) {
    return res.render("404", { pageTitle: "card Not Found" });
  }
  res.render("user_card", {
    pageTitle: `watching "${userCard.cardName}"`,
    userCard,
  });
};
