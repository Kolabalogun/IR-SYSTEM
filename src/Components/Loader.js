import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text>Submitting Report...</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "rgb(240, 248, 255)",

    alignItems: 'center',
    justifyContent: 'center',
    
 
    padding: 20,
  
  },
})