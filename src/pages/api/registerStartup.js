import clientPromise from '../../utils/mongodb';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const data = req.body;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Insert the data into the 'startups' collection
    const result = await db.collection("startups").insertOne(data);

    if (result.insertedCount === 1) {
      res.status(200).json({ message: 'Startup registered successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to register startup' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to database' });
  }
};
