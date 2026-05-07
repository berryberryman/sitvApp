require("dotenv").config();
const { supabase, supabaseAdmin } = require("./src/config/supabase");

async function testQuery() {
  try {
    console.log("🔍 Testing Supabase connection...");
    console.log("URL:", process.env.VITE_SUPABASE_URL);

    // Test 1: Get all users with ADMIN key
    const { data: adminUsers, error: adminError } = await supabaseAdmin.from("users").select("*");
    console.log("\n📊 All users (with ADMIN key):");
    console.log("Error:", adminError);
    console.log("Data:", adminUsers);

    // Test 2: Get all users
    const { data: allUsers, error: allUsersError } = await supabase.from("users").select("*");
    console.log("\n📊 All users query (with ANON key):");
    console.log("Error:", allUsersError);
    console.log("Data:", allUsers);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

testQuery();
