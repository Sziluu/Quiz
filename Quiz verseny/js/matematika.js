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
        question: 'Tőle származik a halmazelmélet egzakt megalapozása',
        choice1: 'Pólya György',
        choice2: 'Neumann János',
        choice3: 'Bolyai János',
        answer: 2,
    },
    {
        question:
            "Nevéhez fűződik a hiperbolikus geometria, eredeti nevén nemeuklideszi geometria",
        choice1: "Bolyai János",
        choice2: "Bolyai Farkas",
        choice3: "Kőnig Gyula",
        answer: 1,
    },
    {
        question: "Elsőéves  egyetemistaként egyszerű bizonyítást adott a Csebisev-tételre: minden egynél nagyobb szám és kétszerese között van prímszám",
        choice1: "Haar Alfréd",
        choice2: "Pólya György",
        choice3: "Erdős Pál",
        answer: 3,
    },
    {
        question: "Fő matematikai műve a Tentamen",
        choice1: "Bolyai Farkas",
        choice2: "Fejér Lipót",
        choice3: "Riesz Frigyes",
        answer: 1,
    },
    {
        question: "Riesz Frigyessel megalapította a szegedi egyetem matematikai központját",
        choice1: "Haar Alfréd",
        choice2: "Fejér Loőót",
        choice3: "Kőnig Gyula",
        answer: 1,
    },
    {
        question: "Jelentős eredményeket ért el a Fourier-sorok analízisében",
        choice1: "Pólya György",
        choice2: "Fejér Lipót",
        choice3: "Haar Alfréd",
        answer: 2,
    },
    {
        question: "Kinek a nevéhez fűződik ez a bizonyítás?: „Három, nem egy egyenesen található pont egy körön található”",
        choice1: "Kármán Tódor",
        choice2: "Bolyai Farkas",
        choice3: "Riesz Frigyes",
        answer: 2,
    },
    {
        question: "1945-ben megírta a „Gondolkodás iskolája” című művét, melyet 16 nyelvre fordítottak le",
        choice1: "Pólya György",
        choice2: "Rényi Alfréd",
        choice3: "Hajós György",
        answer: 1,
    },
    {
        question: "Ő volt a funkcionálanalízis egyik megalapítója",
        choice1: "Lax Péter",
        choice2: "Fejér Lipót",
        choice3: "Riesz Frigyes",
        answer: 3,
    },
    {
        question: "Egyik legismertebb eredménye a sokszögdarabolási tétel: A síkban két egyenes vonalakkal határolt, egyenlő területű sokszög végszerűen egyenlő",
        choice1: "Bolyai Farkas",
        choice2: "Erdős Pál",
        choice3: "Kalmár László",
        answer: 1,
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