const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const appFile = fs.createReadStream(
  `${process.cwd()}/apk/${process.env.APK_NAME}`
);

const formData = new FormData();
formData.append('file', appFile, 'app-debug.apk');

axios({
  url: 'https://api-cloud.browserstack.com/app-automate/upload',
  method: 'post',
  headers: formData.getHeaders(),
  auth: {
    username: process.env.BROWSERSTACK_USERNAME,
    password: process.env.BROWSERSTACK_ACCESS_KEY
  },
  data: formData,
  maxContentLength: 1073741824
})
  .then((response) => {
    console.log('POST successful: ', response.data);
  })
  .catch((error) => {
    console.log('POST error: ', error);
  });
