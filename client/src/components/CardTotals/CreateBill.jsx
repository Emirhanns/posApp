import { Button, Card, Form, Input, Modal } from "antd";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
         };

    return (
        <Modal
            title="Fatura Oluştur"
            open={isModalOpen}
            footer={false}
            onCancel={() => setIsModalOpen(false)}
        >
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Müşteri Adı"
                    name="customerName"
                    rules={[
                        {
                            required: true,
                            message: "Müşteri Adı Gerekli",
                        },
                    ]}
                >
                    <Input placeholder="Bir Müşteri Adı Yazınız" />
                </Form.Item>

                <Form.Item
                    rules={[{ required: true }]}
                    name="customerTel"
                    label="Tel No"
                >
                    <Input placeholder="Bir Tel No Yazınız" maxLength={11} />
                </Form.Item>

                <Form.Item
                    label="Ödeme Yöntemi"
                    name="paymentMode"
                    rules={[{ required: true }]}
                >
                    {/* Kendi oluşturduğumuz select elemanı */}
                    <select
                        className="ant-input mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                        onChange={(event) => {
                            console.log(event.target.value);
                        }}
                        required
                    >
                        <option value="">Bir Ödeme Yöntemi Seçiniz</option>
                        <option value="Nakit">Nakit</option>
                        <option value="Kredi Kartı">Kredi Kartı</option>
                    </select>
                </Form.Item>

                <Card>
                    <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>549.00₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV Toplam %8</span>
                        <span className="text-red-600">+43.92₺</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Toplam</b>
                        <b>592.92₺</b>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            id="modalButton"
                            className="mt-4"
                            type="primary"
                            htmlType="submit"
                            
                            
                        >
                            Sipariş Oluşturr
                        </Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    );
};

export default CreateBill;
