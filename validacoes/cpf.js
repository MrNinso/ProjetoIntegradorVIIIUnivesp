module.exports = (cpf) => {
    if (!(cpf instanceof string))
        return { errID: 'BVCP001', error: 'CPF tem que ser uma string' }
    ;

    if (cpf.length !== 11)
        return { errID: 'BVCP002', error: 'O CPF tem que ter 11 digitos numericos' }
    ;

    if (isNaN(+cpf))
        return { errID: 'BVCP003', error: 'O CPF tem que ter 11 digitos numericos' }
    ;

    const dig = cpf[0]
    let isCPFDigsEqual = true

    for (let i = 1; i < 11; i++) {
        if (dig !== cpf[i]) {
            isCPFDigsEqual = false
            break
        }
    }

    if (isCPFDigsEqual) {
        return { errID: 'BVCP004', error: `O CPF ${cpf} não é valido` }
    }
 
    let soma = 0

    for (i=1; i<=9; i++) 
        soma = soma + (+cpf.substring(i-1, i)) * (11 - i)
    ;

    let resto = (soma * 10) % 11

    if ((resto == 10) || (resto == 11)) 
        resto = 0
    ;
    
    if (resto != (+cpf.substring(9, 10)) )
        return { errID: 'BVCP005', error: `O CPF ${cpf} não é valido` }
    ;

    soma = 0

    for (i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    ;

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) 
        resto = 0
    ;
    
    if (resto != parseInt(cpf.substring(10, 11) ) )
        return { errID: 'BVCP006', error: `O CPF ${cpf} não é valido` }
    ;

    return true
}