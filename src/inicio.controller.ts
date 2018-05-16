import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { error, log } from 'util';

const fs = require('fs');

@Controller('controller')
export class InicioController {

  @Get('Home')
  mostrarContenido(@Req() request, @Res() response) {
    let contenidoHTML = '';

    function fs_readFiles(paths, cb) {
      let result = [], errors = [], l = paths.length;
      paths.forEach((path, k) => {
        fs.readFile(path, (err, data) => {
          --l;
          err && (errors[k] = err);
          !err && (result[k] = data);
          !l && cb(errors.length ? errors : undefined, result);
        });

      });
    }

    fs_readFiles([__dirname + '/html/header.html', __dirname + '/html/footer.html', __dirname + '/html/contenido.html'],
      (errors, data) => {
      data.forEach((v) => {
        contenidoHTML += '\n' + v ;
      });
      return response.send(contenidoHTML);
    });
  }
}