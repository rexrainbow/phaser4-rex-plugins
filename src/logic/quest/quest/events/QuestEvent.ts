export const QuestEvent = 'quest';

import { QuestionType, IQuestionManager } from '../../questions/IQuestionManager';
import { IQuest } from '../IQuest'
export type QuestEventHandler = (
    question: QuestionType,
    quest: IQuest,
    questionManager: IQuestionManager
) => void;