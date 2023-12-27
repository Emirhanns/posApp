import Header from "../components/Header/Header.jsx";
import React, {useState} from 'react'
import { Table, Card, Button } from "antd"
import CreateBill from "../components/CardTotals/CreateBill.jsx";

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



const CartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  return (
    <>
      <Header />

      <h1 className="text-4xl font-bold text-center mb-4 ">Sepet</h1>


      <div >
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} />;

        <div className="cart-total flex justify-end">
          <Card className="w-72">

            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>550.000TL</span>
            </div>

            <div className="flex justify-between">
              <span>KDV Toplam %10</span>
              <span className="text-red-600" >+400</span>
            </div>

            <div className="flex justify-between">
              <b>Ara Toplam</b>
              <b>550.400TL</b>
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