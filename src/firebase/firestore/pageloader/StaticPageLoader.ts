import * as firebase from 'firebase/app';
import { BasePageLoader } from './BasePageLoader';
import { LoadStaticPage as LoadFirstPage } from './LoadFirstPage';
import { LoadStaticPage as LoadNextPage } from './LoadNextPage';
import { LoadStaticPage as LoadPreviousPage } from './LoadPreviousPage';
import { LoadStaticPage as LoadCurrentPage } from './LoadCurrentPage';


export class StaticPageLoader extends BasePageLoader {

    loadFirstPage(): Promise<firebase.firestore.DocumentData[]> {

        return LoadFirstPage(this);
    }

    loadNextPage(): Promise<firebase.firestore.DocumentData[]> {

        if (this.pageIndex == null) {
            return LoadFirstPage(this);
        }

        return LoadNextPage(this);
    }

    loadPreviousPage(): Promise<firebase.firestore.DocumentData[]> {

        if ((this.pageIndex == null) || (this.pageIndex === 1)) {
            return LoadFirstPage(this);
        }

        return LoadPreviousPage(this);
    }

    loadCurrentPage(): Promise<firebase.firestore.DocumentData[]> {

        if ((this.pageIndex == null) || (this.pageIndex === 0)) {
            return LoadFirstPage(this);
        }

        return LoadCurrentPage(this);
    }
}