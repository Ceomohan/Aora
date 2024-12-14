import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const SignUp = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('error', "please fill the required field")

      setIsSubmitting(true)
    }
    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result)
      setIsLoggedIn(true)
      router.replace("/home");

    } catch (error) {
      Alert.alert('error', error.message)
    } finally {
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

          <FormField
            title="Username"
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
          />
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
            <Text className="text-lg text-gray-200 font-pbold">Already have an Account?</Text>
            <Link href="/sign-in" className="text-lg font-pextrabold text-secondary-200">Sign In</Link>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp