import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Add from "./Add.jsx"
import Edit from "./Edit.jsx"


const Categories = ({ categories, setCategories, setFiltered, products }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("Tümü");

    useEffect(() => {
        if (categoryTitle === "Tümü") {
            setFiltered(products);
        } else {
            setFiltered(products.filter((item) => item.category === categoryTitle));
        }
    }, [products, setFiltered, categoryTitle]);


    return (

        <ul className='flex gap-2 md:flex-col overflow-y-auto text-md grid-cols-3' style={{ maxHeight: '75vh', paddingInline: '7px' }}>

            {categories.map((item) => (
                <li
                    className={`category-item ${item.title === categoryTitle && "!bg-pink-700"
                        }`}
                    key={item._id}
                    onClick={() => setCategoryTitle(item.title)}
                >                    <span>{item.title}</span>
                </li>
            ))}

            <li className='category-item !bg-purple-800 hover:opacity-70 min-w-20 flex justify-center items-center' onClick={() => setIsAddModalOpen(true)}>
                <PlusOutlined className="md:text-2xl" />
            </li>
            <li className='category-item !bg-purple-800 hover:opacity-70 min-w-20 flex justify-center items-center' onClick={() => setIsEditModalOpen(true)}>
                <EditOutlined className="md:text-2xl" />
            </li>

            <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} setCategories={setCategories} categories={categories} />
            <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} setCategories={setCategories} categories={categories} />

        </ul>



    )
}

export default Categories