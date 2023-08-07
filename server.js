const express = require("express");

const app = express();

const port = 3001;

app.get("/", (req, res) => {
  res.send({
    employee1: {
      Nabil: {
        age: "20",
        skills: ["React", "Javascript", "Expessjs"],
        hobby: "Football",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
