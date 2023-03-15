import axios from "axios";

function extraiLinks(arrLinks) {
    return arrLinks.map((obj) => {
        return Object.values(obj).join();
    })
}

async function checaStatus (listaURLs) {
    const arrStatus = await Promise
    .all(
      listaURLs.map(async (url) => {
        try {
          const response = await fetch(url)
          return response.status;
        } catch (erro) {
          return manejaErros(erro);
        }
      })
    )
    return arrStatus;
}

function manejaErros (erro) {
    if (erro.code === 'ENOTFOUND') {
      return 'link não encontrado';
    } else {
      return 'ocorreu algum erro';
    }
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    
    return listaDeLinks.map((link, indice) => ({
        ...link,
        status: status[indice]
    }))
}