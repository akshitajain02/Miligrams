const Farmer = require('../models/Farmer');
const Warehouse = require('../models/Warehouse');
const Buyer = require('../models/Buyer');
const Crop = require('../models/Crop');
const BlockModel = require('../models/BlockModel');
const { miligramsBlockchain } = require('../blockchain/blockchain');

async function seedInitialData() {
  try {
    const farmerCount = await Farmer.countDocuments();
    if (farmerCount === 0) {
      console.log('Seeding initial demonstration data...');

      // Seed Farmers
      const farmer1 = await Farmer.create({
        name: 'Ramesh Patel',
        uniqueId: 'FARMER-101',
        contact: '+91 98765 43210',
        location: 'Ludhiana, Punjab',
        kycStatus: 'verified',
        agriStackId: 'AGRI-PB-2026-8891',
        aadhaarNumber: 'XXXX-XXXX-4321',
        khatauniNumber: 'KH-9021/26-PB',
        photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
        kycSubmittedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000),
        kycReviewedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000),
        rating: 4.9,
        totalReviews: 2,
        reviews: [
          {
            buyerId: 'BUYER-501',
            buyerName: 'Punjab Agri Commodities',
            rating: 5,
            comment: 'उत्कृष्ट ग्रेड ए शरबती गेहूं! नमी एकदम सही और पैकेजिंग साफ-सुथरी।',
            cropType: 'Sharbati Organic Wheat',
            createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000)
          },
          {
            buyerId: 'BUYER-502',
            buyerName: 'GreenEarth Organics',
            rating: 4.8,
            comment: 'Consistent quality and reliable delivery. 100% verified provenance.',
            cropType: 'Basmati Rice',
            createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000)
          }
        ],
        cropsOwned: []
      });

      const farmer2 = await Farmer.create({
        name: 'Sita Devi',
        uniqueId: 'FARMER-102',
        contact: '+91 98111 22334',
        location: 'Karnal, Haryana',
        kycStatus: 'pending',
        agriStackId: 'AGRI-HR-2026-1042',
        aadhaarNumber: 'XXXX-XXXX-2233',
        khatauniNumber: 'KH-4412/26-HR',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        kycSubmittedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000),
        rating: 4.7,
        totalReviews: 1,
        reviews: [
          {
            buyerId: 'BUYER-501',
            buyerName: 'Punjab Agri Commodities',
            rating: 4.7,
            comment: 'Good mustard seeds harvest, timely dispatch.',
            cropType: 'Mustard Seeds',
            createdAt: new Date()
          }
        ],
        cropsOwned: []
      });

      // Seed Warehouse
      const warehouse1 = await Warehouse.create({
        warehouseId: 'WH-CENTRAL-01',
        location: 'Ambala Logistics Hub, Haryana',
        capacity: 25000,
        cropsStored: []
      });

      await Warehouse.create({
        warehouseId: 'WH-NORTH-02',
        location: 'Patiala Grain Depot, Punjab',
        capacity: 15000,
        cropsStored: []
      });

      // Seed Buyers
      await Buyer.create({
        name: 'Punjab Agri Commodities Ltd.',
        uniqueId: 'BUYER-501',
        contact: '+91 94000 11223',
        organization: 'Wholesale Grain Merchant',
        purchaseHistory: []
      });

      await Buyer.create({
        name: 'GreenEarth Organics Inc.',
        uniqueId: 'BUYER-502',
        contact: '+91 97777 88990',
        organization: 'Organic Retail Distributor',
        purchaseHistory: []
      });

      // Seed starter Crops with full verification lifecycle
      const initialCrop1 = await Crop.create({
        cropType: 'Sharbati Golden Wheat',
        variety: 'Sharbati C-306 Bold',
        quantity: 1200,
        declaredQuantity: 1200,
        verifiedQuantity: 1200,
        discrepancy: 0,
        discrepancyNotes: 'Exact weight verification at automated weighbridge. Grade A moisture test (11.2%).',
        expectedPrice: 28,
        farmLocation: 'Ludhiana, Punjab',
        harvestDate: new Date('2026-09-01'),
        qualityStatus: 'Grade A',
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        currentStage: 'warehouse',
        currentWarehouseId: warehouse1.warehouseId,
        storageLocation: 'Silo Alpha — Bay 3 (Dry Aerated)',
        cropImages: ['/farmer-sunset-field.jpg'],
        blockHash: ''
      });

      warehouse1.cropsStored.push(initialCrop1._id);
      await warehouse1.save();

      const cropBlock1 = miligramsBlockchain.addBlock({
        action: 'CROP_HARVESTED_AND_REGISTERED',
        cropId: initialCrop1._id.toString(),
        cropType: initialCrop1.cropType,
        variety: initialCrop1.variety,
        declaredQuantity: 1200,
        verifiedQuantity: 'PENDING',
        quantity: 1200,
        expectedPrice: 28,
        farmLocation: initialCrop1.farmLocation,
        harvestDate: initialCrop1.harvestDate,
        qualityStatus: initialCrop1.qualityStatus,
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        stage: 'farm',
        note: 'Harvest logged via Kisan voice portal'
      });

      const whBlock1 = miligramsBlockchain.addBlock({
        action: 'WAREHOUSE_QUANTITY_VERIFIED',
        cropId: initialCrop1._id.toString(),
        cropType: initialCrop1.cropType,
        variety: initialCrop1.variety,
        declaredQuantity: 1200,
        verifiedQuantity: 1200,
        discrepancy: 0,
        discrepancyStatus: 'EXACT_MATCH',
        effectiveQuantity: 1200,
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        warehouseId: warehouse1.warehouseId,
        warehouseLocation: warehouse1.location,
        storageLocation: initialCrop1.storageLocation,
        qualityStatus: initialCrop1.qualityStatus,
        previousStage: 'farm',
        currentStage: 'warehouse',
        notes: initialCrop1.discrepancyNotes,
        inspectedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      });

      initialCrop1.blockHash = whBlock1.hash;
      await initialCrop1.save();

      farmer1.cropsOwned.push(initialCrop1._id);

      // Seed Crop 2: Royal Basmati 1121 with minor warehouse discrepancy
      const initialCrop2 = await Crop.create({
        cropType: 'Royal Basmati Rice',
        variety: 'Basmati 1121 Extra Long',
        quantity: 790,
        declaredQuantity: 800,
        verifiedQuantity: 790,
        discrepancy: -10,
        discrepancyNotes: '10 kg dockage deduction: husk and chaff removed during pre-cleaning intake.',
        expectedPrice: 68,
        farmLocation: 'Samrala, Punjab',
        harvestDate: new Date('2026-09-08'),
        qualityStatus: 'Organic Premium',
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        currentStage: 'warehouse',
        currentWarehouseId: warehouse1.warehouseId,
        storageLocation: 'Silo Alpha — Bay 1 (Climate Controlled)',
        cropImages: ['/nature-farm-banner.jpg'],
        blockHash: ''
      });

      warehouse1.cropsStored.push(initialCrop2._id);
      await warehouse1.save();

      const cropBlock2 = miligramsBlockchain.addBlock({
        action: 'CROP_HARVESTED_AND_REGISTERED',
        cropId: initialCrop2._id.toString(),
        cropType: initialCrop2.cropType,
        variety: initialCrop2.variety,
        declaredQuantity: 800,
        verifiedQuantity: 'PENDING',
        quantity: 800,
        expectedPrice: 68,
        farmLocation: initialCrop2.farmLocation,
        harvestDate: initialCrop2.harvestDate,
        qualityStatus: initialCrop2.qualityStatus,
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        stage: 'farm'
      });

      const whBlock2 = miligramsBlockchain.addBlock({
        action: 'WAREHOUSE_QUANTITY_VERIFIED',
        cropId: initialCrop2._id.toString(),
        cropType: initialCrop2.cropType,
        variety: initialCrop2.variety,
        declaredQuantity: 800,
        verifiedQuantity: 790,
        discrepancy: -10,
        discrepancyStatus: 'DEFICIT_SHORTAGE',
        effectiveQuantity: 790,
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        warehouseId: warehouse1.warehouseId,
        warehouseLocation: warehouse1.location,
        storageLocation: initialCrop2.storageLocation,
        qualityStatus: initialCrop2.qualityStatus,
        previousStage: 'farm',
        currentStage: 'warehouse',
        notes: initialCrop2.discrepancyNotes,
        inspectedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
      });

      initialCrop2.blockHash = whBlock2.hash;
      await initialCrop2.save();

      farmer1.cropsOwned.push(initialCrop2._id);

      // Seed Crop 3: Desi Bajra (at farm gate)
      const initialCrop3 = await Crop.create({
        cropType: 'Organic Pearl Millet',
        variety: 'Desi Hybrid Bajra',
        quantity: 650,
        declaredQuantity: 650,
        verifiedQuantity: null,
        discrepancy: 0,
        discrepancyNotes: 'Awaiting scheduled warehouse transport truck.',
        expectedPrice: 24,
        farmLocation: 'Ludhiana, Punjab',
        harvestDate: new Date('2026-09-15'),
        qualityStatus: 'Grade A',
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        currentStage: 'farm',
        cropImages: ['/farm-aerial-harvest.jpg'],
        blockHash: ''
      });

      const cropBlock3 = miligramsBlockchain.addBlock({
        action: 'CROP_HARVESTED_AND_REGISTERED',
        cropId: initialCrop3._id.toString(),
        cropType: initialCrop3.cropType,
        variety: initialCrop3.variety,
        declaredQuantity: 650,
        verifiedQuantity: 'PENDING_WAREHOUSE_DISPATCH',
        quantity: 650,
        expectedPrice: 24,
        farmLocation: initialCrop3.farmLocation,
        harvestDate: initialCrop3.harvestDate,
        qualityStatus: initialCrop3.qualityStatus,
        farmerId: farmer1.uniqueId,
        farmerName: farmer1.name,
        stage: 'farm'
      });

      initialCrop3.blockHash = cropBlock3.hash;
      await initialCrop3.save();

      farmer1.cropsOwned.push(initialCrop3._id);
      await farmer1.save();

      // Seed Crop 4: Yellow Mustard Seeds (Farmer 2)
      const initialCrop4 = await Crop.create({
        cropType: 'Yellow Mustard Seeds',
        variety: 'Pusa Bold Mustard',
        quantity: 450,
        declaredQuantity: 450,
        verifiedQuantity: null,
        discrepancy: 0,
        discrepancyNotes: 'Farmer KYC in verification queue.',
        expectedPrice: 52,
        farmLocation: 'Karnal, Haryana',
        harvestDate: new Date('2026-09-18'),
        qualityStatus: 'Grade A',
        farmerId: farmer2.uniqueId,
        farmerName: farmer2.name,
        currentStage: 'farm',
        cropImages: ['/farmer-thumbs-up-sold.jpg'],
        blockHash: ''
      });

      const cropBlock4 = miligramsBlockchain.addBlock({
        action: 'CROP_HARVESTED_AND_REGISTERED',
        cropId: initialCrop4._id.toString(),
        cropType: initialCrop4.cropType,
        variety: initialCrop4.variety,
        declaredQuantity: 450,
        verifiedQuantity: 'PENDING',
        quantity: 450,
        expectedPrice: 52,
        farmLocation: initialCrop4.farmLocation,
        harvestDate: initialCrop4.harvestDate,
        qualityStatus: initialCrop4.qualityStatus,
        farmerId: farmer2.uniqueId,
        farmerName: farmer2.name,
        stage: 'farm'
      });

      initialCrop4.blockHash = cropBlock4.hash;
      await initialCrop4.save();

      farmer2.cropsOwned.push(initialCrop4._id);
      await farmer2.save();

      // Persist all minted blocks to DB
      for (const blk of [cropBlock1, whBlock1, cropBlock2, whBlock2, cropBlock3, cropBlock4]) {
        await BlockModel.create({
          index: blk.index,
          timestamp: blk.timestamp,
          data: blk.data,
          previousHash: blk.previousHash,
          hash: blk.hash,
          merkleRoot: blk.merkleRoot
        });
      }

      console.log(' Starter data and initial blockchain block seeded successfully!');
    } else {
      // Ensure existing records have KYC and rating fields populated
      await Farmer.updateOne(
        { uniqueId: 'FARMER-101', kycStatus: { $in: [null, undefined, 'pending'] } },
        {
          $set: {
            kycStatus: 'verified',
            agriStackId: 'AGRI-PB-2026-8891',
            aadhaarNumber: 'XXXX-XXXX-4321',
            khatauniNumber: 'KH-9021/26-PB',
            photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
            rating: 4.9,
            totalReviews: 2
          }
        }
      );

      await Farmer.updateOne(
        { uniqueId: 'FARMER-102', agriStackId: { $in: [null, undefined, ''] } },
        {
          $set: {
            kycStatus: 'pending',
            agriStackId: 'AGRI-HR-2026-1042',
            aadhaarNumber: 'XXXX-XXXX-2233',
            khatauniNumber: 'KH-4412/26-HR',
            photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
            rating: 4.7,
            totalReviews: 1
          }
        }
      );
    }
  } catch (error) {
    console.error('Error seeding demo data:', error.message);
  }
}

module.exports = { seedInitialData };
