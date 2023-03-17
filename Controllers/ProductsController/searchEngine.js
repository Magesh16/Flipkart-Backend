import {Client} from '@elastic/elasticsearch';
import client from '../../Utils/database.js';
const client1 = new Client({ node: 'http://localhost:9200' });

// const phraseSearch = async (_index, _type, phrase) => {
//   const hits = [];

//   // only string values are searchable
//   const searchResult = await client
//     .search({
//       index: _index,
//       type: _type,
//       body: {
//         query: {
//           multi_match: {
//             fields: [
//               'name',
//               'lastname',
//               'gender',
//               'email',
//               'city',
//               'state',
//               'address',
//             ],
//             query: phrase,
//             type: 'phrase_prefix',
//             //lenient: true
//           },
//         },
//         highlight: {
//           fields: {
//             firstname: {},
//             lastname: {},
//             gender: {},
//             email: {},
//             city: {},
//             state: {},
//             address: {},
//           },
//         },
//       },
//     })
//     .catch((e) => console.log('errr', e));
//   if (
//     searchResult &&
//     searchResult.body &&
//     searchResult.body.hits &&
//     searchResult.body.hits.hits &&
//     searchResult.body.hits.hits.length > 0
//   ) {
//     hits.push(...searchResult.body.hits.hits);
//   }

//   return {
//     hitsCount: hits.length,
//     hits,
//   };
// };
async function getProducts(){
    const result =await client.query(`select * from product_items`);
    return result.rows;
    
}
async function indexProducts() {
    let products = await getProducts();
    
    for (const product of products) {
      await client1.index({
        index: 'products',
        id: product.id,
        body: product,
      });

    }
  }
  indexProducts();

 let phraseSearch= async (req, res) => {
    const searchTerm = req.body.name;
    const body = await client1.search({
    index: 'products',
      body: {
        query: {
          match: { name: searchTerm }
        }
      }
    });
    console.log(body);
    const products = body.hits.hits.map(hit => hit._source);
    res.status(200).send(products);
  };

export default phraseSearch;
