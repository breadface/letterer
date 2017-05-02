import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'

import DraggableTile from './DraggableTile'
const { width, height } = Dimensions.get('window')

type Position = {
  x: number,
  y: number
}

const DISTANCE = 10
const calculatePosition = (index: number): Position => {
  let boxWidth = width / 6
  let x = (index % 6) * boxWidth
  let y = Math.floor(index / 6) * boxWidth

  return { x, y }
}

class Board extends Component {
  render() {
    let { randomLetter, letters, onRelease } = this.props
    const dropzoneValues = []
    const handleRelease = draggedTile => tileCordinates => {
      let closeMatch = dropzoneValues.find(zone => {
        let xDiff = Math.abs(zone.layout.x - tileCordinates.x)
        let yDiff = Math.abs(zone.layout.y - tileCordinates.y)
        return (
          xDiff < DISTANCE && yDiff < DISTANCE
        )
      })
      if(closeMatch) {
        onRelease(draggedTile, closeMatch.layout)
      }
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
                  ref={updateDropzoneLayout(index)}
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
            letters.map((tile, index) =>
              <DraggableTile
                key={index}
                letter={tile.letter}
                position={tile.done || calculatePosition(index)}
                onRelease={handleRelease(tile)}
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
