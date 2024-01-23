import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import instance from '../api_instance'
import { useAuth } from '../hooks/AuthProvider'

const NewPostCK = () => {
    const [textEditor, setTextEditor] = useState("<p>Enter your post's content&nbsp;</p>");
    const [postTitle, setPostTitle] = useState("New Post");
    const [isLoading, setIsLoading] = useState(false);

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
                <div className="darkfont">
                    <CKEditor
                        editor={ClassicEditor}
                        data={textEditor}
                        
                        config={{
                            
                        }}

                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();

                            setTextEditor(data);
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
                {isLoading ? <p>Loading...</p> : <button type='submit'>Submit</button>}
            </form>
            <button onClick={log}>Log</button>
        </div>
    );
}

export default NewPostCK;
