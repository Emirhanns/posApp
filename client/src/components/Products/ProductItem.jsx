import React from 'react';
import { addProduct, setSelectedBook } from '../../pages/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { message, Popconfirm } from 'antd';

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));  // Ürünü sepete ekler
    dispatch(setSelectedBook(item));  // Seçilen kitabı kaydeder
    message.success("Ürün Sepete Eklendi ve Seçildi.");
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border-4" style={{ width: "100%", height: "100%" }}>
      <Popconfirm
        title="Bu ürünü sepete eklemek istiyor musunuz?"
        onConfirm={handleClick}
        okText="Evet"
        cancelText="Hayır"
      >
        <div className="cursor-pointer">
          <img
            alt="example"
            src={item.img}
            className="w-full h-40 object-fit"
          />
          <div className="p-1">
            <h3 className="text-sm font-bold mb-1">{item.title}</h3>
            <h3 className="text-sm font-bold mb-1">{item.author}</h3>
            <p className="text-gray-600 text-sm">{item.price} ₺</p>
            <p className="text-gray-600 text-sm"><b>Raf Bilgisi: </b>{item.itemDetail}</p>
          </div>
        </div>
      </Popconfirm>
    </div>
  );
};

export default ProductItem;
