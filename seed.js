require("dotenv").config();
const { supabaseAdmin } = require("./src/config/supabase");
const crypto = require("crypto");

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    // Generate a UUID for the admin user
    const adminId = crypto.randomUUID();

    // Insert admin user
    const { data, error } = await supabaseAdmin.from("users").insert([
      {
        id: adminId,
        username: "admin",
        password: "admin123",
        email: "admin@sitvapp.com",
        full_name: "Administrator",
        role: "admin",
      },
    ]);

    if (error) {
      console.error("❌ Error inserting admin user:", error.message);
      return;
    }

    console.log("✅ Admin user created successfully!");
    console.log("Login credentials:");
    console.log("  Username: admin");
    console.log("  Password: admin123");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  }
}

seedDatabase();
