const salaValidator = {
    nome: {
        required: "O campo Nome é Obrigatório",
        minLength: {
            value: 1,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Qtd máxima de caracteres ultrapassada"
        },
        
    },
    capacidade: {
        min: {
            value: 1,
            message: "O valor mínimo é 1"
        },
    },
    tipo: {
        required: "O campo Tipo é Obrigatório",
        maxLength: {
            value: 1,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    }
}

export default salaValidator