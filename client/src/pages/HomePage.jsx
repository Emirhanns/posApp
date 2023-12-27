import React from 'react'
import CardTotals from "../components/CardTotals/CardTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="home px-6 flex flex-col md:flex-row  justify-between gap-10 md:pb-10">
        <div className="categories">
         <Categories />
        </div>

        <div className="products flex-[8] ">
          <Products />
          
        </div>

        <div className="cardWrapper min-w-[300px]">
        <CardTotals />

        </div>

      </div>
    </div>
  )
}

export default HomePage;