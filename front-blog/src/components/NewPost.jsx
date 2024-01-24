import React, { useState } from 'react';
import instance from '../api_instance'
import { useAuth } from '../hooks/AuthProvider'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import remarkBreaks from "remark-breaks";

const NewPost = () => {
    const [postTitle, setPostTitle] = useState("New Post");
    const [isLoading, setIsLoading] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('# New post here');

    const { value } = useAuth();

    //title change 
    const handleTitleChange = (event) => {
        setPostTitle(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const post = {
                title: postTitle,
                content: markdownContent,
                author: value.authUserId,
            }
            //also send cookies
            /*const response = await instance.post('/posts', post, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });*/

            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(body => {
                    if (body.success) {
                        console.log('Enviado.')
                    }
                }
                )

            console.log(response);
            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            /*const response = await instance.post('/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });*/
            const response = await fetch('http://localhost:3000/images/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                // Handle non-successful status codes
                const errorData = await response.json();
                throw new Error(`Image upload failed: ${errorData.message}`);
            }

            const body = await response.json();

            console.log('Image uploaded:', body.imageUrl);
            //image url + instance
            const imageUrl = instance.defaults.baseURL + body.imageUrl;
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error; // Rethrow the error for the caller to handle
        }
    };


    return (
        <div>

            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={postTitle} onChange={handleTitleChange} />

                <div className='markdownsidebyside'>
                    <div >
                        <label>Content:</label>
                        <MdEditor value={markdownContent}
                            onChange={({ text }) => setMarkdownContent(text)}
                            renderHTML={text => setMarkdownContent(text)}
                            onImageUpload={handleImageUpload}
                            
                        />

                    </div>
                    <div>
                        <Markdown className="indexPostContent" remarkPlugins={[remarkGfm, remarkBreaks]}>{markdownContent}</Markdown>
                    </div>
                </div>

                {isLoading ? <p>Loading...</p> : <button type='submit'>Submit</button>}
            </form>
        </div>
    );
}

export default NewPost;
