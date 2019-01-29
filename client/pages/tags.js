import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">Of</span>
            <span className="the">The</span>
          </span>
        </h1>
        <h3 className="tagline">
          <span>
            {this.props.tagline}
            {this.props.age}
          </span>
        </h3>
      </header>
    );
  }
}

export default Header;
