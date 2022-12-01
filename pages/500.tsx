import Result from "antd/lib/result";
import React from "react";

const InternalServerError = () => {
  return (
    <Result
      title={
        <span className="bg-slate-900/80 text-primary p-2 rounded font-extrabold tracking-normal">
          We are sorry...something wrong in the server.
        </span>
      }
      status="500"
    />
  );
};

export default InternalServerError;