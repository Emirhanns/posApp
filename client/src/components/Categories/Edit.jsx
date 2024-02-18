import React from 'react';
import { Modal, Form, Table, Input, Button, message } from "antd";
import { useState } from 'react';

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {
    const [form] = Form.useForm(); // Form örneğini oluşturun

    const [editingRow, setEditingRow] = useState({});

    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            message.success("Kategori Güncellendi")
            setCategories(categories.map((item)=>{
                if(item._id ===editingRow._id){
                    return {...item,title:values.title};
                }
                return item
            })
            )
        }

        catch (error) {
            console.log(error)
        }
    }

    const deleteCategory = (id) =>{
       if(window.confirm("Emin misiniz?")){
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
                method:"DELETE",
                body: JSON.stringify({categoryId:id}),
                headers: { "Content-type": "application/json; charset=UTF-8" },

            })
            message.success("Kategori Silindi")
            setCategories(categories.filter((item)=>item._id !== id));
        } 
        catch (error) {
            console.log(error)
        }
       }
    }

    const columns = [
        {
            title: "Kategori Başlığı",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item
                            className='mb-0'
                            name="title"
                            initialValue={record.title}
                            key={record._id}
                        >
                            <Input />
                        </Form.Item>
                    )
                } else {
                    return <p>{record.title}</p>
                }

            },
        },
        {
            title: "İşlem",
            dataIndex: "işlem",
            render: (text, record) => {
                return (
                    <div>
                        <Button type='link' className='pl-0' onClick={() => setEditingRow(record)} >Düzenle</Button>
                        <Button type='text' danger onClick={()=> deleteCategory(record._id)} >Sil</Button>
                        <Button type='text' htmlType='submit'>Kaydet</Button>
                    </div>
                )
            }
        },

    ]

    return (
        <Modal open={isEditModalOpen} title="Kategori Düzenle ve Sil" footer={false} onCancel={() => setIsEditModalOpen(false)} >
            <Form form={form} onFinish={onFinish}>
                <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
            </Form>
        </Modal>
    );
};

export default Edit
