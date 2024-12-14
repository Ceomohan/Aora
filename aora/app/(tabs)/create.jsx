import { View, Text,  ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from "../../components/FormField"
import {Video,ResizeMode} from 'expo-av'

const Create = () => {

  const [uploading,setUploading] = useState(false)
  const [form,setForm] = useState({
    title:'',
    video:null,
    thumbnail:null,
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-7">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <FormField 
        title="video title"
        value={form.title}
        placeholder="Give a title to your video here"
        handleChangeText={(e)=>setForm({...form,title:e})}
        
        />
        <View className="mt-7 space-y-6">
          <Text className="text-base font-psemibold text-gray-100">Upload Video</Text>
        </View>
        <TouchableOpacity>
          {form.video ? (
            <Video 

            />
          ):(
            <View className="w-full h-40 px-4 bg-black-100 rounded-xl justify-center items-center">
              <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                <Image />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create