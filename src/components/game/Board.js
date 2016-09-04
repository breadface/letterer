import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Dimensions from 'Dimensions'

import DraggableTile from './DraggableTile'

const { width, height } = Dimensions.get('window')
let letters = 'abcdefghijklmnopqrstuvwxyz'
const letterList = letters.split('').map(letter => {
  return {
    letter,
    done: null
  }
})

type Position = {
  x: number,
  y: number
}

const calculatePosition = (index: number): Position => {
  let boxWidth = width / 6

  /*
    calculate the x position of the tiles - maps [0,1,2,3,4,5,6,7,8,9,10,11,12] to
    [0,1,2,3,4,5,0,1,2,3,4,5,0]
  */
  let x = (index % 6) * boxWidth

  /*
    calculate the y position of the tiles - maps [0,1,2,3,4,5,6,7,8,9,10,11,12] to
    [0,0,0,0,0,0,1,1,1,1,1,1]
  */
  let y = Math.floor(index / 6) * boxWidth

  return { x, y }
}

class Board extends Component {
  render() {
    let tiles = letterList.map((value, index) =>
      <DraggableTile
        key={index}
        letter={value.letter}
        position={value.done || calculatePosition(index)}
      />
    )

    return (
      <View style={boardStyle.container}>
        { tiles }
      </View>
    )
  }
}

const boardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  }
})


export default Board
