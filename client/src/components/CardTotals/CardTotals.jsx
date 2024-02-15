import React, { useState } from 'react';
import { CloseCircleOutlined, PlusCircleOutlined, MinusCircleOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { Button,message } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease,reset } from '../../pages/redux/cartSlice';
import { useNavigate } from "react-router-dom";



const CardTotals = () => {
  const [size] = useState('small'); // default is 'middle'
  const cart = useSelector((state) => state.cart);
  const dispatch= useDispatch()
  const navigate = useNavigate()
  return (

    <div className="cart h-full flex 1 flex-col grid-cols-2 margin-12 " style={{ maxHeight: '75vh' }}>
      <h2 className="bg-blue-700 text-center py-2 text-white font-bold">Sepetteki Ürünler</h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2  overflow-y-auto">
        
      {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün Sepetten Silindi.");
                    }}                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    size={size}
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                  <Button
                    type="primary"
                    size={size}
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Ürün Silinsin Mi?")) {
                          dispatch(decrease(item));
                          message.success("Ürün Sepetten Silindi.");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                      }
                    }}
                  />
                </div>
              </li>
            )).reverse()
          : "Sepette hiç ürün yok..."}
           </ul>

      <div className="cart-totals mt-auto">
        <div className="border border-black py-1nğ">
          <div className="flex justify-between p-2">
            <b className='text-sm'>Ara Toplam</b>
            <span className='text-sm'>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>

          <div className="flex justify-between p-2">
            <b className='text-sm'>KDV %{cart.tax}</b>
            <span className="text-red-700 text-sm">{(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺</span>
          </div>
        </div>
        <div className="border-b">
          <div className="flex justify-between p-2">
            <b className='text-sm'>Genel Toplam</b>
            <span className='text-sm'> {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺</span>
          </div>

          <div className="flex justify-between p-2">
            <Button type="primary" disabled={cart.cartItems.length === 0} icon={<ShoppingCartOutlined />} size={'middle'} onClick={()=> navigate("/cart")} >Sepete At</Button>
            <Button type="primary" danger disabled={cart.cartItems.length === 0} 
            onClick={() => {
              if (window.confirm("Emin Misiniz?")) {
                dispatch(reset());
                message.success("Sepet Başarıyla Temizlendi.");
              }
            }} icon={<CloseCircleOutlined />} size={'middle'}>Temizle</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTotals;
