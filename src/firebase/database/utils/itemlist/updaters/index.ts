import { Updater as UpdateOnce } from './UpdateOnce';
import { Updater as UpdateChild } from './UpdateChild';
import { Updater as UpdateAll } from './UpdateAll';
import { UpdateMode, UpdaterType } from '../IItemList';

export const Updaters: { [mode: number]: UpdaterType } = {};
Updaters[UpdateMode.all] = UpdateAll;
Updaters[UpdateMode.child] = UpdateChild;
Updaters[UpdateMode.once] = UpdateOnce;