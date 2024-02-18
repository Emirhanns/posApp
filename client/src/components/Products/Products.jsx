import {useState} from 'react';
import ProductItem from './ProductItem'
import { PlusOutlined, EditOutlined} from "@ant-design/icons";
import Add from "./Add.jsx"
import { useNavigate } from 'react-router-dom';


const Products = ({ categories, filtered, products, setProducts, search}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className='grid grid-cols-card md:grid-cols-2 lg:grid-cols-5 gap-2 overflow-y-auto' style={{ maxHeight: "75vh" }}>
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      <div className="product-item border hover:opacity-90 cursor-pointer bg-purple-800 w-full h-full text-2xl flex justify-center items-center text-white" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined  />
      </div>
      <div className="product-item border hover:opacity-90 min-h-[1vh] cursor-pointer bg-purple-800 w-full h-full text-2xl flex justify-center items-center text-white" onClick={()=> navigate("/products")} >
        <EditOutlined />
      </div>
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setProducts={setProducts} products={products} />

    </div>

     

  );
};

export default Products;
