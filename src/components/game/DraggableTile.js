import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native'

import shallowequal from 'shallowequal'

const { width, height } = Dimensions.get('window')

type Props = {
  letter: string,
  position: number
}

class DraggableTile extends Component {
  props: Props

  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      opacity: 1,
      initialPosition: this.props.position
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y

      }]),
      onPanResponderGrant: (evt, gestureState) => {
        //change the opacity of the tile being moved
        this.setState({ opacity: 0.8 })
      },
      onPanResponderRelease: (evt, gestureState) => {
        let { nativeEvent: { locationX, locationY } } = evt
        let { moveX, moveY } = gestureState

        const cordinates = {
          x: moveX - locationX,
          y: moveY - locationY
        }

        this.setState({opacity: 1})
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 }
        }).start()

        //pass cordinates back to calculate position of moved tile
        this.props.onRelease(cordinates)
      }
    })
  }

  componentWillReceiveProps(nextProps){
    let { initialPosition } = this.state

    if(!shallowequal(nextProps.position, this.props.position)){
      console.log("true for ", nextProps.position)
      Animated.spring(this.state.pan, {
        toValue: {
          x: nextProps.position.x - initialPosition.y,
          y: nextProps.position.y - initialPosition.x
        }
      }).start()
    }

  }

  render() {
    let { letter } = this.props
    let { opacity, pan, initialPosition } = this.state
    return (
      <View
        style={ [
            tileStyle.container, {
              position: 'absolute',
              top: initialPosition.y,
              left: initialPosition.x
            }
          ]
        }
      >
        <Animated.View
          { ...this.panResponder.panHandlers }
          style={
            [pan.getLayout(), tileStyle.tile, { opacity }]
          }
          onLayout={e => {
            let { layout } = e.nativeEvent
            this.tileLayout = layout
          }}
        >
          <Text style={tileStyle.text}>{letter}</Text>
        </Animated.View>
      </View>
    )
  }
}

const tileStyle = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 6,
    height: width / 6,
    backgroundColor: '#E7D299',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 25,
  },
})

export default DraggableTile
