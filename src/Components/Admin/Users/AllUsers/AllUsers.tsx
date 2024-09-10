import { useSelector } from "react-redux";
import { RootState } from "../../../../store/redux-store";
import classes from "./AllUsers.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { setNofication } from "../../../../Util/notification";

export default function Users() {
  const admins = useSelector((state: RootState) => state.admin.admins);
  const users = useSelector((state: RootState) => state.admin.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [showAdminForm, setShowAdminForm] = useState<boolean>(false);

  const newAdminFormShown = (bool: boolean) => {
    setShowAdminForm(bool);
  };

  const addNewAdminHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !email.includes("@") ||
      !email.endsWith(".com") ||
      password.length < 8
    ) {
      setNofication("error", "Please enter valid credentials");
      return;
    }
    console.log(email, password);
    //dispatch a thunk here which adds a new doc in the admins collection in firebase
    newAdminFormShown(false);
  };

  return (
    <div>
      <div>
        <h1>All Users</h1>
        <div>
          {users.length === 0 || (!users && <p>No users found</p>)}
          {users.length > 0 &&
            users.map((user) => <p key={user.email}>{user.name}</p>)}
        </div>
      </div>
      <div className={classes.admins}>
        <h1>Admins</h1>
        <div>
          {admins.length === 0 || (!admins && <p>No users found</p>)}
          {admins.length > 0 &&
            admins.map((admin) => <p key={admin.email}>{admin.email}</p>)}
        </div>
      </div>
      <br />
      <div>
        <button
          onClick={() => newAdminFormShown(true)}
          className={classes.adminFormBtn}
        >
          Add a new Admin?
        </button>
        {showAdminForm && (
          <form onSubmit={addNewAdminHandler}>
            <div>
              <label htmlFor="email">Admin Email</label>
              <input type="email" value={email} onChange={emailChange} />
            </div>
            <div>
              <label htmlFor="email">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={passwordChange}
              />
            </div>
            <div>
              <button type="submit">Save Admin</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
