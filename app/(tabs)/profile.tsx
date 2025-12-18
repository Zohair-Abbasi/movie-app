import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
    return (
        <View className='bg-primary flex-1'>
            <View className='flex justify-center items-center flex-1 flex-col gap-5 px-10'>
                <Image
                    source={icons.person}
                    className='size-10'
                    tintColor='#ffffff'
                />
                <Text className='text-gray-500 text-base'>Profile</Text>
            </View>
        </View>
    )
}

export default profile