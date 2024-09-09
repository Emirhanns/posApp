// import React, { useState } from 'react';
// import { CloseCircleOutlined, PlusCircleOutlined, MinusCircleOutlined,ShoppingCartOutlined } from '@ant-design/icons';
// import { Button,message } from 'antd';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { deleteCart, increase, decrease,reset } from '../../pages/redux/cartSlice';
// import { useNavigate } from "react-router-dom";



// const CardTotals = () => {
//   const [size] = useState('small'); // default is 'middle'
//   const cart = useSelector((state) => state.cart);
//   const dispatch= useDispatch()
//   const navigate = useNavigate()
//   return (

//     <div className="cart h-full flex 1 flex-col grid-cols-2 margin-12 " style={{ maxHeight: '75vh' }}>
//       <h2 className="bg-blue-700 text-center py-2 text-white font-bold">Sepetteki Ürünler</h2>
//       <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2  overflow-y-auto">
        
//       {cart.cartItems.length > 0
//           ? cart.cartItems.map((item) => (
//               <li className="cart-item flex justify-between" key={item._id}>
//                 <div className="flex items-center">
//                   <img
//                     src={item.img}
//                     alt=""
//                     className="w-16 h-16 object-cover cursor-pointer"
//                     onClick={() => {
//                       dispatch(deleteCart(item));
//                       message.success("Ürün Sepetten Silindi.");
//                     }}                  />
//                   <div className="flex flex-col ml-2">
//                     <b>{item.title}</b>
//                     <span>
//                       {item.price}₺ x {item.quantity}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Button
//                     type="primary"
//                     size={size}
//                     className="w-full flex items-center justify-center !rounded-full"
//                     icon={<PlusCircleOutlined />}
//                     onClick={() => dispatch(increase(item))}
//                   />
//                   <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
//                   <Button
//                     type="primary"
//                     size={size}
//                     className="w-full flex items-center justify-center !rounded-full"
//                     icon={<MinusCircleOutlined />}
//                     onClick={() => {
//                       if (item.quantity === 1) {
//                         if (window.confirm("Ürün Silinsin Mi?")) {
//                           dispatch(decrease(item));
//                           message.success("Ürün Sepetten Silindi.");
//                         }
//                       }
//                       if (item.quantity > 1) {
//                         dispatch(decrease(item));
//                       }
//                     }}
//                   />
//                 </div>
//               </li>
//             )).reverse()
//           : "Sepette hiç ürün yok..."}
//            </ul>

//       <div className="cart-totals mt-auto">
//         <div className="border border-black py-1nğ">
//           <div className="flex justify-between p-2">
//             <b className='text-sm'>Ara Toplam</b>
//             <span className='text-sm'>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
//           </div>

//           <div className="flex justify-between p-2">
//             <b className='text-sm'>KDV %{cart.tax}</b>
//             <span className="text-red-700 text-sm">{(cart.total * cart.tax) / 100 > 0
//                 ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
//                 : 0}
//               ₺</span>
//           </div>
//         </div>
//         <div className="border-b">
//           <div className="flex justify-between p-2">
//             <b className='text-sm'>Genel Toplam</b>
//             <span className='text-sm'> {cart.total + (cart.total * cart.tax) / 100 > 0
//                 ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
//                 : 0}
//               ₺</span>
//           </div>

//           <div className="flex justify-between p-2">
//             <Button type="primary" disabled={cart.cartItems.length === 0} icon={<ShoppingCartOutlined />} size={'middle'} onClick={()=> navigate("/cart")} >Sepete At</Button>
//             <Button type="primary" danger disabled={cart.cartItems.length === 0} 
//             onClick={() => {
//               if (window.confirm("Emin Misiniz?")) {
//                 dispatch(reset());
//                 message.success("Sepet Başarıyla Temizlendi.");
//               }
//             }} icon={<CloseCircleOutlined />} size={'middle'}>Temizle</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardTotals;


import React, { useState, useEffect } from 'react';

function BooksPage() {
  const [products, setProducts] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]); // Öneriler burada tutulacak
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        if (!res.ok) {
          throw new Error("Ürünler getirilirken hata oluştu");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler getirilirken hata oluştu:", error);
        setError("Ürünler getirilirken bir hata oluştu.");
      }
    };

    getProducts();
  }, []);

  const fetchRecommendations = async (selectedTitle) => {
    try {
      const res = await fetch('http://localhost:5001/api/recommendations');
      if (!res.ok) {
        throw new Error("Öneriler getirilirken hata oluştu");
      }
      const text = await res.text(); // Yanıt metnini al
      console.log("Yanıt Metni:", text); // Yanıt metnini kontrol et
      const data = JSON.parse(text); // JSON formatına dönüştür

      // Seçilen kitabın "antecedents" içinde bulunduğu önerileri filtrele
      const filteredRecommendations = data
        .filter((rec) => rec.antecedents.includes(selectedTitle))
        .map((rec) => rec.consequents) // "consequents" değerlerini al
        .flat(); // Listeyi düzleştir (birleştir)

      setRecommendations(filteredRecommendations);
    } catch (error) {
      console.error("Öneriler getirilirken hata oluştu:", error);
      setError("Öneriler getirilirken bir hata oluştu.");
    }
  };

  const handleBookChange = (event) => {
    const selectedTitle = event.target.value;
    const selectedBook = products.find(product => product.title === selectedTitle);
    setSelectedBook(selectedBook);
    if (selectedBook) {
      fetchRecommendations(selectedTitle); // Seçilen kitap değiştiğinde önerileri almak için çağrılıyor
    }
  };

  return (
    <div>
      <h2>Kitap seçiniz</h2>
      {error && <p>{error}</p>}
      <select style={{ width: "200px" }} onChange={handleBookChange}>
        <option value="">Kitap Seçin</option>
        {products.map((product) => (
          <option key={product._id} value={product.title}>
            {product.title}
          </option>
        ))}
      </select>

      

      {selectedBook && (
        <div>
          <h3>Seçilen Kitap: {selectedBook.title}</h3>
          <p>Yazar: {selectedBook.author}</p>
          <p>Fiyat: {selectedBook.price} TL</p>
          <p>Açıklama: {selectedBook.description}</p>
        </div>
      )}

{recommendations.length > 0 && (
  <div>
    <h3>Önerilen Kitaplar:</h3>
    <ul>
      {[...new Set(recommendations)].map((rec, index) => ( // Set ile tekrarlanan değerler filtreleniyor
        <li key={index}>{rec}</li> 
      ))}
    </ul>
  </div>
)}

    </div>
  );
}

export default BooksPage;

