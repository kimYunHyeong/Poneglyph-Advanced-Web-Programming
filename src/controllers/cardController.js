const faker = {
  username: "Kim Yun Hyeong",
  loggedIn: false,
};

let cards = [
  {
    title: "luffy",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "zoro",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "sanji",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "nami",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 4,
  },
  {
    title: "ussop",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 5,
  },
];

export const showHomepage = (req, res) => {
  res.render("home", { pageTitle: "Home", faker: faker, cards });
};
export const search = (req, res) => res.render("watch");

export const watch = (req, res) => {
  const { id } = req.params;
  const card = cards[id - 1];

  res.render("card", {
    pageTitle: `watching ${card.title}`,
    faker: faker,
    card,
  });
};

export const edit = (req, res) => {
  const { id } = req.params;
  const card = cards[id - 1];
  res.render("Edit", {
    pageTitle: `Edit card ${card.title}`,
    faker: faker,
    card,
  });
};

export const deletecard = (req, res) => {
  console.log(req.params);
  return res.send("delte cards");
};

export const upload = (req, res) => res.send("upload cards");
