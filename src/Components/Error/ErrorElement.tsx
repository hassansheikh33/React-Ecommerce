import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError() as Error;
  console.log(error);
  return (
    <div>
      <h1>Soome Error Occured, please try again later</h1>
      <p>Details :{error.data}</p>
    </div>
  );
}
