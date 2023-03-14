import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;


async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    if(fs.lstatSync(caminho).isFile()) {

        const resultado = await pegaArquivo(caminho);
        console.log(chalk.yellow('Lista de links'),resultado);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivosDir = await fs.promises.readdir(caminho)
        arquivosDir.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`);
            console.log(lista)
            console.log(`${caminho}/${arquivo}`)
        })
        console.log(arquivosDir)
    }
}

processaTexto(caminho);