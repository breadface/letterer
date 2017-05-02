import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'

import DraggableTile from './DraggableTile'

const { width, height } = Dimensions.get('window')
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
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
  let x = (index % 6) * boxWidth
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
    console.log(randomLetter, 'randomLetter')
    return (
      <View style={boardStyle.container}>
        <View style={boardStyle.dropZone}>
          {
            randomLetter.map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    width: width/6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: width/6,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                >
                  <Text
                    children={value}
                  />
                </View>
              )
            })
          }
        </View>
        <View style={{
          position: 'absolute',
          left: 0,
          top: height - ((width/6)*5),
        }}>
          {
            letterList.map((value, index) =>
              <DraggableTile
                key={index}
                letter={value.letter}
                position={value.done || calculatePosition(index)}
                onRelease={handleRelease(value.letter)}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const boardStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZone: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    marginBottom: 200,
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


export default Board
