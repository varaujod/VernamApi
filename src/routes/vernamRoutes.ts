import { Router } from 'express';
import { VernamController } from '../controller/VernamController.js';

const router = Router();
const vernamController = new VernamController();

router.post('/encrypt', vernamController.encrypt);
router.post('/cifrar', vernamController.encrypt);
router.post('/criptografar', vernamController.encrypt);

router.post('/decrypt', vernamController.decrypt);
router.post('/decifrar', vernamController.decrypt);
router.post('/descriptografar', vernamController.decrypt);

export default router;