const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function cat(path) {
    fs.readFile(`${path}`, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('File contents: ', `${data}`);
    })
}

async function webCat(URL) {
    try {
        let resp = await axios.get(URL);
        console.log(resp);
    }
    catch (err) {
        console.log(err);
    }
}

if (argv[2].includes('http')) {
    webCat(argv[2]);
}
else {
    cat(argv[2]);
}