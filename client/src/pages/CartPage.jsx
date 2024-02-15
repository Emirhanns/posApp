import Header from "../components/Header/Header.jsx";
import React, { useState } from 'react'
import { Table, Card, Button, message, Popconfirm } from "antd"
import CreateBill from "../components/CardTotals/CreateBill.jsx";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteCart, increase, decrease } from "./redux/cartSlice.js";


const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="link"
              danger

            >
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center mb-4 ">Sepet</h1>


      <div >
        <Table dataSource={cart.cartItems} columns={columns} bordered pagination={false} />;

        <div className="cart-total flex justify-end">
          <Card className="w-72">

            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>            
              </div>

            <div className="flex justify-between">
            <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>

            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>

            <Button className="mt-2 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)} >Sipariş Oluştur</Button>
          </Card>

          {isModalOpen}
        </div>
      </div>

      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>

  )
}

export default CartPage;