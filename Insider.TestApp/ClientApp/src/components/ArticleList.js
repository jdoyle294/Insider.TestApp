import React, {useEffect, useState} from 'react';
import {CardColumns, FormGroup, Input, Label} from "reactstrap";
import Article from "./Article";
import {Link} from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7062/article');
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (search === '') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((a) => a.title.includes(search)));
    }
  }, [search]);
  
  const renderArticlesList = (articles) => {
    return (
        <CardColumns>
          {articles.map((article) => (<Article article={article} key={article.id} setArticles={setArticles} />))}
        </CardColumns>
    );
  };

  let contents = loading
      ? <p><em>Loading...</em></p>
      : renderArticlesList(filteredArticles);

  return (
      <div>
        <h1 style={{display: "inline-block"}}>Articles</h1>
        <Link to={`/create`} style={{marginLeft: "15px"}}>Create New Article</Link>
        <Input
            className="input-control"
            type="text"
            name="search"
            value={search}
            placeholder="Search by title"
            onChange={ e => setSearch(e.target.value) }
        />
        {contents}
      </div>
  );
};

export default ArticleList;