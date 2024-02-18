import React, { useEffect, useState } from 'react'
import CardTotals from "../components/CardTotals/CardTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import {Spin} from "antd";
const HomePage = () => {

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const getCategories = async ()=>{
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        const data = await res.json();
        setCategories(data.map((item)=>{
          return {...item,value:item.title}
        }))
      } catch (error) {
        console.log(error)
      }
    };

    getCategories();
  },[]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>

      <Header setSearch={setSearch} />
      {products && categories ?(

      <div className="home px-6 flex flex-col md:flex-row  justify-between gap-10 md:pb-10">
        <div className="categories">
         <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products} search={search} />
        </div>

        <div className="products flex-[8] ">
          <Products categories={categories}  filtered={filtered} products={products} setProducts={setProducts} search={search} />
          
        </div>

        <div className="cardWrapper min-w-[300px]">
        <CardTotals />

        </div>

      </div> ):(<Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </div>
  )
}

export default HomePage;
