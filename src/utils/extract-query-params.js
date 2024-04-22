export function extractQueryParams(query){
  return query.substr(1).split('&').reduce(( queryParamas, param )=>{
    const [key, value] = param.split('=')

    queryParamas[key] = value

    return queryParamas
  }, {})

}