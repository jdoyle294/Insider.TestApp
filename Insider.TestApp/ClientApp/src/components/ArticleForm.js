import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import validator from 'validator';
import './ArticleForm.css';
import { v4 as uuidv4 } from 'uuid';

const ArticleForm = (props) => {
    const [article, setArticle] = useState({
        title: props.article ? props.article.title : '',
        author: props.article ? props.article.author : '',
        id: props.article ? props.article.id : uuidv4(),
        publicationDate: props.article ? props.article.publicationDate ?? '' : '',
        body: props.article ? props.article.body ?? '' : ''
    });
    
    const [errorMsg, setErrorMsg] = useState('');
    const { title, author, publicationDate, body, id } = article;
    
    const handleOnSubmit = (event) => {
        event.preventDefault();
        let errorMsg = '';
        
        const fieldsPopulated =
            title.trim() !== '' && title.trim() !== '0' &&
            author.trim() !== '' && author.trim() !== '0' &&
            validator.isDate(publicationDate);
        
        const fieldLengthValid =
            title.trim().length <= 50 &&
            author.trim().length <= 50 &&
            body.trim().length <= 1000;
        
        if (fieldsPopulated && fieldLengthValid) {
            const article = {
                title,
                author,
                publicationDate,
                body,
                id
            };
            
            props.handleOnSubmit(article);
        } else {
            if (!fieldsPopulated)
                errorMsg += 'Title, Author, and Publication Date are required fields. ';
            
            if (!fieldLengthValid)
                errorMsg += 'Title and Author must be <= 50 characters and Body must be <= 1000 characters.';
        }
        
        setErrorMsg(errorMsg);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'publicationDate':
                if (value === '' || validator.isDate(value)) {
                    setArticle((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            default:
                setArticle((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };
    
    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        className="input-control"
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Enter article title"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Author</Label>
                    <Input
                        className="input-control"
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Enter article author"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Publication Date</Label>
                    <Input
                        className="input-control"
                        type="date"
                        name="publicationDate"
                        value={publicationDate}
                        placeholder="Enter article publication date"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Body</Label>
                    <Input
                        className="input-control"
                        type="textarea"
                        rows={5}
                        name="body"
                        value={body}
                        placeholder="Enter article body"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button color="primary" type="submit" className="submit-btn">Save</Button>
            </Form>
        </div>
    );
}

export default ArticleForm;