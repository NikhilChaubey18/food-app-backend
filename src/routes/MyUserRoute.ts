import  express, { Router }  from "express";
const router  = express.Router();
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";




// /api/my/user
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);

router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/",jwtParse ,jwtCheck,validateMyUserRequest, MyUserController.updateCurrentUser);






export default router;