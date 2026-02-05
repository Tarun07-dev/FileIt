import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { router, useNavigation } from 'expo-router'
const BackButton = () => {

  return (
    <TouchableOpacity onPress={() => router.back()} className="bg-white flex justify-center items-center rounded-full h-8 w-8">
        <ChevronLeftIcon size={30} color="black" />
    </TouchableOpacity>
  ) 
}

export default BackButton