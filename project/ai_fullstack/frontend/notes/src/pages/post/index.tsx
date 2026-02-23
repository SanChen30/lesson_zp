import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const { id } = useParams();
    return (
        <>
            PostDetail {id}
        </>
    )
}

export default PostDetail;