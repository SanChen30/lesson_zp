import { useEffect } from 'react'
import { createPosts } from '@/api/posts'

export default function Chat() {
    useEffect(() => {
        (async () => {
            await createPosts();
        })()
    }, [])
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}