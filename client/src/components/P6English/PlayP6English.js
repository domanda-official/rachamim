import { Fragment, useEffect, useState, useRef, React } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import isEmpty from '../../utils/isEmpty';
import M from 'materialize-css';
import './play.css';
import classnames from 'classnames';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
//import buttonSound from '../../assets/audio/button-sound.mp3';

const PlayP6English = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [nextQuestion, setNextQuestion] = useState({});
    const [answer, setAnswer] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [previousRandomNumbers, setPreviousRandomNumbers] = useState([]);

    const [hints, setHints] = useState(10);
    const [fiftyFifty, setFiftyFifty] = useState(5);

    const [usedHints, setUsedHints] = useState(false);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    
    const [time, setTime] = useState({});
    const navigate = useNavigate();

    // const interval = useRef(null);
    const correctSound = useRef(null);
    const wrongSound = useRef(null);
    const buttonSound = useRef(null);

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:3000/P6EnglishQuestions');
            const list = res.data.sort(() => 0.5 - Math.random());
            const shuffledData = list.slice(0, 3);
            setQuestions(shuffledData);
            displayQuestions(shuffledData, currentQuestion, nextQuestion);
            startTimer();
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
        // eslint-disable-next-line
      }, []);

    
    const displayQuestions = (questions, currentQuestion, nextQuestion) => {
        
        // should this + 1? If +1 is not included, loading questions messes up.
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        if (!isEmpty(questions)) {
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            const answer = currentQuestion.answer;
         
            setCurrentQuestion(currentQuestion)
            setNextQuestion(nextQuestion)
            setNumberOfQuestions(questions.length)
            setAnswer(answer)
            setPreviousRandomNumbers([])
            showOptions();
             
            };
        }

    const handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === answer.toLowerCase()) {
          setTimeout(() => {
            correctSound.current.play();
          }, 10)
           
          correctAnswer();
        } else {
            setTimeout(() => {
              wrongSound.current.play();
            }, 10);
          wrongAnswer();
        }
      }

    const correctAnswer = () => {
        M.toast ({
            html: 'Correct Answer',
            classes: 'toast-valid',
            displayLength: 1500
        });

            setScore(score + 1);
            setCorrectAnswers(correctAnswers + 1 );
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
         
            if (nextQuestion === undefined) {
                endGame();
            } else {
                displayQuestions(questions, currentQuestion, nextQuestion)
            }    
    }
        
    const wrongAnswer = () => {
        M.toast ({
            html: 'Wrong Answer',
            classes: 'toast-invalid',
            displayLength: 1500
        });
            setWrongAnswers(wrongAnswers + 1);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setNumberOfAnsweredQuestions(numberOfAnsweredQuestions + 1);
         
            if (nextQuestion === undefined) {
                endGame();
            } else {
                displayQuestions(questions, currentQuestion, nextQuestion)
            }    
    }
 
    const handleQuitButton = () => {
        if (window.confirm("Are you sure you want to quit?")) {
            navigate('/');
        }
    }

    const showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility='visible';
        });

        setUsedFiftyFifty(false);
        setUsedHints(false);        
    }

    const endGame = () => {
        const playerStats = {
            score: score,
            numberOfQuestions: numberOfQuestions,
            // numberOfAnsweredQuestions: numberOfAnsweredQuestions,
            numberOfAnsweredQuestions: correctAnswers + wrongAnswers,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            fiftyFiftyUsed: 5 - fiftyFifty,
            hintsUsed: 10 - hints
        };
        
        setTimeout(() => {
            console.log(playerStats);
            navigate('/Summary', {state: { playerStats: playerStats }} )
        }, 20);
    }

    const handleHints = () => {
        if (hints > 0 && usedHints === false && usedFiftyFifty === false) {
          const options = Array.from(document.querySelectorAll('.option'));
          let indexOfAnswer;
    
          options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
              indexOfAnswer = index;
            }
          });
    
          while (true) {
            const randomNumber = Math.round(Math.random() * 3);
            if (randomNumber !== indexOfAnswer && !previousRandomNumbers.includes(randomNumber)) {
              options.forEach((option, index) => {
                if (index === randomNumber) {
                  option.style.visibility = 'hidden';
                  setHints(hints - 1);
                  setPreviousRandomNumbers(previousRandomNumbers.concat(randomNumber));
                  setUsedHints(true);
                }
              });
              break;
            }
            if (previousRandomNumbers.length >= 3) {
            }
          }
        }
      };

      const handleFiftyFifty = () => {
        if (fiftyFifty > 0 && usedFiftyFifty === false && usedHints === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 &&
                        !randomNumbers.includes(randomNumber) &&
                        !randomNumbers.includes(indexOfAnswer)) {
                            randomNumbers.push(randomNumber);
                            count ++;
                        } else {
                            while (true) {
                                const newRandomNumber = Math.round(Math.random() * 3);
                                if(!randomNumbers.includes(newRandomNumber) && 
                                    newRandomNumber !== indexOfAnswer) {
                                        randomNumbers.push(newRandomNumber);
                                        count++;
                                        break;
                                    }
                            }
                        }
                }
            } while (count < 2)

            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility='hidden';
                }
            });

            setFiftyFifty(fiftyFifty - 1);
            setUsedFiftyFifty(true);
        }

    }

        const startTimer = () => {
          const countDownTime = Date.now() + 600000;
                let interval = setInterval(() => {
                const now = new Date();
                const distance = countDownTime - now;
        
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            if (distance < 0) {
              clearInterval(interval);
              setTime({ minutes: 0, seconds: 0, distance: 0 });
              endGame();
            } else {
              setTime({ minutes, seconds, distance });
            }
          }, 1000);
    
        };
    
    
    // const startTimer = () => {
    //     const countDownTime  = Date.now() + 600000;
    //         setInterval(() => {
    //         const now = new Date();
    //         const distance = countDownTime - now;

    //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((distance % (1000 * 60)) / 1000); 

    //         if (distance < 0) {
    //             clearInterval(interval);
    //             setTime({minutes: 0, seconds: 0})
    //             endGame();
    //         } else {
    //             setTime({minutes, seconds, distance})
    //         }
    //     }, 1000);
    // }   
     
    const handleNextButton = () => {
        playButtonSound();
        if (nextQuestion !== undefined) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            displayQuestions(questions, currentQuestion, nextQuestion)
        }
    }

    const playButtonSound = () => {
        buttonSound.current.play();
    }

    return (
        <Fragment>
        <Helmet><title> Domanda </title> </Helmet>
            <Fragment>
                <audio ref={correctSound} src={correctNotification}></audio>
                <audio ref={wrongSound} src={wrongNotification}></audio>
                <audio ref={buttonSound} src={buttonSound}></audio>
            </Fragment>

            <div className="questions">
                <h2>P6 English</h2>
              
                <div className="timer-container" style={{ marginBottom: '90px' }}>
                         <h6>
                            <span className="left" color="black" style={{ float:'left', color: "black" }}>{currentQuestionIndex} of {numberOfQuestions}</span>
                            <span className={classnames('right valid', {
                                'warning': time.distance <= 60000,
                                'invalid': time.distance < 15000,
                            })} style={{ color: 'black' }}>
                                {time.minutes}:{time.seconds + " "} <span className="mdi mdi-clock-outline mdi-24px"></span>
                            </span>
                        </h6> 
                    </div>

                <div className="lifeline-container" style={{ marginBottom: '20px' }}>
                        <p>
                            <span onClick={handleFiftyFifty} className="mdi mdi-heart-half-full mdi-24px lifeline-icon"></span>
                            <span className="lifeline">{fiftyFifty}</span>
                        </p>
                       
                        <p>
                            <span onClick={handleHints} className="mdi mdi-flash mdi-24px lifeline-icon"></span>
                            <span className="lifeline">{hints}</span>
                        </p>
                    </div>

                <h5>{currentQuestion.questionText}</h5>
          
            <div className="options-container">
                        <p onClick={handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={handleOptionClick} className="option">{currentQuestion.optionB}</p>
            </div>

            <div className="options-container">
                        <p onClick={handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={handleOptionClick} className="option">{currentQuestion.optionD}</p>
            </div>
            
            <div className="button-container">
                <button onClick={handleQuitButton}>Quit</button>
                <button onClick={handleNextButton}>Next</button>
            </div>
            </div>
            
        </Fragment>
    
    )
}

export default PlayP6English;
