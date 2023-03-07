const Customer = require("../models/Customer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register_user = async (req, res) => {
//     const { first_name, last_name, username, password, age, contact_no, email } =
//         req.body;
//
//     try {
//         const temp_user_username = await User.findOne({ username });
//
//         if (temp_user_username) {
//             return res.status(400).json({ msg: "User already exists" });
//         }
//
//         const temp_user_email = await User.findOne({ email });
//
//         if (temp_user_email) {
//             return res.status(400).json({ msg: "Email already exists" });
//         }
//
//         const user = new User({
//             first_name,
//             last_name,
//             username,
//             password,
//             age,
//             contact_no,
//             email,
//         });
//
//         const salt = await bcrypt.genSalt(10);
//
//         user.password = await bcrypt.hash(password, salt);
//
//         await user.save();
//
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };
//
//         user.password = undefined;
//
//         jwt.sign(
//             payload,
//             process.env.SECRETKEY,
//             { expiresIn: 3600000 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token, user });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };
//
// const login_user = async (req, res) => {
//     const { username, password } = req.body;
//
//     try {
//         const user = await User.findOne({ username });
//
//         if (!user) {
//             return res.status(400).json({ msg: "Invalid Credentials" });
//         }
//
//         const isMatch = await bcrypt.compare(password, user.password);
//
//         user.password = undefined;
//
//         if (!isMatch) {
//             return res.status(400).json({ msg: "Invalid Credentials" });
//         }
//
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };
//
//         jwt.sign(
//             payload,
//             process.env.SECRETKEY,
//             { expiresIn: 3600 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.status(200).json({ token, user });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

// const create_user_post = (req, res) => {
//   console.log(req.body);
//   // res.status(200).json({message : 'received'});
//
//   const user = new User(req.body);
//
//   user
//       .save()
//       .then((result) => {
//         console.log("User saved");
//         res.send(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// };
//
// const create_user_get = (req, res) => {
//   const new_user = new User({
//     first_name: "Lukarp",
//     last_name: "Lawarga",
//     username: "Lula",
//     password: "xyz",
//     age: 20,
//     contact_no: 9876543211,
//     email: "newuser@gmail.com",
//   });
//   new_user
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
//
// const display_all = (req, res) => {
//   User.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
//
// const display_one = (req, res) => {
//   User.findById(req.user.id)
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
const getCustomer = async (req, res) => {
    try {
        if (req.user.userType !== "Customer") {
            return res.status(400).json({error: "User is not a customer"});
        }
        const customer = await Customer.findById(req.user.id);
        customer.password = undefined;
        res.status(200).json({success: "Customer found", customer});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateCustomer = async (req, res) => {
    try {
        if (req.user.userType !== "Customer") {
            return res.status(400).json({error: "User is not a customer"});
        }
        // const customer = await Customer.findById(req.user.id);
        const customerByEmail = await Customer.findOne({emailID: req.body.emailID});
        // if (customer.emailID !== req.body.emailID && )
        if (customerByEmail && customerByEmail._id !== req.user.id) {
            return res.status(400).json({error: "This email ID is already in use"});
        }
        // const user_by_email_username = await User.findOne({
        //     email: req.body.email,
        //     username: req.body.username,
        // });
        // if (!user_by_email_username && user_by_email) {
        //     return res.status(400).json({msg: "Email already exists"});
        // }
        // await Customer.findOneAndUpdate({username: req.body.username}, req.body);
        await Customer.findByIdAndUpdate({_id: req.user.id}, req.body);
        res.status(200).json("Customer updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// const remove_follower = async (req, res) => {
//     try {
//         const found = await User.find({
//             _id: req.user.id,
//             followers: req.body.id,
//         });
//         if (!found.length) {
//             return res.status(400).json({msg: "Already not followed"});
//         }
//
//         await User.findOneAndUpdate(
//             {_id: req.user.id},
//             {
//                 $pull: {followers: req.body.id},
//                 $inc: {followers_count: -1},
//             }
//         );
//
//         res.status(200).json("Follower removed");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

// const add_follower = async (req, res) => {
//     try {
//         if (req.user.id === req.body.id) {
//             return res.status(400).json({msg: "Cannot add yourself"});
//         }
//
//         const found = await User.find({
//             _id: req.user.id,
//             followers: req.body.id,
//         });
//         if (found.length) {
//             return res.status(400).json({msg: "Already follows"});
//         }
//
//         await User.findOneAndUpdate(
//             {_id: req.user.id},
//             {
//                 $push: {followers: req.body.id},
//                 $inc: {followers_count: 1},
//             }
//         );
//
//         res.status(200).json("Follower added");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };
//
// const unfollow = async (req, res) => {
//     try {
//         const found = await User.find({
//             _id: req.user.id,
//             following: req.body.id,
//         });
//         if (!found.length) {
//             return res.status(400).json({msg: "Already not following"});
//         }
//
//         await User.findOneAndUpdate(
//             {_id: req.user.id},
//             {
//                 $pull: {following: req.body.id},
//                 $inc: {following_count: -1},
//             }
//         );
//
//         res.status(200).json("Unfollowed user");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };
//
// const follow = async (req, res) => {
//     try {
//         if (req.user.id === req.body.id) {
//             return res.status(400).json({msg: "Cannot follow yourself"});
//         }
//
//         const found = await User.find({
//             _id: req.user.id,
//             following: req.body.id,
//         });
//         if (found.length) {
//             return res.status(400).json({msg: "Already following"});
//         }
//
//         await User.findOneAndUpdate(
//             {_id: req.user.id},
//             {
//                 $push: {following: req.body.id},
//                 $inc: {following_count: 1},
//             }
//         );
//
//         await User.findOneAndUpdate(
//             {_id: req.body.id},
//             {
//                 $push: {followers: req.user.id},
//                 $inc: {followers_count: 1},
//             }
//         );
//
//         res.status(200).json("Followed user");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// };

//
// const display_by_id = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({error: 'No such user'});
//     }
//     const user = await User.findById(id);
//     res.send(user);
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// const delete_by_id = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const temp = await User.findByIdAndDelete(id);
//     console.log(temp);
//     res.send("Deletion complete");
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
    // get_user,
    // update_user,
    // login_user,
    // remove_follower,
    // add_follower,
    // register_user,
    // follow,
    // unfollow,
    getCustomer,
    updateCustomer,
};
