import type { TruthTableData } from '@/app/lib/truthTableCore'
interface MaxTermsInterface {
  maxTerm: string
  index: number
}
export const getMaxTerms = (data: TruthTableData['data']) => {
  const maxTerms: MaxTermsInterface[] = []
  data.forEach((item, index) => {
    let schema = ''
    const resultItem = item.results[item.results.length - 1]
    if (!resultItem.result) {
      schema += '('
      for (const variable in item.variables) {
        const value = item.variables[variable]
        if (value) {
          schema += `!${variable} + `
        } else {
          schema += `${variable} + `
        }
      }
      schema = schema.slice(0, schema.length - 3)
      schema += ')'
      maxTerms.push({ maxTerm: schema, index })
    }
  })
  return maxTerms
}
