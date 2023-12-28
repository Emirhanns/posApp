import React from 'react'
import {Card,Avatar} from "antd"

const {Meta} = Card

const StatsCard = ({title,amount,img}) => {
    return (

            <Card className='w-72 mt-4 bg-black title-white'>
                <Meta
                    avatar={<Avatar src={img} className='w-full rounded'  />}
                    title={<span className='text-white'>{title}</span>}
                    description={<span className='text-white'>{amount}</span>}
                />
            </Card>
        )

}

export default StatsCard