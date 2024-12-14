import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import {Video,resizeMode} from "expo-av"

const ZoomIn = {
  0:{
    scale:0.9
  },
  1:{
    scale:1
  }
}
const ZoomOut = {
  0:{
    scale:1
  },
  1:{
    scale:0.9
  }
}

const TrendingItem = ({activeItem,item})=>{

  const [play,setPlay] = useState(false)
  return (
    <Animatable.View
    className="mr-5"
    animation={activeItem.$id === item.$id ? ZoomIn : ZoomOut}
    duration={500}
    >
      {
        play ? (
        <Video 
        source={{uri:item.Video}}
        className="w-52 h-72 rounded-[35px] mt-6 bg-white/10"
        shouldPlay
        useNativeControl  // this one is for the video controls like full screen pause etc..,
        onPlaybackStatusUpdate={(status)=>{
          if(status.didJustFinish){
            setPlay(false)
          }
        }}
        
        />
      
      ) :(
          <TouchableOpacity className="relative justify-cente items-center" activeOpacity={0.7} onPress={()=>setPlay(true)}>
            <ImageBackground 
            source={{uri:item.thumbnail}}
            className="w-57 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
            resizeMode='cover'
            />


          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const Trending = ({posts}) => {

  const [activeItem,setActiveItem]=useState(posts[0])

  const viewableItemsChanged = ({viewableItems})=>{
    if(viewableItems.length > 0 ){
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList 
     data={posts}
     keyExtractor={(item)=>item.$id}
     renderItem={({item})=>(
        <TrendingItem  activeItem={activeItem} item={item} />
     )}
     onViewableItemsChanged={viewableItemsChanged}
     viewabilityConfig={{itemVisiblePercentThreshold:70}}
     contentOffset={{x:170}}
     horizontal
    />
  )
}

export default Trending