import React, { useState } from 'react';
import instance from '../api_instance'
import { useAuth } from '../hooks/AuthProvider'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const NewPost = () => {
    const [textEditor, setTextEditor] = useState("<p>Enter your post's content&nbsp;</p>");
    const [postTitle, setPostTitle] = useState("New Post");
    const [isLoading, setIsLoading] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('New post here');

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
                content: textEditor,
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

            const response = fetch('http://localhost:3000/posts', {
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

    const log = () => {
        console.log(textEditor);
    }

    return (
        <div>

            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type='text' value={postTitle} onChange={handleTitleChange} />

                <div className='markdownsidebyside'>
                    <div className="markdowninput">
                        <label>Content:</label>
                        <textarea value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
                    </div>
                    <div className="markdownpreview">
                        <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
                    </div>
                </div>

                {isLoading ? <p>Loading...</p> : <button type='submit'>Submit</button>}
            </form>
            <button onClick={log}>Log</button>
        </div>
    );
}

export default NewPost;
