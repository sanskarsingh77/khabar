import React from "react";

export default function Skeleton() {
  return (
    <div className="col-md-4">
      <div className="card p-3">
        <div className="skeleton-img mb-3"></div>
        <div className="skeleton-text w-75"></div>
        <div className="skeleton-text w-100"></div>
      </div>
    </div>
  );
}
