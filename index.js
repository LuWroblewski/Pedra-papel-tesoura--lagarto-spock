// Inicializar as variáveis de pontuação
let playerScore = 0;
let computerScore = 0;

// Tabela de pontuação com as regras específicas
const scoreTable = {
  pedra: {
    tesoura: 1,
    lagarto: 1,
    papel: 0,
    spock: 0,
  },
  papel: {
    pedra: 1,
    spock: 1,
    tesoura: 0,
    lagarto: 0,
  },
  tesoura: {
    papel: 1,
    lagarto: 1,
    pedra: 0,
    spock: 0,
  },
  lagarto: {
    spock: 1,
    papel: 1,
    pedra: 0,
    tesoura: 0,
  },
  spock: {
    tesoura: 1,
    pedra: 1,
    papel: 0,
    lagarto: 0,
  },
};

// Variável para controlar o temporizador
let countdownTimer;

// Função para escolha aleatória do dispositivo
function getComputerChoice() {
  const choices = Object.keys(scoreTable);
  const randomNumber = Math.floor(Math.random() * choices.length);
  return choices[randomNumber];
}

// Função para exibir a contagem regressiva e as escolhas
function showCountdown(callback) {
  let countdown = 3;
  const countdownInterval = setInterval(() => {
    const playerChoiceElement = document.getElementById("playerChoice");
    const computerChoiceElement = document.getElementById("computerChoice");
    const resultElement = document.getElementById("result");

    playerChoiceElement.textContent = "";
    computerChoiceElement.textContent = "";
    resultElement.textContent = `Contagem Regressiva: ${countdown}`;

    // Exibir escolhas como imagens quando a contagem regressiva terminar
    if (countdown === 0) {
      playerChoiceElement.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}" />`;
      computerChoiceElement.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}" />`;

      // Exibir o "X" apenas quando o resultado acontecer
      document.getElementById("x").style.display = "inline";
    } else {
      // Ocultar o "X" durante a contagem regressiva
      document.getElementById("x").style.display = "none";
    }

    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      callback();
    }
  }, 1000);
}

// Função para determinar o vencedor e atualizar a pontuação
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Empate!";
  }

  const playerScoreValue = scoreTable[playerChoice][computerChoice];
  const computerScoreValue = scoreTable[computerChoice][playerChoice];

  if (playerScoreValue > computerScoreValue) {
    playerScore++;
    return "Você venceu!";
  } else {
    computerScore++;
    return "Você perdeu!";
  }
}

// Atualizar a interface de resultados
function updateScore() {
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
}

// Função para lidar com o clique do jogador
function playerChoiceHandler(playerChoice) {
  clearInterval(countdownTimer); // Limpar temporizador anterior, se houver

  showCountdown(() => {
    const computerChoice = getComputerChoice();
    const playerChoiceElement = document.getElementById("playerChoice");
    const computerChoiceElement = document.getElementById("computerChoice");
    const resultElement = document.getElementById("result");

    playerChoiceElement.textContent = "";
    computerChoiceElement.textContent = "";
    resultElement.textContent = "";

    // Exibir escolhas como imagens durante a contagem regressiva
    playerChoiceElement.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}" />`;
    computerChoiceElement.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}" />`;

    const result = determineWinner(playerChoice, computerChoice);
    resultElement.textContent = result;
    updateScore();
  });
}

// Adicione os manipuladores de clique aos botões
for (const option of Object.keys(scoreTable)) {
  document
    .getElementById(option)
    .addEventListener("click", () => playerChoiceHandler(option));
}

// Manipulador de clique para o botão de reinício
document.getElementById("reset").addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  document.getElementById("playerChoice").textContent = "";
  document.getElementById("computerChoice").textContent = "";
  document.getElementById("result").textContent = "";
  clearInterval(countdownTimer);
  startCountdown(); // Iniciar contagem regressiva ao reiniciar
});

// Função para iniciar a contagem regressiva
function startCountdown() {
  countdownTimer = setInterval(() => {
    playerChoiceHandler(getComputerChoice());
  }, 10000); // 10 segundos
}

// Iniciar a primeira contagem regressiva ao carregar a página
startCountdown();
