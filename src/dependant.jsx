import { useQuery } from '@tanstack/react-query';

const fetchPostById = async (postId) => {
    const data = await fetch(`https://dummyjson.com/posts/${postId}`).then((res) => res.json());
    return data;
};

const fetchCommentsByPostId = async (postId) => {
    const data = await fetch(`https://dummyjson.com/comments/post/${postId}`).then((res) =>
        res.json()
    );
    return data.comments;
};

const Dependant = () => {
    // https://tanstack.com/query/latest/docs/react/guides/dependent-queries
    // by default useQuery called in parallel, but if in queryKey, there is some undefined key is available, it will wait until it's get a value, but we can make it more explicit
    const { data: post, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: () => fetchPostById(2),
    });

    const posts =  post?.id;
    const { data: comments, isPending } = useQuery({
        queryKey: ['comments', post?.id],
        queryFn: () => fetchCommentsByPostId(post.id),
        enabled: !!posts,
    });

    return (
        <div className="p-12">
            <h1 className="text-lg font-bold">Post:</h1>
            {isLoading ? <p>Loading the post</p> : <h2>{post?.title}</h2>}
            <br />
            <h1 className="text-lg font-bold">Comments</h1>
            {isPending && <p>Loading...</p>}
            <ul>
                {comments?.map((comment) => (
                    <p key={comment.id}>{comment.body}</p>
                ))}
            </ul>
        </div>
    );
};

export default Dependant;
