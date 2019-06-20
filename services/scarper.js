const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

function getImages(html) {
    return new Promise((resolve, reject) => {
        const imgTags = $('img', html);
        const assets = [];
        for (let i = 0; i < imgTags.length; i++) {
            assets.push(imgTags[i].attribs.src);
        }
        resolve({assets: assets})
    });
}

function getLinks(html) {
    return new Promise((resolve, reject) => {
        const aTags = $('a', html);
        const links = [];
        for (let i = 0; i < aTags.length; i++) {
            //sometimes the a tag is empty for styling reason so we only add href that have value
            if(aTags[i].attribs.href) links.push(aTags[i].attribs.href)
        }
        resolve({links: links})
    });
}

function parseHtml(html){
    return new Promise((resolve, reject) => {
        // the idea here is to run parsing of A tags and Image tags in parallel to speed up the process
        Promise.all([getLinks(html), getImages(html)]).then(function(values) {
            resolve({...values[0], ...values[1]})
        });
    });
}

exports.isValidURL= str => {
    var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
};

exports.fetch = url => {
    return new Promise((resolve, reject) => {
        rp(url)
            .then(function(html){
                //success!
                parseHtml(html).then(parsed => resolve(parsed) )
            })
            .catch(function(err){
                reject(err)
            });
    });
};