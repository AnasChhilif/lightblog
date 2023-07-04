// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzi8BK2rmI7yvIEFB2PhfLht97rTTY5I0",
  authDomain: "lightblog-2248b.firebaseapp.com",
  projectId: "lightblog-2248b",
  storageBucket: "lightblog-2248b.appspot.com",
  messagingSenderId: "69311236558",
  appId: "1:69311236558:web:6da5ce837a412d1ae6439f",
  measurementId: "G-9M0WXBHTXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const blogTitleField = document.querySelector('.title');
    const articleFeild = document.querySelector('.article');
    const publishBtn = document.querySelector('.publish-btn');

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    publishBtn.addEventListener('click', () => {
        if(articleFeild.value.length && blogTitleField.value.length){
            // generating id
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            let id = '';
            for(let i = 0; i < 4; i++){
                id += letters[Math.floor(Math.random() * letters.length)];
            }

            // setting up docName
            let docName = `${blogTitle}-${id}`;
            let date = new Date(); // for published at info

            //access firstore with db variable;
            db.collection("blogs").doc(docName).set({
                title: blogTitleField.value,
                article: articleFeild.value,
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            })
            .then(() => {
                location.href = `/${docName}`;
            })
            .catch((err) => {
                console.error(err);
            })
        }
    })
});
