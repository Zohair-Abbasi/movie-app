import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface SearchBarProps {
    placeholder: string
    onPress?: () => void
    value?: string
    onChangeText?: (text: string) => void
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: SearchBarProps) => {
    return (
        <View className='flex flex-row items-center bg-dark-200 rounded-full px-5 py-3'>
            <Image
                source={icons.search}
                className='size-5'
                resizeMode='contain'
                tintColor={"#ab8bff"}
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={"#616b87"}
                className='flex-1 ml-2 text-white'
            />
        </View>
    )
}

export default SearchBar