import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";

import { connection } from "../config/database/mysql";

class CreatedModel {
  static async getConstructoras() {
    const [query] = await connection.query(`SELECT * FROM CONSTRUCTORAS`);

    // @ts-ignore
    if (query.length == 0) {
      return { message: "No hay constructoras creadas" };
    }

    return { data: query };
  }

  static async createConstructora(data: any) {
    const [query] = await connection.query(
      `INSERT INTO CONSTRUCTORAS
        (NOMBRE_COMERCIAL, RAZON_SOCIAL, NIT_CONSTRUCTORA)
      VALUES 
        (?, ?, ?)`,
      [
        data.NOMBRE_COMERCIAL.toUpperCase(),
        data.RAZON_SOCIAL.toUpperCase(),
        data.NIT_CONSTRUCTORA.toUpperCase(),
      ]
    );

    // @ts-ignore
    if (query.affectedRows == 0) {
      return { message: "Constructora no creada" };
    }

    return { message: "Constructora creada con éxito", data: query };
  }

  static async getProyectos() {
    const [query] = await connection.query(`SELECT * FROM PROYECTOS`);

    // @ts-ignore
    if (query.length == 0) {
      return { message: "No hay proyectos creados" };
    }

    return { data: query };
  }

  static async createProyecto(data: any) {
    const [query] = await connection.query(
      `INSERT INTO PROYECTOS
        (ID_CONSTRUCTORA, NOMBRE_PROYECTO, UBICACION_PROYECTO, DIRECCION_PROYECTO)
      VALUES 
        (?, ?, ?, ?)`,
      [
        data.ID_CONSTRUCTORA,
        data.NOMBRE_PROYECTO.toUpperCase(),
        data.UBICACION_PROYECTO.toUpperCase(),
        data.DIRECCION_PROYECTO.toUpperCase(),
      ]
    );

    // @ts-ignore
    if (query.affectedRows == 0) {
      return { message: "Proyecto no creado" };
    }

    return { message: "Proyecto creado con éxito", data: query };
  }

  static async createTracking(data: any) {
    const [query] = await connection.query(
      `INSERT INTO TRACKING
        (ID_PROYECTO, IMAGEN_TRACKING, OBSERVACION_TRACKING)
      VALUES 
        (?, ?, ?)`,
      [data.ID_PROYECTO, data.IMAGEN_TRACKING, data.OBSERVACION_TRACKING]
    );

    // @ts-ignore
    if (query.affectedRows == 0) {
      return { message: "Tracking no creado" };
    }

    return { message: "Tracking creado con éxito", data: query };
  }

  static async getUsers() {
    const [query] = await connection.query(`SELECT * FROM USUARIOS`);

    // @ts-ignore
    if (query.length == 0) {
      return { message: "No hay usuarios creados" };
    }

    return { data: query };
  }

  static async createApartament(data: any) {
    // *=============================* Crear apartamento *=============================*
    const [Apartamentos] = await connection.query(
      `INSERT INTO APARTAMENTOS
        (ID_COMPRADOR, ID_PROYECTO, METRAJE_APARTAMENTO, PISO_APARTAMENTO, TIPO_APARTAMENTO, PRECIO_APARTAMENTO)
      VALUES 
        (?, ?, ?, ?, ?, ?)`,
      [
        data.ID_COMPRADOR,
        data.ID_PROYECTO,
        data.METRAJE_APARTAMENTO,
        data.PISO_APARTAMENTO,
        data.TIPO_APARTAMENTO,
        data.PRECIO_APARTAMENTO,
      ]
    );

    // @ts-ignore
    if (Apartamentos.affectedRows == 0) {
      return { message: "Apartamento no creado" };
    }
    // *=============================* Crear apartamento *=============================*

    // *=============================* Crear venta *=============================*
    const [Ventas] = await connection.query(
      `INSERT INTO VENTAS
        (ID_ASESOR, ID_APARTAMENTO)
      VALUES 
        (?, ?)`,
      // @ts-ignore
      [data.ID_ASESOR, Apartamentos.insertId]
    );

    // @ts-ignore
    if (Ventas.affectedRows == 0) {
      return { message: "Venta no creada" };
    }
    // *=============================* Crear venta *=============================*

    // *=============================* Crear cartera *=============================*
    const [Cartera] = await connection.query(
      `INSERT INTO CARTERA
        (ID_USUARIO, PRECIO_TOTAL, ABONO_ACTUAL, CUOTAS_ACORDADAS)
      VALUES
        (?, ?, ?, ?)`,
      [
        data.ID_COMPRADOR,
        data.PRECIO_APARTAMENTO,
        data.ABONO_ACTUAL,
        data.CUOTAS_ACORDADAS,
      ]
    );

    // @ts-ignore
    if (Cartera.affectedRows == 0) {
      return { message: "Cartera no creada" };
    }
    // *=============================* Crear cartera *=============================*

    // *=============================* Crear cuota *=============================*
    const [Cuota] = await connection.query(
      `INSERT INTO CUOTAS (ID_CARTERA, VALOR_ABONO) VALUES (?, ?)`,
      // @ts-ignore
      [Cartera.insertId, data.ABONO_ACTUAL]
    );

    // @ts-ignore
    if (Cuota.affectedRows == 0) {
      return { message: "Cuota no creada" };
    }
    // *=============================* Crear cuota *=============================*

    return {
      message: "Apartamento creado con éxito",
      data: {
        apartamento: Apartamentos,
        venta: Ventas,
        cartera: Cartera,
        cuota: Cuota,
      },
    };
  }

  static async createRol(data: any) {
    const [query] = await connection.query(
      `INSERT INTO ROLES
        (NOMBRE_ROL, DESCRIPCION_ROL)
      VALUES 
        (?, ?)`,
      [data.NOMBRE_ROL, data.DESCRIPCION_ROL]
    );

    // @ts-ignore
    if (query.affectedRows == 0) {
      return { message: "Rol no creado" };
    }

    return { message: "Rol creado con éxito", data: query };
  }

  static async getCarteras() {
    const [query] =
      await connection.query(`SELECT C.ID_CARTERA, U.NOMBRE_COMPLETO, C.PRECIO_TOTAL 
      FROM CARTERA C 
      LEFT JOIN USUARIOS U 
        ON U.ID_USUARIO =  C.ID_USUARIO
    `);

    // @ts-ignore
    if (query.length == 0) {
      return { message: "No hay carteras creadas" };
    }

    return {
      message: "Datos consultados con exito",
      data: query,
    };
  }

  static async createCuota(data: any) {
    const [query] = await connection.query(
      `INSERT INTO CUOTAS
        (ID_CARTERA, VALOR_ABONO, FECHA_ABONO)
      VALUES 
        (?, ?, ?)`,
      [data.ID_CARTERA, data.VALOR_ABONO, data.FECHA_ABONO]
    );

    // @ts-ignore
    if (query.affectedRows == 0) {
      return { message: "Cuota no creada" };
    }

    // actualizar el valor de ABONO_ACTUAL en la tabla CARTERA sumando el valor que tiene mas el valor de data.VALOR_ABONO
    const [updateCartera] = await connection.query(
      `UPDATE CARTERA 
        SET ABONO_ACTUAL = ABONO_ACTUAL + ?
      WHERE ID_CARTERA = ?`,
      [data.VALOR_ABONO, data.ID_CARTERA]
    );

    // @ts-ignore
    if (updateCartera.affectedRows == 0) {
      return { message: "Cartera no actualizada" };
    }

    return {
      message: "Cuota creada con éxito",
      data: { cuotas: query, updateCartera },
    };
  }
}

export default CreatedModel;
