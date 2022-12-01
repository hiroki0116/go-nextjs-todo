import Result from "antd/lib/result";
import React from "react";

const NotFound = () => {
  return (
    <Result
      title={
        <span className="bg-slate-900/80 text-primary p-2 rounded font-extrabold tracking-normal">
          Page not found
        </span>
      }
      status="404"
    />
  );
};

export default NotFound;