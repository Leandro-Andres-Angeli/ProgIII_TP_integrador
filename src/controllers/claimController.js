exports.postClaim = async (req, res) => {
  try {
    const { asunto, descripcion, idReclamoTipo } = req.body;
    const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
      [asunto, descripcion, new Date(), idReclamoTipo]
    );

    if (newClaimQuery.affectedRows === 0) {
      return res
        .status(500)
        .json({ ok: false, message: 'Error creando nuevo Reclamo' });
    }
    connection.release();
    return res
      .status(200)
      .json({ ok: true, message: 'Reclamo creado con exito' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error de servidor' });
  }
};
