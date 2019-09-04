const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PDFDocument = require('pdfkit');
const fs = require('fs');
//const serverless = require('http');
const https = require('https')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

console.log("hello");

exports.handler = async function (event, context) {

    console.log("Started");
    console.log("Started1");

    const doc = new PDFDocument({ size: "A4" });
    console.log("got font size");
    doc.pipe(fs.createWriteStream('.pdf'));
    doc.fontSize(16);
    console.log("got font size");
    doc.text("Hello World");
    doc.end();
    const data = fs.readFileSync('.pdf');
    const response = {
        statusCode: 200,
        headers: {
            'Content-type': 'application/pdf',//you can change any content type
            'content-disposition': 'attachment; filename=test.pdf' // key of success
        },
        body: data.toString('base64'),
        isBase64Encoded: true
    };
    return response;
    // const response = {
    //     statusCode: 200,
    //     headers: {
    //         "contentType": "application/pdf"
    //     },
    //     body: data,
    // };
    // console.log(response)
    // return data;
    // app.get('/', (req, res) => {
    //         console.log("Started1");
    //         var doc = new PDFDocument({size: "A4"});
    //         console.log("got font size");
    //         doc.pipe(fs.createWriteStream('.pdf'));
    //         doc.fontSize(16);
    //         console.log("got font size");
    //         doc.text("Hello World");
    //         doc.end();
    //             setTimeout(function(){	
    //             var data = fs.readFileSync('.pdf');
    //             res.contentType("application/pdf");
    //             res.send(data);		
    //             },3000);
    //             setTimeout(	function(){res.end();}, 7000);
    //          })


    console.log("Completed");

    // app.listen(3000, function () {
    //     console.log('listening on port 3000')
    // });
}
//return { statusCode: 200, body: 'Hello World!' };
