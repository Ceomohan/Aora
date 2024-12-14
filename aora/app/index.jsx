import { Image, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Link,Redirect,router } from 'expo-router'
import "../global.css"
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../constants"
import CustomButton from "../components/CustomButton"

import {StatusBar} from "expo-status-bar"
import { useGlobalContext } from '../context/globalProvider'



const index = () => {

    const {isLoading,isLoggedIn}= useGlobalContext()

    if(!isLoading && isLoggedIn) return <Redirect href="/home" />

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-pbold text-center">
                            Discover Endless{"\n"}
                            Possibilities with{" "}
                            <Text className="text-secondary-200 ">Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2  -right-8"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-sm font-pregular text-center text-gray-100 mt-7">
                        Where creativity Meets Innovation: Embark on The Journey of Creativity With Aora
                    </Text>

                    <CustomButton 
                    title="Continue With Email"
                    handlePress={()=>router.push('/home')}
                    containerStyles="w-full mt-12 bg-secondary-100 rounded-xl min-h-[62px]"
                    />
                    
                </View>
            </ScrollView>
           <StatusBar 
           backgroundColor="#161622"
           style="light"
           />
        </SafeAreaView>
    )
}

export default index