import clsx from 'clsx';
import { useState } from 'react';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '@/firebase/config';
import { useNavigate } from 'react-router-dom';

import style from './CreateUser.module.scss';
import Button from '@/components/Button';
import config from '@/config';
import * as userService from '@/services/users';

const CreateUser = () => {
    const [user, setUser] = useState({ isAdmin: 'false' });
    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setUser({ ...user, [e.target.name]: e.target.files[0] });
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const upload = (avatar) => {
        const fileName = new Date().getTime() + avatar.label;
        let storageRef = ref(storage, `/${avatar.type}/${avatar.page}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, avatar.file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Done is ' + progress + ' %');
                if (progress === 100) {
                    setUploaded(true);
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUser((prev) => ({ ...prev, [avatar.label]: url }));
                });
            },
        );
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload({ file: user.profilePicture, label: 'profilePicture', type: 'images', page: 'users' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.createUser(user);
        } catch (error) {
            console.log(error);
        }
        navigate(config.routes.users);
    };

    return (
        <div className={clsx(style['create-user'])}>
            <h1 className={clsx(style.title)}>New User</h1>
            <form className={clsx(style.form)}>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={user.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={user.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="number"
                        name="phone"
                        placeholder="Your number"
                        value={user.phone || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Your address"
                        value={user.address || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="job">Job</label>
                    <input
                        id="job"
                        type="text"
                        name="job"
                        placeholder="Your job"
                        value={user.job || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="admin">Role</label>
                    <select name="isAdmin" id="admin" onChange={handleChange}>
                        <option value="true">User</option>
                        <option value="false">Admin</option>
                    </select>
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="avatar">Profile picture</label>
                    <input id="avatar" type="file" name="profilePicture" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    {uploaded ? (
                        <Button small darkblue className={clsx(style['custom-btn'])} onClick={handleSubmit}>
                            Create
                        </Button>
                    ) : (
                        <Button small darkblue className={clsx(style['custom-btn'])} onClick={handleUpload}>
                            Upload
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
