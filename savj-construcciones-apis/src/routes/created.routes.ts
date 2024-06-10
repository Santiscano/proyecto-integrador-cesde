import { Router } from "express";
import CreatedController from "../controllers/created.controller";

const route = Router();

route.get( "/constructoras", CreatedController.getConstructoras );
route.post( "/constructora", CreatedController.createConstructora );

route.get( "/proyectos", CreatedController.getProyectos );
route.post( "/proyecto", CreatedController.createProyecto );


route.post( "/tracking", CreatedController.createTracking );

route.get( "/users", CreatedController.getUsers );

route.post( "/apartamento", CreatedController.createApartament );

route.post( "/rol", CreatedController.createRol );

route.get( "/carteras", CreatedController.getCarteras );

route.post( "/cuota", CreatedController.createCuota );

export default route;
