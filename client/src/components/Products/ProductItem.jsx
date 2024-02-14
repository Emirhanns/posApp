import React from 'react'
import { addProduct } from '../../pages/redux/cartSlice'
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({item}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...item,quantity:1}));
    message.success("Ürün Sepete Eklendi.")
  };
  return (
<div className="bg-white rounded-lg overflow-hidden border-4" style={{width:"100%", height:"100%"} }onClick={handleClick}>
          <img
            alt="example"
            src={item.img}
            className="w-full h-20 object-cover" // İstenilen yüksekliği ayarlayın (gerekirse ayarlayın)
            />
          <div className="p-1">
            <h3 className="text-sm font-bold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.price}TL</p>
          </div>
        </div>
          )
}

export default ProductItem