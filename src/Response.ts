import { Response } from "express";

export const r200 = (
    res: Response,
    data: any,
    message: string = "Success"
) => {
    return res.status(200).json({ message, data: data });
};
export const r404 = (
    res: Response,
    message: string = "Data not found"
) => {
    return res.status(404).json({ message });
};
export const r403 = (
    res: Response,
    message: string = "Data input not valid"
) => {
    return res.status(403).json({ message });
};
export const r401 = (
    res: Response,
    message: string = "Account verification denied"
) => {
    return res.status(401).json({ message });
};
export const r400 = (res: Response, message: string = "Request denied") => {
    return res.status(401).json({ message });
};