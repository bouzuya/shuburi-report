# shuburi-report

shuburi-report

# Deployment

## 1. Press Heroku button

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## 2. Set environment variables

[Create new Twitter app](https://apps.twitter.com/) and retrieve following values:

- Consumer Key (API Key)
- Consumer Secret (API Secret)
- Access Token
- Access Token Secret

AWS credentials

- AWS_S3_BUCKET
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION

## 3. Add job in Heroku Scheduler console

 TASK                | DYNO | FREQUENCY
---------------------|------|------------------
 $ npm run collector | 1X   | Daily
 $ npm run watcher   | 1X   | Every 10 minutes
 $ npm run worker    | 1X   | Daily

## 4. keep alive settings (optional)

You need to send a HTTP request every 10 minutes.

e.g. [Uptime Robot](https://uptimerobot.com/) or [pingdom](https://www.pingdom.com/) or [New Relic](http://newrelic.com/).

# License

[MIT](LICENSE)

# Author

[bouzuya][] &lt;[m@bouzuya.net][email]&gt; ([bouzuya.net][url])

[bouzuya]: https://github.com/bouzuya/
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
