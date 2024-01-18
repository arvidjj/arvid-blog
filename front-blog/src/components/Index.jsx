import React, { useState, useEffect } from 'react';
import instance from '../api_instance'
import config from '../../config';

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await instance.get('/posts');

                setPosts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to My Blog!</h1>
            <h2>Latest Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <a href={`/posts/${post.id}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
