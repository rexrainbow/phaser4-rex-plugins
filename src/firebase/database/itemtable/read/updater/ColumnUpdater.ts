import * as firebase from 'firebase/app';
import { BaseUpdater } from './BaseUpdater';
import { TableType } from '../../Types';


export class ColumnUpdater extends BaseUpdater {

    startUpdate() {

        this.rootRef.on('child_added', this.addCol, this);
        this.rootRef.on('child_removed', this.removeCol, this);
        this.rootRef.on('child_changed', this.changeColValue, this);
        return this;
    }

    stopUpdate() {

        this.rootRef.off('child_added', this.addCol, this);
        this.rootRef.off('child_removed', this.removeCol, this);
        this.rootRef.off('child_changed', this.changeColValue, this);
        return this;
    }

    addCol(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key,
            value = snapshot.val();

        this.setData(key, value);

        switch (this.type) {
            case TableType['1d']:
                this.emit(this.eventNames.addkey0, key, value);
                break;
            case TableType['2d']:
                this.emit(this.eventNames.addkey1, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.addkey2, this.pageKey, this.key, key, value);
                break;
        }
        this.emit(this.eventNames.update, this.table.data);
    }

    removeCol(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key;

        this.removeChild(key);

        switch (this.type) {
            case TableType['1d']:
                this.emit(this.eventNames.removekey0, key);
                break;
            case TableType['2d']:
                this.emit(this.eventNames.removekey1, this.key, key);
                break;
            default: // 3
                this.emit(this.eventNames.removekey2, this.pageKey, this.key, key);
                break;
        }
        this.emit(this.eventNames.update, this.table.data);
    }

    changeColValue(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key,
            value = snapshot.val();

        this.setData(key, value);

        switch (this.type) {
            case TableType['1d']:
                this.emit(this.eventNames.changekey0, key, value);
                break;
            case TableType['2d']:
                this.emit(this.eventNames.changekey1, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.changekey2, this.pageKey, this.key, key, value);
                break;
        }
        this.emit(this.eventNames.update, this.table.data);
    }

    get pageKey() {
        return this.parent.key;
    }

}