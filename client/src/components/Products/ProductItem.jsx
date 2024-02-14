import React from 'react'

const ProductItem = ({item}) => {
  return (
<div className="bg-white rounded-lg overflow-hidden border-4" style={{width:"100%", height:"100%"}}>
          <img
            alt="example"
            src={item.img}
            className="w-full h-20 object-cover" // İstenilen yüksekliği ayarlayın (gerekirse ayarlayın)
            />
          <div className="p-1">
            <h3 className="text-sm font-bold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.price}TL</p>
          </div>
        </div>
          )
}

export default ProductItem