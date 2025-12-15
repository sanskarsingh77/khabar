import React, { Component } from "react";

export default class NewsItems extends Component {
  state = {
    saved: false,
  };

  componentDidMount() {
    const saved = JSON.parse(localStorage.getItem("savedNews")) || [];
    if (saved.some((item) => item.url === this.props.url)) {
      this.setState({ saved: true });
    }
  }

  toggleBookmark = () => {
    const { title, description, image, url, publishedAt, source } = this.props;
    let saved = JSON.parse(localStorage.getItem("savedNews")) || [];

    if (this.state.saved) {
      saved = saved.filter((item) => item.url !== url);
    } else {
      saved.push({ title, description, image, url, publishedAt, source });
    }

    localStorage.setItem("savedNews", JSON.stringify(saved));
    this.setState({ saved: !this.state.saved });
  };

  render() {
    const { title, description, image, url, publishedAt, source } = this.props;
    const { saved } = this.state;

    return (
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card news-card shadow-sm border-0">

          {/* Image */}
          <div className="news-image-wrapper">
            <img
              src={image || "/breaking.jpeg"}
              alt="news"
              onError={(e) => (e.target.src = "/breaking.jpeg")}
            />

            {/* Source */}
            <span className="badge bg-danger news-badge">
              {source?.name || "News"}
            </span>

            {/* Bookmark */}
            <button
              className={`bookmark-btn ${saved ? "saved" : ""}`}
              onClick={this.toggleBookmark}
              title={saved ? "Remove bookmark" : "Save article"}
            >
              <i className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"}`} />
            </button>
          </div>

          {/* Content */}
          <div className="card-body d-flex flex-column">
            <h6 className="news-title">
              {title ? title.slice(0, 80) : "Breaking News"}
            </h6>

            <p className="news-desc">
              {description
                ? description.replace(/Read more.*$/i, "").slice(0, 140) + "..."
                : "No description available."}
            </p>

            <div className="mt-auto">
              <small className="text-muted d-block mb-2">
                {source?.name} •{" "}
                {publishedAt
                  ? new Date(publishedAt).toLocaleDateString()
                  : ""}
              </small>

              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-danger w-100"
              >
                Open Full Article
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
