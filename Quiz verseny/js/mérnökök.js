const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: '1893. február 11-én szabadalmaztatta Csonka Jánossal a porlasztót',
        choice1: 'Ganz Ábrahám',
        choice2: 'Bánki Donát',
        choice3: 'Déri Miksa',
        answer: 2,
    },
    {
        question: "Nevéhez fűződik a transzformátor",
        choice1: "Bláthy Ottó",
        choice2: "Galamb József",
        choice3: "Kármán Tódor",
        answer: 1,
    },
    {
        question: "Zipernowsky Károllyal együtt alkották meg a generátort, amelyet 1883-ban kezdtek gyártani",
        choice1: "Irinyi János",
        choice2: "Kandó Kálmán",
        choice3: "Déri Miksa",
        answer: 3,
    },
    {
        question: "A legendás Ford T-modell megalkotója",
        choice1: "Galamb József",
        choice2: "Gábor Dénes",
        choice3: "Csonka János",
        answer: 1,
    },
    {
        question: "Ő a magyar nehézipar egyik megteremtője",
        choice1: "Bródy Imre",
        choice2: "Eötvös Loránd",
        choice3: "Ganz Ábrahám",
        answer: 3,
    },
    {
        question: "Ő valósította meg az első telefonközpontot 1878-ban Bostonban, majd 1879-ben Párizsban",
        choice1: "Zipernowsky Károly",
        choice2: "Puskás Tivadar",
        choice3: "Bay Zoltán",
        answer: 2,
    },
    {
        question: "Ő zajtalanul gyúló foszforos gyufa feltalálója",
        choice1: "Irinyi János",
        choice2: "Kandó Kálmán",
        choice3: "Fonó Albert",
        answer: 1,
    },
    {
        question: "A modern hazai gyógyszeripar megteremtője",
        choice1: "Rényi Alfréd",
        choice2: "Richter Gedeon",
        choice3: "Szentágothai János",
        answer: 2,
    },
    {
        question: "Az ő nevéhez fűződik a történelem legsikeresebb logikai játékának megalkotása, mely a mai napig töretlen sikernek örvend",
        choice1: "Rubik Ernő",
        choice2: "Telkes Mária",
        choice3: "ifj. Rubik Ernő",
        answer: 3,
    },
    {
        question: "Az első villanymozdony megalkotója",
        choice1: "Tihanyi Kálmán",
        choice2: "Kandó Kálmán",
        choice3: "Pattantyús-Ábrahám Géza",
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()