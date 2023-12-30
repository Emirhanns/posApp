import React from 'react'
import { Card, Avatar } from "antd"

const { Meta } = Card

const StatsCard = ({ title, amount, img }) => {
    return (

        <>
            <div>
                <Card className='w-60 mt-4 bg-black title-white'>
                    <Meta
                        avatar={<Avatar src={img} className='w-full rounded' />}
                        title={<span className='text-white'>{title}</span>}
                        description={<span className='text-white'>{amount}</span>}
                    />
                </Card>
            </div>
        </>
    )

}


export default StatsCard
