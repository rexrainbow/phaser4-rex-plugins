import * as firebase from 'firebase/app';
import { BaseUpdater } from './BaseUpdater';
import { RowUpdater } from './RowUpdater';


export class PageUpdater extends BaseUpdater {

    startUpdate() {

        this.rootRef.on('child_added', this.addPage, this);
        this.rootRef.on('child_removed', this.removePage, this);
        return this;
    }

    stopUpdate() {

        this.rootRef.off('child_added', this.addPage, this);
        this.rootRef.off('child_removed', this.removePage, this);
        return this;
    }

    addPage(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key,
            value = snapshot.val();

        this.setData(key, value);

        this.emit(this.eventNames.addkey0, key, value);
    }

    removePage(
        snapshot: firebase.database.DataSnapshot
    ) {

        const key = snapshot.key;

        this.removeChild(key);

        this.emit(this.eventNames.removekey0, key);
    }

    get childClass() {
        return RowUpdater;
    }
}