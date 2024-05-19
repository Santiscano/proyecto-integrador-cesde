import { Router } from "express";

import ApiKeys from "../middlewares/apiKey";
import ValidateToken from "../middlewares/token";

import authRoutes from './auth.routes';
import roles from './roles.routes';
import apartaments from './apartaments.routes';

const route = Router();

const api = new ApiKeys();

// list routes 
route.use( "/auth", authRoutes );
route.use( "/roles", roles );
route.use( "/apartaments", apartaments );

export default route;
