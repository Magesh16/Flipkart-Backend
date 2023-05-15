import {Client} from '@elastic/elasticsearch';
import client from '../../utils/database.js';
const elasticClient = new Client({ node: 'http://localhost:9200' });

const pushToElasticSearch = async(req,res)=>{
    try{
        const { rows: products } = await client.query('SELECT * FROM product_items');
        await Promise.all(products.map(async (product) => {
            await elasticClient.create({
                index: "products",
                id: product.id,
                document: {
                    id: product.id,
                    name: product.name
                }
            })
        }))
        res.json({ message: 'Data pushed to Elasticsearch'});
        }catch(err){
            res.status(500).json({ err: err.message });
        }
}

const searchProducts = async (name) => {
    try {
      const res = await elasticClient.search({
        index: 'products',
        body: {
          query: {
            multi_match: {
                query : name.toLowerCase(),
                fuzziness: 'AUTO',
                type: "bool_prefix",
                fields: ["name"],
                minimum_should_match: '2<75%'
            }
          }
        }
      });
      console.log(res)
      return res.hits.hits.map(hit => hit._source);
    } catch (error) {
      return { error: error.message };
    }
  };
    let search = async(req,res)=>{
        const name = req.query.name;
            try {
            const results  = await searchProducts(name);
            console.log(results);
            res.status(200).send(results);
            } catch (error) {
            res.status(500).send({ error: error.message });
            }
    } 


export {pushToElasticSearch, search};
