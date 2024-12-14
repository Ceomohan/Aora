import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subTitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                style={{width:270,height:215}}
                resizeMode='contain'
            />
            <View>
                <Text className="text-xl font-pextrabold text-gray-400 text-center">{title}</Text>
                <Text className="text-lg font-pregular text-blue-400">{subTitle}</Text>
            </View>
            <CustomButton 
            title="Create Video"
            handlePress={()=>router.push("/create")}
            containerStyles="w-full mt-12 bg-secondary-100 rounded-xl min-h-[62px]"
            />
        </View>
    )
}

export default EmptyState