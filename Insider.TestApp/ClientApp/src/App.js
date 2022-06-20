import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';
import EditArticle from "./components/EditArticle";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/articles' component={ArticleList} />
        <Route path='/create' component={CreateArticle} />
        <Route path='/edit/:id' component={EditArticle} />
      </Layout>
    );
  }
}
