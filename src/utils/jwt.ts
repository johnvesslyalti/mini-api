import jwt from "jsonwebtoken"
import { env } from "../config/env"

export const signToken = (payload: Object) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d" })
}