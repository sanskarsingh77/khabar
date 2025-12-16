import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Skeleton from "./Skeleton";

export class News extends Component {
 state = {
  articles: [],
  loading: true,
  error: null,
  page: 1
};


  componentDidMount() {
    this.fetchNews();
  }
  componentDidUpdate(prevProps) {
  if (prevProps.category !== this.props.category) {
    this.setState(
      {
        articles: [],
        page: 1,
        loading: true,
      },
      this.fetchNews
    );
  }
}


  fetchNews = async () => {
    try {
      this.setState({ loading: true, error: null });

      const maxResults = this.state.page * 8;

const url = `/api/news?category=${this.props.category}&page=${this.state.page}`;




      const res = await fetch(url);
      const data = await res.json();

      this.setState({
        articles: data.articles || [],
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: "Failed to load news",
        loading: false,
      });
    }
  };

  render() {
    const { articles, loading, error } = this.state;
    const searchQuery = this.props.searchQuery || "";

    const filteredArticles = articles.filter(
      (article) =>
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="container my-4">
        <h2 className="text-center page-title">
          KHABAR<span className="text-danger">+</span> Top Headlines
        </h2>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
            <button
              className="btn btn-sm btn-dark ms-2"
              onClick={this.fetchNews}
            >
              Retry
            </button>
          </div>
        )}

        <div className="row g-4">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}

          {!loading && !error && filteredArticles.length === 0 && (
            <p className="text-center text-muted">No news found.</p>
          )}

          {!loading &&
            filteredArticles.map((article) => (
              <NewsItems
                key={article.url}
                title={article.title}
                description={article.description}
                image={article.image}
                url={article.url}
                publishedAt={article.publishedAt}
                source={article.source}
              />
            ))}
        </div>
        {!loading && (
  <div className="text-center mt-4">
    <button
      className="btn btn-outline-dark px-4"
      onClick={() =>
        this.setState(
          (prev) => ({ page: prev.page + 1 }),
          this.fetchNews
        )
      }
    >
      Load More News
    </button>
  </div>
)}

      </div>
    );
  }
}

export default News;
