import { userService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const getProfile = handleCatchError(async (req, res) => {
  const { id } = req.user;
  const myProfile = await userService.getUserProfile(id);

  res.status(200).send(myProfile);
});

const updateUserName = handleCatchError(async (req, res) => {
  const { userName } = req.body;
  const { id } = req.user;
  const updatedProfile = await userService.updateUserName(id, userName);
  res.status(200).send(updatedProfile);
});

export default { getProfile, updateUserName };
