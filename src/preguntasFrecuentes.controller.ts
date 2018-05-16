import { Controller, Post, Req, Get, Res, Param, HttpCode } from '@nestjs/common';

const fs = require('fs');
let preguntasHTML = fs.readFileSync(__dirname + '/html/preguntasFrecuentes.html', 'utf8');

@Controller('preguntas')
export class PreguntasFrecuentesController {

  pregunta = {
    pregunta: String,
    respuesta: String,
  };
  preguntas: PreguntasFrecuentes[] = [];

  @Post('PregunasFrecuentes')
  preguntasFrecuentes(@Req() request, @Res() response) {

    const pregFrec = {
      pregunta: request.query.pregunta,
      respuesta: request.query.respuesta,
    };

    this.preguntas.push(new PreguntasFrecuentes(pregFrec.pregunta, pregFrec.respuesta));
    return response.send(pregFrec);
  }

  @Get('PreguntasRead')
  mostrarPreguntas(@Req()request, @Res() response) {

    let salida = '';
    let contador = 0;

    this.preguntas.forEach((valorActual, indiceActual, arreglo) => {
      preguntasHTML = preguntasHTML.concat('<h1> ', this.preguntas[indiceActual].pregunta + ' </h1>');
      preguntasHTML = preguntasHTML.concat('<p> ', this.preguntas[indiceActual].respuesta + '</p>');
    });
    return response.send(preguntasHTML);
  }

}

class PreguntasFrecuentes {
  constructor(public pregunta: string, public respuesta: string) {
  }
}