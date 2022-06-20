import React from 'react';
import ArticleForm from './ArticleForm';

const CreateArticle = ({ history }) => {
    const handleOnSubmit = (article) => {
        (async () => {
            const rawResponse = await fetch('https://localhost:7062/article', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            });
            const content = await rawResponse.json();

            console.log(content);

            history.push('/articles');
        })();
    };
    
    return (
        <React.Fragment>
            <ArticleForm handleOnSubmit={handleOnSubmit} />
        </React.Fragment>
    );
}

export default CreateArticle