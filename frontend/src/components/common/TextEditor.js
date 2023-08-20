import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ReviewTextEditor = ({ review,readonly_val }) => {
    return (
        <Editor
            apiKey="lfaaxmlev7glbfcwexiq8mu7mus3mspo4jjgg7vh4mxmythp"
            value={review}
            init={{
                height: 30,
                readonly: readonly_val,
                toolbar: false,
                menubar: false,
                statusbar: false,
                plugins: '',
                content_style: 'body { font-size: 14px; }',
                setup: (editor) => {
                    editor.on('init', () => {
                        // Set the content directly to retain formatting
                        editor.setContent(review);
                    });
                },
            }}
        />
    );
};

export default ReviewTextEditor;
