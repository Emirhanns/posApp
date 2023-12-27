import Header from "../components/Header/Header.jsx";
import React, {useState} from 'react'
import { Table, Card, Button } from "antd"
import PrintBill from "../components/Bills/PrintBilll.jsx"

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Ürün Görseli',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ürün Adı',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Kategori',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ürün Fiyatı',
    dataIndex: 'address',
    key: 'address',
  },
  
  
];



const CustomerPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center mb-4 ">Müşteriler</h1>

      <div >
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} />;

       
      </div>

    </>

  )
}

export default CustomerPage;