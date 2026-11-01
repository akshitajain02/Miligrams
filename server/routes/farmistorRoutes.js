const express = require('express');
const router = express.Router();

/**
 * Agronomic database of crops with rule profiles for Indian agro-climatic zones
 */
const CROP_PROFILES = [
  {
    id: 'sharbati-wheat',
    name: 'Sharbati Wheat',
    nameHi: 'शरबती गेहूं',
    category: 'Cereal Grain',
    season: ['Rabi'],
    soilTypes: ['Alluvial', 'Loamy Clay', 'Black Cotton'],
    waterNeeds: 'Moderate', // Canal or Borewell (3-4 irrigations)
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell', 'Drip Irrigation'],
    durationDays: '115–125 Days',
    investmentPerAcre: 18500,
    yieldMin: 18,
    yieldMax: 24, // Quintals per acre
    unit: 'Quintals/Acre',
    expectedPricePerQ: 2850,
    riskLevel: 'Low',
    riskFactors: ['Mild lodging if late irrigation', 'Terminal heat stress past mid-March'],
    suitabilityReasons: [
      'High market premium over MSP due to golden grain luster & high gluten strength.',
      'Excellent match for well-drained alluvial and loamy soils during cool North-Indian winter.',
      'Guaranteed wholesale liquidity in regional APMC mandis.'
    ],
    primaryGoalMatch: ['Maximum Profit', 'Stable Income', 'Low Risk']
  },
  {
    id: 'royal-basmati-1121',
    name: 'Royal Basmati Rice (1121)',
    nameHi: 'शाही बासमती चावल (1121)',
    category: 'Export Grain',
    season: ['Kharif'],
    soilTypes: ['Alluvial', 'Loamy Clay', 'Clayey'],
    waterNeeds: 'High',
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell'],
    durationDays: '135–145 Days',
    investmentPerAcre: 29000,
    yieldMin: 16,
    yieldMax: 21,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 6800,
    riskLevel: 'Moderate',
    riskFactors: ['Susceptible to neck blast if excessive nitrogen', 'High moisture sensitivity at harvest'],
    suitabilityReasons: [
      'Top-tier export commodity with 2x to 3x price realization compared to non-basmati paddy.',
      'Exceptional elongation ratio upon cooking, high institutional buyer demand on Miligrams.',
      'Optimal performance in heavy moisture-retentive soils with reliable irrigation.'
    ],
    primaryGoalMatch: ['Maximum Profit', 'Export Demand']
  },
  {
    id: 'pearl-millet-bajra',
    name: 'Hybrid Pearl Millet (Bajra)',
    nameHi: 'देसी संकर बाजरा',
    category: 'Nutri-Cereal',
    season: ['Kharif', 'Zaid'],
    soilTypes: ['Sandy/Light Loam', 'Red/Sandy', 'Alluvial', 'Laterite'],
    waterNeeds: 'Very Low',
    waterCompatibility: ['Rainfed / Dryland', 'Canal Irrigation', 'Deep Borewell', 'Drip Irrigation'],
    durationDays: '75–85 Days',
    investmentPerAcre: 10500,
    yieldMin: 13,
    yieldMax: 18,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 2450,
    riskLevel: 'Very Low',
    riskFactors: ['Downy mildew in waterlogged soils (ensure drainage)'],
    suitabilityReasons: [
      'Extreme drought tolerance and minimal irrigation requirement — thrives even in dry spells.',
      'Low input cost makes it the ideal crop for limited capital and marginal lands.',
      'Growing superfood consumer demand for millet-based flour and breakfast cereals.'
    ],
    primaryGoalMatch: ['Low Water / Drought Resilience', 'Low Initial Capital', 'Soil Regeneration']
  },
  {
    id: 'yellow-mustard',
    name: 'Yellow Mustard (Pusa Bold)',
    nameHi: 'पीली सरसों',
    category: 'Oilseed',
    season: ['Rabi'],
    soilTypes: ['Sandy/Light Loam', 'Alluvial', 'Loamy Clay', 'Red/Sandy'],
    waterNeeds: 'Low',
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell', 'Drip Irrigation', 'Rainfed / Dryland'],
    durationDays: '105–115 Days',
    investmentPerAcre: 12500,
    yieldMin: 8,
    yieldMax: 12,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 5400,
    riskLevel: 'Low',
    riskFactors: ['Aphid infestation during flowering (manageable with neem spray)', 'Frost during January'],
    suitabilityReasons: [
      'High oil content (42%) commands immediate cash purchase from local oil mills & exporters.',
      'Requires only 1 to 2 light irrigations after sowing, saving critical diesel/power expenditure.',
      'Short maturity allows farmers to plant a third summer pulse crop (Zaid Moong).'
    ],
    primaryGoalMatch: ['Maximum Profit', 'Low Water / Drought Resilience', 'Low Initial Capital']
  },
  {
    id: 'desi-chickpea-chana',
    name: 'Desi Chickpeas (Chana)',
    nameHi: 'देसी चना',
    category: 'Legume / Pulse',
    season: ['Rabi'],
    soilTypes: ['Black Cotton', 'Loamy Clay', 'Alluvial', 'Sandy/Light Loam'],
    waterNeeds: 'Low',
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell', 'Rainfed / Dryland', 'Drip Irrigation'],
    durationDays: '95–105 Days',
    investmentPerAcre: 14000,
    yieldMin: 8,
    yieldMax: 12,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 6100,
    riskLevel: 'Low',
    riskFactors: ['Pod borer at fruiting stage', 'Excess moisture reduces pod setting'],
    suitabilityReasons: [
      'Fixes 35–40 kg atmospheric nitrogen per acre, naturally enriching soil fertility for the next crop.',
      'Strong institutional support and high domestic pulse consumption with high floor prices.',
      'Highly compatible with residual soil moisture following Kharif harvest.'
    ],
    primaryGoalMatch: ['Soil Regeneration', 'Low Water / Drought Resilience', 'Stable Income']
  },
  {
    id: 'organic-soybean',
    name: 'Organic Soybean (JS-335)',
    nameHi: 'जैविक सोयाबीन',
    category: 'Oilseed & Protein',
    season: ['Kharif'],
    soilTypes: ['Black Cotton', 'Loamy Clay', 'Alluvial'],
    waterNeeds: 'Moderate',
    waterCompatibility: ['Rainfed / Dryland', 'Canal Irrigation', 'Drip Irrigation'],
    durationDays: '90–100 Days',
    investmentPerAcre: 16500,
    yieldMin: 11,
    yieldMax: 15,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 4900,
    riskLevel: 'Low',
    riskFactors: ['Yellow mosaic virus vector (whitefly)', 'Excessive continuous rain at pod maturity'],
    suitabilityReasons: [
      'Dual economic stream: high vegetable oil extraction plus high-protein soy meal for feed industries.',
      'Leguminous root nodules leave the field enriched with bio-available nitrogen for winter wheat.',
      'Fast 95-day cycle ensures field clearance well in advance of the prime Rabi sowing window.'
    ],
    primaryGoalMatch: ['Maximum Profit', 'Soil Regeneration', 'Low Initial Capital']
  },
  {
    id: 'sweet-corn-maize',
    name: 'Hybrid Maize (Corn)',
    nameHi: 'संकर मक्का',
    category: 'Coarse Grain / Feed',
    season: ['Kharif', 'Rabi', 'Zaid'],
    soilTypes: ['Alluvial', 'Loamy Clay', 'Red/Sandy'],
    waterNeeds: 'Moderate',
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell', 'Drip Irrigation'],
    durationDays: '95–105 Days',
    investmentPerAcre: 21000,
    yieldMin: 24,
    yieldMax: 32,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 2200,
    riskLevel: 'Low',
    riskFactors: ['Fall armyworm (FAW) monitoring required during vegetative whorl stage'],
    suitabilityReasons: [
      'Massive bio-mass yield and rapid grain filling with high harvest indices.',
      'Surging industrial demand from starch manufacturers, poultry feed, and ethanol blending units.',
      'Adaptable across multiple seasons (Spring, Kharif, and Rabi).'
    ],
    primaryGoalMatch: ['Maximum Profit', 'Stable Income']
  },
  {
    id: 'summer-green-gram-moong',
    name: 'Summer Moong (Green Gram)',
    nameHi: 'ग्रीष्मकालीन मूंग',
    category: 'Short-Duration Pulse',
    season: ['Zaid', 'Kharif'],
    soilTypes: ['Alluvial', 'Sandy/Light Loam', 'Loamy Clay'],
    waterNeeds: 'Low',
    waterCompatibility: ['Canal Irrigation', 'Deep Borewell', 'Drip Irrigation'],
    durationDays: '60–70 Days',
    investmentPerAcre: 9800,
    yieldMin: 5,
    yieldMax: 8,
    unit: 'Quintals/Acre',
    expectedPricePerQ: 8400,
    riskLevel: 'Low',
    riskFactors: ['Pre-monsoon showers at harvest stage can cause pod shattering'],
    suitabilityReasons: [
      'Ultra short 65-day duration fits seamlessly between wheat harvesting (April) and paddy sowing (July).',
      'Provides a bonus profit harvest from idle summer fields while restoring organic soil carbon.',
      'Premium pulse price of ₹8,000+ per quintal delivers outstanding return on low capital outlay.'
    ],
    primaryGoalMatch: ['Soil Regeneration', 'Low Initial Capital', 'Maximum Profit']
  }
];

/**
 * @route   POST /api/farmistor/recommend
 * @desc    Calculates transparent, rule-based crop suggestions based on agronomic parameters
 */
router.post('/recommend', (req, res) => {
  try {
    const {
      soilType = 'Alluvial',
      landArea = 3, // in acres
      waterAvailability = 'Canal Irrigation',
      season = 'Rabi',
      location = 'Punjab',
      budgetPerAcre = 20000,
      farmingGoal = 'Maximum Profit'
    } = req.body;

    const area = Math.max(0.25, Number(landArea) || 1);
    const budget = Math.max(5000, Number(budgetPerAcre) || 20000);

    const scoredCrops = CROP_PROFILES.map(crop => {
      let score = 70; // baseline
      const matchBreakdown = {
        soilScore: 0,
        waterScore: 0,
        seasonScore: 0,
        budgetScore: 0,
        goalScore: 0
      };

      // 1. Soil Match
      if (crop.soilTypes.includes(soilType)) {
        matchBreakdown.soilScore = 20;
        score += 20;
      } else {
        matchBreakdown.soilScore = 8;
        score += 8;
      }

      // 2. Water Availability Match
      if (crop.waterCompatibility.includes(waterAvailability)) {
        matchBreakdown.waterScore = 20;
        score += 20;
      } else if (crop.waterNeeds === 'High' && waterAvailability === 'Rainfed / Dryland') {
        matchBreakdown.waterScore = -25;
        score -= 25;
      } else {
        matchBreakdown.waterScore = 10;
        score += 10;
      }

      // 3. Season Match
      if (crop.season.includes(season)) {
        matchBreakdown.seasonScore = 20;
        score += 20;
      } else {
        matchBreakdown.seasonScore = -15;
        score -= 15;
      }

      // 4. Budget Match
      if (budget >= crop.investmentPerAcre) {
        matchBreakdown.budgetScore = 15;
        score += 15;
      } else {
        const deficitRatio = (crop.investmentPerAcre - budget) / crop.investmentPerAcre;
        const penalty = Math.min(20, Math.round(deficitRatio * 30));
        matchBreakdown.budgetScore = -penalty;
        score -= penalty;
      }

      // 5. Goal Match
      if (crop.primaryGoalMatch.some(g => g.toLowerCase().includes(farmingGoal.toLowerCase()))) {
        matchBreakdown.goalScore = 15;
        score += 15;
      } else {
        matchBreakdown.goalScore = 5;
        score += 5;
      }

      // Clamp score between 35% and 98%
      const finalSuitability = Math.max(35, Math.min(98, score));

      // Calculate economic estimates for the total acreage
      const totalInvestment = Math.round(crop.investmentPerAcre * area);
      const estMinYieldTotal = Math.round(crop.yieldMin * area * 10) / 10;
      const estMaxYieldTotal = Math.round(crop.yieldMax * area * 10) / 10;
      
      const grossRevenueMin = Math.round(estMinYieldTotal * crop.expectedPricePerQ);
      const grossRevenueMax = Math.round(estMaxYieldTotal * crop.expectedPricePerQ);

      const netProfitMin = Math.max(0, grossRevenueMin - totalInvestment);
      const netProfitMax = Math.max(0, grossRevenueMax - totalInvestment);

      return {
        id: crop.id,
        name: crop.name,
        nameHi: crop.nameHi,
        category: crop.category,
        suitabilityScore: finalSuitability,
        season: crop.season,
        durationDays: crop.durationDays,
        waterNeeds: crop.waterNeeds,
        riskLevel: crop.riskLevel,
        riskFactors: crop.riskFactors,
        suitabilityReasons: crop.suitabilityReasons,
        economics: {
          areaAcres: area,
          investmentPerAcre: crop.investmentPerAcre,
          totalInvestment,
          expectedPricePerQ: crop.expectedPricePerQ,
          yieldRangePerAcre: `${crop.yieldMin}–${crop.yieldMax} Q/Acre`,
          totalYieldRange: `${estMinYieldTotal}–${estMaxYieldTotal} Quintals`,
          estGrossRevenueRange: `₹${grossRevenueMin.toLocaleString('en-IN')} – ₹${grossRevenueMax.toLocaleString('en-IN')}`,
          estNetProfitRange: `₹${netProfitMin.toLocaleString('en-IN')} – ₹${netProfitMax.toLocaleString('en-IN')}`,
          roiPercentage: Math.round(((netProfitMin + netProfitMax) / (2 * totalInvestment)) * 100)
        },
        matchBreakdown
      };
    });

    // Sort by suitability score descending
    scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    res.json({
      success: true,
      query: {
        soilType,
        landArea: area,
        waterAvailability,
        season,
        location,
        budgetPerAcre: budget,
        farmingGoal
      },
      generatedAt: new Date().toISOString(),
      disclaimer: 'Estimates provided are calculated using rule-based agronomic models from Indian ICAR & State Agricultural Universities. Realized yields depend on climate, seed vitality, and micro-farm management.',
      recommendations: scoredCrops
    });

  } catch (error) {
    console.error('Farmistor recommendation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/farmistor/crops
 * @desc    Returns all available crop planning profiles
 */
router.get('/crops', (req, res) => {
  res.json({
    success: true,
    count: CROP_PROFILES.length,
    crops: CROP_PROFILES
  });
});

module.exports = router;
