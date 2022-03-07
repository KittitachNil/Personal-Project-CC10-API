const { Supplier } = require('../models');

exports.getSupplier = async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ suppliers });
  } catch (err) {
    next(err);
  }
};

exports.createSupplier = async (req, res, next) => {
  try {
    const { name, address, phoneNumber } = req.body;

    const isName = await Supplier.findOne({ where: { name } });
    if (isName) {
      return res
        .status(400)
        .json({ message: 'This supplier had already register.' });
    }

    const supplier = await Supplier.create({ name, address, phoneNumber });
    res.status(201).json({ supplier, message: 'supplier created' });
  } catch (err) {
    next(err);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, phoneNumber } = req.body;

    await Supplier.update({ name, address, phoneNumber }, { where: { id } });

    const supplier = await Supplier.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).json({ supplier });
  } catch (err) {
    next(err);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Supplier.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
