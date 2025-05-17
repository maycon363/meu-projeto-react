const semestreValidator = {
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
    data_inicio: {
        required: "O campo Data Início é Obrigatório",
        minLength: {
            value: 8,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 10,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    data_fim: {
        required: "O campo Data Fim é Obrigatório",
        minLength: {
            value: 8,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 10,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    }
}

export default semestreValidator