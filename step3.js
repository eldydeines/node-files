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
    });
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

async function fileCat(fileName, inputInfo) {

    let content;
    if (inputInfo.includes('http')) {
        try {
            let resp = await axios.get(inputInfo);
            content = resp.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            content = fs.readFileSync(inputInfo, 'utf-8');
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    fs.writeFile(`${fileName}`, content, 'utf8', function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Successfully wrote to file.");
    })
}

if (argv[2].includes('http')) {
    webCat(argv[2]);
}
else if (argv[2] == '--out') {
    fileCat(argv[3], argv[4]);
}
else {
    cat(argv[2]);
}