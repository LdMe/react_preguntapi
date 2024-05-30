import { getToken } from "./local";
const API_URL = "https://api.preguntapi.tbfsb.com/api";

const fetchData = async(route,method,inputData=null)=>{
    const url = new URL(API_URL + route);
    const fetchOptions = {
        method:method,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    }
    if(inputData){
        if(method === "get"){
            Object.keys(inputData).forEach(key=>{
                url.searchParams.append(key,inputData[key]);
            })
        }
        else if(method === "post" || method === "put" || method === "patch"){
            fetchOptions.body = JSON.stringify(inputData);
        }
    }
    try {
        const result = await fetch(url.toString(),fetchOptions);
        const data  = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        return ({error:error.message})
    }
}

const register = async(username,password,passwordRepeat)=>{
    const data = {username,password,passwordRepeat};
    const result = await fetchData("/register","post",data);
    return result;
}
const login = async(username,password)=>{
    const data = {username,password};
    const result = await fetchData("/login","post",data);
    return result;
}

const getCategories = async()=>{
    const result = await fetchData("/categories","get");
    return result;
}
const getQuestions = async(categoryName) =>{
    const result = await fetchData("/questions/categories/"+categoryName,"get");
    return result;
}
export {
    register,
    login,
    getCategories,
    getQuestions
}