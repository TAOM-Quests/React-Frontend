import Question from "./question"
import TestResult from "./testResult"

export default interface Test {
    id: number
    title: string
    department: string
    group: string
    tags: string[]
    difficult: number
    results: TestResult[]
    questions: Question[]
}