
import Listening from "../Modules/Listening.module.js";

export const CreateListening = async (req, res, next) => {
     try {
        const listening = await Listening.create(req.body);
        res.status(201).json(listening)
     } catch (error) {
        next(error)
     }
}