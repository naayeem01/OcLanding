
'use server';
import { query } from '@/lib/db';

export async function setupDatabase() {
    try {
        await createOrdersTable();
        await createSiteConfigTable();
        console.log('Database tables checked/created successfully.');
        return { success: true };
    } catch (error) {
        console.error('Error setting up database:', error);
        return { success: false, error: (error as Error).message };
    }
}

async function createOrdersTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            orderNumber VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL,
            status ENUM('Pending', 'Processing', 'On Hold', 'Confirmed', 'Device On The Way', 'Device Delivered') NOT NULL,
            paymentMethod VARCHAR(255),
            transactionId VARCHAR(255),
            totalPrice VARCHAR(255)
        );
    `;
    await query(createTableQuery, []);
    console.log("Table 'orders' checked/created.");
}

async function createSiteConfigTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS site_config (
        config_key VARCHAR(255) PRIMARY KEY,
        config_value JSON
      );
    `;
     await query(createTableQuery, []);
     console.log("Table 'site_config' checked/created.");

     const checkVideoSectionQuery = `SELECT * FROM site_config WHERE config_key = 'videoSection'`;
     const existingConfig = await query(checkVideoSectionQuery, []) as any[];
     if(existingConfig.length === 0) {
        const defaultValue = { isEnabled: true, videoUrl: "https://www.youtube.com/embed/6owddgXj2qg"};
        const insertQuery = `INSERT INTO site_config (config_key, config_value) VALUES (?, ?)`;
        await query(insertQuery, ['videoSection', JSON.stringify(defaultValue)]);
        console.log("Default video section config inserted.");
     }
}
