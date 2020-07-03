export enum SearchMode {
    path = 0,
    area = 1
}

export type SearchModeString = 'path' | 'area';

export enum PathMode {
    'all' = 0,
    'astar' = 1,
    'astar-line' = 2,
    'astar-random' = 3
}

export type PathModeString = 'all' | 'astar' | 'astar-line' | 'astar-random';

export type CostValueType = number | null;
export const BLOCKER = null;
export const InfinityPoints = undefined;

export interface IConfig {
    searchMode?: SearchMode | SearchModeString,
    pathMode?: PathMode | PathModeString
}