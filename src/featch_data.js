import { User } from "./user_class.module.js";
fetch("https://dummyjson.com/users")
  .then((response) => response.json())
  .then((data) => {
    for (let index = 0; index < data["users"].length; index++) {
      console.log( User.fromJSON(data["users"][index]));
    }
  })
  .catch((error) => console.error("Error:", error));
