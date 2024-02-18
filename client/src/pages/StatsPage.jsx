import React, { useState, useEffect } from 'react';
import Header from "../components/Header/Header.jsx";
import StatsCard from '../components/Stats/StatsCard.jsx';
import { PieChart, ResponsiveContainer, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const StatsPage = () => {
    const [customerSales, setCustomerSales] = useState([]);
    const [, setProductPrices] = useState([]);
    const [productData, setProductData] = useState([]);
    const user = JSON.parse(localStorage.getItem("posUser"));


    useEffect(() => {
        // Faturaları API'den al
        fetch("http://localhost:5000/api/bills/get-all")
            .then(response => response.json())
            .then(data => {
                // Fatura verilerinden müşteri adı ve toplam tutarı al
                const salesByCustomer = data.map(bill => ({
                    name: bill.CustomerName,
                    sales: bill.TotalAmount
                }));
                // AreaChart için hazırlanan veri
                const areaChartData = salesByCustomer.map(customer => ({
                    name: customer.name,
                    sales: customer.sales
                }));
                // Müşterilerin toplam satış tutarını al
                setCustomerSales(areaChartData);
            })
            .catch(error => console.error('Error fetching sales data:', error));

        // Ürünleri API'den al
        fetch("http://localhost:5000/api/products/get-all")
            .then(response => response.json())
            .then(data => {
                setProductData(data);
                // Ürünlerin fiyatlarını al
                const prices = data.map(product => product.price);
                // Ürünlerin fiyatlarını state'e set et
                setProductPrices(prices);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const totalCustomers = customerSales.length;
    const totalSales = customerSales.reduce((total, customer) => total + customer.sales, 0);
    const totalRevenue = totalSales.toFixed(2) + '₺';
    const totalProducts = productData.length;

    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4 ">İstatistikler</h1>
            <h2>
                Hoş Geldin {" "}
                <span>{user.UserName}</span>
            </h2>
            <div className="lg:flex lg:justify-around grid lg:grid-cols-4 md:grid-cols-2 md:ml-28 lg:ml-0 justify-center my-5">
                <StatsCard title={"Toplam Müşteri"} amount={totalCustomers} img={"/images/mandalina.jpg"} />
                <StatsCard title={"Toplam Satış"} amount={totalCustomers} img={"/images/sale.png"} />
                <StatsCard title={"Toplam Kazanç"} amount={totalRevenue} img={"/images/money.png"} />
                <StatsCard title={"Toplam Ürün"} amount={totalProducts} img={"/images/product.png"} />
            </div>

            <div className='sm:flex sm:flex-col md:flex-col lg:flex lg:flex-row justify-between'>
                <div className="w-full max-w-screen-md -ml-5 sm:ml-0">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={customerSales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={customerSales}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="sales"
                            nameKey="name"
                            label={({ name, sales }) => `${name}: ${sales}`}
                        >
                            {customerSales.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </>
    );
};

export default StatsPage;
