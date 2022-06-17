import React, { Component } from 'react';
import { ButtonGroup, Button } from "reactstrap";

export class Article extends Component {
    static displayName = Article.name;

    constructor(props) {
        super(props);
        this.state = { article: {} };
    }

    componentDidMount() {
        this.populateArticle();
    }

    static renderArticlesTable(articles) {
        return (
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publication Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map(article =>
                    <tr key={article.id}>
                        <td>{article.title}</td>
                        <td>{article.author}</td>
                        <td>{article.publicationDate}</td>
                        <td><ButtonGroup aria-label="article actions">
                            <Button>View</Button>
                            <Button>Edit</Button>
                            <Button>Right</Button>
                        </ButtonGroup></td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Article.renderArticlesTable(this.state.articles);

        return (
            <div>
                <h1 id="tableLabel" >Articles</h1>
                {contents}
            </div>
        );
    }

    async populateArticle() {
        const response = await fetch('https://localhost:7062/article');
        const data = await response.json();
        this.setState({ articles: data, loading: false });
    }
}
