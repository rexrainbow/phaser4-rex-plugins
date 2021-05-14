import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { Text } from '@phaserjs/phaser/gameobjects';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Keyboard } from '@phaserjs/phaser/input';
import { On, Off } from '@phaserjs/phaser/events';

import { Quest } from '../../src';

const csvString = `type,name
q,Q0
,Z
,X
,C
q,Q1
,Z
,X
,C
q,Q2
,Z
,X
,C`;

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
        const quest = new Quest.Quest({ questions: csvString },
            { shuffleQuestions: true, shuffleOptions: true });

        // Quest result
        const answers = new Map();

        // Register input event
        const KeyMap = ['Z', 'X', 'C', 'V'];
        const keyDownEventInstance = On(keyboard, 'keydown', function (event: KeyboardEvent) {

            const keyName = event.key.toUpperCase();
            const question = quest.getQuestion();
            const options = question.options;
            let selectedOptions;
            for (let i = 0, cnt = options.length; i < cnt; i++) {
                const option = options[i];
                if (option.name === keyName) {
                    selectedOptions = option;
                    break;
                }
            }

            if (selectedOptions) {
                answers.set(question.name, selectedOptions.name);
                print.text += `${selectedOptions.name}\n`;

                if (quest.isLastQuestion) {

                    Off(keyboard, 'keydown', keyDownEventInstance); // Turn off keydown event

                    const s = ['Result:'];
                    for (const [name, value] of answers) {
                        s.push(`- ${name}:${value}`)

                    }
                    print.text += s.join('\n');
                } else {
                    quest.next();
                }
            }
        })

        quest
            .on('quest', function (question: { [name: string]: any }) {

                // Show question and options
                const options = question.options;
                print.text += `${question.name}:${options[0].name}, ${options[1].name}, ${options[2].name} ? `;

                // TODO: Register keydown event (Once) during this QuestEvent
            })
            .next();
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);