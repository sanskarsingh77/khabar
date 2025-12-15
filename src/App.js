import React, { Component } from "react";
import News from "./Components/News";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SavedNews from "./Components/SavedNews";


export default class App extends Component {
  state = {
    searchQuery: "",
    darkMode: localStorage.getItem("theme") === "dark",
  };

  setSearchQuery = (query) => {
    this.setState({ searchQuery: query });
  };

  toggleTheme = () => {
    this.setState(
      (prev) => ({ darkMode: !prev.darkMode }),
      () => {
        localStorage.setItem(
          "theme",
          this.state.darkMode ? "dark" : "light"
        );
      }
    );
  };

  render() {
    return (
      <div className={this.state.darkMode ? "dark-theme" : "light-theme"}>
        <BrowserRouter>
          <Navbar
            onSearch={this.setSearchQuery}
            darkMode={this.state.darkMode}
            toggleTheme={this.toggleTheme}
          />

          <Routes>
            {/* Home = General */}
            <Route
              path="/"
              element={
                <News
                  searchQuery={this.state.searchQuery}
                  category="general"
                />
              }
            />
           =<Route path="/saved" element={<SavedNews />} />


            <Route
              path="/business"
              element={<News searchQuery={this.state.searchQuery} category="business" />}
            />
            <Route
              path="/technology"
              element={<News searchQuery={this.state.searchQuery} category="technology" />}
            />
            <Route
              path="/science"
              element={<News searchQuery={this.state.searchQuery} category="science" />}
            />
            <Route
              path="/sports"
              element={<News searchQuery={this.state.searchQuery} category="sports" />}
            />
            <Route
              path="/health"
              element={<News searchQuery={this.state.searchQuery} category="health" />}
            />
            <Route
              path="/entertainment"
              element={<News searchQuery={this.state.searchQuery} category="entertainment" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
