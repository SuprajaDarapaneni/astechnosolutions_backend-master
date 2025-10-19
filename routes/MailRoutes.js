const { Router } = require('express');
const { sendMail }  = require("../controllers/Send_Zoho_Mail")

const router = Router();

router.post('/sendemail', sendMail)

module.exports = router;

