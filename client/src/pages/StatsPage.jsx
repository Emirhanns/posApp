import React from 'react'
import Header from "../components/Header/Header.jsx";
import StatsCard from '../components/Stats/StatsCard.jsx';


const StatsPage = () => {
    return (

        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4 ">İstatistikler</h1>
            <div>Hoş Geldin Admin</div>

            <div className='grid lg:grid-cols-4 md:grid-cols-2 my-10'>

            <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
           <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
           <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />
           <StatsCard title={"Toplam Müşteri"} amount={"8"} img={"/images/mandalina.jpg"} />

          </div>
        </>
    )
}

export default StatsPage