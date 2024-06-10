import { Request, Response } from "express";
import CreatedModel from "../models/created.model";

import { resStatus } from "../helpers/resStatus";
import ApiResponses from "../helpers/apiResponse";
import MissingData from "../helpers/missingData";

import { TypeCreated } from '../interfaces/created';

class CreatedController {
  static table: string = "";
  static pktable: string = "";

  static async getConstructoras(req: Request, res: Response) {
    try {
      const constructoras = await CreatedModel.getConstructoras();
      return constructoras.data
        ? res.status(resStatus.success).json(ApiResponses.success( constructoras, "Constructoras encontradas" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Constructoras no encontradas" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
  static async createConstructora(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newConstructora = await CreatedModel.createConstructora( data );
      return newConstructora.data
        ? res.status(resStatus.success).json(ApiResponses.success( newConstructora.data, newConstructora.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newConstructora.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }



  static async getProyectos(req: Request, res: Response) {
    try {
      const proyects = await CreatedModel.getProyectos();
      return proyects.data
        ? res.status(resStatus.success).json(ApiResponses.success( proyects, "Proyectos encontrados" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Proyectos no encontrados" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
  static async createProyecto(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newProyecto = await CreatedModel.createProyecto( data );
      return newProyecto.data
        ? res.status(resStatus.success).json(ApiResponses.success( newProyecto.data, newProyecto.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newProyecto.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createTracking(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newTracking = await CreatedModel.createTracking( data );
      return newTracking.data
        ? res.status(resStatus.success).json(ApiResponses.success( newTracking.data, newTracking.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newTracking.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await CreatedModel.getUsers();
      return users.data
        ? res.status(resStatus.success).json(ApiResponses.success( users, "Usuarios encontrados" ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( "Usuarios no encontrados" ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/success' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createApartament(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newApartament = await CreatedModel.createApartament( data );
      return newApartament.data
        ? res.status(resStatus.success).json(ApiResponses.success( newApartament.data, newApartament.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newApartament.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }


  static async createRol(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    const data = { ...req.body };
    try {
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newRol = await CreatedModel.createRol( data );
      return newRol.data
        ? res.status(resStatus.success).json(ApiResponses.success( newRol.data, newRol.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newRol.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }

  static async getCarteras(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    try {
      const newCarteras = await CreatedModel.getCarteras();
      return newCarteras.data
        ? res.status(resStatus.success).json(ApiResponses.success( newCarteras.data, newCarteras.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newCarteras.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      /* #swagger.responses[500] = { description: 'Error server', schema: { $ref: '#/definitions/unsuccessfully' }} */
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
  static async createCuota(req: Request, res: Response) {
    /* #swagger.tags = ['created'] #swagger.description = 'creacion de modulos' */
    /*  #swagger.parameters['body'] = { in: 'body', description: 'datos para crear un@ modulo', schema: { $ref: '#/definitions/created' }} */
    try {
      const data = { ...req.body };
      const missing = MissingData.missingData(data);
      if(missing.error) return res.status(resStatus.unCompleted).json(ApiResponses.uncompleted(missing.missing));

      const newCuota = await CreatedModel.createCuota( data );
      return newCuota.data
        ? res.status(resStatus.success).json(ApiResponses.success( newCuota.data, newCuota.message ))
        : res.status(resStatus.unCompleted).json(ApiResponses.errorMessage( newCuota.message ))
      /* #swagger.responses[200] = { description: 'Response success', schema: { $ref: '#/definitions/createdRes' }} */
      /* #swagger.responses[400] = { description: 'UnCompleted', schema: { $ref: '#/definitions/errorMessage' }} */
      /* #swagger.responses[422] = { description: 'UnCompleted', schema: { $ref: '#/definitions/uncompleted' }} */
    } catch (error) {
      return res.status(resStatus.serverError).json(ApiResponses.unsuccessfully( error ));
    }
  }
}

export default CreatedController;
