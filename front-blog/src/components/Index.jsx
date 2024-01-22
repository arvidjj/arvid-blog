import React, { useState, useEffect } from 'react';
import instance from '../api_instance';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { value } = useAuth();
    const navigate = useNavigate();

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

    const enterPost = async (id) => {
        navigate(`/post/${id}`);
    };

    //format date
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {value.isAuthenticated && (
                <div>
                    <h3>Hello, {value.authUserId}!</h3>
                </div>
            )}
            <h1>Arvid OJ</h1>
            <h2>Latest Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <div className="postindex">
                            <div className='postcontentindex'>
                                <div className="posttitleandtime">
                                    <a href={`/post/${post._id}`}>
                                        <h1>{post.title}</h1>
                                    </a>
                                    <p>{formatDate(post.timestamp)}</p>
                                </div>
                                {parse(`${DOMPurify.sanitize(post.content)}`)}
                            </div>
                            <div style={{ display: 'flex', marginLeft: 'auto', marginBottom: '10px' }}>
                                <button onClick={() => enterPost(post._id)}>Read More</button>
                            </div>
                            <hr />
                        </div>
                    </li>
                ))}
            </ul>
            {/* Pagination */}
        </div>
    );
};

export default Index;
