import Router from "next/router";
export const redirect = ( path:string , ctx: any ):void => {
    
    const isClient = !ctx.req;

    if (!isClient) {
        ctx.res.writeHead(302, { Location: path })
        ctx.res.end()
      } else {
        Router.push(path)
      }

}

export const filterByTerm = (inputArr:any, searchTerm: string) => {
  return inputArr.filter(function(arrayElement :any) {
    return arrayElement.url.match(searchTerm);
  });
}

