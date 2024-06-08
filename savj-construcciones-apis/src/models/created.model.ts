import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";

import { connection } from "../config/database/mysql";


class CreatedModel {

  static async getConstructoras(){
    const [query] = await connection.query(`SELECT * FROM CONSTRUCTORAS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay constructoras creadas" };
    }

    return { data: query };
  }

  static async createConstructora(data: any) {
    const [query] = await connection.query(`INSERT INTO CONSTRUCTORAS
        (NOMBRE_COMERCIAL, RAZON_SOCIAL, NIT_CONSTRUCTORA)
      VALUES 
        (?, ?, ?)`, [ 
        data.NOMBRE_COMERCIAL.toUpperCase(), data.RAZON_SOCIAL.toUpperCase(), 
        data.NIT_CONSTRUCTORA.toUpperCase()
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Constructora no creada" };
    }

    return { message: "Constructora creada con éxito", data: query };
  }



  static async getProyectos(){
    const [query] = await connection.query(`SELECT * FROM PROYECTOS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay proyectos creados" };
    }

    return { data: query };
  }

  static async createProyecto(data: any) {
    const [query] = await connection.query(`INSERT INTO PROYECTOS
        (ID_CONSTRUCTORA, NOMBRE_PROYECTO, UBICACION_PROYECTO, DIRECCION_PROYECTO)
      VALUES 
        (?, ?, ?, ?)`, [
        data.ID_CONSTRUCTORA, data.NOMBRE_PROYECTO.toUpperCase(),
        data.UBICACION_PROYECTO.toUpperCase(), data.DIRECCION_PROYECTO.toUpperCase()
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Proyecto no creado" };
    }

    return { message: "Proyecto creado con éxito", data: query };
  }



  static async createTracking(data: any) {
    const [query] = await connection.query(`INSERT INTO TRACKING
        (ID_PROYECTO, IMAGEN_TRACKING, OBSERVACION_TRACKING)
      VALUES 
        (?, ?, ?)`, [
        data.ID_PROYECTO, data.IMAGEN_TRACKING, data.OBSERVACION_TRACKING
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Tracking no creado" };
    }

    return { message: "Tracking creado con éxito", data: query };
  }

  static async getUsers(){
    const [query] = await connection.query(`SELECT * FROM USUARIOS`);

    // @ts-ignore
    if(query.length == 0){
      return { message: "No hay usuarios creados" };
    }

    return { data: query };
  }



  static async createApartament(data: any) {
    const [query] = await connection.query(`INSERT INTO APARTAMENTOS
        (ID_COMPRADOR, ID_PROYECTO, METRAJE_APARTAMENTO, PISO_APARTAMENTO, TIPO_APARTAMENTO, PRECIO_APARTAMENTO)
      VALUES 
        (?, ?, ?, ?, ?, ?)`, [
        data.ID_COMPRADOR, data.ID_PROYECTO, data.METRAJE_APARTAMENTO,
        data.PISO_APARTAMENTO, data.TIPO_APARTAMENTO, data.PRECIO_APARTAMENTO
      ]
    );

    // @ts-ignore
    if(query.affectedRows == 0){
      return { message: "Apartamento no creado" };
    }

    return { message: "Apartamento creado con éxito", data: query };
  }

}

export default CreatedModel;
