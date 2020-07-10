import * as firebase from 'firebase/app';
import { IHeader } from './IFile';

export let DocToHeader = function (doc: firebase.firestore.DocumentData) {
    let header = doc.data() as IHeader;
    header.headerDocID = doc.id;
    return header;
}