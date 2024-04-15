import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [
        {
            name: 'Joana',
            email: 'joana@test.com'
        },
        {
            name: 'Alisson',
            email: 'alisson@test.com'
        }
    ]
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');        
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve remover um usuário existente', () => {
        const mockDb2: User[] = [
            {
                name: 'Joana',
                email: 'joana@test.com'
            },
            {
                name: 'Alisson',
                email: 'alisson@test.com'
            }
        ]
        const userService2 = new UserService(mockDb2);

        const mockConsole = jest.spyOn(global.console, 'log')

        userService2.deleteUser({
            name: 'Alisson',
            email: 'alisson@test.com'
        })

        expect(mockConsole).toHaveBeenCalledWith('DB atualizado2', mockDb2)
    })
})
