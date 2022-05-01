module.exports = (rh) => 
    [ '+', '-' ].find(r => r === rh) !== undefined ?
    {} : { errID: 'BVRH001', error: 'Fator Rh inválido (+, -)' }