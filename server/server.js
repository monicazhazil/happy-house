// Express and npm set-up
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Controllers
const getHouse = require("./controller/getHouse");
const getHouses = require("./controller/getHouses");
const getUser = require("./controller/getUser");

// Const App will be using Express method
const app = express();

app.use(express.json());
app.use(cors());

// Get House per Name and Post ToDosPerDay Routes
app
  .route("/houses/:houseName")
  .get((req, res) => {
    let houseName = req.params.houseName;
    res.json(getHouse(houseName));
  })
  .post((req, res) => {
    let houseName = req.params.houseName;
    let houses = getHouses();
    let newId = uuidv4();
    let toDoName = req.body.name;
    let toDoUser = req.body.user;
    let color = req.body.userColor;
    let day = req.body.day;
    let myHouse = houses.filter((house) => house.houseName == houseName)[0];
    let newToDo = {
      toDoId: newId,
      name: toDoName,
      user: toDoUser,
      userColor: color,
    };
    myHouse.toDosPerDay[day].push(newToDo);
    fs.writeFileSync("./model/houses.json", JSON.stringify(houses));
    res.json(myHouse);
  });

// Get All Houses / Post New House Routes
app
  .route("/houses")
  .get((req, res) => {
    res.json(getHouses());
  })
  .post((req, res) => {
    const housesArray = getHouses();
    const houseObject = {
      id: uuidv4(),
      houseName: req.body.houseName,
      toDos: [
        { id: "i", name: "vacuum" },
        { id: "ii", name: "do the laundry" },
        { id: "iii", name: "take out the trash" },
        { id: "iv", name: "meal prep" },
        { id: "v", name: "mop" },
        { id: "vi", name: "go grocery shopping" },
        { id: "vii", name: "clean the bathroom" },
        { id: "viii", name: "water the plants" },
        { id: "ix", name: "dust" },
      ],
      toDosPerDay: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
      comments: [],
    };
    housesArray.push(houseObject);
    fs.writeFileSync("./model/houses.json", JSON.stringify(housesArray));
    res.json(housesArray);
  });

// Get/Post User per UserName Routes
app.route("/users/:userName").get((req, res) => {
  let userName = req.params.userName;
  res.json(getUser(userName));
});
app.route("/users").post((req, res) => {
  // Create New User only if provided House Name already exists
  let houseName = req.body.houseName;
  let houses = getHouses();
  let found = false;

  for (i = 0; i < houses.length && found === false; i++) {
    if (houses[i].houseName === houseName) {
      found = true;
    } else {
      found = false;
    }
  }

  let newUser = {
    id: uuidv4().toString(),
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    houseName: houseName,
    color: req.body.color,
  };
  let usersData = fs.readFileSync("./model/users.json");
  let userArray = JSON.parse(usersData);
  if (found === true) {
    userArray.push(newUser);
    fs.writeFileSync("./model/users.json", JSON.stringify(userArray));
    res.json({ message: "Saved user" });
  } else {
    res.json({ message: "House Name Not Found" });
  }
});

// App listening on local host
app.listen(5000, console.log("app is listening at http://localhost:5000"));
