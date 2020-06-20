const axios = require('axios');
const cheerio = require('cheerio');


const siteAlvo = 'https://go.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios';

const dados = [];

const getPage = async (link) => {
    try {
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(`Ocorreu algum problema ao extrair o dados! Erro: ${error}`)
    }
}

const coletarDadosProduto = async (link) => {
    return new Promise(async (resolve, reject) => {
        try {
            const html = await getPage(link);
            const $ = await cheerio.load(html);
            let nome = $('.fxvTMe').text();
            let valor = $('.buyYie').text();
            resolve({ link, nome, valor });
        } catch (error) {
            reject(error);
        }
    })
}

const listaLinks = async () => {
    try {
        const html = await getPage(siteAlvo);
        const $ = await cheerio.load(html);
        await $('#ad-list a').async.each(async (i, link) => {
            link = $(link).attr('href');

            const produtos = await coletarDadosProduto(link)
            console.log(produtos);
            // dados.push();
        })
    } catch (error) {
        console.log(`Ocorreu algum problema ao extrair o dados! Erro: ${error}`);
    }
}


listaLinks();