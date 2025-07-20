import mongoose from "mongoose";

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<User>({
  id: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: String }
});

//map shema to model
const UserDbModel = mongoose.model<User>("Users", userSchema);

const getUsers = async () => {
  const users = await UserDbModel.find();
  return users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

const createUser = async (user: User) => {
  const newUser = new UserDbModel({ ...user, email: user.email.toLowerCase() });
  await newUser.save();

  const { _id, name, email, createdAt, updatedAt } = newUser;

  return {
    id: _id,
    name,
    email,
    createdAt,
    updatedAt,
  };
};

const getByEmail = async (email: string) => {
  const user = await UserDbModel.findOne({ email });
  const { _id, name, createdAt, updatedAt, role } = user || {};

  return {
    id: _id,
    name,
    email,
    role,
    createdAt,
    updatedAt,
  } as User;
};

const getById = async (id: string) => {
  const user = await UserDbModel.findById(id);
  const { _id, name, email, createdAt, updatedAt } = user || {};

  return {
    id: _id,
    name,
    email,
    createdAt,
    updatedAt,
  };
};

const getEncryptedPasswordByEmail = async (email: string) => {
  const user = await UserDbModel.findOne({email});
  const { password } = user || {};
  return password;
};

const doesUserExist = async (email: string) => {
  const user = await UserDbModel.exists({ email: email.toLowerCase() });
  return user ? true : false;
};

const isUserCredentialsValid = async (email: string, password: string) => {
  return (await UserDbModel.exists({ email, password })) !== null;
};

const updatePassword = async (_id: string, password: string) => {
  await UserDbModel.updateOne({_id}, { password });
};

const User = {
  getUsers,
  getByEmail,
  createUser,
  getById,
  doesUserExist,
  isUserCredentialsValid,
  getEncryptedPasswordByEmail,
  updatePassword,
};

export default User;
