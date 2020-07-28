import * as firebase from 'firebase/app';
import { BaseUpdater } from './BaseUpdater';
import { TableType } from '../../Types';
import { ColumnUpdater } from './ColumnUpdater';

export class RowUpdater extends BaseUpdater {

    startUpdate() {

        this.rootRef.on('child_added', this.addRow, this);
        this.rootRef.on('child_removed', this.removeRow, this);
        return this;
    }

    stopUpdate() {

        this.rootRef.off('child_added', this.addRow, this);
        this.rootRef.off('child_removed', this.removeRow, this);
        return this;
    }

    addRow(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key,
            value = snapshot.val();

        this.setData(key, value);

        switch (this.type) {
            case TableType['2d']:
                this.emit(this.eventNames.addkey0, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.addkey1, this.key, key, value);
                break;
        }
    }

    removeRow(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key;

        this.removeChild(key);

        switch (this.type) {
            case TableType['2d']:
                this.emit(this.eventNames.removekey0, key);
                break;
            default: // 3
                this.emit(this.eventNames.removekey1, this.key, key);
                break;
        }
    }

    get childClass() {
        return ColumnUpdater;
    }
}