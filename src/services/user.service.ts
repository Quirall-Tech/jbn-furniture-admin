import { User } from "../db/models/User";


export class UserService {
    //userlist
    userList = async () => {
        try {
            const user = await User.find()
            return user;
        } catch (err) {
            throw err;
        }
    }
    //updateUser
    updateUser = async (userId: any, data: any) => {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, data, { new: true });
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }
    //blockUser
    blockUser = async (userId: any) => {
        try {
            const user = await User.findOneAndUpdate({ _id: userId }, { isBlocked: true }, { new: true });
            return user;
        } catch (err) {
            throw err;
        }
    }
    //unblockUser
    unBlockUser = async (userId: any) => {
        try {
            const user = await User.findOneAndUpdate({ _id: userId }, { isBlocked: false }, { new: true });
            return user;
        } catch (err) {
            throw err;
        }
    }
}