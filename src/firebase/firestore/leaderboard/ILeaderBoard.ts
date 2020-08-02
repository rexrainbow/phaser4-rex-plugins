import { IBase } from '../utils/IBase';

export type TimeFiltersType = {
    d?: boolean,
    w?: boolean,
    m?: boolean,
    y?: boolean
}

export type TimeFilterTypeString = 'd' | 'w' | 'm' | 'y';
export type TimeFilterTypeStringAlias = TimeFilterTypeString | 'day' | 'week' | 'month' | 'year';
export enum TimeFilterTypeStringAliasMap {
    d = 'd',
    w = 'w',
    m = 'm',
    y = 'y',
    day = 'd',
    week = 'w',
    month = 'm',
    year = 'y'
}

export type TimeDataType = {
    d: string,
    w: string,
    m: string,
    y: string
}

export enum TimeTagKeys {
    d = 'tagD',
    w = 'tagW',
    m = 'tagM',
    y = 'tagY'
}

export enum ScoreKeys {
    d = 'scoreD',
    w = 'scoreW',
    m = 'scoreM',
    y = 'scoreY'
}

export enum FullTimeName {
    d = 'day',
    w = 'week',
    m = 'month',
    y = 'year'
}

export interface IRecord {
    userID: string;
    userName?: string;
    boardID?: string;
    tag?: string;

    score?: number;
    tagD?: string;
    tagW?: string;
    tagM?: string;
    tagY?: string;
    scoreD?: number;
    scoreW?: number;
    scoreM?: number;
    scoreY?: number;

    // Other properties
    [name: string]: any;
};

export type UserInfoType = {
    userID: string,
    userName: string
}

// GetRank
export type RankResultType = {
    userID: string,
    rank: number
}

export interface IConfig {
    root?: string;
    userID?: string;
    userName?: string;
    boardID?: string;
    tag?: string;
    timeFilters?: boolean | TimeFiltersType;
    timeFilterType?: TimeFilterTypeStringAlias;
    pageItemCount?: number;
}

import { IPageLoader } from '../pageloader/IPageLoader';

export interface ILeaderBoard extends IBase {

    userInfo: UserInfoType;
    userID: string;
    userName: string;

    resetQueryFlag: boolean;
    boardID: string;
    tag: string;

    timeFilters: false | TimeFiltersType;
    timeFilterType: TimeFilterTypeString;

    pageItemCount: number;
    page: IPageLoader;
}