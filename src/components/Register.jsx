import { useState } from "react";
import {register,login} from "../utils/fetch"
import { saveToken } from "../utils/local";

const Register = ({onLogin}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error,setError] = useState("");
    const handleUsername = (e) =>{
        e.preventDefault();
        setUsername(e.target.value);
    }
    const handlePassword = (e) =>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handlePasswordRepeat = (e) =>{
        e.preventDefault();
        setPasswordRepeat(e.target.value);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let result;
        if(isRegister){
             result = await register(username,password,passwordRepeat);
             if(!result.error){
                 setIsRegister(false);
                 setError("usuario registrado correctamente");
             }
             else{
                 setError(result.error);
             }
        }
        else{
             result = await login(username,password);
             if(!result.error){
                 setError("login correcto");
                 saveToken(result.token);
                 onLogin(result.token);
             }
             else{
                 setError(result.error);
             }
        }
        console.log("resultado",result);
    }
    return (
        <section className="register-login">
            <h2>{isRegister ? "Registro" : "Login"}</h2>
            {error}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de usuario</label>
                <input name="username" type="text" value={username} onChange={handleUsername}/>
                <label htmlFor="password">Contraseña</label>
                <input name="password" type="password" value={password} onChange={handlePassword}/>
                {isRegister &&
                    <>
                        <label htmlFor="passwordRepeat">Repetir Contraseña</label>
                        <input name="passwordRepeat" type="password" value={passwordRepeat} onChange={handlePasswordRepeat}/>
                    </>
                }
                <button>{isRegister ? "Registrarse" : "Login"}</button>
            </form>
            <button onClick={() => setIsRegister(register => !register)} >{isRegister ? "Ir al Login" : "Ir al Registro"}</button>
        </section>
    )
}

export default Register;