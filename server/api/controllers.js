/**
 * User model structure
 *  - fullname
 *  - password
 *  - email
 *  - verified
 *  - verificationPin
 *  - socketID (Array of all the sockets on which the user connects)
 *  - link to the friends table
 *  - link to the chats table
 */
 import { User } from '../models';
 import { passwordComparer, signToken, hashedPassword as hashingPassword } from './validator';

export const loginAccount = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const userExists = await User.findOne({ where: { email }});

    // Response to the user not found
    if (!userExists) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }

    // Validate the password
    const passwordMatches = await passwordComparer(password, userExists.password);

    // Response to the password not matching
    if (!passwordMatches) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    delete userExists.password;
    delete userExists.verificationPin;
    delete userExists.socketsId

    // sign token
    const token = await signToken(userExists);

    // response on success
    return res.status(200).json({ token });
}

export const createAccount = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // check if the email has been used
    const userExists = await User.findOne({ where: { email }});

    if (userExists) {
        return res.status(409).json({ error: 'Email has been used' });
    }

    // hash the password
    const hashedPassword = await hashingPassword(password);

    // create a verification pin
    const verificationPin = 0;

    // insert into the database
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, verificationPin });
    delete user.password;
    delete user.verificationPin;
    delete user.socketsId;

    // send a verification email
    // sign token
    const token = signToken(user);

    // response on success
    return res.status(201).json({ token });
}

export const verifyEmail = async (req, res) => {
    const { email } = req.tokenData;
    const { validationPin } = req.body;

    // check if the account exist and has not been verified
    const userExists = await User.findOne({ where: { email }});

    if (!userExists) {
        return res.status(409).json({ error: 'Email has not been registered on the server' });
    }

    if(userExists.verified) {
       return res.status(200).json({ data: 'User is verified' });
    }
    // if not verified check if the pin matches
    if(userExists.verificationPin !== validationPin) {
        // if pin does no match error response
        return res.status(400).json({ error: 'Validation pin does not match' });
    }
    // if pin matches verify the acount
    await userExists.update({ verified: true });

    // send a success response
    return res.status(200).json({ data: 'User has been verified' });
}
