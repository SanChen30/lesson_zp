import { useGitDiff } from './hooks/useGitDiff.js'

export default function App() {
  const { loading, content } = useGitDiff();
  return (
    <div className="flex">
      {loading ? 'loading...' : content}
    </div>
  )
}