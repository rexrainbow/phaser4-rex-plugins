export enum PathMode {
    'random' = 0,
    'diagonal' = 1,
    'straight' = 2,
    'line' = 3,
    'astar' = 10,
    'astar-random' = 11,
    'astar-line' = 12
}

export type PathModeString = 'random' | 'diagonal' | 'straight' | 'line' |
    'astar' | 'astar-line' | 'astar-random';

export let IsAStarMode = function (pathMode: PathMode) {
    return (pathMode === PathMode.astar) ||
        (pathMode === PathMode['astar-line']) ||
        (pathMode === PathMode['astar-random']);
}