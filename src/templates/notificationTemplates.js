
module.exports = {
    conta_a_vencer: (data) => {
        const diasParaVencimento = calcularDiasParaVencimento(data.dataVencimento);
        const dataFormatada = formatarData(data.dataVencimento);
        
        return {
            title: `Conta de ${data.tipoConta} a vencer`,
            message: `Sua conta de ${data.tipoConta} no valor de R$ ${data.valor.toFixed(2)} vence em ${diasParaVencimento} dia(s) (${dataFormatada}).`
        };
    },

    meta_atingida: (data) => {
        return {
            title: `Parabéns! Meta atingida`,
            message: `Você atingiu sua meta de ${data.nomeMeta} com o valor de R$ ${data.valorAtual.toFixed(2)}. Continue assim!`
        };
    }
};

function calcularDiasParaVencimento(dataVencimento) {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento - hoje;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
}
