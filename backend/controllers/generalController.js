const getUserType = async (req, res) => {
    try {
        res.status(200).json({success: "User found", userType: req.user.userType});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports = {
    getUserType,
};
