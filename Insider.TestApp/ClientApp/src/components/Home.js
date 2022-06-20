import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Article Manager</h1>
        <ul>
            <li>C# .NET 6</li>
            <li>SQLite Database</li>
            <li>Entity Framework Core</li>
            <li>React</li>
            <li>Bootstrap</li>
            <li>Swagger</li>
        </ul>
      </div>
    );
  }
}
