import { connection } from "../config/database/mysql";
import SqlCrud from "../helpers/sqlCrud";
import SQLResponse from "../interfaces/sql2";


class ApartamentsModel {

  static async getAllApartaments( iduser: string | number ) {
    const [apts] = await connection.query(`SELECT pr.NOMBRE_PROYECTO, pr.UBICACION_PROYECTO, 
        ap.METRAJE_APARTAMENTO, ap.PISO_APARTAMENTO, ap.TIPO_APARTAMENTO, ap.PRECIO_APARTAMENTO 
      FROM APARTAMENTOS ap
      LEFT JOIN PROYECTOS pr 
        ON ap.ID_PROYECTO = pr.ID_PROYECTO
      WHERE ap.ID_COMPRADOR = ?;`, [iduser]
  );

    return { message: "success", data: apts };
  }
}

export default ApartamentsModel;
