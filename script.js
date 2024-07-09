document.addEventListener('DOMContentLoaded', () => {
    const flagContainer = document.getElementById('flag-container');
    const flagImg = document.getElementById('flag');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const resultText = document.getElementById('result');
    const backgroundColors = ['#229954', '#4933FF', '#FF9C33', '#E0FF33', '#9633FF'];
    const btnBackgroundColor = document.querySelector('.btn-temi');
    let countries = [];
    let currentCountry = {};

    async function fetchCountries() {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();
        newQuestion();
    }

    function newQuestion() {
        resultText.textContent = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';

        const randomCountries = getRandomCountries(4);
        currentCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

        flagImg.src = currentCountry.flags.png;

        randomCountries.forEach(country => {
            const button = document.createElement('button');
            button.textContent = country.name.common;
            button.addEventListener('click', () => checkAnswer(country));
            optionsContainer.appendChild(button);
        });
    }

    function getRandomCountries(count) {
        const shuffled = countries.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function checkAnswer(selectedCountry) {
        if (selectedCountry.name.common === currentCountry.name.common) {
            resultText.textContent = 'Corretto!';
            resultText.style.color = 'green';
        } else {
            resultText.textContent = `Sbagliato! La risposta corretta era ${currentCountry.name.common}.`;
            resultText.style.color = 'red';
        }
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', newQuestion);

    fetchCountries();
    btnBackgroundColor.addEventListener('click', colorChange);
    function colorChange() {
        console.log('sono qui');
        const randomIndex = Math.floor(Math.random() * backgroundColors.length);
        const randomColor = backgroundColors[randomIndex];
        document.body.style.backgroundColor = randomColor;
        const buttons = document.querySelectorAll('#options-container button');
        buttons.forEach(btn=>{
            btn.style.backgroundColor=randomColor;
        });
        btnBackgroundColor.style.backgroundColor=randomColor;
        
    }
});

