import { Button, Card, Form, Input, message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../pages/redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            console.log("a",cart.total)

            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    subTotal: cart.total,
                    tax: ((cart.total * cart.tax) / 100).toFixed(2),
                    TotalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems: cart.cartItems,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            if (res.status === 200) {
                message.success("Fatura başarıyla oluşturuldu.");
                dispatch(reset());
                navigate("/bills");
            }
        } catch (error) {
            message.danger("Bir şeyler yanlış gitti.");
            console.log(error);
        }
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
                    name="CustomerName"
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
                    name="CustomerNumber"
                    label="Tel No"
                >
                    <Input placeholder="Bir Tel No Yazınız" maxLength={11} />
                </Form.Item>
                <Form.Item
                    label="Ödeme Yöntemi"
                    name="PaymentMode"
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
                        <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV Toplam {cart.tax}</span>
                        <span className="text-red-600">
                            {(cart.total * cart.tax) / 100 > 0
                                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                : 0}
                            ₺
                        </span>                    </div>
                    <div className="flex justify-between">
                        <b>Genel Toplam</b>
                        <b>
                            {cart.total + (cart.total * cart.tax) / 100 > 0
                                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                : 0}
                            ₺
                        </b>                       
                    </div>
                    <div className="flex justify-end">
                        <Button
                            id="modalButton"
                            className="mt-4"
                            type="primary"
                            htmlType="submit"
                            disabled={cart.cartItems.length === 0}
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
