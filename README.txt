20191101

running at bilo.online

#/Game/guidedBuild.js…
	Example code for games
#Ble.js
	BLE code and the protocol for the base
#World.js
	Interface to the world (the blocks added to the base, the base, the compass.. )
#Settings.js
	Configuration of the gui menus - a new game needs to be added here to show up in the menu
#Block.js
	Classes that contains attributes for the basic elements (block2x2, block2x4, blockpixel, shadow..) and functions to convert and do operations on these (calculate intersection.. ) 
#Mesh.js
	Classes that can display Block.js classes
#Meshes.js
	Generation of the meshes used in Mesh.js
#Game.js
	General functions for games (show transparent blocks, show shadows, level menu, win animation…)
#Camera.js
	Functions to manipulate the camera
#Gui.js
	The 2D gui elements
#Sound.js
	Functions for the sound
#Database.js
	Connection to Firebase, to store user created levels etc.