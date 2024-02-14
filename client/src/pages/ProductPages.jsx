import React from 'react'
import Header from '../components/Header/Header'
import Edit from '../components/Products/Edit'

const ProductPages = () => {
  return (
    <>
    <Header />
    <div className='px-6'>
        <h1 className='text-xl font-bold text-center'>Ürünler</h1>
        <Edit />
    </div>
    </>
    )
}

export default ProductPages