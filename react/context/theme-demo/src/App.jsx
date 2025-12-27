import ThemeProvider from './contexts/ThemeContext.jsx';
import Page from './pages/Page.jsx';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </>
  )
}