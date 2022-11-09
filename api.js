import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloud = cloudinary.v2;

/**
 * 1.- Crear const de configuración de cloudinary con nuestras credenciales
 */
cloud.config({
  cloud_name: 'cloudname',
  api_key: 'apikey',
  api_secret: 'secret',
});

/**
 * 2.- Configurar un storage temporal antes de subirlo a cloudinary con la config de antes
 */

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: 'DEV',
  },
});

/**
 * 3.- Crear middleware con multer
 */
const uplaodMiddleware = multer({ storage: storage });

const api = express();

api.use(express.json());

/**
 * Registrar middleware de upload en la ruta donde queremos obtener imágnes o archivos
 */
api.post('/upload', uplaodMiddleware.array('files'), (req, res) => {
  return res.json({
    msg: 'Aca se subió un archivo',
    name: req.files,
  });
});

api.listen(3000, () => {
  console.log('API funcionando en 3000');
});
