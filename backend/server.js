require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('./src/db.js');
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.warn('⚠️ MongoDB not available. Using NeDB.');
    global.__USE_EMBEDDED_DB__ = true;
    await seedDatabase();
    console.log('✅ Embedded database seeded');
  }

  // Load routes AFTER setting global flag so model files use correct DB
  const app = require('./src/app.js');
  app.listen(PORT, function() {
    console.log('🎯 ReNorth API running on port ' + PORT);
    console.log('   Frontend: http://localhost:3000');
    console.log('   API:      http://localhost:' + PORT + '/api/v1');
  });
}

startServer().catch(function(err) {
  console.error('Server error:', err);
  process.exit(1);
});