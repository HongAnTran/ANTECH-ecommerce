import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom"
function ErrorPage() {
  return (
    <div className="error-page">
      <div className="container">
        <div className="error-page_content">
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to="/" >Back Home</Link></Button>}
          />
          ,
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
