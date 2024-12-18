import Card from "../models/Card";
import UserCard from "../models/UserCard";
import User from "../models/User";

export const showHomepage = (req, res) => {
  const cards = Card.find({})
    .sort({ createdAt: "descending" })
    .then((cards) => {
      return res.render("card_home", { pageTitle: "Home", cards: cards });
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

  const imagePath = `/assets${card.img}`;
  console.log(imagePath);

  res.render("card", {
    pageTitle: card.cardName,
    imagePath: imagePath,
    card,
  });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload card" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;

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
  } = req.body;

  const imgFile = req.file;

  try {
    if (!imgFile) {
      throw new Error("Image upload failed");
    }

    const newCard = await UserCard.create({
      cardName,
      cost,
      attribute,
      power,
      counter,
      color,
      feature,
      text,
      getInfo,
      owner: _id,
      img: imgFile.location,
    });
    return res.redirect("/cards/usercards");
  } catch (error) {
    console.error(error);
    return res.render("upload", {
      pageTitle: "Upload Card",
      errorMessage: error.message || error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const card = await UserCard.findById(id);
  if (!card) {
    return res.render("404", { pageTitle: "Card Not Found" });
  }
  return res.render("edit", {
    pageTitle: `Editing ${card.cardName}`,
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

  return res.redirect(`/cards/usercards/${id}`);
};

export const delteCard = async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  return res.redirect("/cards");
};

export const getSearch = async (req, res) => {
  const { keyword } = req.query;
  console.log("Keyword:", keyword); // 디버깅용

  let cards = [];
  if (keyword) {
    cards = await Card.find({
      cardName: { $regex: keyword, $options: "i" },
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
      const imagePath = UserCard.img;
      return res.render("user_card_home", {
        pageTitle: `User Card Homepage`,
        userCards: userCards,
        imagePath: imagePath,
      });
    })
    .catch((error) => {
      console.log("errors", error);
    });
};

export const userCardWatch = async (req, res) => {
  const { id } = req.params;
  const userCard = await UserCard.findById(id);
  const owner = await User.findById(userCard.owner);
  console.log(owner);
  console.log("cards", userCard);
  if (!userCard) {
    return res.render("404", { pageTitle: "card Not Found" });
  }
  res.render("user_card", {
    pageTitle: userCard.cardName,
    userCard,
    owner,
  });
};

export const delteUserCard = async (req, res) => {
  const { id } = req.params;
  await UserCard.findByIdAndDelete(id);
  return res.redirect("/cards/usercards");
};
