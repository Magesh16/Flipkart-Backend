import client from "../../utils/database.js";
import { calculatePrice } from "../../utils/productHelper.js";

let getSubcategory = async (req, res) => {
  try {
    let result = await client.query("select * from category_type");
    res.status(200).send(result.rows);
  } catch (err) {
    res.status(403).send({ error: err });
  }
};

let getSubcategoryProducts = async (req, res) => {
  let id = req.params.id;
  try {
    let result = await client.query(`select distinct p.id, p.image_url[1],p.name,p.highlights,p.mrp, p.discount,p.f_assured, c.name  as category, v.value as brand, r.rating,
    (p.mrp - (p.mrp * p.discount / 100)) AS price
     from product_items as p 
            left join category_type as c on p.category_type_id = c.id
            left join variations as v on v.product_items_id = p.id
            left join reviews as r on r.product_items_id = p.id
            where category_type_id =${id}`);
    res.status(200).send(
      result.rows.map((ele) => {
        ele.price = calculatePrice(ele.mrp, parseInt(ele.discount));
        return ele;
      })
    );
  } catch (err) {
    res.status(403).send({ error: err.message });
  }
};

let priceLowToHigh = async(req,res)=>{
  try{
  let id = req.params.id;
  let result = await client.query(`SELECT distinct p.id, p.image_url[1], p.name, p.highlights, p.mrp, p.discount, p.f_assured,
                                  c.name AS category, v.value AS brand, r.rating,
                                  (p.mrp - (p.mrp * CAST(p.discount AS INTEGER) / 100)) AS price
                                  FROM product_items AS p
                                  left join category_type AS c ON p.category_type_id = c.id
                                  left join variations AS v ON v.product_items_id = p.id
                                  left join reviews AS r ON r.product_items_id = p.id
                                  where category_type_id =${id}
                                  order by price ASC`
                                  );
  res.status(200).send(result.rows)
  }catch(err){
    res.status(403).send({error:err.message})
  }
}
let priceHighToLow = async(req,res)=>{
  try{
  let id = req.params.id;
  let result = await client.query(`SELECT distinct p.id, p.image_url[1], p.name, p.highlights, p.mrp, p.discount, p.f_assured,
                                  c.name AS category, v.value AS brand, r.rating,
                                  (p.mrp - (p.mrp * CAST(p.discount AS INTEGER) / 100)) AS price
                                  FROM product_items AS p
                                  left join category_type AS c ON p.category_type_id = c.id
                                  left join variations AS v ON v.product_items_id = p.id
                                  left join reviews AS r ON r.product_items_id = p.id
                                  where category_type_id =${id}
                                  order by price DESC`
                                  );
  res.status(200).send(result.rows)
  }catch(err){
    res.status(403).send({error:err.message})
  }
}

let postSubcategory = async (req, res) => {
  try {
    const { category_id, name } = req.body;
    await client.query(
      "insert into category_type(category_id, name) values($1, $2)",
      [category_id, name]
    );
    res.status(200).send({ message: "Insertion success", status: "true" });
  } catch (err) {
    res.status(403).send({ message: "Insertion Failed", status: "false" });
  }
};

export { getSubcategory, postSubcategory, getSubcategoryProducts,priceLowToHigh,priceHighToLow };
