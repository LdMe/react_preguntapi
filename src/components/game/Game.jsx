import { getQuestions } from "../../utils/fetch"
import { useEffect,useState } from "react";
import QuestionCard from "../question/QuestionCard";
const Game = ({category,maxQuestions =3,onReset}) =>{
    const [questions,setQuestions] = useState([]);
    const [questionIndex,setQuestionIndex] = useState(0);
    const [score,setScore] = useState(0);
    const [isEnded,setIsEnded] = useState(false);

    console.log(questions);
    useEffect(()=>{
        fetchQuestions(category);
    },[category])
    useEffect(()=>{
        if(questionIndex >= maxQuestions){
            setIsEnded(true);
        }
    },[questionIndex])
    async function fetchQuestions (category){
        const result = await getQuestions(category);
        setQuestions(result);
    }
    const handleAnswer = (isCorrect)=>{
        if(isCorrect){
            setScore(score => score + 1);
        }
        setTimeout(()=>{
            setQuestionIndex(questionIndex => questionIndex +1);
        },3000);
    }
    if(questions.length === 0){
        return <p>cargarndo...</p>
    }
    if(isEnded){
        return (
            <section className="game-over">
                <p>Partida terminada, puntuación: {score}</p>
            </section>
            )
    }
    return(
        <section className="game">
            <h1> Categoría: {category}</h1>
            <QuestionCard  key={questions[questionIndex]._id} question={questions[questionIndex]} onAnswer={handleAnswer}/>
            <p>Score: {score}</p>
            <p>Pregunta {questionIndex + 1}/{maxQuestions}</p>

            <button onClick={onReset}>Reiniciar</button>
        </section>
    )
}

export default Game;
