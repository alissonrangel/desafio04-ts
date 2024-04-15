import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        let message = ""
        let erro: boolean = false
        if(!user.name){
            message += " Name obrigatório."            
            erro = true
        }
        if(!user.email){
            message += " E-mail obrigatório."
            erro = true
        }
        if (erro) {
            return response.status(400).json({ message: `Bad request!${message}`})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    }
    
    deleteUser = (request: Request, response: Response) => {
        const body = request.body
        
        let user = this.userService.db.find(item => item.email === body.email)        
        if (user) {
            console.log('Deletando usuário...', user)
            this.userService.deleteUser(user)    
            return response.status(200).json({ message: 'Usuário deletado'})
        }        
        return response.status(400).json({ message: 'Usuário inexistente'})
    }
}
