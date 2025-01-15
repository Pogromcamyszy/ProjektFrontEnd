
interface IRegistryUser {
    user_name: String,
    user_lastName: string,
    user_password: string,
    user_nickname: string,
    user_description: string
}

interface IRegistryFormMsg {
    user_name_msg: String,
    user_lastName_msg: string,
    user_password_msg: string,
    user_nickname_msg: string,
    user_description_msg: string
}

export {IRegistryUser, IRegistryFormMsg};