import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import './summary.css';
import { Link } from 'react-router-dom';

const Summary = () => {

    const location = useLocation();

    const [score, setScore] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hintsUsed, setUsedHints] = useState(0);
    const [fiftyFiftyUsed, setUsedFiftyFifty] = useState(0);
        
    useEffect(() => {
        const { state } = location;
    
        if (state) {
            setScore((state.playerStats.score / state.playerStats.numberOfQuestions) * 100);
            setNumberOfQuestions(state.playerStats.numberOfQuestions);
            setNumberOfAnsweredQuestions(state.playerStats.numberOfAnsweredQuestions);
            setCorrectAnswers(state.playerStats.correctAnswers);
            setWrongAnswers(state.playerStats.wrongAnswers);
            setUsedHints(state.playerStats.hintsUsed);
            setUsedFiftyFifty(state.playerStats.fiftyFiftyUsed);
    }
    }, [location]);


    const prepareStats = () => {
        const { state } = location;
        let stats, remark;

        const userScore = score;
        if(userScore <=30) {
            remark = "Don't give up, let's try again!";
        } else if (userScore > 30 && userScore <=50) {
            remark = "Good progress, shall we practise again?";
        } else if (userScore <=70 && userScore > 50) {
            remark = "You are doing well, keep it up to see more improvement!";
        } else if (userScore >=71 && userScore <=84) {
            remark = "Very good job! You have made steady progress";
        } else {
            remark = "You are doing amazing!";
        }

        if (state !== undefined) {
            stats = (
                <Fragment>
                    <h1> This set has ended! </h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your score: {score.toFixed(0)}&#37;</h2>

                        <span className="stat left">Total Number of Questions:</span>
                        <span className="right">{numberOfQuestions}</span> <br/>

                        <span className="stat left">Number of Attempted Questions:</span>
                        <span className="right">{numberOfAnsweredQuestions}</span> <br/>

                        <span className="stat left">Number of Correct Answers:</span>
                        <span className="right">{correctAnswers}</span> <br/>

                        <span className="stat left">Number of Wrong Answers:</span>
                        <span className="right">{wrongAnswers}</span> <br/>

                        <span className="stat left">Hints Used:</span>
                        <span className="right">{hintsUsed}</span> <br/>

                        <span className="stat left">50-50 Used:</span>
                        <span className="right">{fiftyFiftyUsed}</span>

                    </div>

                    <section>
                        <ul>
                            <li>
                                <Link to ="/"> Back to Home</Link>
                            </li>
                            <li>
                                <Link to ="/">Play Again</Link>
                            </li>
                        </ul>
                    </section>

                </Fragment>
            )
        } else {
            stats = (
                <section>
                <h1 className="no-stats"> No Statistics Available</h1>
                </section>
            )
        }

        return stats;
    }

    const stats = prepareStats();

        return (
            <Fragment>
                <Helmet><title>Your Summary</title></Helmet>
                <div className="summary">
                {stats}
                </div>
            </Fragment>
        );
    }


export default Summary;



