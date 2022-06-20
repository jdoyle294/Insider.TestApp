import React, {useState} from 'react';
import {Button, Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap";
import Moment from "moment";
import './Article.css';
import {useHistory} from "react-router-dom";

const Article = (props) => {
    const [article, setArticle] = useState({
        title: props.article ? props.article.title : '',
        author: props.article ? props.article.author : '',
        id: props.article ? props.article.id : '',

        // date and body are optional - account for possible null value
        publicationDate: props.article ? props.article.publicationDate ?? '' : '',
        body: props.article ? props.article.body ?? '' : ''
    });

    const { title, author, publicationDate, body, id } = article;

    let history = useHistory();
    
    const onEditClick = () => {
        history.push(`/edit/${id}`);
    };
    
    const onDeleteClick = () => {
        (async () => {
            const rawResponse = await fetch(`https://localhost:7062/article/${article.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            props.setArticles((prevState) => prevState.filter((a) => a.id !== article.id));
        })();
    };
    
    return (
        <Card className="article" key={id}>
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>by {author}</CardSubtitle>
                <CardSubtitle>published on {Moment(publicationDate).format('MM/DD/YYYY')}</CardSubtitle>
                <hr />
                <CardText>{body}</CardText>
                <Button color="primary" onClick={onEditClick}>Edit</Button>
                <Button color="danger" onClick={onDeleteClick}>Delete</Button>
            </CardBody>
        </Card>
    );
};

export default Article;