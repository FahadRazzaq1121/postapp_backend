import User from "../users/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Login } from "../type";

export const loginService = async (data: Login) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const jwtToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  return { jwtToken, message: "Login Successfully" , success: true};  
};
