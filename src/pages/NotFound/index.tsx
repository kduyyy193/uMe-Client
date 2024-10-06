import React from "react";
import "./index.less";
import { Link } from "react-router-dom";

const Notfound: React.FC = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <div className="mt-10">
          <Link
            to={"/"}
            id="back2Home"
            className="underline rounded-lg px-5 py-3 bg-primary-amber mt-8 font-medium text-lg cursor-pointer"
          >
            Back to HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
