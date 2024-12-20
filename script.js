const cards = [
    { id: 1, letter: 'أ' },
    { id: 2, letter: 'ب' },
    { id: 3, letter: 'ت' },
    { id: 4, letter: 'ث' },
    { id: 5, letter: 'ج' },
    { id: 6, letter: 'ح' },
    { id: 7, letter: 'خ' },
    { id: 8, letter: 'د' },
    { id: 9, letter: 'ذ' },
    { id: 10, letter: 'ر' },
    { id: 11, letter: 'ز' },
    { id: 12, letter: 'س' },
    { id: 13, letter: 'ش' },
    { id: 14, letter: 'ص' },
    { id: 15, letter: 'ض' },
    { id: 16, letter: 'ط' },
    { id: 17, letter: 'ظ' },
    { id: 18, letter: 'ع' },
    { id: 19, letter: 'غ' },
    { id: 20, letter: 'ف' },
    { id: 21, letter: 'ق' },
    { id: 22, letter: 'ك' },
    { id: 23, letter: 'ل' },
    { id: 24, letter: 'م' },
    { id: 25, letter: 'ن' },
    { id: 26, letter: 'ه' },
    { id: 27, letter: 'و' },
    { id: 28, letter: 'ي' }
];

let gameCards = [...cards, ...cards]; // Duplicate cards for matching pairs
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let restartButton = document.getElementById('restart-button');

function shuffleCards() {
    gameCards.sort(() => Math.random() - 0.5);
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;
    
    const textNode = document.createTextNode(card.letter);
    cardElement.appendChild(textNode);
    
    cardElement.addEventListener('click', () => flipCard(cardElement, card));
    
    return cardElement;
}

function flipCard(cardElement, card) {
    if (cardElement.classList.contains('flipped') || flippedCards.length === 2) return;

    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, card: card });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.card.id === second.card.id) {
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        matchedCards.push(first.card.id);
        flippedCards = [];
        
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Alhamdulillah, Selamat! Anda Menang!'), 500);
        }
    } else {
        setTimeout(() => {
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    shuffleCards();
    gameBoard.innerHTML = '';
    gameCards.forEach(card => {
        gameBoard.appendChild(createCard(card));
    });
}

restartButton.addEventListener('click', startGame);

startGame(); // Start the game when page loads
