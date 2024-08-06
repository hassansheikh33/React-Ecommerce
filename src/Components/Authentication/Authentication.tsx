import { useSearchParams } from "react-router-dom";
import classes from "./Authentication.module.css";

export default function Authentication() {
  const searchParams = useSearchParams();
  return (
    <div>
      <h1>Authentication Page</h1>
    </div>
  );
}
