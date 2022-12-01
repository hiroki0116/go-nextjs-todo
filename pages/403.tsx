import Result from "antd/lib/result";
import React from "react";

const AuthError = () => {
  return (
    <Result
      title={
        <span className="bg-slate-900/80 text-primary p-2 rounded font-extrabold tracking-normal">
          You don&apos;t have permission to access this page
        </span>
      }
      status="403"
    />
  );
};

export default AuthError;
