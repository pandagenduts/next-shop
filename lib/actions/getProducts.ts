import { allProducts } from "@/data/data"

export function getProducts(id: number[]) {
  let data = []
  for (let i = 0; i < id.length; i++) {
    const product = allProducts.find((product) => product.id === id[i])
    data.push(product)
  }
  return data
}

// export function getProducts(id: number[]) {
//   let data = []
//   for (let i = 0; i < id.length; i++) {
//     const product = allProducts.find((product) => product.id === id[i])
//     data.push(product)
//   }
//   return data
// }

