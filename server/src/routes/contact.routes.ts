import { Router } from "express";

import * as contactCtrl from '../controller/contact.Ctrl'

const router = Router()

router.get('/contacts', contactCtrl.contacts)
router.get('/contacts/:id', contactCtrl.contact)

router.post('/createcontacts', contactCtrl.createContacts)

router.delete('/removecontacts/:id', contactCtrl.removeContacts)

router.put('/updatecontacts/:id', contactCtrl.updateContacts)

export default router;