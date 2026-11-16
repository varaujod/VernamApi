export class VernamView {
    static renderCifrar(data) {
        return {
            textoCifrado: data.textoCifrado
        };
    }
    static renderDecifrar(data) {
        return {
            textoClaro: data.textoClaro
        };
    }
    static renderError(mensagemErro) {
        return {
            erro: mensagemErro
        };
    }
}
