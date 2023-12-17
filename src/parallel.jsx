import React from 'react';
import { useQueries } from '@tanstack/react-query';

const Parallel = () => {
    const [userIds, setUserIds] = React.useState([1, 2]);

    const userData = useQueries({
        queries: userIds.map((id) => {
            return {
                queryKey: ['user', id],
                queryFn: async () => {
                    const data = await fetch(`https://dummyjson.com/users/${id}`).then((res) => {
                        return res.json();
                    })
                    return data;
                }
            };
        }) 
    })
    
    console.log(userData);

    return (
        <div>
            <button
                onClick={() =>
                    setUserIds((prev) => {
                        return [...prev, prev.length +1];
                    })
                }>
                Load more
            </button>

            {userIds.map((id) => (
                <h1 key={id}>{id}</h1>
            ))}
        </div>
    );
};

export default Parallel;
