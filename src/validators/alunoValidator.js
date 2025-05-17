const professorValidator = {
    nome: {
        required: "O campo Nome é Obrigatório",
        minLength: {
            value: 3,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 50,
            message: "Qtd máxima de caracteres ultrapassada"
        },

    },
    cpf: {
        required: "O campo CPF é Obrigatório",
        minLength: {
            value: 14,
            message: "Qtd mínima de caracteres não informado"
        },
        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    matricula: {

        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    email: {

        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    telefone: {


        maxLength: {
            value: 15,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    cep: {


        maxLength: {
            value: 11,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    logradouro: {


        maxLength: {
            value: 100,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    complemento: {


        maxLength: {
            value: 100,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    numero: {


        maxLength: {
            value: 20,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
    bairro: {


        maxLength: {
            value: 100,
            message: "Qtd máxima de caracteres ultrapassada"
        },
    },
}

export default professorValidator