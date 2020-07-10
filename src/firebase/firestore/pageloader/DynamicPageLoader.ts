import * as firebase from 'firebase/app';
import { BasePageLoader } from './BasePageLoader';
import { LoadDynamicPage as LoadFirstPage } from './LoadFirstPage';
import { LoadDynamicPage as LoadNextPage } from './LoadNextPage';
import { LoadDynamicPage as LoadPreviousPage } from './LoadPreviousPage';
import { LoadDynamicPage as LoadCurrentPage } from './LoadCurrentPage';


export class DynamicPageLoader extends BasePageLoader {

    _loadFirstPage(): Promise<firebase.firestore.DocumentData[]> {

        return LoadFirstPage(this);
    }

    _loadNextPage(): Promise<firebase.firestore.DocumentData[]> {

        return LoadNextPage(this);
    }

    _loadPreviousPage(): Promise<firebase.firestore.DocumentData[]> {

        return LoadPreviousPage(this);
    }

    _loadCurrentPage(): Promise<firebase.firestore.DocumentData[]> {

        return LoadCurrentPage(this);
    }
}