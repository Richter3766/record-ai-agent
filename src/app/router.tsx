// src/app/router.tsx
import { BrowserRouter, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*예시*/}
                {/*<Route path="/" element={<RecordingPage />} />*/}
                {/*<Route path="/about" element={<AboutPage />} />*/}
                {/*<Route path="*" element={<NotFoundPage />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export { AppRouter }
