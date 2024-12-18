const User = require('../Models/User')
const bcrypt = require('bcrypt')

const UserController = {

    /**
     * @desc this is func for Create new user
     * @method POST
     */

    addUser : async (req, res) => {
        const {name, email, password, address, phone} = req.body ;

        const emailExists = await User.findOne({email : email}) ;
        if (emailExists) return res.status(400).json({ message : "email already exists"})
            
        const phoneExists = await User.findOne({ phone : phone}) ;
        if (phoneExists) return res.status(400).json({ message : "phone already exists"})

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            phone: phone,
        })

        await newUser.save() ;
        return res.status(200).json({ message : 'user added successfully'})
    } ,

    logingIn : async (req, res) => {
        const { email, password} = req.body;

        const emailMatch = await User.findOne({ email });

        if(!emailMatch) return res.status(404).json({ message : "user not found"});

        const passwordIsMatch = await bcrypt.compare(password, emailMatch.password) ;
        if(!passwordIsMatch) return res.status(400).json({ message : "password is not correct!" });

        return res.status(200).json({ emailMatch })
    } ,

    changePassword : async (req, res) => {
        const {id, email, prevPassword, newPassword } = req.body;

        let findUser = await User.findOne({ email} );

        if(!findUser) return res.status(404).json({message : 'user not found !'});

        const isMatch = await bcrypt.compare(prevPassword, findUser.password)
        if (!isMatch) return res.status(400).json({message : "password is Not Match"})

        const hashPassword = await bcrypt.hash(newPassword, 10)

        let update = await User.findByIdAndUpdate(id, {password : hashPassword})

        if(!update) return res.status(400).json({message : "error while updating password"})

        return res.status(200).json({message : "password updated successfully"})

    }
}


module.exports = UserController