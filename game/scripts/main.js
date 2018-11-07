/***
 * Specs Engine v6: Spectacles Saga Game Engine
  *           Copyright (c) 2018 Power-Command
***/

import { Console, Music, Scene } from '/game/lib/sphere-runtime.js';

import DayNightClock from './dayNightClock.js';
import TestHarness from './testHarness.js';
import TitleScreen from './titleScreen.js';

import './defineScenelets.js';

global.console =
	new Console({ hotKey: Key.Tilde });

export default
async function main()
{
	Dispatch.onRender(() => {
		Font.Default.drawText(Surface.Screen, 0, 0, `(${Mouse.Default.x},${Mouse.Default.y})`);
		Font.Default.drawText(Surface.Screen, 0, 12, `L: ${Mouse.Default.isPressed(MouseKey.Left)}`);
		Font.Default.drawText(Surface.Screen, 0, 24, `R: ${Mouse.Default.isPressed(MouseKey.Right)}`);
		Font.Default.drawText(Surface.Screen, 0, 36, `W: ${Mouse.Default.isPressed(MouseKey.Middle)}`);
	}, { priority: Infinity });

	Scene.defaultPriority = 99;

	console.defineObject('bgm', null, {
		'override'(fileName) { Music.override(fileName); },
		'pop'() { Music.pop(); },
		'play'(fileName) { Music.play(FS.fullPath(`${fileName}.ogg`, 'music')); },
		'push'(fileName) { Music.push(FS.fullPath(`${fileName}.ogg`, 'music')); },
		'reset'() { Music.reset(); },
		'stop'() { Music.override(null); },
		'volume'(value) { Music.adjustVolume(value); },
	});
	console.defineObject('yap', null, {
		'on'() {
			Sphere.Game.disableTalking = false;
			console.log("hey, so there's this talking pig behind you...");
		},
		'off'() {
			Sphere.Game.disableTalking = true;
			console.log("hooray! now everyone will shut up FOREVER.");
		},
	});

	await TestHarness.initialize();

	//await new TitleScreen().run();

	let dayNight = new DayNightClock();
	await TestHarness.run('rsb2');
}
