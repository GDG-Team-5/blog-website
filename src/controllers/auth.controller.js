import { authService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//register user middleware
const register = handleCatchError(async (req, res) => {
  const { message, user } = await authService.register(req.body);
  res.status(201).json({ message, user });
});

export default { register };
