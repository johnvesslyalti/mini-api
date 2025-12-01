import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header) throw new ApiError(401, "Missing Authorization Header");

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch {
        throw new ApiError(401, "Invalid Token")
    }
}