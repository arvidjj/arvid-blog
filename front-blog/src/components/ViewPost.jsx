import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../api_instance';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ViewPost = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await instance.get(`/posts/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <div>
            <nav className='linkbutton'>
                <a href='/'> <FontAwesomeIcon icon={faArrowLeft} />  Back</a>
            </nav>
            {post ? (
                <div className='postbody'>
                    <h1 className='postheader'>{post.title}</h1>
                    <div>
                        {parse(`${DOMPurify.sanitize(post.content)}`)}
                    </div>
                </div>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
};

export default ViewPost;
