import * as firebase from 'firebase/app';
import { BasePageLoader } from './BasePageLoader';
import { LoadDynamicPage as LoadFirstPage } from './LoadFirstPage';
import { LoadDynamicPage as LoadNextPage } from './LoadNextPage';
import { LoadDynamicPage as LoadPreviousPage } from './LoadPreviousPage';
import { LoadDynamicPage as LoadCurrentPage } from './LoadCurrentPage';


export class DynamicPageLoader extends BasePageLoader {

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