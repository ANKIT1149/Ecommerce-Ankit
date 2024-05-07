import express from 'express';
import { VerifyToken } from '../utils/VerifyToken.js';
import { CreateListening } from '../controllers/Listening.controllers.js';

const ListeningRouter = express.Router();

ListeningRouter.post('/create', VerifyToken, CreateListening);

export default ListeningRouter;