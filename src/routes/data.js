import express from "express";
import { getSheetRows } from '../google-sheets-apis';
import { getSeconds } from '../utils/date'

const router = express.Router();

router.get("/data", async (req, res) => {
    const data = await getSheetRows()
    const payload = createPayload(data)
    
    res.json(payload)
});

function createPayload(data) {
    const [header, ...rows] = data
    const questions = rows.map(row => {
        const obj = {}
        
        for (let i = 0; i < header.length; i++) {
            obj[header[i]] = row[i]
        }

        return obj
    })

    return {
        avgTime: {
            easy: getAvgTime(questions.filter(q => q.difficulty === 'easy')),
            medium: getAvgTime(questions.filter(q => q.difficulty === 'medium')),
            hard: getAvgTime(questions.filter(q => q.difficulty === 'hard'))
        },
        questions
    }
}

function getAvgTime(questions) {
    const totalSeconds = questions.reduce((acc, q) => {
        const { timeSpend } = q
        acc += getSeconds(timeSpend)
        return acc
    }, 0)

    return totalSeconds / questions.length
}

export default router;