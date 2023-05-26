function imprimirPiramide(num) {
    for (let i = 1; i <= num; i++) {
      let linea = '';
      for (let j = 1; j <= i; j++) {
        linea += j;
      }
      console.log(linea);
    }
  }

  
  imprimirPiramide(3);
  
  imprimirPiramide(6);
