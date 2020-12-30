/*
LECTURE: ASYNCHRONOUS JAVASCRIPT
*/

/* LESSON: ASYNC VS SYNC & EVENT LOOP */
// Note: JS is non-blocking; does not wait on the execution of function calls from the main call stack.
// How the code below works:
// "first" func is added to global exec stack (ges) with an exec context
// console.log is added to ges and "Hey there" prints; this is then removed from ges
// "second" func is called and added to ges with exec context
// "setTimeout" is called and added to ges with exec context
// callback func is sent to Web APIs (setTimeout is one such api) and lives in that env
// "setTimeout" is done and is removed from ges
// "second" func finishes and its exec context is removed from ges
// "first" func then execs 2nd console.log
// console.log exec context is added to ges and "The end" prints; then removed from ges
// "first" func finishes and its exec context is removed from ges
// after 2000 ms, Web APIs (setTimeout) sends callback func to Message Queue
// Event Loop pulls callback func from message queue, places on ges with exec context
// console.log is added to ges and "Async: Hey there" prints
// console.log is removed from ges, followed by callback func exec context
// DONE!

/*const second = () => {
  setTimeout(() => {
    console.log('Async: Hey there');
  }, 2000);
};

const first = () => {
  console.log('Hey there');
  second();
  console.log('The end');
};

first();*/


/* LESSON: CALLBACKS */

/*function getRecipe() {
  setTimeout(() => {
    const  recipeID = [523, 883, 432, 974];
    console.log(recipeID);

    setTimeout(id => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas'
      };
      console.log(`${id}: ${recipe.title}`);

      setTimeout(publisher => {
        const recipe2 = {
          title: 'Italian Pizza',
          publisher: 'Jonas'
        };
        console.log(recipe2);
      }, 1500, recipe.publisher);
    }, 1500, recipeID[2]);
  }, 1500);
}
getRecipe();*/

/* LESSON: PROMISES */
// Note: What is a promise?
  // Object that keeps track whether a certain event has happened already, or not.
  // Determines what happens after the event has happened.
  // Implements the concept of a future value that we are expecting.
// Note: Promise States
  // Pending            = Before event has happened
  // Settled/Resolved   = After the event has happened
  // Fulfilled          = Successful promise; value is available
  // Rejected           = Unsuccessful promise; value not available
// Note: in code below, "resolve" and "reject" Promise args are callback funcs

/*const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randNum = Math.round( Math.random() * 10 );
    console.log(randNum);
    randNum > 3
      ? resolve([523, 883, 432, 974])
      : reject('500 Server Error');
  }, 1500);
});

const getRecipe = recipeId => {
  return new Promise((resolve, reject) => {
    setTimeout(id => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas'
      };
      resolve(`${id}: ${recipe.title}`);
    }, 1500, recipeId);
  });
}

const getRelated = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(pub => {
      const recipe2 = {
        title: 'Italian Pizza',
        publisher: 'Jonas'
      };
      resolve(recipe2);
    }, 1500, publisher);
  });
};*/

/*getIDs
  .then(ids => {
    console.log(ids);
    return getRecipe(ids[2]);
  })
  .then(recipe => {
    console.log(recipe);
    return getRelated(recipe.publisher);
  })
  .then(recipe => {
    console.log(`Related recipe ${recipe.title}`, recipe);
  })
  .catch(err => {
    console.log(err);
  });*/

/* LESSON: ASYNC AWAIT (INTRO'D IN ES8 OR ES2017) */
// Note: "async" causes function to run in background without blocking the main thread

/*async function getRecipesAW() {
  const IDs = await getIDs;
  console.log(IDs);
  const recipe = await getRecipe(IDs[2]);
  console.log(recipe);
  const related = await getRelated(recipe.publisher);
  console.log(related);

  return recipe;
}
getRecipesAW()
  .then(value => console.log(value));*/

/* LESSON: AJAX AND APIs */
// Note: AJAX = Asynchronous JavaScript And XML
// Note: Fetch is a Web API that can be use to make network requests (but you know this already :D)
// Note: Must setup and use NPM package "live-server" to simulate call from a server; otherwise CORS will cause a failure when using Fetch

function getCountry(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(result => {
      console.log(result);
      return result.json();
    })
    .then(data => {
      console.log(data);
      console.log(`Welcome to ${data[0].name}! This is one of the most popular countries in ${data[0].subregion}!`);
    })
    .catch(err => console.log(err));
}
//getCountry('colombia');

/* LESSON: AJAX (USING FETCH) WITH ASYNC/AWAIT */

async function getCountryAW(name) {
  try {
    const result = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const data = await result.json();
    console.log(data);
    console.log(`Welcome to ${data[0].name}! This is one of the most popular countries in ${data[0].subregion}!`);
    return data;
  } catch(err) {
    console.log(err);
    alert(err);
  };
}
getCountryAW('colombia');
let dataGhana;
getCountryAW('ghana')
  .then(data => {
    dataGhana = data;
    console.log(`[${data[0].name}]:`, dataGhana);
  });
