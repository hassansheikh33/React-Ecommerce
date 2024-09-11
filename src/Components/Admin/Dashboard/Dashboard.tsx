import classes from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux-store";
import { useEffect } from "react";
import { getAdminData } from "../../../store/admin-thunks";
import LineChart from "../../UI/LineChart/LineChart";
import Card from "../../UI/Card/Card";
export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);

  const loading = useSelector((state: RootState) => state.ui.loading);

  const admins = useSelector((state: RootState) => state.admin.admins);
  const products = useSelector((state: RootState) => state.admin.products);
  const orders = useSelector((state: RootState) => state.admin.orders);
  const users = useSelector((state: RootState) => state.admin.users);

  if (loading) {
    return <h1>Loading Admin data...</h1>;
  }

  return (
    <div className={classes.container}>
      <h1 className={`${classes.textCenter} ${classes.heading}`}>
        Welcome to <span className={classes.red}>Admin Dashboard!</span>
      </h1>
      <div className={classes.salesNavigation}>
        <Card className={`${classes.salesCard} ${classes.profitCard}`}>
          <h2>
            Total <span className={classes.profit}>Sales</span>:{" "}
            <span>
              {new Date().toLocaleDateString()}{" "}
              <span className={classes.today}>(Today)</span>
            </span>
          </h2>
          <p className={`${classes.sales} ${classes.profit}`}>
            ${(Math.random() * 1000 + 5000).toFixed(2)}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            architecto facere voluptate minima repellendus beatae veniam optio
            error, quas totam praesentium delectus!
          </p>
        </Card>
        <Card className={`${classes.salesCard} ${classes.lossCard}`}>
          <h2>
            Total <span className={classes.loss}>Returns</span> :{" "}
            <span>
              {new Date().toLocaleDateString()}{" "}
              <span className={classes.today}>(Today)</span>
            </span>
          </h2>
          <p className={`${classes.sales} ${classes.loss}`}>
            ${(Math.random() * 100 + 50).toFixed(2)}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            architecto facere voluptate minima repellendus beatae veniam optio
            error, quas totam praesentium delectus!
          </p>
        </Card>
      </div>
      <div className={classes.salesDiv}>
        <div className={`${classes.textDiv} ${classes.textCenter}`}>
          <h2>
            Weekly <span className={classes.blue}>Sales</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
            sint minus aliquam consectetur blanditiis optio, voluptas sapiente
            itaque minima, ducimus tenetur eius. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. A, sed.
          </p>
        </div>
        <div className={classes.chartDiv}>
          <LineChart />
        </div>
      </div>
      <div className={`${classes.dataCount} ${classes.textCenter}`}>
        <h2 className={classes.dataHeading}>
          <span className={classes.red}>Data</span> Count
        </h2>
        <div className={classes.cardContainer}>
          <Card className={`${classes.card} ${classes.textCenter}`}>
            <h3 className={classes.cardTitle}>
              Total <span className={classes.red}>Users</span>
            </h3>
            <p className={classes.count}>{users.length}</p>
          </Card>
          <Card className={`${classes.card} ${classes.textCenter}`}>
            <h3 className={classes.cardTitle}>
              Total <span className={classes.blue}>Admins</span>
            </h3>
            <p className={classes.count}>{admins.length}</p>
          </Card>
          <Card className={`${classes.card} ${classes.textCenter}`}>
            <h3 className={classes.cardTitle}>
              Total <span className={classes.red}>Products</span>
            </h3>
            <p className={classes.count}>{products.length}</p>
          </Card>
          <Card className={`${classes.card} ${classes.textCenter}`}>
            <h3 className={classes.cardTitle}>
              Total <span className={classes.blue}>Orders</span>
            </h3>
            <p className={classes.count}>{orders.length}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
