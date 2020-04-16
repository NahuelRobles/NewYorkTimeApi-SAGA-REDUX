import axios from 'axios';
import Config from 'react-native-config';


export function fetchBook() {
    console.log("GET")
  return axios.get(`http://api.nytimes.com/svc/books/lists/hardcover-fiction?response-format%20=json&api-key=MFnsjwTglM0hzEwgi6txVFPE0LjIqwIK`);
}

