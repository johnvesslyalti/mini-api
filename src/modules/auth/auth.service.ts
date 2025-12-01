import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { comparePassword, hashPassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { create, findByEmail } from "./auth.repository"

export const register = async (data: any) => {
    const exists = await findByEmail(data.email);
    if (exists) throw new ApiError(409, "Email already in use");

    const hashed = await hashPassword(data.hashPassword)

    const user = await create({
        name: data.name,
        email: data.email,
        password: hashed
    })
    return new ApiResponse(true, "Registered succefully", user)
}

export const login = async (data: any) => {
    const user = await findByEmail(data.email);
    if (!user) throw new ApiError(404, "user not found");

    const valid = await comparePassword(data.password, user.password);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    const token = signToken({ id: user.id, email: user.email });

    return { success: true, token }
}