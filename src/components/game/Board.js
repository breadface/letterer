import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'

import DraggableTile from './DraggableTile'

const { width, height } = Dimensions.get('window')
const letters = 'abcdefghijklmnopqrstuvwxyz'
const letterList = letters.split('').map(letter => {
  return {
    letter,
    done: null
  }
})
const randomLetter = ['', letters.substr(Math.floor(Math.random() * 26), 1), '']

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
    const dropzoneValues = []
    const handleRelease = draggedTile => cordinates => {
      console.log('moved cordinates', cordinates, draggedTile)
    }

    const updateDropzoneLayout = index => ref => {
      if (ref === null || index ===  1)
        return

      setTimeout(() => {
        ref.measure((ox, oy, refWidth, refHeight, x, y) => {
          dropzoneValues.push({
            layout: { x, y, width: refWidth, height: refHeight }
          })
        })
      })
    }

    const tiles = letterList.map((value, index) =>
      <DraggableTile
        key={index}
        letter={value.letter}
        position={value.done || calculatePosition(index)}
        onRelease={handleRelease(value.letter)}
      />
    )

    const dropZone = randomLetter.map((value, index) => {
      return (
        <View key={index}>
          <Text>{value}</Text>
        </View>
      )
    })

    return (
      <View style={boardStyle.container}>
        { dropZone }
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
