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
  {
    title: 'Ürün Adı',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Kategori',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Toplam Fiyatı',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Aksiyon',
    dataIndex: 'address',
    key: 'address',
  },
];



const BillsPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center mb-4 ">Fatura</h1>

      <div >
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} />;

        <div className="cart-total flex justify-end">
          <Card className="w-72">

            <Button className="mt-2 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)} >Yazdır</Button>
          </Card>

          {isModalOpen}
        </div>
      </div>

      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>

  )
}

export default BillsPage;