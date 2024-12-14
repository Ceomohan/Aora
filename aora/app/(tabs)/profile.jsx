import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import  { useGlobalContext } from '../../context/globalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Search = () => {

  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts } = useAppwrite(
    () => getUserPosts(user.$id)
  )
  const logout = async () => {
      await signOut()
      setUser(null)
      setIsLoggedIn(false)
      //There is a differece between router.push and router.replace the push will just navigate to the page it is said to push and will be in the same page whenever reload happens and in the replace it will entirely replace the page with anoter page that is navigated
      router.replace('/sign-in')
   }






  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text>
            <VideoCard video={item} />
          </Text>
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className='w-6 h-6'
              />
            </TouchableOpacity>
            {/* this field is  For the user avatar on the profile  */}
            <View className="w-16 h-16 rounded-xl justify-center items-center border border-secondary ">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              textStyles="text-xl"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                textStyles="text-lg"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                textStyles="text-xl"
              />
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No Videos found for the search result"
          />
        )}

      />

    </SafeAreaView>
  )
}

export default Search