import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn(),
        db: [{
            name: 'Nath',
            email: 'nath@test.com'
        },
        {
            name: 'Alisson',
            email: 'alisson@test.com'
        }
        ]
    }

    let userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve devolver um erro caso o usuário não informe o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório.' })
    })

    it('Deve chamar a função getAllUsers', () => {

        const mockUserService: Partial<UserService> = ({
            getAllUsers: jest.fn()
        })

        const userController = new UserController(mockUserService as UserService)

        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

        userController.getAllUsers(mockRequest, mockResponse)        

        expect(mockResponse.state.status).toBe(200)
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })

    it('Deve retornar erro caso não passe o e-mail', () => {
        const mockRequest = {
            body: {
                name: 'Alisson',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório.' })
    })

    it('Deve retornar erro caso não passe o e-mail e o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório. E-mail obrigatório.' })
    })

    it('Deve remover um usuário com email existente', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    })
    it('Deve retornar um erro caso o e-mail não exista', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'invalido@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário inexistente' })
    })
})
