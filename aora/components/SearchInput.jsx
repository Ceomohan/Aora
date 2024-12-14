import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import { icons, images } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}) => {
    
    const pathname = usePathname()
    const [query,setQuery] = useState(initialQuery || '')

    return (

        <View
            style={{
                backgroundColor: '#000000',
                borderWidth: 2,
                borderColor: '#333333',
                borderRadius: 16,
                paddingStart: 4,
                paddingHorizontal: 16,
                height: 64,


            }}

        >
            <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                onChangeText={(e)=>setQuery(e)}
                
            />

           <TouchableOpacity
           onPress={()=>{
             if(!query){
                Alert.alert('Missing query', "please input something to search across database ")
             }
             if(pathname.startsWith('/search'))router.setParams({query})
             else router.push(`/search/${query}`)
           }}
           >
            <Image 
             source={icons.search}
             className="w-5 h-5"
             resizeMode="contain"
            />
           </TouchableOpacity>
        </View>

    );
};

export default SearchInput ;
