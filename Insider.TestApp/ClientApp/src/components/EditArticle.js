import React, { useEffect, useState } from 'react';
import ArticleForm from './ArticleForm';
import { useParams } from 'react-router-dom';

const EditArticle = ({ history }) => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const url = `https://localhost:7062/article/${id}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setArticle(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    const handleOnSubmit = (article) => {
        (async () => {
            const rawResponse = await fetch('https://localhost:7062/article', {
                method: 'PUT',
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

    let content = article === null
        ? <div>Loading...</div>
        : <ArticleForm article={article} handleOnSubmit={handleOnSubmit} />;
        
    return (content);
};

// class EditArticle extends Component {
//     static displayName = EditArticle.name;
//
//     constructor(props) {
//         super(props);
//         const { id } = this.props.match.params;
//         this.state = { article: {}, loading: true, id };
//     }
//
//     componentDidMount() {
//         let promise = this.readArticle();
//     }
//    
//     static renderArticle(article) {
//         let handleOnSubmit = (article) => {
//             (async () => {
//                 const rawResponse = await fetch('https://localhost:7062/article', {
//                     method: 'PUT',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(article)
//                 });
//                 const content = await rawResponse.json();
//
//                 console.log(content);
//                 this.props.history.push('/articles');
//             })();
//         };
//        
//         return (
//             <ArticleForm article={article} handleOnSubmit={handleOnSubmit} />
//         );
//     }
//
//     render() {
//         let contents = this.state.loading
//             ? <p><em>Loading...</em></p>
//             : EditArticle.renderArticle(this.state.article);
//
//         return (
//             <div>
//                 {contents}
//             </div>
//         );
//     }
//
//     async readArticle() {
//         const response = await fetch(`https://localhost:7062/article/${this.state.id}`);
//         const data = await response.json();
//         this.setState({ article: data, loading: false });
//     }
// }
//
export default EditArticle;