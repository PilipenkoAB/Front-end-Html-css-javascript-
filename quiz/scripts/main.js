const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const finishButton = document.getElementById("finish-btn")
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const buttonsElement = document.getElementById("answer-buttons")
const startMessage = document.getElementById("start-title")
const finishMessage = document.getElementById("finish-title")
const resultScore = document.getElementById("result-score")

let shuffledQuestions, currentQuestionIndex
let questionData

let score = 0
const maxAmountOfQuestions = 5
let currentAmountOfQuestions = 0

startButton.addEventListener('click', StartGame)

finishButton.addEventListener('click', ()=>{
    finishMessage.classList.remove('hide')
        questionContainer.classList.add('hide') 
        resultScore.innerText = score    
        resultScore.classList.remove('hide') 
        startButton.innerText="Play again?"
        startButton.classList.remove("hide")
        finishButton.classList.add("hide")
})

nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    SetNextQuestion()
})


function StartGame() {
    startButton.classList.add("hide")
    startMessage.classList.add("hide")
    finishMessage.classList.add('hide')

    questionContainer.classList.remove("hide")

    // score
    score = 0
    currentAmountOfQuestions = 0

    // random question
    currentQuestionIndex = 0
    shuffledQuestions = questions.sort(() => Math.random() - .5)

    SetNextQuestion()
}

function SetNextQuestion() {
    ResetState()

    ShowQuestion(shuffledQuestions[currentQuestionIndex])
}

function ResetState(){
    nextButton.classList.add('hide')

    while(buttonsElement.firstChild){
        buttonsElement.removeChild(buttonsElement.firstChild)
    }
}

function ShowQuestion(question){
    questionElement.innerText = question.question

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.classList.add('col-md-3')
        button.classList.add('btn-outline-secondary')
        button.classList.add('btn-sm')
        button.classList.add('m-2')

        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', SelectAnswer)
        buttonsElement.appendChild(button)
    });
}

function SelectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    /* here is set css class if correct or incorrect */
    Array.from(buttonsElement.children).forEach(button =>{
        SetStatusClass(button, button.dataset.correct)
    })

    currentAmountOfQuestions++

    if(correct){
        score++
        selectedButton.classList.add('btn-correct-selected')
    }else{
        selectedButton.classList.add('btn-incorrect-selected')
    }

    // if answer all questions - show score
    if(currentAmountOfQuestions == maxAmountOfQuestions){
        nextButton.classList.add('hide')
        finishButton.classList.remove('hide')
    }
    else{
        if(shuffledQuestions.length > currentQuestionIndex + 1){
            nextButton.classList.remove('hide')
        }
        else{
            startButton.innerText="Restart"
            startButton.classList.remove("hide")
        }
    }
}

function SetStatusClass(element, correct){
    ClearStatusClass(element)
    if(correct){
        element.classList.add('btn-success')
    }
    else{
        element.classList.add('btn-outline-danger')       
    }
    //disable buttons
    element.disabled = true
}

function ClearStatusClass(element){
    element.classList.remove('btn-outline-danger')  
    element.classList.remove('btn-success')    
    element.classList.remove('btn-correct-selected')
    element.classList.remove('btn-iccorrect-selected')
}






const questions = [
    {
      question: "What was Tandem previous name?",
      answers : [
        { text: 'Tandem', correct: false},
        { text: 'Burger Shack', correct: false},
        { text: 'Extraordinary Humans', correct: false},
        { text: 'Devmynd', correct: true}
        ]
    },
    {
      question: "In Shakespeare's play Julius Caesar, Caesar's last words were...",
      answers : [
        { text: 'Vidi, vini, vici', correct: false},
        { text: 'Et tu, Brute?', correct: true},
        { text: 'Aegri somnia vana', correct: false},
        { text: 'Iacta alea est!', correct: false}
        ]
    },
    {
      question: "A group of tigers are referred to as:",
      answers : [
        { text: 'Chowder', correct: false},
        { text: 'Pride', correct: false},
        { text: 'Destruction', correct: false},
        { text: 'Ambush', correct: true}
        ]
    },
    {
      question: "What is the top speed an average cat can travel?",
      answers : [
        { text: '9 mph', correct: false},
        { text: '31 mph', correct: true},
        { text: '42 mph', correct: false},
        { text: '13 mph', correct: false}
        ]
    },
    {
      question: "A cat can jump to _____ times its own height:",
      answers : [
        { text: '5', correct: true},
        { text: '3', correct: false},
        { text: '9', correct: false},
        { text: '7', correct: false}
        ]
    },
    {
      question: "What is the only letter that doesn't appear in a US state name?",
      answers : [
        { text: 'M', correct: false},
        { text: 'Z', correct: false},
        { text: 'X', correct: false},
        { text: 'Q', correct: true}
        ]
    },
    {
      question: "What is the name for a cow-bison hybrid?",
      answers : [
        { text: 'Mooson', correct: false},
        { text: 'Beefalo', correct: true},
        { text: 'Cowson', correct: false},
        { text: 'Bicow', correct: false}
        ]
    },
    {
      question: "What is the largest freshwater lake in the world?",
      answers : [
        { text: 'Lake Superior', correct: true},
        { text: 'Lake Baikal', correct: false},
        { text: 'Lake Michigan', correct: false},
        { text: 'Lake Victoria', correct: false}
        ]
    },
  
    {
      question: "In a website address bar, what does WWW stand for?",
      answers : [
        { text: 'Wild World Web', correct: false},
        { text: 'War World Web', correct: false},
        { text: 'Wild Wild West', correct: false},
        { text: 'World Wide Web', correct: true}
        ]
    },
    {
      question: "In a game of bingo, what number is represented by the name two little ducks?",
      answers : [
        { text: '20', correct: false},
        { text: '22', correct: true},
        { text: '55', correct: false},
        { text: '77', correct: false}
        ]
    },
    {
      question: "According to Greek mythology, who was the first woman on Earth?",
      answers : [
        { text: 'Lilith', correct: false},
        { text: 'Eve', correct: false},
        { text: 'Pandora', correct: true},
        { text: 'Hera', correct: false}
        ]
    },
    {
      question: "In which European city would you find Orly airport?",
      answers : [
        { text: 'Paris', correct: true},
        { text: 'Munich', correct: false},
        { text: 'Belgium', correct: false},
        { text: 'London', correct: false}
        ]
    },
    {
      question: "Where would you find the Sea of Tranquility?",
      answers : [
        { text: 'California', correct: false},
        { text: 'The Moon', correct: true},
        { text: 'Siberia', correct: false},
        { text: 'China', correct: false}
        ]
    },
    {
      question: "Which artist painted 'Girl with a Pearl Earrin'?",
      answers : [
        { text: 'Da Vinci', correct: false},
        { text: 'Vermeer', correct: true},
        { text: 'Picasso', correct: false},
        { text: 'Van Gogh', correct: false}
        ]
    },
    {
      question: "What is the official name for the 'hashtag' symbol?",
      answers : [
        { text: 'Hash Sign', correct: false},
        { text: 'Pound', correct: false},
        { text: 'Octothorpe', correct: true},
        { text: 'Number sign', correct: false}
        ]
    },
    {
      question: "Not American at all, where is apple pie from?",
      answers : [
        { text: 'Japan', correct: false},
        { text: 'Ethiopia', correct: false},
        { text: 'Canada', correct: false},
        { text: 'England', correct: true}
        ]
    },
    {
      question: "What is the national animal of Scotland?",
      answers : [
        { text: 'Bear', correct: false},
        { text: 'Rabbit', correct: false},
        { text: 'Seal', correct: false},
        { text: 'Unicorn', correct: true}
        ]
    },
    {
      question: "Where in the world is the only place where Canada is *due south*",
      answers : [
        { text: 'Detroit', correct: true},
        { text: 'Alaska', correct: false},
        { text: 'Russia', correct: false},
        { text: 'Washington', correct: false}
        ]
    },
    {
      question: "Approximately how many grapes go into a bottle of wine?",
      answers : [
        { text: '1000', correct: false},
        { text: '200', correct: false},
        { text: '700', correct: true},
        { text: '500', correct: false}
        ]
    },
    {
      question: "How much does a US One Dollar Bill cost to make?",
      answers : [
        { text: '$0.25', correct: false},
        { text: '$0.05', correct: true},
        { text: '$1', correct: false},
        { text: '$5', correct: false}
        ]
    },
    {
      question: "The Vatican bank has the only ATM in the world that allows users to do what?",
      answers : [
        { text: 'Purchase indulgences', correct: false},
        { text: 'Perform transactions in Latin', correct: true},
        { text: 'Vote for the Pope', correct: false},
        { text: 'eceive withdrawls in rosary beads', correct: false}
        ]
    }
  ]
  