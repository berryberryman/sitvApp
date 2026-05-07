const { supabase, supabaseAdmin } = require("../config/supabase");

// Login dengan username dan password
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi",
      });
    }

    // Cek user di table users
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("username", username).single();

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan",
      });
    }

    // Verify password (gunakan bcrypt untuk production)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Password salah",
      });
    }

    // Return user data (tanpa password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: "Login berhasil",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error login: " + error.message,
    });
  }
};

// Logout
exports.logout = (req, res) => {
  // Clear session/token jika menggunakan JWT
  res.json({
    success: true,
    message: "Logout berhasil",
  });
};

// Get current user (dari session/token)
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.session?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Belum login",
      });
    }

    const { data: user, error } = await supabase.from("users").select("*").eq("id", userId).single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};
