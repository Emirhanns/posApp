import React from 'react';
import { HomeOutlined, CopyOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined,PieChartOutlined } from '@ant-design/icons';
import { Input, Badge } from 'antd';
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";


const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);



const Header = () => {
    const cart = useSelector((state) => state.cart);

  console.log(cart.cartItems.length);
    return (
        <div className='border-b mb-6'>
            <header className='py-6 px-6 flex justify-between gap-10'>
                <div className='logo'>
                    <Link to={'/'}>
                        <h2 className='text-2xl font-bold md:text-3xl'>LOGO</h2>

                    </Link>
                </div>
                <div className='search flex-1 flex justify-start'>
                    <Search
                        placeholder="Ürün Giriniz"
                        allowClear
                        enterButton="Ara"
                        size="small"
                        onSearch={onSearch}
                        className="max-w-[200px]"
                        name='searchInput'

                    />
                </div>
                <div className="menu-links flex justify-between gap-8 md:static fixed bottom-0 md:w-auto w-screen left-0 md:border-t-0 border-t md:px-0 px-2  z-50 bg-white">

                    <Link to={"/"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all '>
                        <HomeOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Ana sayfa
                        </span>
                    </Link>
                    <Link to={"/cart"} className='menu-link flex-col items-center hover:text-[blue] transition-all md:flex hidden'>
                    <Badge count={cart.cartItems.length}>
                        <ShoppingCartOutlined className="md:text-lg sm:text-base"/>
                    </Badge>
                        <span>
                            Sepet
                        </span>
                    </Link>

                    <Link to={"/bills"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all'>
                        <CopyOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Faturalar
                        </span>
                    </Link>

                    <Link to={"/customers"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all '>
                        <UserOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Müşteriler
                        </span>
                    </Link>

                    <Link to={"/stats"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all '>
                        <PieChartOutlined className="md:text-lg sm:text-base" />
                        <span>
                            İstatistik
                        </span>
                    </Link>

                    <Link to={"/"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all '>
                        <LogoutOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Çıkış
                        </span>
                    </Link>

                </div>
                <Link to={"/"} className='menu-link flex flex-col items-center hover:text-[blue] transition-all md:hidden'>
                    <Badge count={2}>
                        <ShoppingCartOutlined className="md:text-lg sm:text-base"/>
                    </Badge>

                        <span>
                            Sepet
                        </span>
                    </Link>
            </header>
        </div>
    )
}

export default Header