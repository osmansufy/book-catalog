import { Box, Container } from '@mui/material'
import React from 'react'

const Home = () => {
    const [count, setCount] = React.useState(0)
    return (
        <Box>

            <h1>Vite + React   {
                import.meta.env.firebase_apiKey
            }</h1>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

        </Box>
    )
}

export default Home