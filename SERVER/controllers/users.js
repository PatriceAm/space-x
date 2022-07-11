const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/userModel");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  const usersInfo = users.map((user) => user.username);
  response.json(usersInfo);
});

usersRouter.post("/", async (request, response, next) => {
  const {username, name, password} = request.body;

  if (!username || !name || !password) {
    return response.status(400).json({
      error: "Please add all fields!",
    });
  }

  const existingUser = await User.findOne({username});

  if (existingUser) {
    return response.status(400).json({
      error: `${existingUser.username} already is taken! Please try another one.`,
    });
  }

  if (!(password && password.length > 5)) {
    return response.status(400).json({
      error: "Password must contain at least 8 characters!",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.put(
  "/update/:username",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const userId = request.user;
    const username = request.params.username;
    const newPassword = request.body.newPassword;

    const userToChange = await User.findOne({username});

    if (userToChange === null) {
      return response.status(400).json({
        error: "Please double check your login credentials.",
      });
    }

    if (userToChange.username !== userId) {
      return response.status(400).json({
        error: "Unexpected error!",
      });
    }

    if (!(newPassword && newPassword.length > 5)) {
      return response.status(400).json({
        error: "New password must contain at least 8 characters!",
      });
    }
    const saltRounds = 10;
    const passwordHash2 = await bcrypt.hash(newPassword, saltRounds);

    userToChange.passwordHash = passwordHash2;

    const result = await User.findByIdAndUpdate(userToChange.id, userToChange, {
      new: true,
    });
    response.json(result);
  }
);

usersRouter.delete(
  "/:username",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const loggedInUser = request.user;
    const username = request.params.username;
    const userToDelete = await User.findOne({loggedInUser});

    if (userToDelete.username && userToDelete.username !== loggedInUser) {
      return response.status(400).json({
        error: "Unexpected error!",
      });
    }

    if (userToDelete) {
      await User.findByIdAndDelete(userToDelete.id);
      response.status(204).end();
    }
  }
);

module.exports = usersRouter;
