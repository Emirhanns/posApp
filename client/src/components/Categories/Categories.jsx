import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";

const Categories = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [form] = Form.useForm()


    const onFinish = (values)=>{
        try{
            fetch("http://localhost:5000/api/categories/add-category",{
                method:"POST",
                body: JSON.stringify(values),
                headers: {"Content-type":"application/json; charset=UTF-8"},
            });
            message.success("Kategori Eklendi");
            form.resetFields();
            
            ;
        }catch (error){
            console.log(error.message);

        }
    }

    return (

        <ul className='flex gap-2 md:flex-col overflow-y-auto text-md grid-cols-3' style={{ maxHeight: '75vh', paddingInline: '7px' }}>

            <li className='category-item'>
                <span>Tümü</span>
            </li>

            <li className='category-item'>
                <span>Yiyecek</span>
            </li>

            <li className='category-item'>
                <span>İçecek</span>
            </li>

            <li className='category-item'>
                <span>Meyve</span>
            </li>

            <li className='category-item'>
                <span>Sebze</span>
            </li>

            <li className='category-item'>
                <span>Sebze</span>
            </li>

            <li className='category-item'>
                <span>Sebze</span>
            </li>


            <li className='category-item !bg-purple-800 hover:opacity-70' onClick={() => setIsAddModalOpen(true)}>
                <PlusOutlined className="md:text-2xl" />
            </li>
            <Modal title="Yeni Kategori Ekle" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false} >
                <Form layout="vertical" onFinish={onFinish} form ={form} >

                    <Form.Item name={"title"} label="Kategori Ekle" 
                    rules={[{required:true, message:"Kategori Boş Geçilemez"}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item className="flex justify-end mb-0">
                        <Button htmlType="submit">Oluştur</Button>
                    </Form.Item>

                </Form>

            </Modal>




        </ul>



    )
}

export default Categories