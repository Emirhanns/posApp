import Header from "../components/Header/Header.jsx";
import React, { useState, useEffect } from 'react'
import { Table, Button } from "antd"
import CreateBill from "../components/Bills/PrintBilll.jsx"
import {Spin} from "antd";


const BillsPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBilItems] = useState();
  const [customer, setCustomer] = useState();


  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'CustomerName',
      key: 'CustomerName',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'CustomerNumber',
      key: 'CustomerNumber',
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>
      }
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'PaymentMode',
      key: 'PaymentMode',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'TotalAmount',
      key: 'TotalAmount',
      render: (text) => {
        return <span>{text}₺</span>
      },
    },
    {
      title: 'Aksiyon',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return <Button type="primary" onClick={() => {
          setIsModalOpen(true)
          setCustomer(record);
        }} >Yazdır</Button>
      }
    },
  ];



  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bills/get-all")
        const data = await res.json();
        setBilItems(data);
      } catch (error) {
        console.log(error)
      }
    };

    getBills();

  }, []);


  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
      {billItems ? (
        <div className="px-6">
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 300,
            }}
            rowKey="_id"
          />
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
          
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer} />
    </>

  )




}






export default BillsPage;