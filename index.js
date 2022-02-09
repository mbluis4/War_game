let deckId = "";
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const card_1 = document.getElementById("card-1-placeholder");
const card_2 = document.getElementById("card-2-placeholder");
let computerScore = 0;
let myScore = 0;
const displayComputerScore = document.getElementById("computer-score");
const displayMyScore = document.getElementById("my-score");
const remainingCards = document.getElementById("remaining-cards");
const displayWinner = document.getElementById("winner-container");
const cardWinner = document.getElementById("card-winner");

let newDeck = async () => {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await res.json();
  deckId = data.deck_id;
  document.getElementById("draw-cards").disabled = false;
  remainingCards.innerText = `Remaining cards: ${data.remaining}`;
  displayWinner.textContent = "";
  cardWinner.textContent = "";
};

let compareCards = (card1, card2) => {
  console.log(card1, card2);
  let cardArray = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  if (cardArray.indexOf(card1) > cardArray.indexOf(card2)) {
    computerScore++;
    displayComputerScore.innerText = computerScore;
    cardWinner.textContent = "Computer card Wins!";
  } else if (cardArray.indexOf(card1) < cardArray.indexOf(card2)) {
    myScore++;
    displayMyScore.innerText = myScore;
    cardWinner.textContent = "Your card Wins!";
  } else cardWinner.textContent = "War!";
};

let declareWinner = (count) => {
  if (count < 2) {
    if (myScore > computerScore) {
      displayWinner.textContent = "You won the game!";
      cardWinner.textContent = "";
      document.getElementById("draw-cards").disabled = true;
    } else if (myScore < computerScore) {
      displayWinner.textContent = "The computer won the game!";
      document.getElementById("draw-cards").disabled = true;
    } else {
      displayWinner.textContent = "It's a tie game!";
    }
  }
};

let drawCards = async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  card_1.innerHTML = `<img src=${data.cards[0].image}>`;
  card_2.innerHTML = `<img src=${data.cards[1].image}>`;
  let card1Value = data.cards[0].value;
  let card2Value = data.cards[1].value;
  compareCards(card1Value, card2Value);
  remainingCards.innerText = `Remaining cards: ${data.remaining}`;
  declareWinner(data.remaining);
};

newDeckBtn.addEventListener("click", newDeck);

drawBtn.addEventListener("click", drawCards);

