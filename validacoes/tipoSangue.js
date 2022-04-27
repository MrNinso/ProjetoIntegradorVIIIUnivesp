module.exports = (tipoSangue) => 
    [ 'AB', 'A', 'B', 'O' ].find(tipo => tipo === tipoSangue) !== undefined ?
    {} : { errID: 'BVTS001', error: 'tipo de sangue errado' }
