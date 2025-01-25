import { QuestDifficult } from "./questDifficult"
import { QuestGroup } from "./questGroup"
import { QuestTag } from "./questTag"

export interface QuestMinimize {
    id: number
    name: string
    group: QuestGroup,
    tags: QuestTag[],
    difficult: QuestDifficult
}