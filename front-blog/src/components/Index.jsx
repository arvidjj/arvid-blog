import React, { useState, useEffect } from 'react';
import instance from '../api_instance'
import config from '../../config';
import { useAuth } from '../hooks/AuthProvider'

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { value } = useAuth();

    useEffect(() => {
        console.log(value.isAuthenticated)
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
            {value.isAuthenticated && (
                <div>
                    <h3>Hello, {value.authUser.username}!</h3>
                    <a href="/posts/new">New Post</a>
                </div>
            )}
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
