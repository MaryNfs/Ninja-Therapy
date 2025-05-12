# Ninja Therapy - Modular Version

This is a modularized version of the Ninja Therapy game. The original game was contained in a single large JavaScript file (`all.js`), which made it difficult to maintain and extend. This modular version splits the code into separate files, making it easier to understand, maintain, and extend.

## Modularization Process

The modularization process involved:

1. Creating a simple AMD-like module system in `main-modular.js`
2. Extracting each module from the original `all.js` file into its own file
3. Ensuring each module properly exports its functionality
4. Creating a new HTML file (`index-modular.html`) that loads all the modules in the correct order
5. Starting the game with the `startModule` function

## File Structure

The modular version has the following structure:

- `main-modular.js` - Initializes the module system and provides define/require functions
- `lib/` - Library modules
  - `buzz.js` - Audio library
  - `sound.js` - Sound effects
  - `tween.js` - Animation tweening functions
  - `ucren.js` - Utility functions
- `factory/` - Factory modules for creating game objects
  - `displacement.js` - Creates displacement animations
  - `fruit.js` - Creates fruit objects
  - `juice.js` - Creates juice effects
  - `rotate.js` - Creates rotation animations
- Game modules
  - `collide.js` - Collision detection
  - `control.js` - User input handling
  - `game.js` - Game logic
  - `layer.js` - Layer management
  - `main.js` - Main game initialization
  - `message.js` - Message passing system
  - `sence.js` - Scene management
  - `state.js` - Game state management
  - `timeline.js` - Animation timeline
  - `tools.js` - Utility functions
- `main-modular.js` - Entry point for the modular version
- `index-modular.html` - HTML file for the modular version

## How to Use

To use the modular version:

1. Open `index-modular.html` in a web browser
2. The game will load and start automatically

## Benefits of Modularization

- **Improved maintainability**: Each module has a single responsibility, making it easier to understand and modify
- **Better organization**: Related code is grouped together in logical modules
- **Easier debugging**: Issues can be isolated to specific modules
- **Better reusability**: Modules can be reused in other projects
- **Easier extension**: New features can be added by creating new modules or extending existing ones

## Original vs. Modular

The original version (`all.js` and `index.html`) is still available and works exactly the same as the modular version. The modular version is functionally identical but with a more maintainable code structure.
