export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    },
    {
        name: "Alisson",
        email: "alisson@dio.com",
    },
    {
        name: "Nath",
        email: "nath@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (user: User) => {        
        let index = this.db.indexOf(user)
        this.db.splice(index, 1)
        
        console.log('DB atualizado2', this.db);
    }
}

