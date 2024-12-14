import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,subtitle,containerStyles,textStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white font-psemibold ${textStyles} text-center`}>{title}</Text>
      <Text className="text-sm text-gray-100 text-center font-pbold">{subtitle}</Text>
    </View>
  )
}

export default InfoBox