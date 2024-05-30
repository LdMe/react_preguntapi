import { useState } from "react";
import Timer from "../timer/Timer"
import "./Question.css";
const QuestionCard = ({ question, onAnswer }) => {
    const [isCorrect, setIsCorrect] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleTimeout = () => {
        setIsAnswered(true);
        setIsCorrect(false);
        onAnswer(false);
    }
    const handleAnswerClick = (answer_key) => {
        if (isAnswered) {
            return;
        }
        setIsAnswered(true);
        setIsCorrect(isCorrectAnswer(answer_key));
        onAnswer(isCorrectAnswer(answer_key));
    }
    function isCorrectAnswer(answer_key) {
        return question.correct_answer === answer_key;
    }
    const getAnswers = (answers) => {
        const result = Object.keys(answers).map(answer_key => {
            return <button className={"answer" + (isAnswered ? (isCorrectAnswer(answer_key) ? " correct" : " incorrect") : "")} disabled={isAnswered} onClick={() => handleAnswerClick(answer_key)} key={answer_key}>{answers[answer_key]}</button>
        })
        return result;
    }
    let message = "";
    if (isCorrect) {
        message = "Respuesta correcta";
    }
    if (isCorrect === false) {
        message = "respuesta incorrecta, la correcta es '" + question.answers[question.correct_answer] + "'"
    }
    return (
        <article className="question-card">
            {!isAnswered &&
                <Timer onEnd={handleTimeout} maxTime={30} />

            }
            <h2>{question.question}</h2>
            {isCorrect !== null &&
                <p className={isCorrect ? "correct" : "incorrect"}>{message}</p>
            }
            <section className="answers">
                {getAnswers(question.answers)}
            </section>
        </article>
    )
}

export default QuestionCard;