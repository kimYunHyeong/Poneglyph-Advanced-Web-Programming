import "../scss/styles.scss";

var cardImg = document.querySelector(".card-info-img-container");
var overlay = document.querySelector(".card-info-img-overlay");

cardImg.addEventListener("mousemove", function (e) {
  var x = e.offsetX;
  var y = e.offsetY;
  var rotateY = (1 / -10) * y + 20;
  var rotateX = (3 / -40) * x + 30;

  overlay.style = `background-position :${x / 20 + y / 20}%`;

  cardImg.addEventListener("mouseout", function () {
    overlay.style = "filter : opacity(0)";
    cardImg.style = "transform:perspective(350px) rotateY(0deg) rotateX(0deg)";
  });

  cardImg.style = `transform: perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
