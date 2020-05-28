#JavaScript

* A **higher-order function** is a function that does at least one of the following:
  * Returns a function as its result.
  * Takes one or more functions as arguments (i.e. procedural parameters),
    * Example `filter()`:
    ```javascript
    var animals = [
      { name: "Rex", species: "dog"},
      { name: "Ringo", species: "frog"},
      { name: "Kiko", species: "cat"},
      { name: "Donnie", species: "dog"},
    ];

    var isDog = function(animal) {
      return animal.species === 'dog';
    }

    var dogs = animals.filter(isDog);

    console.log(dogs);
    ```

* The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. ([Read more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring))
  ```javascript
  let a, b, rest;
  [a, b] = [10, 20];
  console.log(a); // 10
  console.log(b); // 20

  [a, b, ...rest] = [10, 20, 30, 40, 50];
  console.log(a); // 10
  console.log(b); // 20
  console.log(rest); // [30, 40, 50]

  ({ a, b } = { a: 10, b: 20 });
  console.log(a); // 10
  console.log(b); // 20


  // Stage 4(finished) proposal
  ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
  console.log(a); // 10
  console.log(b); // 20
  console.log(rest); // {c: 30, d: 40}

  // Object destructuring
  const user = {
      id: 42,
      is_verified: true
  };

  const {id, is_verified} = user;

  console.log(id); // 42
  console.log(is_verified); // true
  ```
* [**Callback function**](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
  * A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. Example:
    ```javascript
    function greeting(name) {
      alert('Hello ' + name);
    }

    function processUserInput(callback) {
      var name = prompt('Please enter your name.');
      callback(name);
    }

    processUserInput(greeting);
    ```
    * The above example is a synchronous callback, as it is executed immediately.
    * Note, however, that callbacks are often used to continue code execution after an asynchronous operation has completed — these are called asynchronous callbacks. A good example is the callback functions executed inside a [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) block chained onto the end of a promise after that promise fulfills or rejects. This structure is used in many modern web APIs, such as [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

* [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  * A `Promise` is an object representing the eventual completion or failure of an asynchronous operation. Essentially, a promise is a returned object you attach callbacks to, instead of passing callbacks into a function.

  ```javascript
  let p = new Promise(function (resolve, reject) {
    let items = [0, 1];
    let item = items[Math.floor(Math.random() * items.length)];

    if (item === 1) {
      resolve('Congratulations! Operation succeeded!');
    } else {
      reject(' Operation failed. The value is 0.');
    }

  });


  p.then((message) => {
    console.log('This is in the then(): ' + message);
  }).catch((message) => {
    console.log('This is in the catch(): ' + message);
  });
  ```

  ```javascript
  let p = new Promise(function (resolve, reject) {
    let items = [0, 1];
    let item = items[Math.floor(Math.random() * items.length)];

    if (item === 1) {

      let someData = [0, 2, 6, 8];
      someData.push(10);

      let data = {
        'type' : 'success',
        'someData' : someData,
        'message' : 'Congratulations! You did it!'
      };

      resolve(data);
    } else {

      let data = {
          'type' : 'error',
          'message' : 'Oh! No! It fails again!'
      };

      reject(data);
    }

  });

  p.then((data) => {
    console.log('Im inside THE FIRST then()');
    console.log(data);
    data.new_element = "Added element to data!";
    return data;
  })
  .then((data) => {
    console.log('Im inside THE SECOND then()');
    console.log(data);
  })
  .catch((data) => {
    console.log(data);
  });
  ```
