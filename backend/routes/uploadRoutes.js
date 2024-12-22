import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"uploads/")
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/; // Allowed extensions
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/; // Allowed MIME types

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    // Check file extension and MIME type
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only JPEG, PNG, and WEBP image files are allowed!'), false); // Reject the file
    }
};

// Multer middleware setup
const upload = multer({
    storage, fileFilter
});
const uploadSingleImage = upload.single('image')

router.post("/", (req,res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({message: err.message})
        } else if(req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            })
        } else {
            res.status(400).send({message: "no image file provided"})
        }
    })
})

export default router