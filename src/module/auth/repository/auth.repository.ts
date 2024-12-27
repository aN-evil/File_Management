import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';

@Injectable()
export class AuthRepository {
    constructor(private readonly prismaService: PrismaService) {}

    findUserByEmailOruserName(email: string, username: string) {
        return this.prismaService.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });
    }

    createUser(data: {
        email: string;
        password: string;
        username: string;
        fullName: string;
        authKey: string;
    }) {
        return this.prismaService.user.create({
            data,
            select: { id: true },
        });
    }

    findUserByEmail(email: string, isDeleted: boolean) {
        return this.prismaService.user.findUnique({
            where: { email, isDeleted },
            select: { id: true, password: true, authKey: true },
        });
    }

    findUserById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                isDeleted: true,
            },
        });
    }

    createGuestUser(data: { isGuest: boolean; expiresAt: Date }) {
        return this.prismaService.user.create({
            data,
        });
    }

    deleteExpiredGuests(currentTime: Date) {
        return this.prismaService.user.deleteMany({
            where: {
                isGuest: true,
                expiresAt: { lt: currentTime },
            },
        });
    }

    updateUserRefreshToken(id: string, hashedRefreshToken: string) {
        return this.prismaService.user.update({
            where: { id },
            data: { refreshToken: hashedRefreshToken },
        });
    }

    deleteUserById(id: string) {
        return this.prismaService.user.delete({
            where: { id },
            select: { id: true },
        });
    }

    findUserForRefreshToken(userId: string) {
        return this.prismaService.user.findUnique({
            where: { id: userId, isDeleted: false },
            select: { id: true, refreshToken: true },
        });
    }
}
