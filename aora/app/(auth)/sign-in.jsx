import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router'
import { createUser, getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const SignIn = () => {

  const {setUser,setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if( form.email === "" || form.password === ""){
      Alert.alert('error',"please fill the required field")

    setIsSubmitting(true)
    }
    try{
      await signIn(form.email,form.password)
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)
      router.replace("/home")

    }catch(error){
      Alert.alert('error',error.message)
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full  justify-center px-4 my-7">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold text-2xl mt-10"
          >
            Log in To AORA</Text>
        </View>
        <FormField
          title="Email"
          value={form.email}
          handleChange={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"

        />

        <FormField
          title="Password"
          value={form.password}
          handleChange={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
          

        />
        <CustomButton
          title="Sign In"
          handlePress={handleSubmit}
          containerStyles="w-full mt-12 bg-secondary-100 rounded-xl min-h-[62px]"
          isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-200 font-pbold">Don't have an Account?</Text>
          <Link href="/sign-up" className="text-lg font-pextrabold text-secondary-200">Sign Up</Link>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn