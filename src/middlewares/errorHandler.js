module.exports = function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something broke!', error: err.message });
};
