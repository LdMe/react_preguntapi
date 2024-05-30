import { getQuestions } from "../../utils/fetch"
import { useEffect, useReducer } from "react";
import QuestionCard from "../question/QuestionCard";
import gameReducer from "../../reducers/gameReducer";
import "./Game.css";

const initialState = {
    questions: [],
    questionIndex: 0,
    score: 0,
    isEnded: false
};
const Game = ({ category, maxQuestions = 10, onReset }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    useEffect(() => {
        fetchQuestions(category);
    }, [category])
    function getRandomQuestions(questions, maxQuestions) {
        const maxIndex = questions.length < maxQuestions ? questions.length : maxQuestions;

        return questions.sort(() => Math.random() - Math.random()).slice(0, maxIndex);
        
    }
    async function fetchQuestions(category) {
        const result = await getQuestions(category);
        const randomQuestions = getRandomQuestions(result, maxQuestions);
        dispatch({ type: 'SET_QUESTIONS', payload: randomQuestions });
    }
    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            dispatch({ type: 'INCREMENT_SCORE' });
        }
        setTimeout(() => {
            if (state.questionIndex === state.questions.length - 1) {
                dispatch({ type: 'END_GAME' });
                return;
            }
            dispatch({ type: 'INCREMENT_INDEX' });
        }, 3000);
    };
    if (state.questions.length === 0) {
        return <p>cargando...</p>;
    }
    if (state.isEnded) {
        return (
            <section className="game-over">
                <p>Partida terminada, puntuación: {state.score}</p>
                <button onClick={onReset}>Reiniciar</button>
            </section>
        );
    }
    return (
        <section className="game">
            <h1>Categoría: {category}</h1>
            <QuestionCard key={state.questions[state.questionIndex]._id} question={state.questions[state.questionIndex]} onAnswer={handleAnswer} />
            <p>Score: {state.score}</p>
            <p>Pregunta {state.questionIndex + 1}/{maxQuestions}</p>
            <button onClick={onReset}>Reiniciar</button>
        </section>
    );
}

export default Game;
