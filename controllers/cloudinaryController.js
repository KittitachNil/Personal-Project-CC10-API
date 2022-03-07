const cloudinary = require('cloudinary').v2;

exports.upload = (req, res, next) => {
    cloudinary.uploader.upload(req.body.image, async (err, result) => {
        if (err) return next(err);
        // await productImage create
        res.status(200).json({
            message: 'upload picture successful',
            image: result.secure_url,
        });
    });
};

exports.remove = (req, res, next) => {
    const splitted = req.body.image.split('/');
    cloudinary.uploader.destroy(
        splitted[splitted.length - 1].split('.')[0],
        async (err, result) => {
            if (err) return next(err);
            // await productImage delete
            res.status(200).json({ message: 'Item deleted from Cloudinary' });
        }
    );
};
