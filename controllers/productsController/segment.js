import client from '../../utils/database.js';


let getCategorySubcategory = async(req,res)=>{
    try{
    const result = await client.query(`
    SELECT s.name AS segment, json_object_agg(c.name, subcat.subcategories) AS categories
    FROM segment s
    JOIN category c ON s.id = c.segment_id
    JOIN (
        SELECT
        c.name,
        json_agg(sc.name) AS subcategories
        FROM
        category c
        JOIN category_type sc ON c.id = sc.category_id
        GROUP BY
        c.name
    ) subcat ON c.name = subcat.name
    GROUP BY s.name;
    `);
    console.log(result.rows[0]);
    res.status(200).send(result.rows);
    }catch(err){
        res.status(403).send({error: err.message})
    }
}
let getSegment = async(req,res)=>{
    try{
    const id = req.params.id;
    const result = await client.query(`SELECT s.name as segment, json_object_agg(c.name, subcat.subcategories) AS categories
    FROM segment s
    JOIN category c ON s.id = c.segment_id
    JOIN (
        SELECT
        c.name,
        json_agg(sc.name) AS subcategories
        FROM
        category c
        JOIN category_type sc ON c.id = sc.category_id
        GROUP BY
        c.name
    ) subcat ON c.name = subcat.name where s.id='${id}'
    GROUP BY s.name
    `);
    const responseData ={};
    const row = result.rows;
    row.forEach((item)=>{
        if(!responseData[item.segment]){
            responseData[item.segment] ={};
        }
        responseData[item.segment] = item.categories;
    })
    console.log(responseData);
    res.status(200).send(responseData);
    }catch(err){
        res.status(403).send({error:err.message});
    }
}

let postSegment = async(req,res)=>{
    try{
        const name = req.body.name;
        await client.query('insert into segment(name) values ($1)',[name]);
        res.status(200).send({message:"Inserted Successfully", status:true});
    }catch(err){
        res.status(403).send({message: "Not inserted", status:"false"});
    }
}


export {getSegment,postSegment, getCategorySubcategory};