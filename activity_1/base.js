const { resolve } = require("path");
const readline = require("readline");

function createWeapon(name, damage, durability) {
  return {
    name,
    damage,
    durability,
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const weapons = [
  createWeapon("Sword", getRandomNumber(20, 30), 2),
  createWeapon("Axe", getRandomNumber(5, 20), 3),
  createWeapon("Bow", getRandomNumber(10, 25), 3),
  createWeapon("Staff", getRandomNumber(5, 25), 3),
  createWeapon("Dagger", getRandomNumber(10, 25), 2),
  createWeapon("Spear", getRandomNumber(10, 20), 3),
  createWeapon("Crossbow", getRandomNumber(5, 15), 2),
  createWeapon("Baton", getRandomNumber(10, 25), 2),
];

function takeDamage(warrior, weapon) {
    warrior.health -= weapon.damage;
  }

function promptWeapon(warrior) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `Pick a weapon for ${warrior.name}:
      1- Sword
      2- Axe
      3- Bow
      4- Staff
      5- Dagger
      6- Spear
      7- Crossbow
      8- Baton
    `,
      (choice) => {
        console.log(`-------------------------------------------------`);
        const selectedWeapon = createWeapon(
            weapons[choice - 1].name,
            getRandomNumber(12, 20),
            getRandomNumber(2,3)
          );
          warrior.assignWeapon(selectedWeapon);
        rl.close(); // Close the interface
        resolve(choice); // Resolve the Promise when weapon picking is done
      }
    );

    rl.on('close', () => {
      // Remove the event listener to prevent accumulation
      rl.removeAllListeners('line');
    });
  });
}

function promptChangeWeapon(warrior) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `${warrior.name}, Would you like to change your weapon?
      1- Yes
      2- No
    `,
      (choice) => {
        if (choice === "1") {
          promptWeapon(warrior).then(resolve);
        } else {
          rl.close(); // Close the interface
          resolve();
        }
      }
    );
    rl.on('close', () => {
      // Remove the event listener to prevent accumulation
      rl.removeAllListeners('line');
    });
  });
}

// TEAM SUBMISSIONS HERE
// PLACE THE SUBMISSIONS OF YOUR TEAMS BELOW

// AFTER PLACING THE SUBMISSIONS, CHANGE THE FOLLOWING LINES OF CODE
// TO USE THE CODE MADE BY THE STUDENTS
// Change team1Function to be the name of the function submitted by team 1
// Change team2Function to be the name of the function submitted by team 2
// Ask the students what do they want their warrior names to be and replace WarriorName for every team.

const warrior1 = team1Function("WarriorName", 100)
const warrior2 = team2Function("WarriorName", 100)

function pickWarriorTurn() {
  return new Promise((resolve) => {
    const index = Math.random() < 0.5 ? 0 : 1;
    resolve(index);
  });
}

promptWeapon(warrior1)
  .then(() => promptWeapon(warrior2))
  .then(() => {
    console.log("Let the battle begin!");
  })
  .then(() => {
    duel(warrior1, warrior2).catch((error) => {
      console.error(error);
    });
  });

function duel(warrior1, warrior2) {
  console.log(
    `The duel begins between ${warrior1.name} and ${warrior2.name}!\n`
  );
  const warriors = [warrior1, warrior2];

  function changeWeaponSequence() {
    return promptChangeWeapon(warrior1).then(() =>
      promptChangeWeapon(warrior2)
    );
  }

  async function battleSequence() {
    const randomIndex = await pickWarriorTurn();
    const firstAttack = warriors[randomIndex];
    const secondAttack = warriors[1 - randomIndex];
  
    if (firstAttack.weapon.durability <= 0) {
      console.log(`!!!!!!! ${firstAttack.name}'s ${firstAttack.weapon.name} is broken!`);
      await promptWeapon(firstAttack);
      console.log(`${firstAttack.name} changed their weapon.`);
    }
  
    if (secondAttack.weapon.durability <= 0) {
      console.log(`!!!!!!! ${secondAttack.name}'s ${secondAttack.weapon.name} is broken!`);
      await promptWeapon(secondAttack);
      console.log(`${secondAttack.name} changed their weapon.`);
    }
  
    console.log(`${firstAttack.name} is going to attack first.`);
    firstAttack.attack(secondAttack);
    console.log(`${firstAttack.name} attacked ${secondAttack.name} with his ${firstAttack.weapon.name}. ${secondAttack.name} has ${secondAttack.health} health now.`);
    if (secondAttack.health <= 0) {
      return `${firstAttack.name} wins!`;
    }
    firstAttack.weapon.durability--;
    console.log(`Now it's ${secondAttack.name} to attack.`);
  
    secondAttack.attack(firstAttack);
    console.log(`${secondAttack.name} attacked ${firstAttack.name} with his ${secondAttack.weapon.name}. ${firstAttack.name} has ${firstAttack.health} health now.`);
  
    if (firstAttack.health <= 0) {
      return `${secondAttack.name} wins!`;
    }
  
    secondAttack.weapon.durability--;
    await changeWeaponSequence();
    return battleSequence();
  }
  

  return battleSequence();
}
