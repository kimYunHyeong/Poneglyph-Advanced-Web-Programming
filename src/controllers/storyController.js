let cards = [
  {
    title: "Alavasta",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Water 7",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Marin Ford",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "Dressrosa",
    rating: 5,
    comments: 2,
    cratedAt: "2 minutes ago",
    views: 59,
    id: 4,
  },
  {
    title: "wanokuni",
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

export const watchStory = (req, res) => {
  const { id } = req.params;
  const card = cards[id - 1];
  res.render("card", {
    pageTitle: `watching ${card.title}`,

    card,
  });
};

export const story_home = (req, res) => {
  res.render("story_home", {
    pageTitle: `story Homepage`,
    cards,
  });
};
