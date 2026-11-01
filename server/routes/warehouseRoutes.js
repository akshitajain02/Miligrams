const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');
const Crop = require('../models/Crop');
const BlockModel = require('../models/BlockModel');
const { miligramsBlockchain } = require('../blockchain/blockchain');

/**
 * @route   PUT /api/warehouse/update-stock
 * @desc    Receive crop stock into a warehouse and mint an update block on the blockchain
 */
router.put('/update-stock', async (req, res) => {
  try {
    const { cropId, warehouseId, notes, receivedQuantity, storageLocation, conditionStatus } = req.body;

    if (!cropId || !warehouseId) {
      return res.status(400).json({
        success: false,
        message: 'cropId and warehouseId are required'
      });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    let warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      // Auto-create warehouse if it doesn't exist yet for seamless testing
      warehouse = await Warehouse.create({
        warehouseId,
        location: 'Central Storage Hub',
        capacity: 20000,
        cropsStored: []
      });
    }

    // Ensure declared quantity is populated
    if (!crop.declaredQuantity || crop.declaredQuantity === 0) {
      crop.declaredQuantity = crop.quantity;
    }

    // 1. Determine verified quantity & discrepancy
    const verifiedQty = receivedQuantity !== undefined && receivedQuantity !== null && receivedQuantity !== ''
      ? Number(receivedQuantity)
      : crop.declaredQuantity;

    const discrepancy = verifiedQty - crop.declaredQuantity;
    const discrepancyStatus = discrepancy === 0 
      ? 'EXACT_MATCH' 
      : discrepancy < 0 
      ? 'DEFICIT_SHORTAGE' 
      : 'SURPLUS';

    const previousStage = crop.currentStage;
    crop.currentStage = 'warehouse';
    crop.currentWarehouseId = warehouseId;
    crop.verifiedQuantity = verifiedQty;
    crop.quantity = verifiedQty; // warehouse-verified stock is the effective tradeable quantity
    crop.discrepancy = discrepancy;
    crop.discrepancyNotes = notes || (discrepancy === 0 ? 'Quantity verified with 100% match.' : `Discrepancy of ${discrepancy} kg detected at gate scale.`);
    if (storageLocation) crop.storageLocation = storageLocation;
    if (conditionStatus) crop.qualityStatus = conditionStatus;
    crop.lastVerifiedDate = new Date();

    // 2. Add crop to warehouse inventory if not already present
    if (!warehouse.cropsStored.includes(crop._id)) {
      warehouse.cropsStored.push(crop._id);
      await warehouse.save();
    }

    // 3. Mint a new transition block onto the blockchain ledger
    const blockPayload = {
      action: 'WAREHOUSE_QUANTITY_VERIFIED',
      cropId: crop._id.toString(),
      cropType: crop.cropType,
      variety: crop.variety || 'Standard Desi',
      declaredQuantity: crop.declaredQuantity,
      verifiedQuantity: crop.verifiedQuantity,
      discrepancy: crop.discrepancy,
      discrepancyStatus,
      effectiveQuantity: crop.quantity,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      warehouseId,
      warehouseLocation: warehouse.location,
      storageLocation: crop.storageLocation || 'General Silo Storage',
      qualityStatus: crop.qualityStatus,
      previousStage,
      currentStage: 'warehouse',
      notes: crop.discrepancyNotes,
      inspectedAt: new Date().toISOString()
    };

    const newBlock = miligramsBlockchain.addBlock(blockPayload);

    // 4. Update crop with the latest block hash
    crop.blockHash = newBlock.hash;
    await crop.save();

    // 5. Persist the new block in MongoDB
    await BlockModel.create({
      index: newBlock.index,
      timestamp: newBlock.timestamp,
      data: newBlock.data,
      previousHash: newBlock.previousHash,
      hash: newBlock.hash,
      merkleRoot: newBlock.merkleRoot
    });

    res.json({
      success: true,
      message: `Crop #${crop.cropType} verified and received into Warehouse ${warehouseId}. Declared: ${crop.declaredQuantity} kg, Verified: ${crop.verifiedQuantity} kg (Discrepancy: ${discrepancy} kg). Block #${newBlock.index} minted.`,
      crop,
      block: newBlock
    });

  } catch (error) {
    console.error('Warehouse update-stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/warehouse/stock
 * @desc    Get all warehouses with populated stored crops
 */
router.get('/stock', async (req, res) => {
  try {
    const warehouses = await Warehouse.find().populate('cropsStored');
    res.json({ success: true, warehouses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/warehouse/register
 * @desc    Register a new warehouse
 */
router.post('/register', async (req, res) => {
  try {
    const { warehouseId, location, capacity } = req.body;
    if (!warehouseId || !location) {
      return res.status(400).json({ success: false, message: 'warehouseId and location are required' });
    }

    const existing = await Warehouse.findOne({ warehouseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Warehouse ID already exists' });
    }

    const warehouse = await Warehouse.create({
      warehouseId,
      location,
      capacity: capacity || 20000,
      cropsStored: []
    });

    res.status(201).json({ success: true, message: 'Warehouse registered', warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
