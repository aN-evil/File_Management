import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from '../repository/auth.repository';
import { AuthService } from '../auth.service';
import { AppConfigService } from '../../../config/config.service';

jest.mock('bcrypt');

describe('AuthService', () => {
    let authService: AuthService;
    let authRepository: AuthRepository;
    let jwtService: JwtService;
    let appConfigService: AppConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: AuthRepository,
                    useValue: {
                        findUserByEmailOrDisplayName: jest.fn(),
                        createUser: jest.fn(),
                        findUserByEmail: jest.fn(),
                        findUserById: jest.fn(),
                        createGuestUser: jest.fn(),
                        deleteExpiredGuests: jest.fn(),
                        updateUserRefreshToken: jest.fn(),
                        findUserForRefreshToken: jest.fn(),
                        deleteUserById: jest.fn(),
                    },
                },
                {
                    provide: AppConfigService,
                    useValue: {
                        accessToken: 3600,
                        refreshToken: 86400,
                        jwtPublic: 'secret',
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                        verifyAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authRepository = module.get<AuthRepository>(AuthRepository);
        appConfigService = module.get<AppConfigService>(AppConfigService);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user if no existing user with the same email or displayName', async () => {
            const dto = {
                email: 'test@example.com',
                password: 'password123',
                displayName: 'testUser',
            };
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                displayName: 'testUser',
            };
            const mockTokens = {
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            };

            // Mocking repository methods
            authRepository.findUserByEmailOrDisplayName = jest
                .fn()
                .mockResolvedValue(null);
            authRepository.createUser = jest.fn().mockResolvedValue(mockUser);
            authService.generateTokens = jest
                .fn()
                .mockResolvedValue(mockTokens);

            // Hash password method mock
            jest.spyOn(authService, 'hashPassword').mockResolvedValue(
                'hashedPassword',
            );

            const result = await authService.createUser(dto);

            expect(
                authRepository.findUserByEmailOrDisplayName,
            ).toHaveBeenCalledWith(dto.email, dto.displayName);
            expect(authRepository.createUser).toHaveBeenCalledWith({
                email: dto.email,
                password: 'hashedPassword',
                displayName: dto.displayName,
            });
            expect(authService.generateTokens).toHaveBeenCalledWith(
                mockUser.id,
            );
            expect(result).toEqual({
                id: mockUser.id,
                accessToken: mockTokens.accessToken,
                refreshToken: mockTokens.refreshToken,
            });
        });

        it('should handle existing user and delete if marked as deleted', async () => {
            const dto = {
                email: 'test@example.com',
                password: 'password123',
                displayName: 'testUser',
            };
            const existingUser = {
                id: 1,
                email: 'test@example.com',
                displayName: 'testUser',
                isDeleted: true,
            };

            authRepository.findUserByEmailOrDisplayName = jest
                .fn()
                .mockResolvedValue(existingUser);
            authRepository.deleteUserById = jest.fn().mockResolvedValue(null);

            // Hash password method mock
            jest.spyOn(authService, 'hashPassword').mockResolvedValue(
                'hashedPassword',
            );

            const result = await authService.createUser(dto);

            expect(
                authRepository.findUserByEmailOrDisplayName,
            ).toHaveBeenCalledWith(dto.email, dto.displayName);
            expect(authRepository.deleteUserById).toHaveBeenCalledWith(
                existingUser.id,
            );
        });

        it('should throw an error if user already exists and is not deleted', async () => {
            const dto = {
                email: 'test@example.com',
                password: 'password123',
                displayName: 'testUser',
            };
            const existingUser = {
                id: 1,
                email: 'test@example.com',
                displayName: 'testUser',
                isDeleted: false,
            };

            authRepository.findUserByEmailOrDisplayName = jest
                .fn()
                .mockResolvedValue(existingUser);

            await expect(authService.createUser(dto)).rejects.toThrowError(
                'User already exists',
            );
        });
    });
    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('deleteExpiredGuests', () => {
        it('should delete expired guests', async () => {
            const currentTime = new Date();
            jest.spyOn(authRepository, 'deleteExpiredGuests').mockResolvedValue(
                undefined,
            );

            await authService.deleteExpiredGuests();
            expect(authRepository.deleteExpiredGuests).toHaveBeenCalledWith(
                currentTime,
            );
        });
    });
});
