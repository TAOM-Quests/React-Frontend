import Question from "./question"
import QuestResult from "./questResult"

export default interface Quest {
    id: number
    name: string
    department: string
    group: string
    tags: string[]
    difficult: number
    results: QuestResult[]
    questions: Question[]
}