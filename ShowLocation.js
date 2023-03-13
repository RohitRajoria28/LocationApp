 
import React, { useState } from 'react';
import  {PropsWithChildren} from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
const ShowLocation = ({location}) => {
  return (
    <View>
      <Text>SHOW LOCATION</Text>
      <Text>{location}</Text>
     </View>
  )
}

export default ShowLocation