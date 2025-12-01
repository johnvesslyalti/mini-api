import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await authService.register(req.body);
        res.json(data);
    } catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await authService.login(req.body)
        res.json(data)
    } catch (err) {
        next(err)
    }
}