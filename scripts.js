class Game {
  constructor() {
    this.countOfGames = 0; // общее количество игр
    this.steps = 0; // количество ходов в игре
    this.hasWinner = false;
    this.machineFirst = false; // флаг для первого хода машины. Машина будет делать первый ход каждую нечетную игру
    this.human = {
      symbol: "",
      name: "Human",
      wins: 0
    };
    this.ai = {
      symbol: "",
      name: "Machine",
      wins: 0
    };
  }

  init() {
    var game = document.getElementById("game");
    game.innerHTML = "";
    for (var i = 0; i < 9; i++) {
      // заполнение контейнера
      game.innerHTML += `<div class="block active" id="${i + 1}"></div>`;
    }
    if (this.countOfGames % 2 == 0) {
      // определение знаков игроков
      this.human.symbol = "X";
      this.ai.symbol = "0";
    } else {
      this.human.symbol = "0";
      this.ai.symbol = "X";
    }
  }

  begin() {
    console.log("новая игра \n");

    this.hasWinner = false; // сбрасываем флаг победителя
    var game = document.getElementById("game");

    if (this.machineFirst) {
      // если флаг активен, то машина делает первый ход снимает флаг
      console.log("Машина ходит первой");
      this.machineFirst = false;
      this.makeAiStep(this.ai.symbol);
    }
    game.addEventListener("click", event => {
      console.log("click");
      let target = event.target;
      this.makeHumanStep(target, this.human.symbol); // по клику человек делает ход
      this.makeAiStep(this.ai.symbol); // затем ход машины
    });
  }

  makeHumanStep(target, symbol) {
    if (target.className === "block active" && this.hasWinner === false) {
      // Проверка на активный блок и победителя
      console.log("Ходит человек");
      target.innerHTML += symbol;
      target.className = "block";
      this.steps++;
      if (this.steps > 4) {
        // проверить победителя
        this.checkWin(this.human, this.human.symbol);
      }
    }
  }

  makeAiStep(symbol) {
    if (this.hasWinner === false) {
      let blocks = document.querySelectorAll(".block"); // выбор всех блоков
      let activeBlocks = []; // массив, в котором будут все активные блоки
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].classList.contains("active")) {
          activeBlocks.push(blocks[i].id);
        }
      }
      // Далее получаем случайный блок по id из массива, находим его и делаем ход. В ТЗ ведь не сказано на сколько умным должен быть алгоритм?)
      let targetId =
        activeBlocks[Math.floor(Math.random() * activeBlocks.length)];
      let target = document.getElementById(`${targetId}`);
      target.innerHTML += symbol;
      target.className = "block";
      this.steps++;
      if (this.steps > 4) {
        // проверить победителя
        this.checkWin(this.ai, this.ai.symbol);
      }
    }
  }

  checkWin(player, symbol) {
    var allblock = document.getElementsByClassName("block");
    // получаем все блоки и по очереди сравниваем с символом игрока и "раскладкой" для победы
    for (var i = 0; i < 9; i = i + 3) {
      if (
        allblock[i].innerHTML === symbol &&
        allblock[i + 1].innerHTML === symbol &&
        allblock[i + 2].innerHTML === symbol
      ) {
        // если победитель найдет, то выводим его имя и заканчиваем игру
        alert('Winner "' + player.name + '"');
        this.end(player);
      }
    }

    for (i = 0; i < 3; i++) {
      if (
        allblock[i].innerHTML === symbol &&
        allblock[i + 3].innerHTML === symbol &&
        allblock[i + 6].innerHTML === symbol
      ) {
        alert('Winner "' + player.name + '"');
        this.end(player);
      }
    }

    if (
      allblock[0].innerHTML === symbol &&
      allblock[4].innerHTML === symbol &&
      allblock[8].innerHTML === symbol
    ) {
      alert('Winner "' + player.name + '"');
      this.end(player);
    }

    if (
      allblock[2].innerHTML === symbol &&
      allblock[4].innerHTML === symbol &&
      allblock[6].innerHTML === symbol
    ) {
      alert('Winner "' + player.name + '"');
      this.end(player);
    }
  }

  end(winner) {
    // конец игры, обнуление всех переменных
    this.hasWinner = true;
    winner.wins++;
    this.steps = 0;
    this.countOfGames++;
    this.printScore();
    if (this.countOfGames % 2 != 0) {
      // флаг для первого хода машины
      this.machineFirst = true;
    }
  }

  printScore() {
    let human_score = document.querySelector("#human_score");
    let ai_score = document.querySelector("#ai_score");
    let total_score = document.querySelector("#total_score");
    human_score.textContent = `Пользователь выиграл ${this.human.wins} раз`;
    ai_score.textContent = `Компьютер выиграл ${this.ai.wins} раз`;
    total_score.textContent = `Общее количество игр: ${this.countOfGames}`;
  }
}

const game = new Game();
let start = document.querySelector("#start");
start.addEventListener("click", () => {
  game.init();
  game.begin();
  game.printScore();
});
