import * as firebase from 'firebase/app';
import { BasePageLoader } from './BasePageLoader';
import { LoadStaticPage as LoadFirstPage } from './LoadFirstPage';
import { LoadStaticPage as LoadNextPage } from './LoadNextPage';
import { LoadStaticPage as LoadPreviousPage } from './LoadPreviousPage';
import { LoadStaticPage as LoadCurrentPage } from './LoadCurrentPage';


export class StaticPageLoader extends BasePageLoader {

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