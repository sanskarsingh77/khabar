import React, { Component } from "react";
import NewsItems from "./NewsItems";

export default class SavedNews extends Component {
  state = { saved: [] };

  componentDidMount() {
    const saved = JSON.parse(localStorage.getItem("savedNews")) || [];
    this.setState({ saved });
  }

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center page-title">🔖 Saved Articles</h2>

        {this.state.saved.length === 0 && (
          <p className="text-center text-muted">No saved articles.</p>
        )}

        <div className="row g-4">
          {this.state.saved.map((article) => (
            <NewsItems key={article.url} {...article} />
          ))}
        </div>
      </div>
    );
  }
}
