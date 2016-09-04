import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import Dimensions from 'Dimensions'

const { width, height } = Dimensions.get('window')

type Props = {
  letter: string,
  position: number
}

class DraggableTile extends Component {
  props: Props

  render() {
    let { letter, position } = this.props
    return (
      <View style={[tileStyle.container, {
          top: position.y,
          left: position.x
      }]}>
        <View style={tileStyle.tile}>
          <Text>{letter}</Text>
        </View>
      </View>
    )
  }
}

const tileStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#E7D299'
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 6,
    height: width / 6,
  }
})

export default DraggableTile
