// initialize variables
document.getElementById("hitStandButtons").style.display = "none";
let card = {};
let deck = [];
let shuffledDeck = [];
let playerCards = [];
let dealerCards = [];
let nextCard = {};
let playerCardsString = "";
let dealerCardsString = "";
let playerSum = 0;
let dealerSum = 0;
var hasBlackJack = false;
var hasBusted = false;
let message = "";

function beginGame() {
  // reset variables to start a new game.
  card = {};
  deck = [];
  shuffledDeck = [];
  playerCards = [];
  dealerCards = [];
  nextCard = {};
  playerSum = 0;
  dealerSum = 0;
  hasBlackJack = false;
  hasBusted = false;
  message = "";

  createDeck();
  shuffleDeck();
  document.getElementById("playerCards").textContent = "Your Hand: ";
  document.getElementById("dealerCards").textContent = "Dealer's Hand: ";
  document.getElementById("sum").textContent = "Sum: ";
  hit("dealer");
  hit("player");
  hit("dealer");
  hit("player");
}

function createDeck() {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 14; j++) {
      card = {
        suit: i,
        value: j,
        graphic: j,
      };
      switch (j) {
        case 1:
          card.graphic = "a";
          break;
        case 11:
          card.graphic = "j";
          card.value = 10;
          break;
        case 12:
          card.graphic = "q";
          card.value = 10;
          break;
        case 13:
          card.graphic = "k";
          card.value = 10;
          break;
      }
      switch (i) {
        case 1:
          card.graphic += "c";
          break;
        case 2:
          card.graphic += "d";
          break;
        case 3:
          card.graphic += "h";
          break;
        case 4:
          card.graphic += "s";
          break;
      }
      deck.push(card);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < 52; i++) {
    let value = Math.floor(Math.random() * 52) % deck.length;
    shuffledDeck.push(deck[value]);
    deck.splice(value, 1);
  }
}

function hit(target) {
  nextCard = shuffledDeck[0];
  if (target == "player") {
    if (nextCard.value == 1 && playerSum < 11) nextCard.value += 10;
    playerCards.push(nextCard);
    playerSum = 0;
    for (let i = 0; i < playerCards.length; i++) {
      playerCardsString += playerCards[i].value + ", ";
      playerSum += playerCards[i].value;
    }
    createImage(
      "player",
      "images/" + nextCard.graphic + ".png",
      54,
      81,
      nextCard.graphic
    );
    document.getElementById("sum").textContent = "Sum: " + playerSum;
  } else {
    if (nextCard.value == 1 && dealerSum < 11) nextCard.value += 10;
    dealerCards.push(nextCard);
    dealerSum = 0;
    for (let i = 0; i < dealerCards.length; i++) {
      dealerCardsString += dealerCards[i].value + ", ";
      dealerSum += dealerCards[i].value;
    }
    createImage(
      "dealer",
      "images/" + nextCard.graphic + ".png",
      54,
      81,
      nextCard.graphic
    );
  }

  shuffledDeck.splice(0, 1);

  if (playerSum < 21) {
    message = "Would you like to draw another card?";
  } else if (playerSum === 21) {
    message = "Blackjack! Congratulations!:)";
    hasBlackJack = true;
  } else {
    message = "Busted. Would you like to play again?";
    hasBusted = true;
  }
  document.getElementById("message").textContent = message;

  if (!hasBlackJack && !hasBusted) {
    document.getElementById("beginGameButton").style.display = "none";
    document.getElementById("hitStandButtons").style.display = "block";
  } else {
    document.getElementById("beginGameButton").style.display = "block";
    document.getElementById("hitStandButtons").style.display = "none";
  }
}

function createImage(target, src, width, height, alt) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  img.id = "dealerCard" + dealerCards.length;
  if (target == "player")
    document.getElementById("playerCards").appendChild(img);
  else {
    if (dealerCards.length == 2) img.src = "images/!Back.png";
    document.getElementById("dealerCards").appendChild(img);
  }
}

function stand() {
  document.getElementById("dealerCard2").src =
    "images/" + dealerCards[1].graphic + ".png";
  while (dealerSum < playerSum && dealerSum < 21) {
    hit("dealer");
  }
  if (dealerSum > 21)
    message = "The house busts. Would you like to play again?";
  else if (dealerSum > playerSum && dealerSum < 22)
    message = "The house wins. Would you like to play again?";
  else if (dealerSum == playerSum)
    message = "The game is tied! Would you like to play again?";
  document.getElementById("message").textContent = message;
  document.getElementById("beginGameButton").style.display = "block";
  document.getElementById("hitStandButtons").style.display = "none";
}
