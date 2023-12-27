export const Categories = () => {
  return (
    
        <ul className='flex gap-2 md:flex-col overflow-y-auto text-md grid-cols-3' style={{ maxHeight: '75vh',paddingInline: '7px' }}>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Tümü</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Yiyecek</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>İçecek</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Meyve</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Sebze</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Sebze</span>
            </li>

            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Sebze</span>
            </li>


            <li className='bg-green-700 px-2 py-4 text-white  cursor-pointer hover:bg-blue-400 transition-all text-center'>
                <span>Sebze en alt</span>
            </li>

        </ul>


    
  )
}

export default Categories