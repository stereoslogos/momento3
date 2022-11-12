const cors       = require('cors')
const express    = require("express");
const controller = require("./controllers.js");


const router = express.Router();


// --------------- API REST CRUD

router.get    ("/vendedor",      cors(), controller.readVendedores);   // Read All
router.get    ("/vendedor/:id",  cors(), controller.readVendedor);    // Read
router.delete ("/vendedor/:id",  cors(), controller.deleteVendedores);  // Delete
router.put    ("/vendedor/:id",  cors(), controller.updateVendedores);  // Update
router.post   ("/vendedor",      cors(), controller.createVendedores);  // Create

router.get    ("/venta",     cors(), controller.readVentas);  // Read All
router.get    ("/venta/:id", cors(), controller.readVenta);   // Read
router.delete ("/venta/:id", cors(), controller.deleteVentas); // Delete
router.put    ("/venta/:id", cors(), controller.updateVentas); // Update
router.post   ("/venta",     cors(), controller.createVentas); // Create


module.exports = router;

// ruta para postman: localhost:3000/api/vendedor