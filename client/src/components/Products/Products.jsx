import React, {useEffect, useState} from 'react';
import ProductItem from './ProductItem'
import { PlusOutlined, EditOutlined} from "@ant-design/icons";
import Add from "./Add.jsx"
import { useNavigate } from 'react-router-dom';



const Products = ({categories}) => {
  const [products, setProducts] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate()


  useEffect(()=>{
    const getProducts = async ()=>{
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    };

    getProducts();
  },[]);

  return (
    <div className='grid grid-cols-card md:grid-cols-2 lg:grid-cols-5 gap-2 overflow-y-auto' style={{ maxHeight: "75vh" }}>
    
      {products.map((item)=>(
          <ProductItem key={item._id} item={item} />
      ) )}

      <div className="product-item border hover:opacity-90 cursor-pointer bg-purple-800 w-full h-full text-2xl flex justify-center items-center text-white" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined  />
      </div>
      <div className="product-item border hover:opacity-90 min-h-[180px] cursor-pointer bg-purple-800 w-full h-full text-2xl flex justify-center items-center text-white" onClick={()=> navigate("/products")} >
        <EditOutlined />
      </div>
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setProducts={setProducts} products={products} />

    </div>

     

  );
};

export default Products;
