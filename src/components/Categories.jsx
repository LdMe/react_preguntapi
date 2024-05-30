import { useState,useEffect } from "react";
import { getCategories } from "../utils/fetch";

const Categories = ({onSelect}) =>{
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
    const handleSelectCategory = (category)=>{
        if(category === "random"){
            const randomIndex = Math.floor(Math.random()*categories.length);
            const randomCategory = categories[randomIndex].name;
            onSelect(randomCategory);
            return; 
        }
        onSelect(category);
    }
    return(
        <section className="categories">
            <h2>Selecciona categoría</h2>
        <section className="categories-select">
            {categories.map(category =>{
                return (
                   <button onClick={()=>handleSelectCategory(category.name)} key={category.name}>{category.name}</button>
                )
            })}
            <button onClick={()=>handleSelectCategory("random")}>Random</button>

        </section >

        </section>
    )
}

export default Categories