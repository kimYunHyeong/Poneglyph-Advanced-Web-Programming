let cards = [
  {
    title: "gomu-gomuNoMi",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "mera-meraNoMi",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "holo-holNoMi",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "wara-waraNoMi",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 4,
  },
  {
    title: "ito-itoNoMi",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 5,
  },
];

export const showHomepage = (req, res) => {
  res.render("home", { pageTitle: "Home", cards });
};

export const watchFruit = (req, res) => {
  const { id } = req.params;
  const card = cards[id - 1];
  res.render("card", {
    pageTitle: `watching ${card.title}`,

    card,
  });
};

export const fruit_home = (req, res) => {
  res.render("fruit_home", {
    pageTitle: `Fruit Homepage`,
    cards,
  });
};
