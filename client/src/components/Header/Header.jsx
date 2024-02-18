import React from 'react';
import { HomeOutlined, CopyOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Input, Badge, message } from 'antd';
import { Link,   useLocation,   useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";




const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);



const Header = ({setSearch}) => {
    const cart = useSelector((state) => state.cart);
    const {pathname} = useLocation();
    const navigate = useNavigate(); 
    const logOut = () => {
        if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
            localStorage.removeItem("posUser");
            navigate("/login");
            message.success("Çıkış işlemi başarılı.");
        }
    };


    return (
        <div className='border-b mb-6'>
            <header className='py-6 px-6 flex justify-between gap-10'>
                <div className='logo'>
                    <Link to={'/'}>
                        <h2 className='text-2xl font-bold md:text-3xl'>LOGO</h2>

                    </Link>
                </div>
                <div className='search flex-1 flex justify-start' onClick={() => {
            pathname !== "/" && navigate("/");
          }} >
                    
                <Search
                        placeholder="Ürün Giriniz"
                        allowClear
                        enterButton="Ara"
                        size="small"
                        onSearch={onSearch}
                        className="max-w-[200px]"
                        name='searchInput'
                        onChange={(e)=> setSearch(e.target.value.toLowerCase())}
                    />
                        
                    
                </div>
                <div className="menu-links flex justify-between gap-8 md:static fixed bottom-0 md:w-auto w-screen left-0 md:border-t-0 border-t md:px-0 px-2  z-50 bg-white">

                    <Link to={"/"} className={`menu-link flex flex-col items-center hover:text-[blue] transition-all ${pathname ==="/" && "active"}`}>
                        <HomeOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Ana sayfa
                        </span>
                    </Link>
                    <Link to={"/cart"} className={`menu-link flex-col items-center hover:text-[blue] transition-all md:flex hidden ${pathname === "/cart" && "active"}`}>
                        <Badge count={cart.cartItems.length} offset={[0, 0]}>
                            <ShoppingCartOutlined className={`menu-link md:text-lg sm:text-base"  ${pathname === "/cart" && "active"}`} />
                        </Badge>
                        <span>
                            Sepet
                        </span>
                    </Link>

                    <Link to={"/bills"} className={`menu-link flex flex-col items-center hover:text-[blue] transition-all ${pathname === "/bills" && "active"}`}>
                        <CopyOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Faturalar
                        </span>
                    </Link>

                    <Link to={"/customers"} className={`menu-link flex flex-col items-center hover:text-[blue] transition-all ${pathname === "/customers" && "active"}`}>
                        <UserOutlined className="md:text-lg sm:text-base" />
                        <span>
                            Müşteriler
                        </span>
                    </Link>

                    <Link to={"/stats"} className={`menu-link flex flex-col items-center hover:text-[blue] transition-all ${pathname === "/stats" && "active"}`}>
                        <PieChartOutlined className="md:text-lg sm:text-base" />
                        <span>
                            İstatistik
                        </span>
                    </Link>

                    <div onClick={logOut}>
                        <Link className = 'menu-link flex flex-col items-center hover:text-[red] transition-all text-xl md:text-2x '>
                            <LogoutOutlined className="md:text-2xl text-xl" />
                            <span className="md:text-xs text-[10px]">Çıkış</span>
                        </Link>
                    </div>

                </div>
                <Link to={"/"} className={`menu-link flex flex-col items-center hover:text-[blue] transition-all md:hidden ${pathname === "/cart" && "active"}`}>
                    <Badge count={cart.cartItems.length} offset={[0, 0]}>
                        <ShoppingCartOutlined className={`menu-link md:text-lg sm:text-base  ${pathname === "/cart" && "active"}`} />
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


