import { useState,useEffect } from "react";
import { getCategories } from "../utils/fetch";

const Categories = () =>{
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        fetchCategories();
    },[]);

    async function fetchCategories(){
        const data = await getCategories();
        if(!data.error){
            setCategories(data.categories);
        }
    }

    return(
        <ul>
            {categories.map(category =>{
                return (
                    <li key={category.name}>{category.name}</li>
                )
            })}

        </ul>
    )
}

export default Categories