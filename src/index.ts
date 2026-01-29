import * as readline from "readline";
import { playRound } from "./card";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function pokdeng() {
  let totalMoney = 0;

  while (true) {
    const betInput = await question("Please put your bet\n");
    const bet = parseFloat(betInput);

    if (isNaN(bet) || bet <= 0) {
      console.log("Please enter a valid number");
      continue;
    }
    // Play a round and update totalMoney
    const result = playRound(bet);
    totalMoney += result;

    const playAgain = await question("Wanna play more (Yes/No)?\n");
    if (playAgain.trim().toLowerCase() !== "yes") {
      break;
    }
  }

  if (totalMoney >= 0) {
    console.log(`You got total ${totalMoney} chips`);
  } else if (totalMoney < 0) {
    console.log(
      `You lost total ${-totalMoney} chips (got ${totalMoney} chips)`
    );
  }

  rl.close();
}

pokdeng();
