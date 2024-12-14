import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/globalProvider'

const Home = () => {


  const {data:posts,refetch} = useAppwrite(getAllPosts)
  const {data: latestPosts } = useAppwrite(getLatestPosts)
  const [refreshing,setRefreshing] = useState(false)
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  

 
  
  const onRefresh = async ()=>{
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
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
          <View className="my-12 px-4 space-y-5">
            <View className="justify-between items-start flex-row ">
              <View>
                <Text className="text-2xl font-pextrabold text-gray-400">Welcome Back</Text>
                <Text className="text-3xl font-pregular text-blue-400">{user?.username}</Text>
              </View>
              <View>
                <Image
                  source={images.logo}
                  className="w-5 h-6"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-white font-plight text-lg">Trending Videos</Text>
            </View>
            <Trending posts={ latestPosts ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload the video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

    </SafeAreaView>
  )
}

export default Home