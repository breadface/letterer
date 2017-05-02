import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Board from './components/game/Board'


const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class Letterer extends Component {
  constructor(props){
    super(props)

    this.state = {
      letters: words.split('').map(letter => {
        return {
          letter,
          done: null
        }
      })
    }
  }

  render() {
    let { letters } = this.state
    const randomLetter = ['', words.substr(Math.floor(Math.random() * 26), 1), '']
    let updateWordsDone = (draggedTile, endPosition) => {
       this.setState({
         letters: letters.map(tile => {
           return draggedTile !== tile ? tile : {
             ...tile,
             done: endPosition
           }
         })
       })
    }

    return (
      <Board
        letters={letters}
        randomLetter={randomLetter}
        onRelease={updateWordsDone}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  }
})

export default Letterer
