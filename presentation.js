var request = require('request')
,   rsvp = require('rsvp');

// ░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░
// ░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
// ░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░
// ░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
// ░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░
// ░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░
// ░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░
// ░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
// ░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░
// ░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
// ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░
// ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
// ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░
// ░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
// ░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░
// ░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
// ░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀░░░
// ░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀░░░░░
// ░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀░░░░░░░░

//== much understanding

var addNum = function(num) {
  return function(otherNum) {
    return otherNum + num;
  }
}

var add5 = addNum(5);

console.log(add5(10));

//== such class

function Doge(name, age) {
  this.name = name;
  this.age = age;
  this.prefixes = ['much', 'wow', 'such'];
}

Object.defineProperty(Doge.prototype, "dogeWords", {
  get: function() { return this.prefixes; },
  set: function(words) {
    var filteredWords = words.filter(function(word) {
      return typeof word === 'string';
    });
    this.prefixes = filteredWords;
  }
});

Doge.prototype.memeText = function(subject) {
  var rand = Math.floor(Math.random() * this.prefixes.length);
  return this.prefixes[rand] + ' ' + subject;
}

Doge.prototype.birthYear = function() {
  return this.name + " was born in " + (2015 - this.age);
}

var kabosu = new Doge("Kabosu", 8);
console.log(kabosu.dogeWords);
kabosu.dogeWords = kabosu.dogeWords.concat(['rly', 'how', 'so', 'very', 'plz', 23, {much: "doge"}]);
console.log(kabosu.dogeWords);
console.log(kabosu.memeText('neckbeard love'));
console.log(kabosu.birthYear());

//== wow callbacks

function step1() {
  console.log('step1');
}

function step2() {
  console.log('step2');
}

function step3() {
  console.log('step3');
}

function fakeRequest(time, cb) {
  setTimeout(cb, time);
}

fakeRequest(3000, step1);
//

//== such problem: callback nesting
//
fakeRequest(3000, function() {
  step1();
  fakeRequest(3000, function() {
    step2();
    fakeRequest(3000, function() {
      step3();
    });
  });
});

//== much solution: promises
//
function fakeRequestPromise(time) {
  return new rsvp.Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('Successful');
    }, time);
  });
}

fakeRequestPromise(3000).then(function(result) {
  console.log(result);
  step1();
  return fakeRequestPromise(3000);
}).then(function(result) {
  console.log(result);
  step2();
  return fakeRequestPromise(3000);
}).then(function(result) {
  console.log(result);
  step3();
}).catch(function(error) {
  console.log(error);
});

//== wow promises

function getPagePromise(pageNum) {
  return new rsvp.Promise(function(resolve, reject) {
    request('http://localhost:8000/pages/page' + pageNum + '.json', function(err, res, body) {
      if (!err) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
}
//
getPagePromise(1).then(function(body) {
  console.log(body.page);
  return getPagePromise(2);
}).then(function(body) {
  console.log(body.page);
  return getPagePromise(3);
}).catch(function(err) {
  console.log(err);
});
//
// //== much wow concurrent promises
//
var pages = [1, 2, 3];

var pagePromises = pages.map(function(page) {
  return getPagePromise(page);
});

rsvp.Promise.all(pagePromises).then(function(results) {
  console.log(results);
}).catch(function(err) {
  console.log(err);
});

