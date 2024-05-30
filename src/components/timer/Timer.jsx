import { useEffect, useRef, useState } from "react"

import "./Timer.css";
const Timer =({maxTime = 4,onEnd})=>{
    const [time,setTime] = useState(maxTime);
    const isEndedRef = useRef(false);
    const intervalRef = useRef(null);
    const timeRef = useRef(maxTime);
    useEffect(()=>{
        intervalRef.current = setInterval(()=>{
            handleSetTime();
        },1000);
        return (()=>{
            clearInterval(intervalRef.current);
        })
    },[maxTime]);

    const handleSetTime = () =>{
        if(isEndedRef.current){
            clearInterval(intervalRef.current);
            return;
        }
        const newTime = timeRef.current - 1;
        if(newTime < 0){
            onEnd();
            isEndedRef.current = true;
            return 0;
        }else{
            setTime(newTime);
            timeRef.current -= 1;
        }
    }

    return(
        <p>{time}</p>
    )
}

export default Timer;