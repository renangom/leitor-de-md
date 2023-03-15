import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador='') {
    if(valida) {
        console.log(chalk.yellow('lista validada'), chalk.black.bgGreen(identificador), await listaValidada(resultado))

    }else {
        console.log(chalk.yellow('lista validada'), chalk.black.bgGreen(identificador),resultado)
    }

}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    if(fs.lstatSync(caminho).isFile()) {

        const resultado = await pegaArquivo(caminho);
        await imprimeLista(valida, resultado)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivosDir = await fs.promises.readdir(caminho)
        arquivosDir.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`);
            await imprimeLista(valida,lista, arquivo)
        })
        console.log(arquivosDir)
    }
}

processaTexto(caminho);