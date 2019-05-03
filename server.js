const express = require('express'); //
const uid = require('uid'); // unique id
const app = express(); // function that creates new express server instance called 'app'
const fs = require('fs'); // require the file system
app.use(express.json()); //Middleware
app.use(express.static('./dist')); // set express to use the directory /dist as default

let cards = [
  {
    id: uid(),
    title: 'The Colony',
    description:
      'Forced underground by the next ice age, a struggling outpost of survivors must fight to preserve humanity against a threat even more savage than nature.',
    category: 'thriller'
  },
  {
    id: uid(),
    title: 'Dr Who',
    description:
      'An eccentric inventor and his companions travel in his TARDIS to the Planet Skaro and battle the evil menace of the Daleks.',
    category: 'sci-fi'
  },
  {
    id: uid(),
    title: 'Die Hard',
    description:
      'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
    category: 'action'
  },
  {
    id: uid(),
    title: 'Jack Reacher',
    description:
      'A hom icide investigator digs deeper into a case involving a trained military sniper who shot five random victims.',
    category: 'action'
  }
];

/*fs.readFile(__dirname + '/cards.json', (err, data) => {
  // read file from current dir cards.json
  if (err) {
    fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), err => {
      // if there is an err because file doesn't exist, write the file
      console.log('cards.JSON was created'); // with the data from the array cards
    });
  }
});*/

app.get('/cards', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    // get data from the file cards.json
    if (err) {
      console.log(err); // if an error occurs, log err
    } else {
      res.json(JSON.parse(data)); // else, return the json stream and convert it to a js object
    }
  });
});

app.get('/cards/:id', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    if (err) {
      console.log(err); // if an error occurs, log err
    } else {
      const { id } = req.params;
      res.json(JSON.parse(data).find(card => card.id === id)); // if id is equal to card id
    }
  });
});

app.post('/cards', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const card = { id: uid(), ...req.body };
      const cardsUpdate = JSON.parse(data);
      cardsUpdate.push(card);
      console.log('Card pushed to array');
      fs.writeFile(
        __dirname + '/cards.json',
        JSON.stringify(cardsUpdate),
        err => {
          console.log('cards.JSON was created');
        }
      );
    }
  });
  res.json('new card added');
});

app.delete('/cards/:id', (req, res) => {
  fs.readFile(__dirname + '/cards.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const { id } = req.params;
      const cardsUpdate = JSON.parse(data);
      const indexOfDeleteCard = cardsUpdate.map(card => card.id).indexOf(id);
      cardsUpdate = [
        ...cardsUpdate.slice(0, indexOfDeleteCard),
        ...cardsUpdate.slice(indexOfDeleteCard + 1)
      ];
    }
  });
  res.json('card was deleted');
});

app.listen(3000, err => {
  // listen on port 3000 and console log if the server is ready
  err ? console.log(err) : console.log('Server ready');
});
