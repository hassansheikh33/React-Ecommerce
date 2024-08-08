import { ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError() as ErrorResponse;
  console.log(error, typeof error);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Some Error Occured</h1>
      {error.data && <h2>Details :{error.data}</h2>}
      {!error.data && <h2>{error.toString()}</h2>}
      <p
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        Go back?
      </p>
    </div>
  );
}
