const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(409).json({
        errormessage: "Username Already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserData = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });
    await UserData.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {

    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const UserDetails = await User.findOne({ email });

    if (!UserDetails) {
      return res.status(401).json({
        errormessage: "Invalid Credentials!!",
      });
    }
    const passwordMatches = await bcrypt.compare(
      password,
      UserDetails?.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        errormessage: "Invalid Credentials!!",
      });
    }

    const token = jwt.sign(
      {
        userId: UserDetails?._id,
        username: UserDetails?.username,
        email: UserDetails?.email
      },
      process.env.SECRET_CODE,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "User Login SuccessFully",
      _id: UserDetails?._id,
      token,
    });
  } catch (error) {

    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};

const getuser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const UserDetails = await User.findById({ _id: id }).select("-password");

    if (!UserDetails) {
      return res.status(404).json({
        errormessage: "User not found!!",
      });
    }

    res.status(200).json({
      data: UserDetails
    });
  } catch (error) {

    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};
const getAlluser = async (req, res) => {
  try {

    const UserDetails = await User.find({});
    if (!UserDetails) {
      return res.status(404).json({
        errormessage: "User not found!!",
      });
    }

    return res.status(200).json({
      data: UserDetails
    });
  } catch (error) {

    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser, getuser, getAlluser };
