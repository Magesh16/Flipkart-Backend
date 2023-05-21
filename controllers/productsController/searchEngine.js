import {Client} from '@elastic/elasticsearch';
import client from '../../utils/database.js';
import bodybuilder from 'bodybuilder';
const elasticClient = new Client({ node: 'http://localhost:9200' });


const pushToElasticSearch = async(req,res)=>{
  try{
      const { rows: products } = await client.query('SELECT * FROM product_items');
      await Promise.all(products.map(async (product) => {
        const { rows: variations } = await client.query('SELECT * FROM variations WHERE product_items_id = $1', [product.id]);
        const {rows: reviews} = await client.query('SELECT * from reviews where product_items_id=$1',[product.id]);
        const {rows: category_type}  =await client.query('select c.name,(p.mrp - (p.mrp * CAST(p.discount AS INTEGER) / 100)) AS price from product_items p left join category_type c on p.category_type_id = c.id where p.id=$1',[product.id])
        const document = {
          id: product.id,
          category_type_id : product.category_type_id,
          name: product.name,
          f_assured: product.f_assured,
          mrp : product.mrp,
          discount : product.discount,
          highlights: product.highlights,
          image_url: product.image_url[0],
          qty_stock: product.qty_stock,
          category_name : category_type[0]?.name,
          brand : variations[0]?.value,
          price : category_type[0].price,
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
        
        res.status(200).send({status:true, data:response.hits.hits});
      }catch(err){
        res.status(403).send({status: false, error: err})
      }
    }

    let totalProducts = async(req,res)=>{
      let body = bodybuilder();
      body = body.filter('term','category_type_id',req.params.id);
      if(req.query.rating){
        body = body.filter('range', 'rating',{
          gte: req.query.rating
        })
      }
      if(req.query.f_assured === 'true'){
        body = body.filter('term','f_assured',true)
      }
      if(req.query.sort !== 'desc'){
        body = body.sort('price', 'asc');
      }else{
        body = body.sort('price', 'desc');
      }
      
      if(req.query.minPrice && req.query.maxPrice){
        body = body.filter('range', 'price',{
          gte: req.query.minPrice,
          lte: req.query.maxPrice
          })
      }
      else if(req.query.minPrice && !req.query.maxPrice){
        body = body.filter('range', 'price',{
          gte: req.query.minPrice
          })
          }
      else if(!req.query.minPrice && req.query.maxPrice){
        body = body.filter('range', 'price',{
          lte: req.query.maxPrice
          })
          }

      body = body.build();
      const getProductsSearch = await elasticClient.search({
        index:'products',
        body: body,
            _source: {include: ['id','name','f_assured','image_url','mrp','discount','category_name','brand','price']},
      })
      let data = getProductsSearch.hits.hits.map(item => item._source)
      res.send(data)
    }

  


export {pushToElasticSearch, searchName, getAllProducts,totalProducts};
