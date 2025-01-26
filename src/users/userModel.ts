import mongoose, { Schema, Model } from "mongoose";

export enum UserRoles {
  User = "User",
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
}

interface Users {
  email: string;
  name: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<Users>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    name:{
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoles,
      default: UserRoles.User,
    },
  },
  { timestamps: true, collection: "users" }
);

const User: Model<Users> = mongoose.model("User", UserSchema);

export default User;
