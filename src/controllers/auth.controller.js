import { authService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//register user middleware
const register = handleCatchError(async (req, res) => {
  const { message, user } = await authService.register(req.body);
  res.status(201).json({ message, user });
});

//login user middleware
const login = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, token } = await authService.login(email, password);
  res.status(200).json({ message, token });
});

export default { register, login };
