import {Client} from '@elastic/elasticsearch';
import client from '../../utils/database.js';
const elasticClient = new Client({ node: 'http://localhost:9200' });


const pushToElasticSearch = async(req,res)=>{
  try{
      const { rows: products } = await client.query('SELECT * FROM product_items');
      await Promise.all(products.map(async (product) => {
        const { rows: variations } = await client.query('SELECT * FROM variations WHERE product_items_id = $1', [product.id]);
        const {rows: reviews} = await client.query('SELECT * from reviews where product_items_id=$1',[product.id]);
        
        const document = {
          id: product.id,
          name: product.name,
          f_assured: product.f_assured,
          mrp : product.mrp,
          discount : product.discount,
          highlights: product.highlights,
          image_url: product.image_url[0],
          qty_stock: product.qty_stock,
          brand : variations[0]?.value,
          rating: reviews[0]?.rating
        };
        
        await elasticClient.create({
          index: 'products',
          id: product.id,
          body: document,
        });
      }));
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
          _source: {include:['id','name']},
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
    let searchName = async(req,res)=>{
        const name = req.query.name;
            try {
            const results  = await searchProducts(name);
            console.log(results);
            res.status(200).send(results);
            } catch (error) {
            res.status(500).send({ error: error.message });
            }
    } 


    let getAllProducts = async(req,res)=>{
      try{
        const response = await elasticClient.search({
          index: 'products',
          body:{
            'from': 0 , 'size' :10000,
            query:{
              match_all: {}
            }
          }
        })
        console.log(response.hits.hits);
        res.status(200).send({status:true, data:response.hits.hits});
      }catch(err){
        res.status(403).send({status: false, error: err})
      }
    }

    let getFlipkartAssured = async(req,res)=>{
      try{
        const val = req.params.val;
        const response = await elasticClient.search({
          index:'products',
          body: {
            _source: {include: ['id','name','f_assured','image_url','mrp','discount','brand']},
            query: {
              bool: {
                filter: {
                  term: {
                    f_assured: val
                  }
                }
              },
              
            }
          }
        });
        let data = response.hits.hits.map(item => item._source)
        res.status(200).send({status: true,data: data});
      }catch(err){
        res.status(403).send({status: false, error: err})
      }
    }


  let getRating = async(req,res)=>{
    try{
      const val = req.params.val;
      const response = await elasticClient.search({
        index:'products',
        body: {
          _source: {include: ['id','name','f_assured','image_url','mrp','discount','brand']},
          query: {
            bool: {
              must: [
                {
                  range: {
                    rating: {
                      gte: val
                    }
                  }
                }
              ]
            }
          }
        }
      });
      let data = response.hits.hits.map(item => item._source)
      res.status(200).send({status: true,data: data});
    }catch(err){
      res.status(403).send({status: false, error: err})
    }
  }


export {pushToElasticSearch, searchName, getAllProducts,getFlipkartAssured, getRating};
