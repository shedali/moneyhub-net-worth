var webdriverio = require('webdriverio'),
    fs = require('fs'),
    selenium = require('selenium-standalone'),
    options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

require('dotenv').config();

selenium.start({
  spawnOptions: {
      stdio: 'inherit'
  }
}, function(err, selenium) {
  webdriverio
    .remote(options)
    .init()
    .url('https://client.moneyhub.co.uk')
    .click('[data-aid=start-screen-signin]')
    .setValue('[type=email]', process.env.email)
    .setValue('[type=password]', process.env.password)
    .click('[data-aid=signin-button]')
    .waitForExist('[data-aid=AssetsAndLiabilitiesHero] span', 10000)
    .getText('[data-aid=AssetsAndLiabilitiesHero] span').then(function(total) {
        console.log('attempting to write total', total, 'utf8');
        fs.writeFileSync("total.txt", total, function(err) {
            console.log('in the write file sync thing');
            if(err) {
                return console.log(err);
            }
        }); 
        console.log('written to total.txt');
    })
    .end()
    .then(function(){
        selenium.kill();
    })
});



