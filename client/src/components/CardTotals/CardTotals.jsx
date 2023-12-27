import React, { useState } from 'react';
import { CloseCircleOutlined, PlusCircleOutlined, MinusCircleOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const CardTotals = () => {
  const [size] = useState('small'); // default is 'middle'

  return (

    <div className="cart h-full flex 1 flex-col grid-cols-2 margin-12 " style={{ maxHeight: '75vh' }}>
      <h2 className="bg-blue-700 text-center py-2 text-white font-bold">Sepetteki Ürünler</h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2  overflow-y-auto">
        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

        <li className='cart-item flex justify-between'>

          <div className='flex items-center'>
            

            <div className='flex flex-col ml-2'>
              <b className='text-sm'>Mandalina</b>
              <span className='text-sm' >12 TL x 2</span>
            </div>

          </div>

          <div>
            <Button type="primary" shape='circle' icon={<PlusCircleOutlined />} size={size}></Button>
            <span>1</span>
            <Button type="primary" shape='circle' icon={<MinusCircleOutlined />} size={size}></Button>
          </div>


        </li>

      </ul>

      <div className="cart-totals mt-auto">
        <div className="border border-black py-1nğ">
          <div className="flex justify-between p-2">
            <b className='text-sm'>Ara Toplam</b>
            <span className='text-sm'>99 TL</span>
          </div>

          <div className="flex justify-between p-2">
            <b className='text-sm'>KDV %10</b>
            <span className="text-red-700 text-sm">9.9TL</span>
          </div>
        </div>
        <div className="border-b">
          <div className="flex justify-between p-2">
            <b className='text-sm'>Genel Toplam</b>
            <span className='text-sm'>99 TL</span>
          </div>

          <div className="flex justify-between p-2">
            <Button type="primary" icon={<ShoppingCartOutlined />} size={'middle'}>Sepete At</Button>
            <Button type="primary" danger icon={<CloseCircleOutlined />} size={'middle'}>Temizle</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTotals;
