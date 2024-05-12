import { ObjectId } from 'mongodb';
import { Router } from 'express';
import { db } from '../utils/db.js';
import { cloudinaryUpload } from '../utils/upload.js';
import multer from 'multer';
import { protect } from '../middlewares/protect.js';

const productRouter = Router();
// productRouter.use(protect)

const multerUpload = multer({ dest: 'public\\files' });
const avatarUpload = multerUpload.fields([{ name: 'avatar', maxCount: 6 }]);

productRouter.get('/', async (req, res) => {
  try {
    const query = {};

    //pagination
    const PAGE_SIZE = 10;
    const page = req.query.page;
    const skip = PAGE_SIZE * (page - 1);

    if (req.query) {
      const { keyword, page, ...rest } = req.query;

      //rest are keys that we filter
      for (let key in rest) {
        if (rest[key] !== '') {
          query[key] = rest[key];
        }
      }

      if (keyword) {
        query.$or = [
          { sell: new RegExp(`${keyword}`, 'i') },
          { asset: new RegExp(`${keyword}`, 'i') },
          { province: new RegExp(`${keyword}`, 'i') },
          { district: new RegExp(`${keyword}`, 'i') },
          { subDistrict: new RegExp(`${keyword}`, 'i') },
          { status: new RegExp(`${keyword}`, 'i') },
          { name: new RegExp(`${keyword}`, 'i') },
          { code: new RegExp(`${keyword}`, 'i') },
          { price: new RegExp(`${keyword}`, 'i') },
          { description: new RegExp(`${keyword}`, 'i') },
        ];
      }

      const collection = db.collection('products');
      const products = await collection
        .find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(10)
        .toArray();

      const count = await collection.countDocuments(query);
      const totalPages = Math.ceil(count / PAGE_SIZE);
      return res.status(200).json({ data: products, total_pages: totalPages });
    }
    // else {
    //   const collection = db.collection('products');
    //   const products = await collection
    //     .find(query)
    //     .skip(skip)
    //     .limit(10)
    //     .toArray();
    //   const count = await collection.countDocuments(query);
    //   const totalPages = Math.ceil(count / PAGE_SIZE);
    //   return res.status(200).json({ data: products, total_pages: totalPages });
    // }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const collection = db.collection('products');
    const getProductId = await collection.find({ _id: productId }).toArray();
    return res.status(200).json({ data: getProductId });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
});

productRouter.post('/upload', avatarUpload, async (req, res) => {
  try {
    const products = {
      sell: req.body.sell,
      asset: req.body.asset,
      province: req.body.province,
      district: req.body.district,
      subDistrict: req.body.subDistrict,
      status: req.body.status,
      name: req.body.name,
      code: req.body.code,
      fullPrice: Number(req.body.fullPrice),
      price: Number(req.body.price),
      description: req.body.description,
      link: req.body.link,
    };

    const avatarUrl = await cloudinaryUpload(req.files);
    products['avatars'] = avatarUrl;
    products['created_at'] = new Date();

    const collection = db.collection('products');
    await collection.insertOne(products);

    return res.status(200).json({
      message: 'Asset has been created successfully',
    });
  } catch (error) {
    return res.status(404).json({ data: error });
  }
});

productRouter.put('/upload/:id', async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);

    const { fullPrice, price, ...rest } = req.body;
    const updateProducts = {
      ...rest,
      fullPrice: Number(fullPrice),
      price: Number(price),
      updated_at: new Date(),
    };

    const collection = db.collection('products');
    await collection.updateOne({ _id: productId }, { $set: updateProducts });

    return res.status(200).json({
      message: 'Product has been updated successfully',
    });
  } catch (error) {
    return res.status(404).json({ data: error });
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);

    const collection = db.collection('products');
    await collection.deleteOne({ _id: productId });

    return res.status(200).json({
      message: 'Product has been deleted successfully',
    });
  } catch (error) {
    return res.status(404).json({ data: error });
  }
});

export default productRouter;
