const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");
require("dotenv").config();

const registerVendor = async (req, res) => {
    try {
        const tempVendor = await Vendor.findOne({emailID: req.body.emailID});

        if (tempVendor) {
            return res.status(400).json({error: "Email already in use"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const password = await bcrypt.hash(req.body.password, salt);

        const vendor = new Vendor(req.body);
        vendor.password = password;

        await vendor.save();

        const payload = {
            user: {
                id: vendor._id,
                userType: "Vendor",
            }
        }

        vendor.password = undefined

        jwt.sign(
            payload,
            process.env.SECRETKET,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err;
                res.json({token, vendor});
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
}

/*
async function verify(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.user_id)

    const token = await Token.findOne({
        user: req.params.user_id,
        token: req.params.token
    })
    if (token === null) {
        return res.send("Token not found")
    }

    console.log(token.token)

    if (req.params.type === '2') {
        await Customer.updateOne({_id: req.params.user_id}, {verified: true})
    } else if (req.params.type === '3') {
        await Vendor.updateOne({_id: req.params.user_id}, {verified: true})
    }

    await Token.findOneAndDelete({token: token.token})

    res.send("Verified")
}
*/
const loginVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ emailID: req.body.emailID });
        if (!vendor) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const check = await bcrypt.compare(req.body.password, vendor.password);
        if (!check) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: vendor._id,
                userType: "Vendor",
            }
        };

        vendor.password = undefined;

        jwt.sign(
            payload,
            process.env.SECRETKEY,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, vendor });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const getVendor = async (req, res) => {
    try {
        if (req.user.userType !== "Vendor") {
            return res.status(400).json({error: "User is not a vendor"});
        }
        const vendor = await Vendor.findById(req.user.id);
        vendor.password = undefined;
        res.status(200).json({success: "Vendor found", vendor});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const updateVendor = async (req, res) => {
    try {
        if (req.user.userType !== "Vendor") {
            return res.status(400).json({error: "User is not a vendor"});
        }
        const vendorByEmail = await Vendor.findOne({emailID: req.body.emailID});

        if (vendorByEmail && vendorByEmail._id !== req.user.id) {
            return res.status(400).json({error: "This email ID is already in use"});
        }

        await Vendor.findByIdAndUpdate({_id: req.user.id}, req.body);
        res.status(200).json("Vendor updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports = {
    getVendor,
    updateVendor,
    registerVendor,
    loginVendor,
};
