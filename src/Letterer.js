import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Board from './components/game/Board'
import {withState} from 'recompose'

const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const spelt_word = ['', words.substr(Math.floor(Math.random() * 26), 1), ''].map(letter => letter);
const enhance = withState(
  'spelt_word', 
  'updateWordsDone', 
  spelt_word
);

const Letterer = enhance(({spelt_word, updateWordsDone}) => 
  <Board
    spelt_word={spelt_word}    
    onRelease={(draggedTile, position) => {
       updateWordsDone(spelt_word => spelt_word.map((tile, index) => {
         if (position === index) {
            return draggedTile
         } else {
           return tile
         }
       }))
    }}
  />
);


const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  }
})

export default Letterer
