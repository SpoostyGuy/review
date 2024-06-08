var express = require('express')
var app = express()
var request = require('request')
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded());
app.post('/proxy', function(req, res) {
    try {
        request.post('https://www.croxyproxy.com/servers', {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "en-US,en;q=0.9",
              "cache-control": "no-cache",
              "content-type": "application/x-www-form-urlencoded",
              "pragma": "no-cache",
              "priority": "u=0, i",
              "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
              "cookie": "__cpu=1695166956.1908159277",
              "Referer": "https://www.croxyproxy.com/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "url=" + encodeURIComponent(req.body.url) + "&csrf=RXFOUlV0ZjFxdHg5L1VGd1ZrazRKUmxldmpjdGNpSUhXTmg0R2c4K1l6dXNka3NiR2p4NjUrMnU4UU1nQ0JkNUFEelk5TnVmOFZNMVRlYzFpUVlod0pxQXFvRE13SUsySGhKdmtPb2tWeWM9",
            "method": "POST"
          }, function(err, res2, body) {
            res.cookie('website', req.body.url)
            res.status(200).send(body)
          })
    } catch(e) {
        res.status(500).send('error')
    }
})


app.post('/requests', function(req,res) {
    if (req.cookies.website != undefined) {
        if (req.body.url == 'undefined') {
            req.body.url = req.cookies.website
        }
        var bodyEncoded = ""
        for (var key in req.body) {
            var val = req.body[key]
            bodyEncoded = bodyEncoded + key + '=' + encodeURIComponent(val) + '&'
        }
        bodyEncoded = bodyEncoded.substring(0,bodyEncoded.length-1)
        request.post('https://www.croxyproxy.com/requests?fso=', {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "en-US,en;q=0.9",
              "cache-control": "no-cache",
              "content-type": "application/x-www-form-urlencoded",
              "pragma": "no-cache",
              "priority": "u=0, i",
              "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
              "cookie": "__cpu=1695166956.1908159277",
              "Referer": "https://www.croxyproxy.com/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": bodyEncoded,
            "method": "POST"
          }, function(err, res2, body) {
            res.setHeader('location', res2.headers.location)
            res.status(res2.statusCode).send(body)
          })
    
    }
})


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/sw.js', function(req, res) {
    res.sendFile(__dirname + '/sw.js')
})

app.listen(3000)
module.exports = app