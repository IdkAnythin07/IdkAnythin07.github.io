export function createCEditor(container){
  return monaco.editor.create(container,{
    value:
`#include <stdio.h>

int main(){
  printf("Hello!");
  return 0;
}`,
    language:"c",
    theme:"catppuccin",
    automaticLayout:true
  });
}
