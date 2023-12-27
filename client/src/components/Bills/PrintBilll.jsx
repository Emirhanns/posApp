import { Button, Modal } from "antd";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

    return (
        <Modal
            title="Fatura Yazdır"
            open={isModalOpen}
            footer={false}
            onCancel={() => setIsModalOpen(false)}
            width={600}
        >

            <section className="py-20 bg-black">

                <div className="max-w-7xl mx-auto bg-white px-6">
                    <article className="overflow-hidden">
                        <div className="logo my-6">
                            <h2 className="text-4xl font-bold">LOGO</h2>
                        </div>
                        <div className="bill-details">
                            <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                                <div className="text-md text-slate-500">
                                    <p className="font-bold">Fatura Detayı: </p>
                                    <p>Fake Street</p>
                                    <p>Fake build</p>
                                    <p>Fake number</p>
                                </div>

                                <div className="text-md text-slate-500">
                                    <p className="font-bold">Fatura: </p>
                                    <p>Fake Street</p>
                                    <p>Fake build</p>
                                    <p>Fake number</p>
                                </div>

                                <div className="text-slate-500 ">
                                    <div>
                                        <p className="font-bold">Fatura Numarası: </p>
                                        <p>00041</p>
                                    </div>
                                    <div>
                                        <p className="font-bold mt-2">Veriliş Tarihi: </p>
                                        <p>Fake number</p>
                                    </div>

                                </div>

                                <div className="text-md text-slate-500 text-end sm:block hidden">
                                    <p className="font-bold">Şartlar: </p>
                                    <p>10 Gün</p>
                                    <p className="font-bold">Vade: </p>
                                    <p>2023-12-30</p>
                                </div>
                            </div>
                        </div>

                        <div className="bill-table-area mt-8">
                            <table className="min-w-full divide-y divide-slate-500 overflow-hidden tabe">
                                <thead>
                                    <tr className="justify-around">
                                        <th scope="col" className="py-3.5 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0" >Başlık</th>
                                        <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Fiyat</th>
                                        <th scope="col" className="py-3.5 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Adet</th>
                                        <th scope="col" className="py-3 text-right text-sm font-normal text-slate-700 sm:pl-6 md:pl-0" colSpan={3}>Toplam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-500">
                                        <td className="py-4 sm:table-cell ">
                                            <div className="flex flex-col">
                                                <span className="font-medium">Mandalina</span>
                                                <span className="sm:hidden inline-block text-xs">
                                                    Birim Fiyatı 5₺
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 text-center sm:table-cell hidden">
                                            <span className="sm:hidden">20 TL</span>
                                        </td>
                                        <td className="py-4 text-center sm:table-cell hidden">
                                            <span>3</span>
                                        </td>
                                        
                                        <td className="py-4 pr-3 text-end" colSpan={3}>
                                            <span>60 TL</span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-500">
                                    <td className="py-4 sm:table-cell ">
                                            <div className="flex flex-col">
                                                <span className="font-medium">Mandalina</span>
                                                <span className="sm:hidden inline-block text-xs">
                                                    Birim Fiyatı 5₺
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center sm:table-cell hidden">
                                            <span>20 TL</span>
                                        </td>
                                        <td className="py-4 text-center sm:table-cell hidden">
                                            <span>3</span>
                                        </td>
                                        <td className="py-4 pr-3 text-end"colSpan={3}>
                                            <span>60 TL</span>
                                        </td>
                                    </tr>


                                </tbody>
                                <tfoot className="py-4">
                                    <tr>
                                        <th className="sm:text-right text-left pt-6 font-normal" colSpan={3} scope="row">Ara Toplam</th>
                                        <th className="text-right pt-6 font-normal" scope="row">60 TL</th>
                                    </tr>
                                    <tr>
                                        <th className="sm:text-right text-left pt-6 font-normal" colSpan={3} scope="row">KDV</th>
                                        <th className="text-right pt-6 font-normal" scope="row">6 TL</th>
                                    </tr>
                                    <tr>
                                        <th className="sm:text-right text-left pt-6 font-normal" colSpan={3} scope="row">Toplam</th>
                                        <th className="text-right pt-6 font-normal" scope="row">66 TL</th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="py-9 border-t pt-9 mt-9 border-slate-500">
                                <p className="text-sm font-light text-slate-8">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat praesentium nihil neque illum ut velit voluptatem nesciunt culpa enim, voluptates error, soluta distinctio rerum accusamus. Deleniti a placeat magni ad!
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <div className="flex justify-end mt-4">
                <Button type="primary" size="large">Yazdır</Button>
            </div>

        </Modal >
    );
};

export default CreateBill;
