import { connection } from "../config/database/mysql";
import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";


class ApartamentsModel {

  static async getAllApartaments( iduser: string | number ) {
    const [apts] = await connection.query(`SELECT pr.ID_PROYECTO, pr.NOMBRE_PROYECTO, pr.UBICACION_PROYECTO, 
        ap.METRAJE_APARTAMENTO, ap.PISO_APARTAMENTO, ap.TIPO_APARTAMENTO, ap.PRECIO_APARTAMENTO, ca.ABONO_ACTUAL
      FROM APARTAMENTOS ap
      LEFT JOIN PROYECTOS pr ON ap.ID_PROYECTO = pr.ID_PROYECTO
      LEFT JOIN CARTERA ca ON ca.ID_APARTAMENTO = ap.ID_APARTAMENTO
      WHERE ap.ID_COMPRADOR = ?;`, [iduser]
  );

    return { message: "success", data: apts };
  }

  static async getTracking( idProject: string | number ) {
    const [tracking] = await connection.query(
      `SELECT 
        pr.NOMBRE_PROYECTO, pr.UBICACION_PROYECTO, pr.DIRECCION_PROYECTO, tr.IMAGEN_TRACKING, tr.OBSERVACION_TRACKING, tr.FECHA_TRACKING 
      FROM 
        TRACKING tr
      LEFT JOIN 
        PROYECTOS pr
      ON 
        tr.ID_PROYECTO = pr.ID_PROYECTO
      WHERE 
        tr.ID_PROYECTO = ?
      ORDER BY 
        tr.FECHA_TRACKING ASC;
      `, 
      [idProject]
    );

    // const [tracking] = await connection.query(`SELECT pr.ID_PROYECTO, pr.NOMBRE_PROYECTO, pr.UBICACION_PROYECTO, 
    //     ap.METRAJE_APARTAMENTO, ap.PISO_APARTAMENTO, ap.TIPO_APARTAMENTO, ap.PRECIO_APARTAMENTO, 
    //     tr.ID_TRACKING, tr.ID_APARTAMENTO, tr.FECHA_TRACKING, tr.ESTADO_TRACKING 
    //   FROM APARTAMENTOS ap
    //   LEFT JOIN PROYECTOS pr 
    //     ON ap.ID_PROYECTO = pr.ID_PROYECTO
    //   LEFT JOIN TRACKING tr 
    //     ON ap.ID_APARTAMENTO = tr.ID_APARTAMENTO
    //   WHERE pr.ID_PROYECTO = ?;`, [idProject] 
    // );

    return { message: "success", data: tracking };
  }
}

export default ApartamentsModel;
