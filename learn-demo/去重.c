#include <stdio.h>
char *test[]={ "this is a test ", "test22 ", " test22","aa","aa","bb"};
char *result[] = {};
int find(char *test){   //查找是否存在字符串
  int i = 0;
  while(result[i]!=NULL) {
    if(result[i]==*test)
      return 1;
    i++;
  }
  return 0;
}
int length(char*arr[]){   //计算数组长度
  int i=0;
  while(arr[i]!=NULL)
    i++;
  return i;  
}
int insert(char *tt){   //插入新的字符串
  result[length(result)+1] = *tt;
}
void printf_new(char*arr[]){   //打印字符
  int i=0;
  while(*(arr+i)!=NULL){
    printf("%s/n",*(arr+i));
  }
}
int main(){
  int i = 0;
  while (test[i]!=NULL)
  {
    if(find(test[i])!=1)
    {
      insert(test[i]);
    }
    i++;
  }
  printf_new(*result);
  return 0;
}