// Código básico del cálculo

#include <stdio.h>
#include <stdlib.h>

int calc(int n){
  printf("%d\n", n);
  if( n == 1)
    return n;
  else
    return calc( n % 2 == 0? n / 2 : (3 * n) + 1 );
}

void main(int argc, char **argv){
  if(argc < 2) {
    printf("Use: %s [n]\n", argv[0]);
    exit(-1);
  }

  int n = atoi(argv[1]);
  if( n < 1 ){
    printf("ERROR: Argument has to be an integer bigger or equal than one.\n");
    exit(-1);
  }

  calc(n);

  exit(0);
}
