import React from 'react'
import Header from "../components/Header/Header.jsx";
import StatsCard from '../components/Stats/StatsCard.jsx';
import { PieChart, ResponsiveContainer, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const StatsPage = () => {

    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];


    const data2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (

        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4 ">İstatistikler</h1>

            <div className="lg:flex lg:justify-around grid lg:grid-cols-4 md:grid-cols-2 md:ml-28 lg:ml-0 justify-center my-5">

                <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
                <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
                <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
                <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />

            </div>

            <div className='sm:flex sm:flex-col md:flex-col lg:flex lg:flex-row justify-between'>
                <div className="w-full max-w-screen-md -ml-5 sm:ml-0">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                               
                            />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>


                <div >
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data2}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>

            </div>

        </>
    )
}

export default StatsPage