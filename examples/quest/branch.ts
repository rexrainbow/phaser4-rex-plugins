import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { Text } from '@phaserjs/phaser/gameobjects';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Keyboard } from '@phaserjs/phaser/input';
import { On, Off } from '@phaserjs/phaser/events';

import { Quest } from '../../src';

/*
A --> |Z| B
A --> |X| C
B --> |Z| D
B --> |X| E
C --> |Z| F
C --> |X| G
D --> |Z| H
D --> |X| I
E --> |Z| J
E --> |X| K
F --> |Z| L
F --> |X| M
*/

const csvString = `type,key,next,end
q,A,,
,,B,
,,C,
q,B,,
,,D,
,,E,
q,C,,
,,F,
,,G,
q,D,,
,,H,
,,I,
q,E,,
,,J,
,,K,
q,F,,
,,L,
,,M,
q,G,,1
q,H,,1
q,I,,1
q,J,,1
q,K,,1
q,L,,1
q,M,,1`;

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);
        const print = new Text(0, 0, '', '20px monospace');
        print.setOrigin(0);
        print.lineSpacing = 8;
        AddChild(world, print);

        const keyboard = new Keyboard.Keyboard();

        // Create quest instance
        const quest = new Quest.Quest({ questions: csvString });

        // Register input event
        const KeyMap = ['Z', 'X', 'C', 'V'];
        const keyDownEventInstance = On(keyboard, 'keydown', function (event: KeyboardEvent) {

            const optionIdx = KeyMap.indexOf(event.key.toUpperCase());
            const question = quest.getQuestion();
            const selectedOptions = question.options[optionIdx];
            if (selectedOptions) {
                print.text += `${selectedOptions.next}\n`;
                quest.next(selectedOptions.next);
            }
        })

        // Register QuestEvent
        quest
            .on('quest', function (question: { [name: string]: any }) {

                if (question.end) {

                    print.text += `End at ${question.key}\n`;
                    Off(keyboard, 'keydown', keyDownEventInstance); // Turn off keydown event
                    return;
                }

                // Show question and options
                const options = question.options;
                print.text += `${question.key}: ${options[0].next}(Z), ${options[1].next}(X) ? `;

                // TODO: Register keydown event (Once) during this QuestEvent

            })
            .start()
            .next();
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);