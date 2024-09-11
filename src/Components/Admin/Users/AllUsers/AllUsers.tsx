import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/redux-store";
import classes from "./AllUsers.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { setNofication } from "../../../../Util/notification";
import Card from "../../../UI/Card/Card";
import Button from "../../../UI/Button/Button";
import Modal from "../../../UI/Modal/Modal";
import {
  addNewAdmin,
  changeAdminPassword,
  removeAdmin,
} from "../../../../store/admin-thunks";
import { NewAdminError } from "../../../../types";

export default function Users() {
  const admins = useSelector((state: RootState) => state.admin.admins);
  const users = useSelector((state: RootState) => state.admin.users);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [modal, setModal] = useState<null | "edit" | "add" | "delete">(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newAdminError, setNewAdminError] = useState<NewAdminError>({
    email: null,
    password: null,
  });

  const [changePasswordError, setChangePasswordError] = useState<string | null>(
    null
  );

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const newPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const closeHandler = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
    setEditId("");
    setDeleteId("");
    setNewAdminError({ email: null, password: null });
    setChangePasswordError(null);
    setModal(null);
  };

  const addNewAdminHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !email.includes("@") ||
      !email.endsWith(".com") ||
      password.length < 8
    ) {
      if (!email.includes("@") || !email.endsWith(".com")) {
        setNewAdminError((prevState) => ({
          ...prevState,
          email: "Please enter a correct email",
        }));
      } else {
        setNewAdminError((prevState) => ({ ...prevState, email: null }));
      }
      if (password.length < 8) {
        setNewAdminError((prevState) => ({
          ...prevState,
          password: "Please enter a correct password (atleast 8 characters)",
        }));
      } else {
        setNewAdminError((prevState) => ({ ...prevState, password: null }));
      }
      setNofication("error", "Please enter valid credentials");
      return;
    }
    await dispatch(addNewAdmin({ email, password }));
    closeHandler();
  };

  const showEditModal = (email: string) => {
    setEditId(email);
    setModal("edit");
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId !== "") {
      if (newPassword !== "" && newPassword.length > 7) {
        await dispatch(changeAdminPassword(editId, newPassword));
        closeHandler();
      } else {
        setChangePasswordError(
          "Please enter a valid password (atleast 8 characters)"
        );
        setNofication("error", "Please enter a valid password.");
      }
    }
  };

  const showDelModal = (email: string) => {
    setModal("delete");
    setDeleteId(email);
  };

  const deleteAdminHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (deleteId !== "") {
      await dispatch(removeAdmin(deleteId));
      closeHandler();
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <h1>All Users</h1>
        <div>
          {users.length === 0 || (!users && <p>No users found</p>)}
          {users.length > 0 && (
            <ul>
              {users.map((user) => (
                <li key={user.email}>{user.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={classes.admins}>
        <h1>Admins</h1>
        <div>
          {admins.length === 0 || (!admins && <p>No Admins found</p>)}
          <Button
            onClick={() => setModal("add")}
            className={classes.newAdminBtn}
          >
            Add a new Admin?
          </Button>
          {admins.length > 0 && (
            <div>
              {admins.map((admin, index) => (
                <Card key={admin.email} className={classes.adminCard}>
                  <div>
                    <h3>
                      <span
                        className={`${classes.blue} ${classes.adminHeading}`}
                      >
                        Admin {index + 1}:{" "}
                      </span>
                      <span className={classes.adminEmail}>{admin.email}</span>
                    </h3>
                  </div>
                  <div className={classes.btnsDiv}>
                    <Button
                      className={classes.changeBtn}
                      onClick={() => showEditModal(admin.email)}
                    >
                      Change Password
                    </Button>
                    <Button
                      className={classes.deleteBtn}
                      onClick={() => showDelModal(admin.email)}
                    >
                      Delete Admin
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        {modal !== null && (
          <Modal onClose={closeHandler}>
            {modal === "add" && (
              <form onSubmit={addNewAdminHandler}>
                <div>
                  <h3 className={classes.modalHeading}>
                    Enter new Admin Credentials
                  </h3>
                </div>
                <fieldset className={classes.fieldset}>
                  <label className={classes.label} htmlFor="email">
                    Admin Email
                  </label>
                  <input
                    className={classes.input}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={emailChange}
                  />
                  {newAdminError && newAdminError.email && (
                    <p className={classes.error}>{newAdminError.email}</p>
                  )}
                </fieldset>
                <fieldset className={classes.fieldset}>
                  <label className={classes.label} htmlFor="password">
                    Admin Password
                  </label>
                  <input
                    className={classes.input}
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={passwordChange}
                  />
                  {newAdminError && newAdminError.password && (
                    <p className={classes.error}>{newAdminError.password}</p>
                  )}
                </fieldset>
                <div>
                  <Button
                    className={classes.closeBtn}
                    type="button"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button className={classes.saveAdminBtn} type="submit">
                    Save Admin
                  </Button>
                </div>
              </form>
            )}
            {modal === "edit" && (
              <form onSubmit={changePassword}>
                <div>
                  <h3 className={classes.modalHeading}>
                    Enter new Password for {editId}
                  </h3>
                </div>
                <fieldset className={classes.fieldset}>
                  <label className={classes.label} htmlFor="password">
                    New Password
                  </label>
                  <input
                    className={classes.input}
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={newPasswordChange}
                  />
                  {changePasswordError && (
                    <p className={classes.error}>{changePasswordError}</p>
                  )}
                </fieldset>
                <div>
                  <Button
                    className={classes.closeBtn}
                    type="button"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button className={classes.saveAdminBtn} type="submit">
                    Save Password
                  </Button>
                </div>
              </form>
            )}
            {modal === "delete" && (
              <form onSubmit={deleteAdminHandler}>
                <div>
                  <h3 className={classes.modalHeading}>
                    Are You sure You want to delete admin: {deleteId}
                  </h3>
                </div>
                <div>
                  <Button
                    className={classes.closeBtn}
                    type="button"
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                  <Button className={classes.deleteBtn} type="submit">
                    Yes, Delete Admin
                  </Button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
