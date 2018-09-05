# Connect4
Text Console-based Connect Four classic game

Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping one colored disc from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. (https://en.wikipedia.org/wiki/Connect_Four)

## Environment
- Ubuntu -> use terminal
- MacOS -> use terminal
- Windows -> command prompt

Make sure you've Node.js 8.0 version and yarn installed in your system

## Configuration and dependency
Windows
1. Open command prompt / cmd
2. Make sure you've Node.js 8.0 and above installed. see `https://nodejs.org/en/`
3. Download / clone game github link `https://github.com/frendable/connect4` (ie: `git clone git@github.com:frendable/connect4.git`)
4. Change directory to "connect4" folder you have cloned
5. You must install all dependency using `yarn`. see `https://yarnpkg.com/en/docs/install#windows-stable`
6. Install grunt locally using `yarn global add grunt`

Ubuntu / MacOS
1. Open command prompt / cmd
2. Make sure you've Node.js 8.0 and above installed. see `https://nodejs.org/en/`
3. Download / clone game github link `https://github.com/frendable/connect4` (ie: `git clone git@github.com:frendable/connect4.git`)
4. Change directory to "connect4" folder you have cloned (ie: `cd /connect4`)
5. You must install all dependency using `yarn`. see `https://yarnpkg.com/en/docs/install`
6. Install grunt locally using `yarn global add grunt`

## How to start
1. Open cmd / terminal
2. Type `yarn compile` to build the game
3. Type `yarn start` to start the game

## Gameplay
Main Menu Page

<img src="https://user-images.githubusercontent.com/13958277/45070654-b8f08480-b115-11e8-9c46-a7fac862dbef.png" width="400px" />

In Game Page

<img src="https://user-images.githubusercontent.com/13958277/45070968-6021eb80-b117-11e8-955a-740e05100245.gif" width="400px" />

## Test instruction
Using jest testing framework (`https://jestjs.io/`)
Type `yarn test` in your terminal/cmd

## Architecture
Using MVC architecture and SOLID principle (First Five Principle Of Object Oriented) by Uncle Bob
https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod

## AI Algorithm
Using minmax alpha beta pruning algorithm
https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning

## Whats next ?
Using javascript language for Object Oriented Design architecture is really painful when we still use object prototype inheritance. But after ES2015/ES6 is launched, we can use some new beautiful syntax (ie: import, class, export, etc) and it makes development Object Oriented Design easier than before.

This project is using ES2015/ES6, but still has a restriction like the absent feature of the interface, and access modifier like in another programming language (java). So next thing to improve is refactoring all javascript code to typescript
