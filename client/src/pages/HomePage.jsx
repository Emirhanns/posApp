import React, { useEffect, useState } from 'react'
import CardTotals from "../components/CardTotals/CardTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";

const HomePage = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async ()=>{
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        data && setCategories(data.map((item)=>{
          return {...item,value:item.title}
        }))
      } catch (error) {
        console.log(error)
      }
    };

    getCategories();
  },[]);


  return (
    <div>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row  justify-between gap-10 md:pb-10">
        <div className="categories">
         <Categories categories={categories} setCategories={setCategories} />
        </div>

        <div className="products flex-[8] ">
          <Products categories={categories} />
          
        </div>

        <div className="cardWrapper min-w-[300px]">
        <CardTotals />

        </div>

      </div>
    </div>
  )
}

export default HomePage;