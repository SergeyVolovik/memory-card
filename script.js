const body = document.querySelector('body');
const wrapper = document.querySelector('.wrapper');

const cards__container = document.getElementById('cards__container');
const prev__btn = document.getElementById('prev');
const current__el = document.getElementById('current');
const next__btn = document.getElementById('next');
const modal__container = document.getElementById('modal__container');
const hide__btn = document.getElementById('hide');
const question__el = document.getElementById('question');
const answer__el = document.getElementById('answer');
const add__btn__mod = document.getElementById('add__btn-mod');
const error = document.getElementById('error');
const error__text = document.getElementById('error__text');
const clear__btn = document.getElementById('clear__btn');
const show__btn = document.getElementById('show__btn');

const card__active = document.querySelector('.card.active');
const front__after = document.querySelector('.card__front');
const back__after = document.querySelector('.card__back');

let current__card = 0;
const cards__el = [];

const cards__data = getDataCards();

// Show current card in navigation container
const updateCurrentNav = () => {
    current__el.innerText = `${current__card + 1}/${cards__el.length}`;
}

// Get data from local storage
function getDataCards() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Set data to local storage
const setDataCards = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// Create cards
const createCards = () => {
    cards__data.forEach((data, index) => {
        createCard(data, index);
    });
}

const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="card__inner">
            <div class="card__front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="card__back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `;

    // Flip card
    card.addEventListener('click', (e) => {
        e.preventDefault();

        card.classList.toggle('back');
    });

    cards__el.push(card);
    cards__container.appendChild(card);

    updateCurrentNav();
}

createCards();
// /Create cards

// Navigation btn next card
const nextCard = e => {
    e.preventDefault();

    cards__el[current__card].classList = 'card left';
    current__card = current__card + 1;

    if (current__card > cards__el.length - 1) {
        current__card = cards__el.length - 1;
    }

    cards__el[current__card].classList = 'card active';
    updateCurrentNav();
}

// Navigation btn prev card
const prevCard = e => {
    e.preventDefault();

    cards__el[current__card].classList = 'card right';
    current__card = current__card - 1;

    if (current__card < 0) {
        current__card = 0;
    }

    cards__el[current__card].classList = 'card active';

    updateCurrentNav();
}

// Show modal
const showModal = e => {
    e.preventDefault();

    hide__btn.style.visibility = 'visible';
    body.classList.add('show');

    setTimeout(() => {
        wrapper.classList.add('wrapper-center');
    }, 300);
}

// Hide modal
const hideModal = e => {
    e.preventDefault();

    hide__btn.style.visibility = 'hidden';
    body.style.overflowX = 'hidden';
    body.classList.remove('show');

    setTimeout(() => {
        wrapper.classList.remove('wrapper-center');
    }, 300);
}

// Add new card from modal 
const addNewCard = e => {
    e.preventDefault();

    const question__value = question__el.value;
    const answer__value = answer__el.value;

    if (question__value.trim() && answer__value.trim()) {
        const new__card = {
            question: question__value,
            answer: answer__value
        };

        createCard(new__card);

        question__el.value = '';
        answer__el.value = '';

        cards__data.push(new__card);
        setDataCards(cards__data);
    }
}

// Add Event Listeners
next__btn.addEventListener('click', nextCard);
prev__btn.addEventListener('click', prevCard);
show__btn.addEventListener('click', showModal);
hide__btn.addEventListener('click', hideModal);
add__btn__mod.addEventListener('click', addNewCard);

question__el.addEventListener('focusout', () => {
    const value = question__el.value;
    question__el.value = value.trim();

    if (value.trim()) {
        error.classList.remove('error__up');
        error__text.innerText = `Error`;
    } else {
        error.classList.add('error__up');
        error__text.innerText = `Field question!`;
    }
});

answer__el.addEventListener('focusout', () => {
    const value = answer__el.value;
    answer__el.value = value.trim();

    if (value.trim()) {
        error.classList.remove('error__up');
        error__text.innerText = `Error`;
    } else {
        error.classList.add('error__up');
        error__text.innerText = `Field answer!`;
    }
});

clear__btn.addEventListener('click', () => {
    localStorage.clear();
    cards__container.innerHTML = '';
    window.location.reload();
});