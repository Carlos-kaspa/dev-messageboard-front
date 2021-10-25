export interface IUserInfo {
    avatar_url: string,
    github_id: number,
    id: string,
    login: string,
    name: string
}

export interface IMessages {
    created_at: string,
    id: number,
    text: string,
    user: IUserInfo,
    user_id: string,
}



export interface Props {
    messageAmount: number
}