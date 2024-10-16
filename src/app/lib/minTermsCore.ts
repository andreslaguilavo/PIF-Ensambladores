import type { TruthTableData } from '@/app/lib/truthTableCore'
interface MinTermsInterface {
  minTerm: string
  index: number
}
export const getMinTerms = (data: TruthTableData['data']) => {
  const minTerms: MinTermsInterface[] = []
  data.forEach((item, index) => {
    let schema = ''
    const resultItem = item.results[item.results.length - 1]
    if (resultItem.result) {
      schema += '('
      for (const variable in item.variables) {
        const value = item.variables[variable]
        if (!value) {
          schema += `!${variable} `
        } else {
          schema += `${variable} `
        }
      }
      schema = schema.slice(0, schema.length - 1)
      schema += ')'
      minTerms.push({ minTerm: schema, index })
    }
  })
  return minTerms
}
