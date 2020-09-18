import { Container } from '@phaserjs/phaser/gameobjects';
import { IChild } from '../util/IChild';

export class Space extends Container implements IChild {
    type: 'rexSpace';
    isRexSpace: true;
}