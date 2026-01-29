type Suit = "Spades" | "Hearts" | "Diamonds" | "Clubs";
type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

interface Card {
  suit: Suit;
  rank: Rank;
}

function createDeck(): Card[] {
  const suits: Suit[] = ["Spades", "Hearts", "Diamonds", "Clubs"];
  const ranks: Rank[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  return suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));
}

function shuffle(deck: Card[]) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function cardValue(rank: Rank): number {
  if (rank === "A") return 1;
  if (["K", "Q", "J"].includes(rank)) return 0;
  return Number(rank);
}

export function handValue(cards: Card[]): number {
  let total = 0;

  for (const c of cards) {
    total += cardValue(c.rank);
  }

  total = total % 10;
  return total;
}

export function playRound(bet: number) {
  const deck = createDeck();
  shuffle(deck);

  const player = [deck.pop()!, deck.pop()!];
  const dealer = [deck.pop()!, deck.pop()!];

  const playerScore = handValue(player);
  const dealerScore = handValue(dealer);

  console.log(`You got ${player.map((c) => `${c.suit}-${c.rank}`).join(", ")}`);
  console.log(
    `> The dealer got ${dealer.map((c) => `${c.suit}-${c.rank}`).join(", ")}`
  );

  if (playerScore > dealerScore) {
    console.log(`> You won!!!, received ${bet} chips`);
    return bet;
  } else if (playerScore < dealerScore) {
    console.log("> Dealer wins!");
    return bet === 0 ? 0 : -Math.abs(bet);
  } else {
    console.log(`> Draw!, received 0 chips`);
    return 0;
  }
}
