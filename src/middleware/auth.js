// Middleware untuk check authentication
const checkAuth = (req, res, next) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Silahkan login terlebih dahulu",
    });
  }

  next();
};

module.exports = { checkAuth };
