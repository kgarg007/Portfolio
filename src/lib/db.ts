import mongoose from 'mongoose';
import dns from 'node:dns';

// Fix Node.js DNS SRV resolution on Windows/ISPs returning 127.0.0.1 or refusing SRV queries
function applyDnsFix() {
  try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch {
    // Ignore error if setServers fails in constrained runtime environments
  }
}

// Apply DNS configuration server-side at module load time
applyDnsFix();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  // Ensure DNS configuration is active before any lookup or connection attempt
  applyDnsFix();
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI environment variable is missing. Please define MONGODB_URI in your .env.local file.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      applyDnsFix();
      console.log('DNS before MongoDB connection:', dns.getServers());

      const opts = {
        bufferCommands: false,
        family: 4,
      };

      try {
        const m = await mongoose.connect(uri, opts);
        console.log('Successfully connected to MongoDB Atlas.');
        return m;
      } catch (err: any) {
        // Handle transient c-ares socket binding delay on Windows fresh boot
        if (
          err &&
          (err.code === 'ECONNREFUSED' ||
            err.syscall === 'querySrv' ||
            String(err.message || '').includes('querySrv'))
        ) {
          applyDnsFix();
          const m = await mongoose.connect(uri, opts);
          console.log('Successfully connected to MongoDB Atlas.');
          return m;
        }
        throw err;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
