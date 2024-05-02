// Game container
let game = document.querySelector(".game");
// 4 buttons
let buttonShow = document.querySelector(".show");
let buttonDouble = document.querySelector(".double");
let buttonShuffle = document.querySelector(".shuffle");
let buttonFlip = document.querySelector(".flip");
let clickedIds = [];
// Array containing image URLs
let url = "https://cdn.glitch.global/b16bceea-3d83-448a-bf97-";
let cards = [
    "bd596da7ed44/Card2.jpg?v=1710864073771",
    "bd596da7ed44/card4.jpg?v=1710864077363",
    "bd596da7ed44/card5.jpg?v=1710864080714",
    "bd596da7ed44/card6.jpg?v=1710864085289",
    "bd596da7ed44/card7.jpg?v=1710864087840",
    "bd596da7ed44/card8.jpg?v=1710864091578",
    "bd596da7ed44/card9.jpg?v=1710864094641",
    "bd596da7ed44/cards3.jpg?v=1710864098494",
];

// Button to Show Deck
buttonShow.onclick = function() {
    // Log message
    console.log("Showing the deck...");
    // For of loop
    for (let card of cards) {
        game.insertAdjacentHTML("beforeend",
            "<div style='background-image: url(" + url + card + ")' class='card'>");
    }
};

// Button to Double Deck
buttonDouble.onclick = function() {
    console.log("Deck has " + cards.length + " cards.");
    for (let card of cards) {
        if (cards.length !== 16) {
            cards.push(card);
            game.insertAdjacentHTML("beforeend", "<div style='background-image: url(" + url + card + ")' class='card'>");
        }
    }
    console.log("Now the deck has " + cards.length + "cards.");
    buttonDouble.style.color = "silver";
};

// Button to Shuffle Cards
buttonShuffle.onclick = function() {
    shuffle(cards);
    game.innerHTML = "";
    let i = 0;
    console.log("I'm shuffling the cards!");
    for (card of cards) {
        game.insertAdjacentHTML("beforeend",
            "<div style='background-image: url(" + url + card + ")' id=" + i + " class='card'>");
        i = i + 1;
    }
};



function shuffle(cards) {
    let currentIndex = cards.length,
        randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex = currentIndex - 1;
        [cards[currentIndex], cards[randomIndex]] = [
            cards[randomIndex], cards[currentIndex]
        ];
    }
    return cards;
}
// Button to Flip All Cards

buttonFlip.onclick = function() {
    let i = 0;
    for (card of cards) {
        document.getElementById(i).style.backgroundImage = "";
        i = i + 1;
    }
};
// Here we need a function for clicking on individual cards.
// (It won't work until we finish writing it.)
$(document).click(function (event) {
    let clickedId = event.target.id;
    console.log(clickedId);
    if(clickedId !== "") {
        document.getElementById(clickedId).style.backgroundImage = "url('" + url + cards[clickedId] + "')";
        clickedIds.push(clickedId);
        console.log(clickedIds);
        if (clickedIds.length === 2) {
           let card1picture = document.getElementById(clickedIds[0]).style.backgroundImage;
           let card2picture = document.getElementById(clickedIds[1]).style.backgroundImage;
            console.log(card1picture);
            console.log(card2picture);
            if (card1picture === card2picture) {
            console.log("match");
            document.getElementById(clickedIds[0]).id = "";
            document.getElementById(clickedIds[1]).id = "";
            clickedIds = [];
            console.log(clickedIds);
            }
        } else if (clickedIds.length > 2) {
            console.log("needs to flip");
          document.getElementById(clickedIds[0]).style.backgroundImage = "";
          document.getElementById(clickedIds[1]).style.backgroundImage = "";
          clickedIds = [];
          clickedIds.push(clickedId);
          console.log(clickedIds);
        }
    }
});