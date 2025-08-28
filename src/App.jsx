import { useState } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([
    { text: 'Pregunta 1', answers: ['', ''] },
    { text: 'Pregunta 2', answers: ['', ''] },
  ])

  const handleAnswerChange = (qIndex, aIndex, value) => {
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === qIndex
          ? {
              ...q,
              answers: q.answers.map((ans, j) => (j === aIndex ? value : ans)),
            }
          : q
      )
    )
  }

  return (
    <div>
      {questions.map((q, qIdx) => (
        <div key={qIdx}>
          <h2>{q.text}</h2>
          {q.answers.map((ans, aIdx) => (
            <div key={aIdx}>
              <label>
                Respuesta {aIdx + 1}: {' '}
                <input
                  type="text"
                  value={ans}
                  onChange={e => handleAnswerChange(qIdx, aIdx, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
