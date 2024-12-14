import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(
    () => searchPosts(query)
  )


  useEffect(() => {
    refetch()
  }, [query])



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
          <View className="my-12 px-4">
            <Text className="text-2xl font-pextrabold text-gray-400">Search Results</Text>
            <Text className="text-3xl font-pregular text-blue-400">{query}</Text>
            <View className="mt-6 px-4">
              <SearchInput initialQuery={query} />
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