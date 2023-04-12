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
        question: 'Kinek a legismertebb alkotása a torziós inga?',
        choice1: 'Jedlik Ányos',
        choice2: 'Eötvös Loránd',
        choice3: 'Kármán Tódor',
        answer: 2,
    },
    {
        question:
            "Minek a segítségével gyorsítja fel az elektromosan töltött részecskéket a részecskegyorsító?",
        choice1: "elektromos mező",
        choice2: "mágneses mező",
        choice3: "gravitációs mező",
        answer: 1,
    },
    {
        question: "Kinek a kezdeményezésére indult meg a Manhattan-terv 1939-ben?",
        choice1: "Teller Ede és Albert Einstein",
        choice2: "Neumann János és Robert Oppenheimer",
        choice3: "Szilárd Leó és Albert Einstein",
        answer: 3,
    },
    {
        question: "Hány neutron szabadul fel egy maghasadás során?",
        choice1: "4-5",
        choice2: "Egy sem",
        choice3: "2-3",
        answer: 3,
    },
    {
        question: "Az ő nevéhez fűződik az első kísérleti atomreaktor",
        choice1: "Wigner Jenő",
        choice2: "Neumann János",
        choice3: "Teller Ede",
        answer: 1,
    },
    {
        question: "Milyen anyagot/anyagokat használnak a reaktorokban moderátoroknak?",
        choice1: "Víz és grafit",
        choice2: "Urán 235-ös izotóp",
        choice3: "Urán 238-as izotóp",
        answer: 1,
    },
    {
        question: "Őt tartják a hidrogénbomba atyjának",
        choice1: "Lénárd Fülöp",
        choice2: "Teller Ede",
        choice3: "Bay Zoltán",
        answer: 2,
    },
    {
        question: "1971-ben Nobel-díjat kapott a holográfia feltalálása miatt",
        choice1: "Wigner Jenő",
        choice2: "Gábor Dénes",
        choice3: "Neumann János",
        answer: 2,
    },
    {
        question: "Ma őt tekintjük a biofizika atyjának: ",
        choice1: "Szilárd Leó",
        choice2: "Gábor Dénes",
        choice3: "Wigner Jenő",
        answer: 1,
    },
    {
        question: "Az ő nevéhez fűződik a dinamóelv",
        choice1: "Eötvös Lóránd",
        choice2: "Neumann János",
        choice3: "Jedlik Ányos",
        answer: 3,
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