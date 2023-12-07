import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  BsGeoAltFill,
  BsEnvelope,
  BsPersonFill,
  BsPhone,
  BsUpload,
} from "react-icons/bs";

import style from "./UpdateUser.module.scss";
import Button from "@/components/Button";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@/firebase/config";
import * as userService from "@/services/users";
import { routes } from "@/config";

const UpdateUser = () => {
  const location = useLocation();
  const { _id, createdAt, __v, password, ...user } = location.state;
  const [newUser, setNewUser] = useState({
    ...user,
  });
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    return () =>
      newUser.profilePicture.preview &&
      URL.revokeObjectURL(newUser.profilePicture.preview);
  }, [newUser.profilePicture]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setNewUser({ ...newUser, [e.target.name]: file });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const upload = (avatar) => {
    if (typeof avatar.file === "string") {
      setUploaded(true);
      return;
    }
    const fileName = new Date().getTime() + avatar.label;
    let storageRef = ref(storage, `/${avatar.type}/${avatar.page}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Done is " + progress + " %");
        if (progress === 100) {
          setUploaded(true);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewUser((prev) => ({ ...prev, [avatar.label]: url }));
        });
      }
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload({
      file: newUser.profilePicture,
      label: "profilePicture",
      type: "images",
      page: "users",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(newUser, _id);
      navigate(routes.users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={clsx(style["update-user"])}>
      <div className={clsx(style.header)}>
        <h1 className={clsx(style.title)}>Edit User</h1>
        <Button darkblue small to={routes.createUser}>
          Create
        </Button>
      </div>
      <div className={clsx(style["wrapper-user"])}>
        <div className={clsx(style.show)}>
          <div className={clsx(style.top)}>
            <img
              src={user.profilePicture}
              alt={user.name}
              className={clsx(style.avatar)}
            />
            <div className={clsx(style["wrapper-name"])}>
              <span className={clsx(style.name)}>{user.name}</span>
              <span className={clsx(style.job)}>{user.job}</span>
            </div>
          </div>
          <div className={clsx(style.bottom)}>
            <div className={clsx(style["user-title"])}>Account Details</div>
            <div className={clsx(style.info)}>
              <BsPersonFill className={clsx(style.icon)} />
              <span className={clsx(style.text)}>{user.name}</span>
            </div>
            <span className={clsx(style["user-title"])}>Contact Details</span>
            <div className={clsx(style.info)}>
              <BsPhone className={clsx(style.icon)} />
              <span className={clsx(style.text)}>{user.phone}</span>
            </div>
            <div className={clsx(style.info)}>
              <BsEnvelope className={clsx(style.icon)} />
              <span className={clsx(style.text)}>{user.email}</span>
            </div>
            <div className={clsx(style.info)}>
              <BsGeoAltFill className={clsx(style.icon)} />
              <span className={clsx(style.text)}>{user.address}</span>
            </div>
          </div>
        </div>
        <form className={clsx(style.form)}>
          <div className={clsx(style.left)}>
            <div className={clsx(style["form-group"])}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={newUser.name}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className={clsx(style["form-group"])}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={newUser.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className={clsx(style["form-group"])}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="number"
                value={newUser.phone}
                onChange={handleChange}
              />
            </div>
            <div className={clsx(style["form-group"])}>
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={newUser.address}
                onChange={handleChange}
              />
            </div>
            <div className={clsx(style["form-group"])}>
              <label htmlFor="job">Job</label>
              <input
                id="job"
                name="job"
                type="text"
                value={newUser.job}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={clsx(style.right)}>
            <div className={clsx(style.upload)}>
              <img
                src={
                  newUser.profilePicture.preview
                    ? newUser.profilePicture.preview
                    : newUser.profilePicture
                }
                alt={user.name}
                className={clsx(style.avatar)}
              />
              <label htmlFor="file">
                <BsUpload className={clsx(style.icon)} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="profilePicture"
                onChange={handleChange}
              />
            </div>
            {uploaded ? (
              <Button small steal onClick={handleSubmit}>
                Update
              </Button>
            ) : (
              <Button small steal onClick={handleUpload}>
                Upload
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
