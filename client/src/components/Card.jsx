import React from "react";
import "../css/card.css";
function Card() {
  return (
    <div className="postCardContainer">
      <div className="postcard">
        <h1 className="post-title">Post Title</h1>
        <p className="post-description">
          This is a brief description of the post. It provides an overview of
          the content and draws the reader in.
        </p>
        <p class="post-creator">
          Created by: <span class="creator-name">John Doe</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
