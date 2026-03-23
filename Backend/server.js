import express from 'express';
import mysql from 'mysql2'
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// node server.js


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kevin',
  database: 'damkevintimus',
  connectionLimit: 5
})

db.getConnection((err, connection) => {
  if (err) { console.error('Error:', err); return; }
  console.log('Conectado a la Pool');
  connection.release();
})

app.get("/empleats", (req, res) => {
  db.query('SELECT * FROM empleat', (err, result) => {
    if (err) {
      console.error('Error:', err);
    }
    res.json(result);
  })
})

app.get("/departaments", (req, res) => {
  db.query('SELECT * FROM departament', (err, result) => {
    if (err) {
      console.error('Error:', err);
    }
    res.json(result);
  })
})

app.post("/crearTaula", (req, res) => {
  const sql = `
    CREATE TABLE projecte (
      id_projecte  INT AUTO_INCREMENT PRIMARY KEY,
      nom          VARCHAR(100) NOT NULL,
      pressupost   DECIMAL(10,2) NOT NULL,
      id_departament INT,
      CONSTRAINT fk_projecte_dept
        FOREIGN KEY (id_departament)
        REFERENCES departament(id_departament)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log('Error: Possiblement la taula que vols crear ja existeix!');
      return res.status(500).json({
        error: 'Error: Possiblement la taula que vols crear ja existeix!'
      });
    }
    console.log('Taula creada');
    res.json('Taula creada');
  })
})

app.post("/crearDepartamento" , (req, res) => {
  const { nom, ubicacio } = req.body;
  db.query('INSERT INTO departament (nom, ubicacio) VALUES (?, ?)', [nom, ubicacio], (err, result) => {
    if (err) return res.status(500).send('Error al inserir departament');
    res.send('Departament inserit');
  });
});

app.post("/crearEmpleados" , (req, res) => {
  const { nom, cognom, salari, id_departament } = req.body;
  db.query('INSERT INTO empleat (nom, cognom, salari, id_departament) VALUES (?, ?, ?, ?)', [nom, cognom, salari, id_departament], (err, result) => {
    if (err) return res.status(500).send('Error al inserir empleats');
    res.send('Empleat inserit');
  });
});

app.put("/cambiarDatos" , (req, res) => {
  const { id_empleat, nom, salari } = req.body;
  db.query('UPDATE empleat SET nom = ?, salari = ? WHERE id_empleat = ?', [nom, salari, id_empleat], (err, result) => {
    if (err) return res.status(500).send('Error al modificar empleat');
    res.send('Empleat modificat');
  })
})

app.get('/EmpleadosPorDepartamento/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM empleat WHERE id_departament = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Error al consultar');
    res.json(results);
  });
});

app.delete('/eliminarEmpleats', (req, res) => {
  const { id_departament } = req.body;

  db.getConnection((err, connection) => {
    if (err) return res.status(500).send('Error al obtenir connexió');

    connection.beginTransaction(err => {
      if (err) return res.status(500).send('Error al iniciar transacció');

      connection.query('DELETE FROM empleat WHERE id_departament = ?', [id_departament], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).send('Error al eliminar, Rollaback');
          });
        }

        connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).send('Error al hacer commit, Rollaback');
            });
          }
          connection.release();
          res.send(`Eliminats ${result.affectedRows} empleats correctament`);
        });
      });
    });
  });
});


app.listen(3000, () => console.log('Servidor a http://localhost:3000'));
