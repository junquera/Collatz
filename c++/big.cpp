#include <iostream>
// https://mattmccutchen.net/bigint/
#include "bigint/BigIntegerLibrary.hh"

using namespace std;

BigInteger tres(3);
BigInteger dos(2);
BigInteger uno(1);
BigInteger cero(0);

void collatz(BigInteger n){
  cout << n << " ";
  if( n == uno)
    return;
  else
    collatz(n%dos == cero? (n/dos) : (tres * n) + uno);
}

int main(){
 std::string s;
 cin >> s;
 BigInteger a = stringToBigInteger(s);
 cout << a << "\n";
 collatz(a);
}
