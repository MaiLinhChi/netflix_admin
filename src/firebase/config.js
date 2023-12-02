import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyATDPwp-k6P1x8gT7tuhFW435k_KMcMiJM',
    authDomain: 'netflix-3d6ed.firebaseapp.com',
    projectId: 'netflix-3d6ed',
    storageBucket: 'netflix-3d6ed.appspot.com',
    messagingSenderId: '670048244647',
    appId: '1:670048244647:web:7ab48d223a584d85e39c82',
    measurementId: 'G-D9ZRNHT9RG',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, ref, uploadBytesResumable, getDownloadURL };
